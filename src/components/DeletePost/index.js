import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import PostCardDel from "./PostCardDel";

export default function DeletePost(props) {
    const { user } = props;
    const { postid } = useParams();
    const navigate = useNavigate();
    

    const [error1, setError1] = useState(null);
    const [isLoaded1, setIsLoaded1] = useState(false);
    const [post, setPost] = useState([]);
    const [count, setCount] = useState(0);
    
    const [error2, setError2] = useState(null);
    const [isLoaded2, setIsLoaded2] = useState(false);
    const [result, setResult] = useState({});

    useEffect(() => {
        if (!user) {
            navigate("../login", {replace: true});
        }

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`http://localhost:3000/auth/posts/${postid}`,
            {
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded1(true);
                setPost(result.post_list);
                setCount(result.count);
            },
            (error) => {
                setIsLoaded1(true);
                setError1(error);
            }
        )
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        const bearer = "Bearer " + localStorage.getItem("token");
        fetch(`http://localhost:3000/auth/posts/${postid}`,
            {
                method: "DELETE",
                headers: {
                    "Authorization": bearer
                },
                body: new URLSearchParams({confirmation: e.target.confirmation.value})
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded2(true);
                setResult(result);
                if (result.status === 200) {
                    navigate("/", {replace: true});
                }
            },
            (error) => {
                setIsLoaded2(true);
                setError2(error);
            })
    }


    if (error1) {
        return <div>Error: {error1.message}</div>;
    } else if (!isLoaded1) {
        return <div>Loading...</div>;
    } else if (post === undefined) {
        return <div>No post!</div>
    } else {
        return(
            <main className="deletePost">
                <div className="delete-post-box">
                    <h2>Are you sure you want to delete this post?</h2>
                    <PostCardDel post={post} count={count}/>
                    <form onSubmit={handleSubmit}>
                        <label>To delete the post, type the title to confirm</label>
                        <input name="confirmation" type="text"/>
                        <button>Delete</button>
                    </form>
                </div>
            </main>
        )
    }




    



}
