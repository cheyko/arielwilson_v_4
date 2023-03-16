import React, { useState ,useEffect } from "react";
import './index.css';
import withContext from "../../withContext";
//import axios from 'axios';
import $ from 'jquery';
import {Link, useParams} from "react-router-dom";

import Messaging from "./Messaging";
import Convos from "./Convos";
import NewConvo from "./NewConvo";
import Encourage from "../HelperComponents/Encourage";

const Messages = props => {

    const user_id = props.context.user ? props.context.user.id : 0;
    let {id} = useParams();
    //let {catergory} = useParams();
    //let {msgtype} = useParams();

    const [userview, setUserview] = useState("");
    const [convo, setConvo] = useState([]);
    const [count, setCount] = useState(0);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [msgSection, setMsgSection] = useState("");
    //const [convoView, setConvoView] = useState([]);

    const allmessages = props.context.messages ? props.context.messages : []; 
    const people = props.context.viewlist ? props.context.viewlist : [];
    const [showMore, setShowMore] = useState(false);
    const [convosMenu, showConvosMenu] = useState(false);
    const [notificationsMenu, showNotificationsMenu] = useState(false);

    let sessionVar = localStorage.getItem("msg-view") ? localStorage.getItem("msg-view") : "message";
    const [tab, setTab] = useState(sessionVar);
    let wanted = "Send & Receive Messages, View Happenings, See Mentions and Get Recommendations";

    useEffect(() => {
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
        }
    },[tab, userview, id, setConvo, user_id]);

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return(
        <div className="card" style={{minHeight:"100vh"}}>
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <span className="navbar-item">
                        <h1 className="title" style={{fontSize:"1rem"}}><b>W@H GW@@N !!! </b></h1>
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
                        <span className={`navbar-item ${tab === "message" ? 'is-active' : ''}`} onClick={e => {setTab("message");localStorage.setItem("msg-view","message"); setMsgSection('');}}>
                            <i className="fas fa-paper-plane" aria-hidden="true">  </i> &nbsp; Message-App
                        </span>

                        <div className={`navbar-item has-dropdown is-hoverable ${tab === 'convos' ? 'is-active' : ''}`}  onMouseOver={e => showConvosMenu(true)} onMouseOut={ e => showConvosMenu(false)}>
                            <span id="more-dropdown" className="navbar-link" onClick={ e => showConvosMenu(!convosMenu)}>
                                <i className="fas fa-message" aria-hidden="true"> </i> &nbsp; Convos
                            </span>

                            <div className="navbar-dropdown" style={convosMenu ? {display:"block"} : {display: "none"}}>
                                <NewConvo  modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} setTab={props.setTab} />
                                <span className={`navbar-item ${msgSection === 'new-convo' ? 'is-active' : ''}`} onClick={e => {setModalOpen(true); /*setMsgSection('new-convo');setTab("convos"); toggleMenu(e); showConvosMenu(!convosMenu);localStorage.setItem("msgSection","new-convo");localStorage.setItem("msg-view","convos")*/}}>
                                    <i className="fas fa-plus" aria-hidden="true">  </i> &nbsp; New
                                </span>
                                <span className={`navbar-item ${msgSection === 'all-convo' && tab === 'convos' ? 'is-active' : ''}`} onClick={e => { setMsgSection('all-convo');setTab("convos"); toggleMenu(e);showConvosMenu(!convosMenu);localStorage.setItem("msgSection","all-convo");localStorage.setItem("msg-view","convos")}}>
                                    <i className="fas fa-list" aria-hidden="true"> </i> &nbsp; All
                                </span>
                                <span className={`navbar-item ${msgSection === 'single-convo' && tab === 'convos' ? 'is-active' : ''}`} onClick={e => { setMsgSection('single-convo');setTab("convos"); toggleMenu(e); showConvosMenu(!convosMenu);localStorage.setItem("msgSection","single-convo");localStorage.setItem("msg-view","convos")}}>
                                    <i className="fas fa-user" aria-hidden="true">  </i> &nbsp; Tête-à-Tête
                                </span>
                                <span className={`navbar-item ${msgSection === 'group-convo' && tab === 'convos' ? 'is-active' : ''}`} onClick={e => { setMsgSection('group-convo');setTab("convos"); toggleMenu(e);showConvosMenu(!convosMenu);localStorage.setItem("msgSection","group-convo");localStorage.setItem("msg-view","convos")}}>
                                    <i className="fas fa-users" aria-hidden="true">  </i> &nbsp; Group
                                </span>
                            </div>
                        </div>

                        <div className={`navbar-item has-dropdown is-hoverable ${tab === 'happenings' || tab === 'mentions' || tab === 'recommendations' ? 'is-active' : ''}`}  onMouseOver={e => showNotificationsMenu(true)} onMouseOut={ e => showNotificationsMenu(false)}>
                            <span id="more-dropdown" className="navbar-link" onClick={ e => showNotificationsMenu(!notificationsMenu)}>
                                <i className="fas fa-bell" aria-hidden="true"> </i> &nbsp; Notifications
                            </span>

                            <div className="navbar-dropdown" style={notificationsMenu ? {display:"block"} : {display: "none"}}>
                                <span className={`navbar-item ${tab === 'happenings' ? 'is-active' : ''}`} onClick={e => {setTab("happenings");localStorage.setItem("msg-view","happenings");setMsgSection('');}}>
                                    <i className="fas fa-hand-point-up" aria-hidden="true">  </i> &nbsp; Happenings
                                </span>
                                <span className={`navbar-item ${tab === 'mentions' ? 'is-active' : ''}`} onClick={e => {setTab("mentions");localStorage.setItem("msg-view","mentions");setMsgSection('');}}>
                                    <i className="fas fa-at" aria-hidden="true">  </i> &nbsp; Mentions
                                </span>
                                <span className={`navbar-item ${tab === 'recommendations' ? 'is-active' : ''}`} onClick={e => {setTab("recommendations");localStorage.setItem("msg-view","recommendations");setMsgSection('');}}>
                                    <i className="fas fa-note-sticky" aria-hidden="true">  </i> &nbsp; Recommendations
                                </span>
                            </div>
                        </div>

                        <span className={`navbar-item ${tab === 'wg-mail' ? 'is-active' : ''}`} onClick={e => {setTab("wg-mail");localStorage.setItem("msg-view","wg-mail"); setMsgSection('');}}>
                            <i className="fas fa-inbox" aria-hidden="true">  </i> &nbsp; WG-Mail
                        </span>   
                    </div>
                </div>
            </nav>
            <br />
            <div className="page-content">
                <div className="container">
                    {props.context.user ? 
                        <div className="card">
                            {tab === "message" && 
                                <Messaging id={id} userview={userview} user_id={user_id} convo={convo} setConvo={setConvo} />
                            }
                            {tab === "convos" && 
                                <Convos allmessages={allmessages} people={people} user_id={user_id} setUserview={setUserview} setConvo={setConvo} setTab={setTab}/>
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
                        </div>:
                        <Encourage wanted={wanted} />
                    }
                </div>
            </div>        
        </div>
    )
}

export default withContext(Messages);