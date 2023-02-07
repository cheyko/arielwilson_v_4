import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import axios from "axios";
import Comment from "./Comment";
import {Link} from "react-router-dom";

const PreeReaction = props => {

    const {aPree} = props;
    const {showComments} = props;
    const {clickable} = props;

    //const [showComments, setShowComments] = useState(false);
    const [load, setLoad] = useState(true);
    const [reaction, setReaction] = useState(null);
    const [likedcount, setLikes] = useState(aPree.approvals);
    const [dislikedcount, setDislikes] = useState(aPree.disapprovals);
    const [commentscount, setCommentsCount] = useState(aPree.comments); 
    const [comment, makeComment] = useState("");
    const [comments, setComments] = useState([]);

    useEffect( () => {
        if (load){
            //const user_id = props.context.user ? props.context.user.id : 0;
            const pree_id = aPree.pree_id;
            
            //PreeReaction onload
            /*axios.post("/api/get-reaction",{user_id,pree_id}).then(
                (getReaction) => {
                    if (getReaction.status === 200){
                        setReaction(getReaction.data.is_approved);
                    }else if(getReaction.status === 201){
                        setReaction(null);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )*/
            setReaction(aPree.is_approved);
            if (clickable === "view"){
                axios.post("/api/get-comments", {pree_id}).then(
                (getComments) => {
                        if (getComments.status === 200){
                            setComments(getComments.data.comments);
                        }else{
                        throw new Error("No comments available.");
                        } 
                });
            }
            //console.log(comments);
            setLoad(false);
        }
    },[load]);
    
    //PreeReactions Functions
    const likePree = (e, pree_id) => {
        const user_id = props.context.user.id;
        if (reaction !== true){
            axios.post("/api/like-pree",{user_id,pree_id}).then(
                (addlike) => {
                    if (addlike.status === 200){
                        setReaction(true);
                        setLikes(addlike.data.likedcount);
                        setDislikes(addlike.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }else{
            axios.put("/api/like-pree",{user_id,pree_id}).then(
                (unlike) => {
                    if (unlike.status === 200){
                        setLikes(unlike.data.likedcount);
                        setReaction(null);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }
    }

    const dislikePree = (e, pree_id) => {
        const user_id = props.context.user.id;
        if (reaction !== false){
            axios.post("/api/dislike-pree",{user_id,pree_id}).then(
                (dislike) => {
                    if (dislike.status === 200){
                        setLikes(dislike.data.likedcount);
                        setDislikes(dislike.data.dislikedcount);
                        setReaction(false);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }else{
            axios.put("/api/dislike-pree",{user_id,pree_id}).then(
                (undislike) => {
                    if (undislike.status === 200){
                        setReaction(null);
                        setDislikes(undislike.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }
    }

    const sendComment = (e) => {
        const user_id = props.context.user.id;
        const pree_id = aPree.pree_id;
        axios.post("/api/handle-comments", {user_id, pree_id, comment}).then(
            (send) => {
                if (send.status === 200){
                    //console.log(send.data.comment);
                    setComments([...comments, send.data.comment]);
                    setCommentsCount(send.data.comment_num);
                    makeComment("");
                }else{
                    throw new Error("Error while make comments.");
                }
            }
        )
        setLoad(true);
        //e.preventDefault();
        return true;
    }

    /*const getCommentsUserDetails = () => {
        return true;
    }*/

    //console.log(comments);
    return (
        <div className="reactions">
            <div className="columns is-mobile has-text-centered">
                <div className="column reaction-btn" onClick={(e) => likePree(e,aPree.pree_id) }>
                    <b className="reaction-btn" style={reaction === true ? {color:"blue"}:{color:"black"}} > <span className="reaction-txt">Like <br /></span>  <i className="fas fa-heart" aria-hidden="true"></i> {likedcount} </b>
                </div>
                <div className="column reaction-btn" onClick={(e) => dislikePree(e,aPree.pree_id) }>
                    <b className="reaction-btn" style={reaction === false ? {color:"blue"}:{color:"black"}}> <span className="reaction-txt">Dis-Like <br /> </span>   <i className="fas fa-heart-broken" aria-hidden="true"></i> {dislikedcount} </b>
                </div>
                <div className="column">
                    {clickable === "expand" ?
                        (
                            <Link to={`/view-pree/${aPree.pree_id}`}>
                                <b className="reaction-btn" style={{color:"black"}}> <span className="reaction-txt">Comment <br /> </span>  <i className="fas fa-comment"></i> {commentscount} </b>
                            </Link>
                        ):(
                            <b className="reaction-btn" style={{color:"black"}}> <span className="reaction-txt">Comment <br /> </span>  <i className="fas fa-comment"></i> {commentscount} </b>
                        )}
                </div>
                <div className="column">
                    <b className="reaction-btn"> <span className="reaction-txt"> Re-Pree <br /> </span>  <i className="fas fa-sync-alt"></i> # </b>
                </div>
                <div className="column">
                    <b className="reaction-btn"> <span className="reaction-txt">  Share <br />  </span><i className="fas fa-share-alt"></i> # </b>
                </div>
            </div>
            {showComments &&
                <div className="pree-comments card">
                    <div>
                        <div className="make-comment">
                            <input className="input" onChange={e => makeComment(e.target.value)} value={comment} type="text" placeholder="Enter Comment"/>
                        </div>
                        <br />
                        <div className="hero">
                            <div className="comments-control">
                                <button onClick={e => sendComment(e)} className="button is-success is-pulled-left">
                                    Make &nbsp; <i className="fas fa-share"></i>
                                </button>
                                <div className="dropdown is-hoverable is-pulled-right">
                                    <div className="dropdown-trigger">
                                        <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                                            <span>Filter </span>
                                            <span className="icon is-small">
                                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content">
                                            <span className="dropdown-item">
                                                Latest
                                            </span>
                                            <span className="dropdown-item">
                                                Earliest
                                            </span>
                                            <span className="dropdown-item">
                                                Most Liked
                                            </span>
                                            <span className="dropdown-item">
                                                Most Dis-Liked
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr />
                        <div className="list-comments is-centered">
                            {comments && comments.length > 0 ?
                                comments.map((aComment, index) => {
                                    //console.log(comments);
                                    return(
                                        <div key={index} className="box comment-box">
                                            <Comment aPree={aPree} comment={aComment} />
                                        </div>
                                    )}
                                ):(
                                    <div className="box">
                                        No Comments.  
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            }
        </div>  
    )
}
export default withContext(PreeReaction);