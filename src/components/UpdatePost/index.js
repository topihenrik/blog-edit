import React, {useEffect, useRef, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../icons/file_upload.png";
import { useParams } from "react-router-dom";

export default function UpdatePost(props) {
    const { user } = props;
    const editorRef = useRef(null);
    const navigate = useNavigate();
    const { postid } = useParams();

    const [error1, setError1] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [post, setPost] = useState([]);
    
    const [error2, setError2] = useState(null);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [result, setResult] = useState({});
    const [file, setFile] = useState(null);
    

    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`http://localhost:3000/auth/posts/${postid}/edit`,
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded1(true);
                setPost(result.post_list);
            },
            (error) => {
                setIsLoaded1(true);
                setError1(error);
            }
        )

    }, [])

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }




    const handleSubmit = (e) => {
        e.preventDefault();
        if (editorRef.current) {
            const bearer = "Bearer " + localStorage.getItem("token");
            const formData = new FormData();
            console.log(postid);
            formData.append("postID", postid);
            formData.append("title", e.target.title.value);
            formData.append("content", editorRef.current.getContent());
            formData.append("description", editorRef.current.dom.select('p')[0].innerText);
            formData.append("photo", file);
            formData.append("published", e.target.published.checked);
            fetch("http://localhost:3000/auth/posts", 
                {
                    method: "PUT",
                    headers: {
                        "Authorization": bearer
                    },
                    body: formData
                })
                .then((res) => res.json())
                .then((result) => {
                    setIsLoaded2(true);
                    setResult(result);
                    if (result.status === 201) {
                        navigate("/", {replace: true});
                    }
                },
                (error) => {
                    setIsLoaded2(true);
                    setError2(error);
                })
        }
    }



    if (error1) {
        return <div>Error: {error1.message}</div>;
    } else if (!isLoaded1) {
        return <div>Loading...</div>;
    } else if (post === undefined) {
        return <div>No post!</div>
    } else {
        return(
            <main className="editorMain">
                <div className="editor-box">
                    <div className="more-info">
                        <form className="editor-form" onSubmit={handleSubmit}>
                            <div className="editor-title-box">
                                <label><h3>Title:</h3></label>
                                <input className="title-input" name="title" defaultValue={post.title}/>
                            </div>
                            <Editor
                                tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
                                initialValue={post.content}
                                onInit={(evt, editor) => {
                                    editorRef.current = editor;
                                }}
                                init={{
                                    selector: "textarea",
                                    height: 500,
                                    plugins:
                                      'advlist anchor autolink charmap code codesample fullscreen help link lists paste preview searchreplace table visualblocks wordcount',
                                  }}
                                />
                            <div className="editor-bottom-info">
                                <div className="editor-photo-box">
                                    <label htmlFor="photo"><img id="upload-icon" src={uploadIcon}/>{file?file.name:"Choose a photo"}</label>
                                    <input id="photo" name="photo" type="file" onChange={handleChange}/>
                                </div>
                                <div className="published-box">
                                    <label htmlFor="published">Publish: </label>
                                    <input id="published" name="published" type="checkbox"/>
                                </div>
                                <p className="editor-author">{"Author: " + post?.author?.first_name + " " + post?.author?.last_name}</p>
                            </div>
                            <div className="editor-submit-box">
                                <p>This post will be updated with your name.<br/>Behave accordingly and respect others.</p>
                                <button>Update Post</button>
                            </div>
                            
                        </form>                    
                    </div>               
                </div>
            </main>
        )
    }



    

}