import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import PostCard from "./PostCard";
import addIcon from "../../icons/add.png"

export default function HomeMain(props) {
    const { user } = props;
    const navigate = useNavigate();

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [posts, setPosts] = useState({});

    

    useEffect(() => {

        if (!user) {
            navigate("/login", {replace: true});
        }

        const bearer = "Bearer " + localStorage.getItem("token");
        fetch("http://localhost:3000/auth/posts/author", 
            {
                method: "GET",
                headers: {
                    "Authorization": bearer
                }
            })
            .then((res) => res.json())
            .then((result) => {
                setIsLoaded(true);
                setPosts(result.post_list);
            },
            (error) => {
                setIsLoaded(true);
                setError(error);
            })
    }, [])

    if (error) {
        return <div>Error: {error.message}</div>
    } else if (posts === undefined) {
        return <div>No posts!</div>
    } else if (!isLoaded) {
        return <div>Loading...</div>
    } else {
        return(
            <main>
                <div className="posts-box">
                    <div className="post-create-box">
                        <a href="/post">
                            
                            <button id="newPostBtn"><img id="add-icon" src={addIcon}/>Create a new post</button>
                        </a> 
                    </div>
                    {posts.map((post) => {
                        return(
                            <React.Fragment key={post._id}>
                                <PostCard post={post}/>
                            </React.Fragment>
                        )
                    })}
                </div>
            </main>
        )
    }
}