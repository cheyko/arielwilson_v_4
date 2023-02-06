import React, { useState ,useEffect } from "react";
import './index.css';
import withContext from "../../withContext";
//import axios from 'axios';
import $ from 'jquery';
import {Link, useParams} from "react-router-dom";

import Messaging from "./Messaging";
import Convos from "./Convos";

const Messages = props => {

    const user_id = props.context.user ? props.context.user.id : 0;
    let {id} = useParams();
    //let {catergory} = useParams();
    //let {msgtype} = useParams();

    const [userview, setUserview] = useState("");
    const [convo, setConvo] = useState([]);
    const [count, setCount] = useState(0);

    //const [convoView, setConvoView] = useState([]);

    const allmessages = props.context.messages ? props.context.messages : []; 
    const people = props.context.viewlist ? props.context.viewlist : [];
    const [showMore, setShowMore] = useState(false);
    const [tab, setTab] = useState("message");

    useEffect((convo) => {
       
        let interval = null;
        //let convoMsgs = null;
        const userview_id = id;

        if (userview_id !== '0'){
            if (userview === ""){
                props.context.getUserView(userview_id).then(
                    (result) => {
                        if (!result){
                            throw new Error("there was an error when search for my details");
                        }else{
                            setUserview(result);
                        }
                    }
                );
                props.context.getConvo(userview_id).then(
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
                        props.context.getConvo(userview_id).then(
                            (convoMsgs) => {
                                if(!convoMsgs){
                                    throw new Error('There was an error when getting convo');
                                }else{
                                    setConvo(convoMsgs);
                                }
                            }
                        );
                         
                        setCount(count => count + 1);
                    }, 100000);  
                    //$('#convo-msgs').scrollTop($('#convo-msgs')[0].scrollHeight); 
                }
                return () => clearInterval(interval);
            }
        }else{
           // props.context.getMessages(user_id);
        }
        ///console.log(document.getElementById("app-container").offsetHeight);
    },[tab, userview, id, convo, setConvo, props.context, user_id]);

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return(
        <div className="hero">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <span className="navbar-item">
                        <h1 className="subtitle"><b>W@H GW@@N !!! </b></h1>
                    </span>

                    <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <small>sections</small>
                    </span>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <span className="navbar-item">
                            Home
                        </span>

                        <span className="navbar-item">
                            Documentation
                        </span>

                        <div className="navbar-item has-dropdown is-hoverable">
                            <span className="navbar-link" onClick={e => setShowMore(!showMore)}>
                                More
                            </span>

                            <div className="navbar-dropdown" style={showMore ? {display: "block"} : {display: "none"}}>
                                <span className="navbar-item">
                                    About
                                </span>
                                <span className="navbar-item">
                                    Jobs
                                </span>
                                <span className="navbar-item">
                                    Contact
                                </span>
                                <hr className="navbar-divider" />
                                <span className="navbar-item">
                                    Report an issue
                                </span>
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
                                <Messaging id={id} userview={userview} user_id={user_id} convo={convo} setConvo={setConvo} />
                            }
                            {tab === "convos" && 
                                <Convos allmessages={allmessages} people={people} user_id={user_id} setConvo={setConvo} setTab={setTab}/>
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
}

export default withContext(Messages);