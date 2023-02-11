import React, { useState, useEffect, useRef } from "react";
import withContext from "../../withContext";
import axios from "axios";
import NewConvo from "./NewConvo";

const Messaging = props => {

    let {id} = props;
    let {userview} = props;
    let {user_id} = props;
    let {convo} = props;

    const endOfMessages = useRef(null);

    const [modalIsOpen, setModalOpen] = useState(false);

    useEffect(() => {
        
        if(id > 0){
            if(convo.length > 0){
                endOfMessages.current.scrollIntoView({ behavior: "smooth" });
            }        
        }
    },[id, convo]);

    const getDateTime = () => {
        const orignal = new Date();
        const isoVal = orignal.toISOString();
        const result = isoVal.split('T')[0]+" "+(isoVal.split('T')[1]).split('Z')[0];
        return result;
    }


    function getFullTime(aTime){
        if (aTime.getHours() < 12){
            return aTime.getHours() + ":" + aTime.getMinutes() + "am";
        }else if (aTime.getHours() === 12){
            return aTime.getHours() + ":" + aTime.getMinutes() + "pm"
        }else{
            return aTime.getHours() % 12 + ":" + aTime.getMinutes() + "pm"
        }
    }

    function formatTime(param){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var now = new Date();
        var before = new Date(param);
        var seconds = (now.getTime() - before.getTime())/1000;
        let answer;
        if (seconds < 60){
            answer = Math.round(seconds) + (Math.round(seconds) > 1 ? " secs ago" : " sec ago");
        }else if(seconds > 60 && seconds < 3600){
            answer = Math.round(seconds / 60) + (Math.round(seconds / 60) > 1 ? " mins ago" : " min ago");
        }else if(seconds > 3600 && seconds < 86400){
            answer = Math.round(seconds / 3600) + ( Math.round(seconds / 3600) > 1 ?  " hrs ago" : " hr ago" );
        }else{
            answer = months[before.getMonth()] + " " + before.getDate() + " at " + getFullTime(before); 
        }
        return answer;
    }

    
    const sendMessage = async(e) => {
        e.preventDefault();
        var theMsg = document.getElementById("new-message").textContent;
        var theDate = getDateTime();
        const userview_id = id;

        console.log(theMsg);
        axios.post('/api/create-message',{user_id,userview_id,theMsg,theDate}).then(
            (createMsg) => {
                if (createMsg.status !== 200){
                    throw new Error('Message was not sent succesfully.');
                }else{
                    console.log('Message was sent succesfully.');
                    document.getElementById("new-message").textContent = "";
                    //add message to exisiting convo
                    props.context.getConvo(userview_id).then(
                        (updateConvo) => {
                            if(!updateConvo){
                                throw new Error('There was an error when getting convo');
                            }else{
                                props.setConvo(updateConvo);
                            }
                        }
                    );
                }
            }
        );

        props.context.setRecent(userview_id);
    }

    return (
        <div className="container">
            <div id="messages-view" className="is-centered">
                <br />
                <div id="message-app" className="msg-section">
                    <div className="message-app-container">
                        {id > 0 && userview? 
                        (<>
                            <div key={userview} id="convo-header">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-64x64">
                                            <img className="is-rounded" src="https://bulma.io/images/placeholders/64x64.png" alt="display" />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4"> {userview.firstname} {" "} {userview.lastname} <span className="subtitle is-6"> @{userview.username}</span></p>
                                        <p className="subtitle is-6"> #{userview.tagline}</p>
                                    </div>
                                </div>
                            </div>

                            <div id="convo">
                                <div id="inside-convo" className="inside-convo">
                                    <ul id="convo-msgs" className="convo-msgs">
                                        {convo && convo.length > 0 ? (
                                            <>
                                            {convo.map((aMsg,index) => (
                                                <li className={`box ${aMsg.sender_id === user_id ? "msg-span-send" : "msg-span-rcve"}`} key={index}>
                                                    <small className="sent-date">{formatTime(aMsg.sent_date)}</small>
                                                    <br />
                                                    <small></small>

                                                    <div style={{position:"relative"}}>
                                                        <p>{aMsg.message_content}</p>
                                                    </div>
                                                </li>   
                                            ))}
                                            <li style={{float:"left"}} ref={endOfMessages}></li>
                                            </>
                                        ):(
                                            <div className="box">
                                                <p className="text is-info"> No Message sent yet in this Convo</p>
                                            </div>
                                        )}
                                        
                                    </ul>
                                </div>
                            </div>

                            <div id="create-message" className="columns is-mobile ">
                                <div className="column icon is-normal has-text-centered no-padding" style={{fontSize:"x-large"}}> <i className="far fa-grin"></i> </div>
                                <div className="column is-10"> <span id="new-message" className="new-message textarea" role="textbox" contentEditable placeholder="Enter new message"></span> </div>
                                <div className="column icon is-normal has-text-centered no-padding" style={{fontSize:"x-large"}}> <i id="send-btn" onClick={e => sendMessage(e)} className="fas fa-paper-plane"></i> </div>
                            </div>
                        </>
                        ):(
                            <div className="new-message-ad">
                                <div className="hero">
                                    <div className="msg-ad-container">
                                        <article className="message is-info">
                                            <div className="message-header">
                                                <p>W@H GW@@N M-A</p>
                                                <button className="info" aria-label="info"></button>
                                            </div>
                                            <div className="message-body">
                                                <h1 className="title">
                                                    Welcome to W@H GW@@N Messaging App
                                                </h1>
                                                <p className="info">
                                                    No Conversation selected.
                                                </p>  
                                                <br />  
                                                <p className="info">
                                                    Click on one of your exisitng conversations inside convos or
                                                    Begin a new Convo.
                                                </p>
                                                <br />
                                                <div>
                                                    <NewConvo modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
                                                    <button onClick={e => setModalOpen(true)} className="button is-link is-normal">
                                                        Start New Convo
                                                    </button>
                                                </div>
                                            </div>
                                        </article>
                                    </div>
                                </div>
                            </div>
                        )}                            
                    </div>
                </div>
                <br />
            </div>
        </div>
    );
}

export default withContext(Messaging);