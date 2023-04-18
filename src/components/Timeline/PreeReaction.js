import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import axios from "axios";
import Comment from "./Comment";
import {Link} from "react-router-dom";
import { formatReaction } from "../../GlobalFunctions";

const PreeReaction = props => {

    const {aPree} = props;
    const {showComments} = props;
    const {clickable} = props;

    //const [showComments, setShowComments] = useState(false);
    const [load, setLoad] = useState(true);
    const [reaction, setReaction] = useState(aPree.is_approved);
    const [likedcount, setLikes] = useState(aPree.approvals);
    const [dislikedcount, setDislikes] = useState(aPree.disapprovals);
    const [commentscount, setCommentsCount] = useState(aPree.comments); 
    const [comment, makeComment] = useState("");
    const [comments, setComments] = useState([]);
    const token = props.context.token ? props.context.token : 0;

    useEffect( () => {
        if (load){
            //const user_id = props.context.user ? props.context.user.id : 0;
            const pree_id = aPree.pree_id;
            
            //PreeReaction onload
            if(token !== 0){
                axios.post(`${process.env.REACT_APP_PROXY}/api/get-reaction`,{token,pree_id}).then(
                    (getReaction) => {
                        if (getReaction.status === 200){
                            setReaction(getReaction.data.is_approved);
                            setLikes(getReaction.data.likedcount);
                            setDislikes(getReaction.data.dislikedcount);
                            setCommentsCount(getReaction.data.commentscount);
                        }else if(getReaction.status === 201){
                            setReaction(null);
                            setLikes(getReaction.data.likedcount);
                            setDislikes(getReaction.data.dislikedcount);
                            setCommentsCount(getReaction.data.commentscount);
                        }else{
                            throw new Error("Error while Reacting to Pree");
                        }
                    }
                );
            }
            if (clickable === "view"){
                axios.post(`${process.env.REACT_APP_PROXY}/api/get-comments`, {token, pree_id}).then(
                (getComments) => {
                        if (getComments.status === 200){
                            setComments(getComments.data.comments);
                        }else{
                        throw new Error("No comments available.");
                        } 
                });
            }
            setLoad(false);
        }
    },[token, load, aPree, clickable, props.context.user]);
    
    //PreeReactions Functions
    const likePree = (e, pree_id) => {
        const user_id = props.context.user ? props.context.user.id : 0;
        if (reaction !== true){
            axios.post(`${process.env.REACT_APP_PROXY}/api/like-pree`,{user_id,pree_id}).then(
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
            axios.put(`${process.env.REACT_APP_PROXY}/api/like-pree`,{user_id,pree_id}).then(
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
        const user_id = props.context.user ? props.context.user.id : 0;
        if (reaction !== false){
            axios.post(`${process.env.REACT_APP_PROXY}/api/dislike-pree`,{user_id,pree_id}).then(
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
            axios.put(`${process.env.REACT_APP_PROXY}/api/dislike-pree`,{user_id,pree_id}).then(
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
        const user_id = props.context.user ? props.context.user.id : 0;
        const pree_id = aPree.pree_id;
        axios.post(`${process.env.REACT_APP_PROXY}/api/handle-comments`, {user_id, pree_id, comment}).then(
            (send) => {
                if (send.status === 200){
                    let temp = [send.data.comment, ...comments];
                    setComments(new Set(temp));
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

    return (
        <div className="reactions">
            <div className="th-divs is-mobile has-text-centered">
                <div className="column reaction-btn px-0" onClick={(e) => likePree(e,aPree.pree_id) }>
                    <span className="reaction-btn" style={reaction === true ? {color:"blue"}:{color:"#5d5d5d"}} > <span className="reaction-txt">Like <br /></span><i className="fas fa-heart" aria-hidden="true"></i><span className="reaction-num">{formatReaction(likedcount)}</span></span>
                </div>
                <div className="column reaction-btn px-0" onClick={(e) => dislikePree(e,aPree.pree_id) }>
                    <span className="reaction-btn" style={reaction === false ? {color:"blue"}:{color:"#5d5d5d"}}> <span className="reaction-txt">Dis-Like <br /> </span><i className="fas fa-heart-broken" aria-hidden="true"></i><span className="reaction-num">{formatReaction(dislikedcount)}</span></span>
                </div>
                <div className="column px-0">
                    {clickable === "expand" ?
                        (
                            <Link to={`/view-pree/${aPree.pree_id}`}>
                                <span className="reaction-btn" style={{color:"#5d5d5d"}}> <span className="reaction-txt">Comments <br /> </span><i className="fas fa-comment"></i><span className="reaction-num">{formatReaction(commentscount)}</span></span>
                            </Link>
                        ):(
                            <span className="reaction-btn" style={{color:"#5d5d5d"}}> <span className="reaction-txt">Comments <br /> </span><i className="fas fa-comment"></i><span className="reaction-num">{formatReaction(commentscount)}</span></span>
                        )}
                </div>
                <div className="column px-0">
                    <span className="reaction-btn"> <span className="reaction-txt"> Re-Pree <br /> </span>  <i className="fas fa-sync-alt"></i><span className="reaction-num">{formatReaction(0)}</span></span>
                </div>
                <div className="column px-0">
                    <span className="reaction-btn"> <span className="reaction-txt">  Share <br />  </span><i className="fas fa-share-alt"></i><span className="reaction-num">{formatReaction(0)}</span></span>
                </div>
            </div>
            {showComments &&
                <div className="pree-comments card">
                    <div>
                        <div className="make-comment">
                            <textarea className="textarea" onChange={e => makeComment(e.target.value)} value={comment} type="text" placeholder="Enter Comment"/>
                        </div>
                        <br />
                        <div className="hero">
                            <div className="comments-control">
                                <button onClick={e => sendComment(e)} className="mx-1 button is-success is-pulled-left">
                                    Make &nbsp; <i className="fas fa-share"></i>
                                </button>
                                <div className="dropdown mx-1 is-hoverable is-pulled-right is-right">
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
                        <div className="list-comments card">
                            {comments && comments.length > 0 ?
                                comments.map((aComment, index) => {
                                    return(
                                        <div key={index} className="comment-box">
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