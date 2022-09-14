import React from "react";
import { DateTime } from "luxon";


export default function PostCard(props) {
    const {post} = props;
    return(
        <div className="postCard">
            <a>
                <div className="info-box">
                    <div className="author-box">
                        <img className="author-avatar-card" src={"http://localhost:3000/"+post.author.avatar.path}/>
                        <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                    </div>
                    
                    <h3>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h3>
                </div>
                <h2>{post.title}</h2>
                <p>{post.description.split(' ').slice(0, 30).join(' ') + "..."}</p>
                <div className="post-card-buttons">
                    <a href={"/post/"+post._id}><button>Edit</button></a>
                    <a href={"/post/delete/"+post._id}><button>Delete</button></a>
                </div>
            </a>
        </div>
    )
}