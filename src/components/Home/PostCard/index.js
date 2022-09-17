import React from "react";
import { DateTime } from "luxon";
import EditIcon from "../../../icons/edit.png";
import DeleteIcon from "../../../icons/delete.png"


export default function PostCard(props) {
    const {post} = props;
    return(
        <div className="postCard">
            <div className="postCard-container">
                <div className="post-box-left">
                    <div className="info-box">
                        <div className="author-box">
                            <img className="author-avatar-card" src={"http://localhost:3000/"+post.author.avatar.path}/>
                            <h3>{post.author.first_name + " " + post.author.last_name}</h3>
                        </div>
                        
                        <h3>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h3>
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description.split(' ').slice(0, 50).join(' ') + "..."}</p>
                    <p className="post-comments-count">{post.count + " comments"}</p>
                    <div className="post-modification-buttons">
                        <a className="post-modification-anchor" href={"/post/"+post._id}><button className="post-modification-button"><img className="icon" src={EditIcon}/>Edit</button></a>
                        <a className="post-modification-anchor" href={"/post/delete/"+post._id}><button className="post-modification-button"><img className="icon" src={DeleteIcon}/>Delete</button></a>
                    </div>
                </div>
                <div className="post-box-right">
                    <img className="photo-thumbnail" src={"http://localhost:3000/"+post.photo.path}/>
                </div>
            </div>
        </div>
    )
}