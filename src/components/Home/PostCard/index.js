import React from "react";
import { DateTime } from "luxon";
import EditIcon from "../../../icons/edit.png";
import DeleteIcon from "../../../icons/delete.png"


export default function PostCard(props) {
    const {post} = props;
    return(
        <div className="post-card">
            <div className="post-card-container">
                <div className="post-box-left">
                    <div className="info-box">
                        <div className="author-box">
                            <img className="author-avatar-card" src={post.author.avatar.url}/>
                            <h4>{post.author.first_name + " " + post.author.last_name}</h4>
                        </div>                       
                        <h4>{DateTime.fromJSDate(new Date(post.timestamp)).toLocaleString(DateTime.DATE_MED)}</h4>
                    </div>
                    <h2>{post.title}</h2>
                    <p className="post-description">{post.description.split(' ').slice(0, 28).join(' ') + " ..."}</p>
                    <p className="post-comments-count">{post.count + " comments"}</p>
                    {post.published?<p className="post-published-true">Published</p>:<p className="post-published-false">Not published</p>}
                    <div className="post-modification-buttons">
                        <a className="post-modification-anchor" href={"/post/"+post._id}><button className="post-modification-button"><img className="icon" src={EditIcon}/>Edit</button></a>
                        <a className="post-modification-anchor" href={"/post/delete/"+post._id}><button className="post-modification-button"><img className="icon" src={DeleteIcon}/>Delete</button></a>
                    </div>
                </div>
                <div className="post-box-right">
                    <img className="photo-thumbnail" src={post.photo.url}/>
                </div>
            </div>
        </div>
    )
}