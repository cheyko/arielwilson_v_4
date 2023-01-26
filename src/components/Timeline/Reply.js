import React, {useState} from "react";
import withContext from "../../withContext";
import axios from "axios";
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

const Reply = props => {

    const {reply} = props;
    const {comment} = props;
    const {index} = props;
    const user_id = props.context ? props.context.user.id : 0;
    const reply_id = reply.reply_id;
    const [replyStatus, setStatus] = useState(true);
    const [likedcount, setLikes] = useState(reply.r_approvals);
    const [dislikedcount, setDislikes] = useState(reply.r_disapprovals);
    const [r_reaction, setRReaction] = useState(null);
    //const [editreply, editReply] = useState("");
    const [showEditReply, setShowEditReply] = useState(false);
    const [modalIsOpen, setModalOpen] = useState(false);

    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setModalOpen(false);
    }

    const likeReply = (e) => {
        if (r_reaction !== true){
            const addlike = axios.post("/api/like-reply",{user_id,reply_id}).then(
                (addlike) => {
                    if (addlike.status === 200){
                        setRReaction(true);
                        setLikes(addlike.data.likedcount);
                        setDislikes(addlike.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Reply");
                    }
                }
            )
        }else{
            const unlike = axios.put("/api/like-reply",{user_id,reply_id}).then(
                (unlike) => {
                    if (unlike.status === 200){
                        setRReaction(null);
                        setLikes(unlike.data.likedcount);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }
    }

    const dislikeReply = (e) => {
        if (r_reaction !== false){
            const dislike = axios.post("/api/dislike-reply",{user_id,reply_id}).then(
                (dislike) => {
                    if (dislike.status === 200){
                        setRReaction(false);
                        setLikes(dislike.data.likedcount);
                        setDislikes(dislike.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }else{
            const undislike = axios.put("/api/dislike-reply",{user_id,reply_id}).then(
                (undislike) => {
                    if (undislike.status === 200){
                        setRReaction(null);
                        setDislikes(undislike.data.dislikedcount);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            )
        }
    }

    const deleteReply = (e) => {
        const comment_id = comment.comment_id;
        const remove = axios.post("/api/delete-reply", {comment_id, reply_id}).then(
            (remove) => {
                if (remove.status === 200){
                    setStatus(false);
                }else{
                    throw new Error("Error while make comments.");
                }
            }
        )
    }

    /*const saveEditReply = (e) => {
        const user_id = props.context.user.id;
        const save = axios.put("/api/handle-replies", {user_id, comment_id, editcomment}).then(
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
    }*/


    return(
        <>
            <div key={index} className="reply">
                {replyStatus ? (
                    <>
                        <div className="columns">
                            <div className="column is-2">
                                <figure className="display-pic image is-32x32">
                                    <img alt="display" className="is-rounded" src={process.env.PUBLIC_URL + "/images/test_image.jpg"} />
                                </figure>
                            </div>
                            <div className="column is-9">
                                {showEditReply ? (
                                    <div className="edit-comment">
                                        {/*<input className="input is-small" style={{width:"80%"}} onChange={e => editReply(e.target.value)} value={editReply(reply)} type="text" />
                                        {" "}
                                        <button onClick={(e) => saveEditReply(e)} className="button is-small"> Save </button>
                                        */}
                                    </div>
                                ):(
                                    <div>
                                        <div className="the-comment">
                                            <small>{reply.user_id}</small> {reply.reply_text} 
                                        </div>
                                        <div className="reply-reactions">
                                            <ul>
                                                <li>
                                                    <b className="reaction-btn" style={r_reaction === true ? {color:"blue"}:{color:"black"}} onClick={(e) => likeReply(e) }>  
                                                        <i className="fas fa-heart" aria-hidden="true"></i> {likedcount} 
                                                    </b>
                                                </li>
                                                <li>
                                                    <b className="reaction-btn" style={r_reaction === false ? {color:"blue"}:{color:"black"}} onClick={(e) => dislikeReply(e) }> 
                                                        <i className="fas fa-heart-broken" aria-hidden="true"></i> {dislikedcount} 
                                                    </b>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                )}                                                          
                            </div>
                            {user_id === reply.user_id &&
                                <div className="column is-1">
                                    <div className="comment-controls">
                                        <div className="dropdown is-right is-hoverable">
                                            <div className="dropdown-trigger">
                                                <button className="button is-small is-info" aria-haspopup="true" aria-controls="dropdown-menu5">
                                                    <span className="icon is-small">
                                                        <b> <i className="fas fa-filter"></i> </b>
                                                    </span>
                                                </button>
                                            </div>
                                            <div className="dropdown-menu" id="dropdown-menu5" role="menu">
                                                <div className="dropdown-content">
                                                    {/*<span className="dropdown-item">
                                                    <span onClick={(e) => setShowEditReply(!showEditReply)} className="reaction-btn"><b>Edit</b></span>
                                                    </span>*/}
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
                                                <span style={{margin:"0 auto"}}>Delete Reply Permanently ?</span>
                                                <br />  
                                                <ul className="delete-controls">
                                                    <li>
                                                        <button style={{margin:"0 auto",padding:"1rem"}} className="button is-success is-link is-medium is-rounded" onClick={e => deleteReply(e,reply.reply_id)}>   
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
                        </div>
                    </>
                ):(
                    <div>
                        Reply was deleted.
                    </div>
                )}
            </div>
            
        </>
    )
}

export default withContext(Reply);