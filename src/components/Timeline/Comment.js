import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import axios from "axios";
import Reply from "./Reply";
import Modal from "react-modal";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content : {
      width                 : '20rem',
      height                : '10rem',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      background: 'white',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '0.5rem',
      outline: 'none',
      padding: '20px'
    }
};

const Comment = props => {

    const {comment} = props;
    const {aPree} = props;
    const user_id = props.context ? props.context.user.id : 0;
    const comment_id = comment.comment_id;
    const [comment_text, setText] = useState(comment.comment_text);
    const [likedcount, setLikes] = useState(comment.c_approvals);
    const [dislikedcount, setDislikes] = useState(comment.c_disapprovals);
    const [threadcount, setThreadCount] = useState(comment.replies); 
    const [commentStatus, setStatus] = useState(true);
    const [c_reaction, setCReaction] = useState(null);
    const [reply, makeReply] = useState("");
    const [replies, setReplies] = useState([]);
    const [showReplyInput, setShowReplyInput] = useState(false);
    const [showReplies, setShowReplies] = useState(false);
    const [editcomment, editComment] = useState(comment.comment_text);
    const [showEditInput, setShowEditInput] = useState(false);


    useEffect( () => {
        const user_id = props.context.user.id;

        axios.post("/api/get-c-reaction",{user_id,comment_id}).then(
            (getCReaction) => {
                if (getCReaction.status === 200){
                    setCReaction(getCReaction.data.is_c_approved);
                }else if(getCReaction.status === 201){
                    setCReaction(null);
                }else{
                    throw new Error("Error while Reacting to Pree");
                }
            }
        )
    
        axios.post("/api/get-replies", {comment_id}).then(
           (getReplies) => {
                if (getReplies.status === 200){
                    setReplies(getReplies.data.replies);
                }else{
                   throw new Error("No comments available.");
                } 
            } 
        )

    },[comment_id,likedcount,dislikedcount, threadcount, c_reaction, reply]);

    const [modalIsOpen, setModalOpen] = useState(false);
    

    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setModalOpen(false);
    }

    const likeComment = (e) => {
        if (c_reaction !== true){
            axios.post("/api/like-comment",{user_id,comment_id}).then(
                (likecomment) => {
                    if (likecomment.status === 200){
                        setCReaction(true);
                        setLikes(likecomment.data.likedcount);
                        setDislikes(likecomment.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Comment");
                    }
                }
            )
        }else{
            axios.put("/api/like-comment",{user_id,comment_id}).then(
                (unlikecomment) => {
                    if (unlikecomment.status === 200){
                        setCReaction(null);
                        setLikes(unlikecomment.data.likedcount);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }
    }

    const dislikeComment = (e) => {
        if (c_reaction !== false){
            axios.post("/api/dislike-comment",{user_id,comment_id}).then(
                (dislike) => {
                    if (dislike.status === 200){
                        setCReaction(false);
                        setLikes(dislike.data.likedcount);
                        setDislikes(dislike.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Comment");
                    }
                }
            )
        }else{
            axios.put("/api/dislike-comment",{user_id,comment_id}).then(
                (undislike) => {
                    if (undislike.status === 200){
                        setCReaction(null);
                        setDislikes(undislike.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }
    }

    const sendReply = (e) => {
        const user_id = props.context.user.id;
        axios.post("/api/handle-replies", {user_id, comment_id, reply}).then(
            (send) => {
                if (send.status === 200){
                    //update comments list.
                    console.log(send.data.reply_id);
                    makeReply("");
                }else{
                    throw new Error("Error while make comments.");
                }
            }
        )
        e.preventDefault();
    }

    const saveEdit = (e) => {
        const user_id = props.context.user.id;
        axios.put("/api/handle-comments", {user_id, comment_id, editcomment}).then(
            (save) => {
                if (save.status === 200){
                    //console.log(send.data.comment);
                    //setComments([send.data.comment, ...comments]);
                    setText(editcomment);
                    editComment("");
                    setShowEditInput(!showEditInput);
                }else{
                    throw new Error("Error while make comments.");
                }
            }
        )
        //e.preventDefault();
    }

    const deleteComment = (e) => {
        const pree_id = aPree.pree_id;
        axios.post("/api/delete-comment", {pree_id,comment_id}).then(
            (remove) => {
                if (remove.status === 200){
                    setStatus(false);
                }else{
                    throw new Error("Error while make comments.");
                }
            }
        )
    }

    //console.log(commentStatus);
    return(
        <div className="columns is-mobile">
            {commentStatus ? (
                <>
                    <div className="column is-3 has-text-centered" style={{padding:"0.5rem"}}>
                        <figure className="display-pic image is-64x64" style={{margin:"0 auto"}}>
                            <img alt="display" className="is-rounded" src={process.env.PUBLIC_URL + "/images/default-dp.jpeg"} />
                        </figure>
                    </div>
                    <div className="column is-7 ">
                        <div className="comment-text"> 
                            {showEditInput ? (
                                <div className="edit-comment">
                                    <input className="input is-small" style={{width:"80%"}} onChange={e => editComment(e.target.value)} value={editcomment} type="text" />
                                    {" "}
                                    <button onClick={(e) => saveEdit(e)} className="button is-small"> Save </button>
                                </div>
                            ):(
                                <div className="the-comment">
                                    <small>{comment.user_id}</small> {comment_text} 
                                </div>
                            )}
                        </div>
                        <div className="comment-reactions no-padding">
                            <ul>
                                <li>
                                   <span> <b className="reaction-btn" style={c_reaction === true ? {color:"blue"}:{color:"black"}} onClick={(e) => likeComment(e) }>  <i className="fas fa-heart" aria-hidden="true"></i> {likedcount} </b></span>
                                </li>
                                <li>
                                    <b className="reaction-btn" style={c_reaction === false ? {color:"blue"}:{color:"black"}} onClick={(e) => dislikeComment(e) }> <i className="fas fa-heart-broken" aria-hidden="true"></i> {dislikedcount} </b>
                                </li>
                                <li>
                                    <span onClick={(e) => setShowReplyInput(!showReplyInput)} className="reaction-btn">
                                        <b> Reply </b>
                                    </span>                                   
                                </li>
                            </ul>
                            {showReplyInput &&
                                <div>
                                    <input className="input is-small" onChange={e => makeReply(e.target.value)} value={reply} type="text" placeholder="Reply to Comment"/>
                                    {" "}
                                    <button onClick={(e) => sendReply(e)} className="button is-small"> Reply </button>
                                    <br/>
                                </div>
                            }
                            
                            {replies && replies.length > 0 && 
                                <div>
                                    <span onClick={(e) => setShowReplies(!showReplies)} className="reaction-btn">
                                        <b>View Replies</b>
                                    </span>
                                    <b> <i className="fas fa-comment"></i> {threadcount} </b>
                                    <br/>
                                </div>
                            }
                            <br/>
                            {showReplies &&
                                <div className="replies">
                                    {replies && replies.length > 0 ? 
                                        (
                                            replies.map( (reply, index) => (
                                                <Reply comment={comment} reply={reply} index={index} />
                                            ))
                                        ):(
                                            <>
                                            </>
                                        )
                                    }
                                </div>
                            }
                        </div>
                    </div>
                    {user_id === comment.user_id &&
                        <div className="column is-full-mobile is-2 has-text-centered">
                            <div className="comment-controls">
                                <div className="dropdown is-right is-hoverable">
                                    <div className="dropdown-trigger">
                                        <button className="button is-small is-info" aria-haspopup="true" aria-controls="dropdown-menu4">
                                            <span className="icon is-small">
                                                <b> <i className="fas fa-filter"></i> </b>
                                            </span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu4" role="menu">
                                        <div className="dropdown-content">
                                            <span className="dropdown-item">
                                            <span onClick={(e) => setShowEditInput(!showEditInput)} className="reaction-btn"><b>Edit</b></span>
                                            </span>
                                            <span className="dropdown-item">
                                            <span onClick={e => openModal(e)} className="reaction-btn"><b>Delete</b></span>
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <Modal 
                                    isOpen={modalIsOpen}
                                    onRequestClose={ e => closeModal(e)}
                                    style={customStyles}>
                                        
                                    <div className="hero" style={{width:"100%"}}>
                                        <br />
                                        <span style={{margin:"0 auto"}}>Delete Comment Permanently ?</span>
                                        <br />  
                                        <ul className="delete-controls">
                                            <li>
                                                <button style={{margin:"0 auto",padding:"1rem"}} className="button is-success is-link is-medium is-rounded" onClick={e => deleteComment(e)}>   
                                                    <span>Yes</span>
                                                </button>
                                            </li>
                                            <li>
                                                <button style={{margin:"0 auto",padding:"1rem"}} className="button is-warning is-link is-medium is-rounded" onClick={e => closeModal(e)}>   
                                                    <span>No</span>
                                                </button>
                                            </li>
                                        </ul>
                                    </div>
                                </Modal>
                            </div>
                        </div>
                    }
                </>
            ):(
                <div>
                    Comment was deleted.
                </div>
            )}
        </div>
    
    )
}

export default withContext(Comment);