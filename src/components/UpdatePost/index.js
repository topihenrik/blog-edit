import React, {useEffect, useRef, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../icons/file_upload.png";
import { useParams } from "react-router-dom";
import { nanoid } from "nanoid";
import LoadingIcon from "../../icons/loading.svg"

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
    const [resultErrors, setResultErrors] = useState({});
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
            formData.append("title", editorRef.current.dom.select('h1')[0]?.innerText??"");
            formData.append("content", editorRef.current.getContent());
            formData.append("description", editorRef.current.dom.select('p')[0]?.innerText??"");
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
        return (
            <div className="errorMain">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error1.message}</p>
                </div>
            </div>
        )
    } else if (post === undefined) {
        return (
            <div className="noContentMain">
                <div className="no-content-container">
                    <h2>No post found</h2>
                </div>
            </div>
        )
    } else if (!isLoaded1) {
        return (
            <div className="loadingMain">
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon}/>
                    </div>
                    <p>Loading Post...</p>
                </div>
            </div>
        )
    } else {
        return(
            <main className="editorMain">
                <div className="editor-box">
                    <div className="more-info">
                        <form className="editor-form" onSubmit={handleSubmit}>
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
                            <div className="editor-error-box">
                                {result.errors &&
                                result.errors.map((error) => {
                                    return(
                                        <div className="error-box" key={nanoid()}>
                                            <p className="error-message">{error.msg}</p>
                                        </div>
                                    )
                                })}
                            </div>
                            <div className="editor-bottom-area">
                                    <div className="editor-photo-box">
                                        <label className="editor-photo-label" htmlFor="photo"><img id="upload-icon" src={uploadIcon}/>{post.photo.originalName?<span className="editor-photo-span">{post.photo.originalName}</span>:<span className="editor-photo-span">{file?file.name:"Cover image"}</span>}</label>
                                        <input id="photo" name="photo" type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
                                    </div>
                                    <div className="published-box">
                                        {!post.published?
                                        <>
                                            <label htmlFor="published">Publish: </label>
                                            <input id="published" name="published" type="checkbox"/>
                                        </>:
                                        <>
                                            <input id="published" name="published" type="hidden" checked={true}/>
                                        </>}
                                    </div>
                                    <p className="editor-author">{"Author: " + post?.author?.first_name + " " + post?.author?.last_name}</p>
                                    <div className="editor-submit-box">
                                        <button className="editor-btn-submit">Update Post</button>
                                    </div>
                            </div>
                        </form>                    
                    </div>               
                </div>
            </main>
        )
    }



    

}