import React, {useState, useEffect} from "react";
import withContext from "../../withContext";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import axios from "axios";
import Comment from "../Timeline/Comment";


const TrendyControls = props => {

    const {operation} = props;
    const {details} = props;
    //const {showComments} = props;

    const [comment, makeComment] = useState("");
    const [comments, setComments] = useState([]);
    const showComments = true;

    useEffect( () => {
        if(operation === "view"){
            const pree_id = details.pree_id;

            const getComments = axios.post("/api/get-comments", {pree_id}).then(
            (getComments) => {
                    if (getComments.status === 200){
                        setComments(getComments.data.comments);
                    }else{
                    throw new Error("No comments available.");
                    } 
            } 
            );
        }

    },[details, operation,comment]);


    const sendComment = (e) => {
        const user_id = props.context.user.id;
        const pree_id = details.pree_id;
        const send = axios.post("/api/handle-comments", {user_id, pree_id, comment}).then(
            (send) => {
                if (send.status === 200){
                    //console.log(send.data.comment);
                    setComments([...comments, send.data.comment]);
                    props.setCommentsCount(send.data.comment_num);
                    makeComment("");
                }else{
                    throw new Error("Error while make comments.");
                }
            }
        )
        //e.preventDefault();
    }

    return (
        <div className="hero">
            <div id="music-controls-container" className="music-controls-container">
                <div className="music-controls">
                    <article className="message">
                        <Tabs>
                            <div className="message-header no-padding">
                                <TabList className="is-fullwidth">
                                    <Tab>Comments</Tab>
                                    <Tab>Similar</Tab>
                                </TabList>
                            </div>
                            <div className="message-body no-padding">
                                <TabPanel>
                                    {operation === "upload" || operation === "edit" ?
                                        (
                                            <h1>Comments Settings</h1>
                                        ):(
                                            <div className="container">
                                                {showComments &&
                                                <div className="pree-comments">
                                                    <div className="make-comment">
                                                        <input className="input" onChange={e => makeComment(e.target.value)} value={comment} type="text" placeholder="Enter Comment"/>
                                                    </div>
                                                    <br />
                                                    <div className="hero">
                                                        <div className="comments-control">
                                                            <button onClick={e => sendComment(e)} className="button is-success is-pulled-left">
                                                                Make Comment &nbsp; <i className="fas fa-share"></i>
                                                            </button>
                                                            <div className="dropdown is-hoverable is-pulled-right">
                                                                <div className="dropdown-trigger">
                                                                    <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                                                                        <span>Filter Comments</span>
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
                                                            comments.map((aComment, index) => (
                                                                <div key={index} className="box comment-box">
                                                                    <Comment aPree={details} comment={aComment} />
                                                                </div>
                                                                )   
                                                            ):(
                                                                <div className="box">
                                                                    No Comments.  
                                                                </div>
                                                            )
                                                        }
                                                        <br/>
                                                    </div>
                                                 
                                                </div>
                                            }

                                            </div>
                                        )
                                    }
                                </TabPanel>
                                <TabPanel>
                                    {operation === "upload" || operation === "edit" ?
                                        (
                                            <h1>Similar Settings</h1>
                                        ):(
                                            <h1>Similar Exclusives</h1>
                                        )
                                    }
                                    
                                </TabPanel>
                            </div>
                        </Tabs>
                    </article>
                </div>
            </div>
        </div>
    )
}
export default withContext(TrendyControls);