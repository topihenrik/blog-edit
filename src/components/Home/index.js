import React, {useEffect, useState} from "react";
import { useNavigate } from 'react-router-dom';
import PostCard from "./PostCard";
import HeroScreen from "./HeroScreen";
import addIcon from "../../icons/add.png";
import LoadingIcon from "../../icons/loading.svg"

export default function Home(props) {
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
        fetch(`${process.env.REACT_APP_API_URL}/auth/posts/author`, 
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
        return (
            <div className="error-main">
                <div className="error-container">
                    <h2>Error</h2>
                    <p>{error.message}</p>
                </div>
            </div>
        )
    } else if (!isLoaded) {
        return (
            <div className="loading-main">
                <HeroScreen/>
                <div className="loading-container">
                    <div className="loading-icon-box">
                        <img id="loading-icon" src={LoadingIcon}/>
                    </div>
                    <p>Loading Posts...</p>
                </div>
            </div>
        )
    } else if (posts === undefined) {
        return (
            <div className="no-content-main">
                <HeroScreen/>
                <div className="no-content-container">
                    <div className="post-create-box">
                        <a href="/post">
                            <button id="newPostBtn"><img id="add-icon" src={addIcon}/>Create New Post</button>
                        </a> 
                    </div>
                    <h2>No posts found</h2>
                    <p>???? Share your ideas and make your first post!</p>
                </div>
            </div>
        )
    } else {
        return(
            <main className="home-main">
                <HeroScreen/>
                <div className="posts-box">
                    <div className="post-create-box">
                        <a href="/post">
                            <button id="newPostBtn"><img id="add-icon" src={addIcon}/>Create New Post</button>
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