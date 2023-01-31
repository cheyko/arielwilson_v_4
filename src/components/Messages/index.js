import React, { useState ,useEffect } from "react";
import './index.css';
import withContext from "../../withContext";
import axios from 'axios';
import $ from 'jquery';
import {Link, useParams} from "react-router-dom";

const Messages = props => {

    const user_id = props.context.user ? props.context.user.id : 0;
    let {id} = useParams();
    let {catergory} = useParams();
    let {msgtype} = useParams();

    const [userview, setUserview] = useState("");
    const [convo, setConvo] = useState([]);
    const [count, setCount] = useState(0);

    const [convoView, setConvoView] = useState([]);

    const allmessages = props.context.messages ? props.context.messages : []; 
    const people = props.context.viewlist ? props.context.viewlist : [];
    const [showMore, setShowMore] = useState(false);
    const [tab, setTab] = useState("convos");

    useEffect((convo) => {
        console.log("Testing");
        let interval = null;
        let convoMsgs = null;
        const userview_id = id;

        if (userview_id !== '0'){
            if (userview === ""){
                const result = props.context.getUserView(userview_id).then(
                    (result) => {
                        if (!result){
                            throw new Error("there was an error when search for my details");
                        }else{
                            setUserview(result);
                        }
                    }
                );
                convoMsgs = props.context.getConvo(userview_id).then(
                    (convoMsgs) => {
                        if(!convoMsgs){
                            throw new Error('There was an error when getting convo');
                        }else{
                            setConvo(convoMsgs);
                        }
                    }
                );
                props.context.setRecent(userview_id);

            }else{
                if (count < 1){
                    interval = setInterval(() => {
                        convoMsgs = props.context.getConvo(userview_id).then(
                            (convoMsgs) => {
                                if(!convoMsgs){
                                    throw new Error('There was an error when getting convo');
                                }else{
                                    setConvo(convoMsgs);
                                }
                            }
                        );
                         
                        setCount(count => count + 1);
                    }, 10000);  
                    //$('#convo-msgs').scrollTop($('#convo-msgs')[0].scrollHeight); 
                }
                return () => clearInterval(interval);
            }
        }else{
            props.context.getMessages(user_id);
        }
    },[count, userview, id, convo, setConvo]);
    
    const getLastMsg = (person) => {
        const result = allmessages.filter((msg) => msg.sender_id === person.user_id || msg.receiver_id === person.user_id);
        return result[result.length - 1];
    }

    const getDateTime = () => {
        const orignal = new Date();
        const isoVal = orignal.toISOString();
        const result = isoVal.split('T')[0]+" "+(isoVal.split('T')[1]).split('Z')[0];
        return result;
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

    function getFullTime(aTime){
        if (aTime.getHours() < 12){
            return aTime.getHours() + ":" + aTime.getMinutes() + "am";
        }else if (aTime.getHours() === 12){
            return aTime.getHours() + ":" + aTime.getMinutes() + "pm"
        }else{
            return aTime.getHours() % 12 + ":" + aTime.getMinutes() + "pm"
        }
    }

    const loadConvo = async(e, theID) => {
        const userview_id = theID;
        const result = props.context.getUserView(userview_id).then(
            (result) => {
                if (!result){
                    throw new Error("there was an error when search for my details");
                }else{
                    setUserview(result);
                }
            }
        );
        let convoMsgs = props.context.getConvo(userview_id).then(
            (convoMsgs) => {
                if(!convoMsgs){
                    throw new Error('There was an error when getting convo');
                }else{
                    setConvo(convoMsgs);
                }
            }
        );
        //const heightVal = $('#convo-msgs')[0] ? $('#convo-msgs')[0].scrollHeight : 0;
        //$('#convo-msgs').scrollTop(heightVal);
        props.context.setRecent(userview_id); //get recent from database.
    }

    const sendMessage = async(e) => {
        e.preventDefault();
        var theMsg = document.getElementById("new-message").textContent;
        var theDate = getDateTime();
        const userview_id = id;

        console.log(theMsg);
        const createMsg = axios.post('/api/create-message',{user_id,userview_id,theMsg,theDate}).then(
            (createMsg) => {
                if (createMsg.status !== 200){
                    throw new Error('Message was not sent succesfully.');
                }else{
                    console.log('Message was sent succesfully.');
                    document.getElementById("new-message").textContent = "";
                    //add message to exisiting convo
                    const updateConvo = props.context.getConvo(userview_id).then(
                        (updateConvo) => {
                            if(!updateConvo){
                                throw new Error('There was an error when getting convo');
                            }else{
                                setConvo(updateConvo);
                            }
                        }
                    );
                }
            }
        );

        props.context.setRecent(userview_id);
    }

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return(
        <div className="hero">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="subtitle"><b>W@H GW@@N !!! </b></h1>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <small>sections</small>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <a className="navbar-item">
                            Home
                        </a>

                        <a className="navbar-item">
                            Documentation
                        </a>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <a className="navbar-link" onClick={e => setShowMore(!showMore)}>
                                More
                            </a>

                            <div className="navbar-dropdown" style={showMore ? {display: "block"} : {display: "none"}}>
                                <a className="navbar-item">
                                    About
                                </a>
                                <a className="navbar-item">
                                    Jobs
                                </a>
                                <a className="navbar-item">
                                    Contact
                                </a>
                                <hr className="navbar-divider" />
                                <a className="navbar-item">
                                    Report an issue
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
            <div className="page-content">
                <div className="container">
                    <div className="message">
                        <div className="message-header">
                            <div className="tabs is-boxed is-fullwidth">  
                                <ul>
                                    <li className={`button ${tab === "message" ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            setTab("message");
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-paper-plane" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> MESSAGE-APP </span>
                                        </span>
                                    </li>
                                    <li className={`button ${tab === "convos" ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            setTab("convos");
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-clipboard-list" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> CONVOS </span>
                                        </span>
                                    </li>
                                                
                                    <li className={`button ${tab === "wg-mail" ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            setTab("wg-mail"); 
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-vote-yea" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> WG-MAIL </span>
                                        </span>
                                    </li>

                                    <li className={`button ${tab === "happenings" ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            setTab("happenings");
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-truck" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> HAPPENINGS </span>
                                        </span>
                                    </li>

                                    <li className={`button ${tab === "mentions" ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            setTab("mentions");
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-poll" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> MENTIONS </span>
                                        </span>
                                    </li>  

                                    <li className={`button ${tab === "recommendations" ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            setTab("recommendations");
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-poll" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> RECOMMENDATIONS </span>
                                        </span>
                                    </li>               
                                </ul>
                            </div>
                        </div>
                        <div className="message-body no-padding no-margin">
                            {tab === "message" && 
                                <div className="container">
                                    <div id="messages-view" className="is-centered">
                                        <br />
                                        <div id="message-app" className="msg-section">
                                            <div className="message-app-container">
                                                {id > 0 ? 
                                                (<>
                                                    <div id="convo-header">
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
                                                                    convo.map((aMsg,index) => (
                                                                        <li className={`box ${aMsg.sender_id === user_id ? "msg-span-send" : "msg-span-rcve"}`} key={index}>
                                                                            <small className="sent-date">{formatTime(aMsg.sent_date)}</small>
                                                                            <br />
                                                                            <small></small>

                                                                            <div style={{position:"relative"}}>
                                                                                <p>{aMsg.message_content}</p>
                                                                            </div>
                                                                        </li>   
                                                                    ))
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
                                                                            Click on one of your exisitng conversations or
                                                                            Begin a new Convo.
                                                                        </p>
                                                                        <br />
                                                                        <p>
                                                                            <button className="button is-link is-normal">
                                                                                Start New Convo
                                                                            </button>
                                                                        </p>
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
                                
                            }
                            {tab === "convos" && 
                                <div className="container">
                                    <div id="messages-view" className="columns is-mobile is-multiline">
                                        <div id="message-list" className="msg-section column">
                                            <div className="message-tabs">
                                                <div className="message-tabs-container">
                                                    <div className="sub-tabs tabs card is-centered">
                                                        <ul>
                                                            <li className="is-active">
                                                                <span className="button reaction-btn is-active">
                                                                    <span className="icon is-small"><i className="fas fa-inbox" aria-hidden="true"></i></span>
                                                                    <span>All</span> &nbsp; &nbsp;
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="button reaction-btn">
                                                                    <span className="icon is-small"><i className="fas fa-user" aria-hidden="true"></i></span>
                                                                    <span>Tête-à-Tête</span> &nbsp; &nbsp;
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="button reaction-btn">
                                                                    <span className="icon is-small"><i className="fas fa-users" aria-hidden="true"></i></span>
                                                                    <span>Group</span> &nbsp; &nbsp;
                                                                </span>
                                                            </li>
                                                            <li>
                                                                <span className="button reaction-btn">
                                                                    <span className="icon is-small"><i className="fas fa-plus" aria-hidden="true"></i></span>
                                                                    <span>New</span> &nbsp; &nbsp;
                                                                </span>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="messages-div">
                                                {people && people.length > 0 ? 
                                                (
                                                    people.map((person, index) => (
                                                        <Link className="convo-link" onClick={(e) => { loadConvo(e,person.user_id);setTab("message"); }} to={`/messages/convo/direct/${person.user_id}`}>
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
                                                                            <strong>{person.firstname} {" "} {person.lastname}</strong> <small>@{person.username}</small> 
                                                                            <br />
                                                                            <small style={{textDecoration:"underline"}}> #{person.tagline} </small> 
                                                                            <br />
                                                                            <strong>
                                                                                {getLastMsg(person).sender_id === user_id ? "You : " : person.username + " : "}  
                                                                            </strong>
                                                                            {" "}
                                                                            <span>
                                                                                {getLastMsg(person).message_content}
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
                                                {/*
                                                <article className="media">
                                                    <figure className="media-left">
                                                        <small>31m</small>
                                                        <p className="image is-64x64">
                                                            <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                                        </p>
                                                        <small>@johnsmith</small> 
                                                    </figure>
                                                    <div className="media-content">
                                                        <div className="content">
                                                            <p>
                                                                <strong>John Smith</strong> <small>Tagline ....... </small> 
                                                                <br />
                                                                <strong>
                                                                    Last Sender : 
                                                                </strong>
                                                                {" "}
                                                                <span>
                                                                Lorem ipsum dolor sit amet, 
                                                                consectetur adipiscing elit. Proin ornare magna eros, 
                                                                eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                                                Etiam finibus odio quis feugiat facilisis.
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </article>
                                                <article className="media">
                                                    <figure className="media-left">
                                                        <small>31m</small>
                                                        <p className="image is-64x64">
                                                            <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                                        </p>
                                                        <small>@Random</small> 
                                                    </figure>
                                                    <div className="media-content">
                                                        <div className="content">
                                                            <p>
                                                                <strong>Random Group </strong> <small> Tagline ....... </small> 
                                                                <br />
                                                                <strong>
                                                                    Last Sender : 
                                                                </strong>
                                                                {" "}
                                                                <span>
                                                                    Lorem ipsum dolor sit amet, 
                                                                    consectetur adipiscing elit. Proin ornare magna eros, 
                                                                    eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                                                    Etiam finibus odio quis feugiat facilisis.
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </article>
                                                <article className="media">
                                                    <figure className="media-left">
                                                        <small>31m</small>
                                                        <p className="image is-64x64">
                                                            <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                                        </p>
                                                        <small>@johnsmith</small> 
                                                    </figure>
                                                    <div className="media-content">
                                                        <div className="content">
                                                            <p>
                                                                <strong>John Smith</strong> <small>Tagline ....... </small> 
                                                                <br />
                                                                <strong>
                                                                    Last Sender : 
                                                                </strong>
                                                                {" "}
                                                                <span>
                                                                Lorem ipsum dolor sit amet, 
                                                                consectetur adipiscing elit. Proin ornare magna eros, 
                                                                eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                                                Etiam finibus odio quis feugiat facilisis.
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </article>
                                                <article className="media">
                                                    <figure className="media-left">
                                                        <small>31m</small>
                                                        <p className="image is-64x64">
                                                            <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                                        </p>
                                                        <small>@Random</small> 
                                                    </figure>
                                                    <div className="media-content">
                                                        <div className="content">
                                                            <p>
                                                                <strong>Random Group </strong> <small> Tagline ....... </small> 
                                                                <br />
                                                                <strong>
                                                                    Last Sender : 
                                                                </strong>
                                                                {" "}
                                                                <span>
                                                                    Lorem ipsum dolor sit amet, 
                                                                    consectetur adipiscing elit. Proin ornare magna eros, 
                                                                    eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                                                    Etiam finibus odio quis feugiat facilisis.
                                                                </span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </article>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                            }
                            {tab === "wg-mail" &&
                                <div className="hero-body">
                                    
                                    <h1> WG-MAIL </h1> 
                                </div>
                            }
                            {tab === "happenings" &&
                                <div className="hero-body">
                                    
                                    <h1> HAPPENINGS </h1> 
                                </div>
                            }
                            {tab === "mentions" &&
                                <div className="hero-body">
                                    
                                    <h1> MENTIONS </h1> 
                                </div>
                            }
                            {tab === "recommendations" &&
                                <div className="hero-body">
                                
                                    <h1> RECOMMENDATIONS </h1> 
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    )
    /*return(
        <div className="hero">
            <div className="container" style={{padding:0}}>
                <div className="wgr-box">
                    <div className="tabs-header wgr-tabs">                      
                        <div className="card box-bg header-container">
                            <div className="has-text-centered">
                                <h1 className="custom-heading subtitle"><b> W@@GW@@N !!! </b></h1>
                            </div>
                            <div className="tabs-bg custom-tabs tabs is-centered card">
                                <ul style={{margin:"0 auto"}}>
                                    <li className="button tabs-btn is-active">
                                
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}}  className="fas fa-comments" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> CONVOS </span> 
                                    </span>
                                
                                    </li>
                                    <li className="button is-not-active">
                                
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-mail-bulk" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> WG-MAIL </span>  
                                    </span>
                                    
                                    </li>
                                    <li className="button tabs-btn is-not-active">
                                
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-bell" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> HAPPENINGS </span> 
                                    </span>
                                
                                    </li>
                                    <li className="button is-not-active">
                                
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-at" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> MENTIONS </span>  
                                    </span>
                                    
                                    </li>
                                    <li className="button is-not-active">
                                    
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-clipboard-list" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> RECOMMENDATIONS </span> 
                                    </span>
                                    
                                    </li>

                                    
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                <div id="messages-view" className="columns">
                    
                    <div id="message-app" className="msg-section column">
                        <div className="message-app-container">
                            {id > 0 ? 
                            (<>
                                <div id="convo-header">
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
                                                convo.map((aMsg,index) => (
                                                    <li className={`box ${aMsg.sender_id === user_id ? "msg-span-send" : "msg-span-rcve"}`} key={index}>
                                                        <small className="sent-date">{formatTime(aMsg.sent_date)}</small>
                                                        <br />
                                                        <small></small>

                                                        <div style={{position:"relative"}}>
                                                            <p>{aMsg.message_content}</p>
                                                        </div>
                                                    </li>   
                                                ))
                                            ):(
                                                <div className="box">
                                                    <p className="text is-info"> No Message sent yet in this Convo</p>
                                                </div>
                                            )}
                                        </ul>
                                    </div>
                                </div>

                                <div id="create-message" className="columns">
                                    <div className="column icon is-large" style={{fontSize:"x-large"}}> <i className="far fa-grin"></i> </div>
                                    <div className="column is-four-fifths"> <span id="new-message" className="new-message textarea" role="textbox" contentEditable placeholder="Enter new message"></span> </div>
                                    <div className="column icon is-large" style={{fontSize:"x-large"}}> <i id="send-btn" onClick={e => sendMessage(e)} className="fas fa-paper-plane"></i> </div>
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
                                                        Click on one of your exisitng conversations or
                                                        Begin a new Convo.
                                                    </p>
                                                    <br />
                                                    <p>
                                                        <button className="button is-link is-normal">
                                                            Start New Convo
                                                        </button>
                                                    </p>
                                                </div>
                                            </article>
                                        </div>
                                    </div>
                                </div>
                            )}                            
                        </div>
                    </div>

                    <div id="message-list" className="msg-section column">
                        <div className="message-tabs">
                            <div className="message-tabs-container">
                                <div className="sub-tabs tabs card is-centered">
                                    <ul>
                                        <li className="is-active">
                                            <span className="reaction-btn">
                                                <span className="icon is-small"><i className="fas fa-inbox" aria-hidden="true"></i></span>
                                                <span>All</span> &nbsp; &nbsp;
                                            </span>
                                            </li>
                                            <li>
                                            <span className="reaction-btn">
                                                <span className="icon is-small"><i className="fas fa-user" aria-hidden="true"></i></span>
                                                <span>Tête-à-Tête</span> &nbsp; &nbsp;
                                            </span>
                                            </li>
                                            <li>
                                            <span className="reaction-btn">
                                                <span className="icon is-small"><i className="fas fa-users" aria-hidden="true"></i></span>
                                                <span>Group</span> &nbsp; &nbsp;
                                            </span>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="messages-div">
                            {people && people.length > 0 ? 
                            (
                                people.map((person, index) => (
                                    <Link className="convo-link" onClick={(e) => loadConvo(e,person.user_id)} to={`/messages/convo/direct/${person.user_id}`}>
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
                                                        <strong>{person.firstname} {" "} {person.lastname}</strong> <small>@{person.username}</small> 
                                                        <br />
                                                        <small style={{textDecoration:"underline"}}> #{person.tagline} </small> 
                                                        <br />
                                                        <strong>
                                                            {getLastMsg(person).sender_id === user_id ? "You : " : person.username + " : "}  
                                                        </strong>
                                                        {" "}
                                                        <span>
                                                            {getLastMsg(person).message_content}
                                                        </span>
                                                    </p>
                                                </div>
                                            </div>
                                        </article>  
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

                            <article className="media">
                                <figure className="media-left">
                                    <small>31m</small>
                                    <p className="image is-64x64">
                                        <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    </p>
                                    <small>@johnsmith</small> 
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <strong>John Smith</strong> <small>Tagline ....... </small> 
                                            <br />
                                            <strong>
                                                Last Sender : 
                                            </strong>
                                            {" "}
                                            <span>
                                            Lorem ipsum dolor sit amet, 
                                            consectetur adipiscing elit. Proin ornare magna eros, 
                                            eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                            Etiam finibus odio quis feugiat facilisis.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article className="media">
                                <figure className="media-left">
                                    <small>31m</small>
                                    <p className="image is-64x64">
                                        <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    </p>
                                    <small>@Random</small> 
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <strong>Random Group </strong> <small> Tagline ....... </small> 
                                            <br />
                                            <strong>
                                                Last Sender : 
                                            </strong>
                                            {" "}
                                            <span>
                                                Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Proin ornare magna eros, 
                                                eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                                Etiam finibus odio quis feugiat facilisis.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article className="media">
                                <figure className="media-left">
                                    <small>31m</small>
                                    <p className="image is-64x64">
                                        <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    </p>
                                    <small>@johnsmith</small> 
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <strong>John Smith</strong> <small>Tagline ....... </small> 
                                            <br />
                                            <strong>
                                                Last Sender : 
                                            </strong>
                                            {" "}
                                            <span>
                                            Lorem ipsum dolor sit amet, 
                                            consectetur adipiscing elit. Proin ornare magna eros, 
                                            eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                            Etiam finibus odio quis feugiat facilisis.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                            <article className="media">
                                <figure className="media-left">
                                    <small>31m</small>
                                    <p className="image is-64x64">
                                        <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                    </p>
                                    <small>@Random</small> 
                                </figure>
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <strong>Random Group </strong> <small> Tagline ....... </small> 
                                            <br />
                                            <strong>
                                                Last Sender : 
                                            </strong>
                                            {" "}
                                            <span>
                                                Lorem ipsum dolor sit amet, 
                                                consectetur adipiscing elit. Proin ornare magna eros, 
                                                eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                                Etiam finibus odio quis feugiat facilisis.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </div>
    );*/
}

export default withContext(Messages);