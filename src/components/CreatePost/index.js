import React, {useEffect, useRef, useState} from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useNavigate } from 'react-router-dom';
import uploadIcon from "../../icons/file_upload.png";
import { nanoid } from "nanoid";


export default function CreatePost(props) {
    const { user } = props;
    const editorRef = useRef(null);
    const navigate = useNavigate();


    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [result, setResult] = useState({});
    const [file, setFile] = useState(null);



    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }
    }, [])

    const handleChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editorRef.current) {
            const bearer = "Bearer " + localStorage.getItem("token");
            const formData = new FormData();
            formData.append("title", editorRef.current.dom.select('h1')[0]?.innerText??"");
            formData.append("content", editorRef.current.getContent());
            formData.append("description", editorRef.current.dom.select('p')[0]?.innerText??"");
            formData.append("photo", file);
            formData.append("published", e.target.published.checked);
            fetch("http://localhost:3000/auth/posts", 
                {
                    method: "POST",
                    headers: {
                        "Authorization": bearer
                    },
                    body: formData
                })
                .then((res) => res.json())
                .then((result) => {
                    setIsLoaded(true);
                    setResult(result);
                    if (result.status === 201) {
                        navigate("/", {replace: true});
                    }
                },
                (error) => {
                    setIsLoaded(true);
                    setError(error);
                })
        }
    }

    return(
        <main className="editorMain">
            <div className="editor-box">
                <div className="more-info">
                    <form className="editor-form" onSubmit={handleSubmit}>
                        <Editor
                            tinymceScriptSrc={process.env.PUBLIC_URL + "/tinymce/tinymce.min.js"}
                            onInit={(evt, editor) => editorRef.current = editor}
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
                        <div className="editor-bottom-info">
                            <div className="editor-photo-box">
                                <label className="editor-photo-label" htmlFor="photo"><img id="upload-icon" src={uploadIcon}/><span className="editor-photo-span">{file?file.name:"Cover image"}</span></label>
                                <input id="photo" name="photo" type="file" accept="image/png, image/jpeg" onChange={handleChange}/>
                            </div>
                            <div className="published-box">
                                <label htmlFor="published">Publish: </label>
                                <input id="published" name="published" type="checkbox"/>
                            </div>
                            <p className="editor-author"><strong>{"Author: " + user?.full_name}</strong></p>
                        </div>
                        <div className="editor-submit-box">
                            <p>This post will be published in your name.<br/>Behave accordingly and respect others.</p>
                            <button>Submit Post</button>
                        </div>
                    </form>                    
                </div>               
            </div>
        </main>
    )

}