import React from "react";
import withContext from "../../withContext";
import { Link } from "react-router-dom";
//import NewConvo from "./NewConvo";

const Convos = props => {

    let {convos} = props;

    const loadConvo = async(user) => {
        props.context.getConvo(user.username).then(
            (convoMsgs) => {
                if(!convoMsgs){
                    throw new Error('There was an error when getting convo');
                }else{
                    props.setConvo(convoMsgs);
                }
            }
        );

        props.setUserview(user);

    }

    return (
        <div className="timeline-container">
            <div id="messages-view">
                <div id="message-list" className="msg-section">
                    <div className="messages-div">
                        {convos && convos.length > 0 ? 
                        (
                            convos.map((convo, index) => (
                                <Link key={index} className="convo-link" onClick={(e) => {loadConvo(convo.attachment);props.setTab("message");localStorage.setItem("msg-view","message"); }} to={`/message/user/${convo.attachment.username}`}>
                                    <article className="media">
                                        <figure className="media-left">
                                            <small>31m</small>
                                            <p className="image is-64x64">
                                                <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                            </p>
                                            
                                        </figure>
                                        <div className="media-content">
                                            <div className="content">
                                                <p>
                                                    <strong>{convo.attachment.displayname}</strong> <small>@{convo.attachment.username}</small> 
                                                    <br />
                                                    <small style={{textDecoration:"underline"}}> #{convo.attachment.tagline} </small> 
                                                    <br />
                                                    <strong>
                                                        {convo.attachment.metrics === "sent" ? "You : " : convo.attachment.username + " : "}  
                                                    </strong>
                                                    {" "}
                                                    <span>
                                                        {convo.message_content}
                                                    </span>
                                                </p>
                                            </div>
                                        </div>
                                    </article> 
                                    <hr className="h-line"/> 
                                </Link>
                            ))
                        ):(
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <span>
                                                You have no prior conversations, Click Start New Convo
                                                to communicate with your fellow W@H GW@@N Users.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        )}
                    </div>
                </div>
            </div>
        </div>
                                
    );
}

export default withContext(Convos);