import React from "react";
import { DateTime } from "luxon";


export default function PostCardDel(props) {
    const {post, count} = props;
    return(
        <div className="post-card-del">
            <div className="post-card-del-container">
                <div className="del-post-box-left">
                    <div className="del-info-box">
                        <div className="del-author-box">
                            <img className="del-author-avatar-card" src={"http://localhost:3000/"+post.author.avatar.path}/>
                            <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                        </div>
                        
                        <h3>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h3>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description.split(' ').slice(0, 50).join(' ') + "..."}</p>
                    <p className="del-post-comments-count">{count + " comments"}</p>
                </div>
                <div className="del-post-box-right">
                    <img className="del-photo-thumbnail" src={"http://localhost:3000/"+post.photo.path}/>
                </div>
            </div>
        </div>
    )
}