import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import "./index.css";
import {Link} from "react-router-dom";
import Lightbox from 'react-image-lightbox';

import UserCog from "./UserCog";

//icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faClipboardList, faCog, faPaperPlane, faPlayCircle } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faPhone } from '@fortawesome/free-solid-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
//import { faTasks } from '@fortawesome/free-solid-svg-icons';
import { faLandmark } from '@fortawesome/free-solid-svg-icons';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { faStore} from '@fortawesome/free-solid-svg-icons';
import { faGlobe } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";
import { useCallback } from "react";

const Navbar = props => {

    const uname = props.context.user ? props.context.user.username : "";
    //const user = props.context.user;
    const gender = props.context.user ? props.context.user.gender : "";
    const [settingsbtn, activeSettings] = useState(false);
    const [searchbtn, activeSearch] = useState(false);
    const [timelinebtn, activeTimeline] = useState(false);
    const [profilebtn, activeProfile] = useState(false);
    //const [notificationbtn, activeNotifications] = useState(false);
    const [wgrbtn, activeWGR] = useState(false);
    const [walletbtn, activeWallet] = useState(false);
    const [activitiesbtn, activeActivities] = useState(false);
    const [quotesbtn, activeQutoes] = useState(false);
    const [audiosbtn, activeAudios] = useState(false);
    const [messagebtn, activeMessages] = useState(false);
    const [sibtn, activeSI] = useState(false);
    const [imagesbtn, activeImages] = useState(false);
    const [videosbtn, activeVideos] = useState(false);
    const [shopsbtn, activeShops] = useState(false);
    const [selection, setSelection] = useState("timeline");
    const [clicked, setClick] = useState(false);

    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);
    const [openImage, setOpen] = useState(false);
    const [toggleMenu, setToggle] = useState(true);

    const loadMainMedia = useCallback( async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        const user_id = props.context.user ? props.context.user.id : 0;
        //console.log(user_id);
        await axios.post('/api/get-main-media',{user_id}).then(
            (response) => {
                if (response.status === 200){
                    setGetMedia(true);
                    if (response.data.has_dp === true){
                        setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + user_id);
                    }else{
                        setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
                    }
                }
            }
        );
        return true;
    },[imgView, gotMedia]);

    const activate = (choice) => {
        setClick(true);
        deactivate();
        setSelection(choice);
        props.context.setMenuChoice(choice);
        localStorage.setItem("choice", JSON.stringify(choice));
        switch(choice){
            case 'settings':
                activeSettings(true);
                break;
            case 'search':
                activeSearch(true);
                break;
            case 'timeline':
                activeTimeline(true);
                break;
            case 'profile':
                activeProfile(true);
                break;
            /*case 'notifications':
                activeNotifications(true);
                break;*/
            case 'wgr':
                activeWGR(true);
                break;
            case 'wallet':
                activeWallet(true);
                break;
            case 'activities':
                activeActivities(true);
                break;
            case 'quotes':
                activeQutoes(true);
                break;
            case 'audios':
                localStorage.setItem("bb-view","main");
                localStorage.setItem("av-section","all");
                activeAudios(true);
                break;
            case 'messages':
                activeMessages(true);
                break;
            case 'si':
                activeSI(true);
                break;
            case 'images':
                localStorage.setItem("trendy-view","main");
                localStorage.setItem("mag-section","all");
                activeImages(true);
                break;
            case 'videos':
                activeVideos(true);
                break;
            case 'shops':
                activeShops(true);
                break;
            default:
                break;
        }
    }

    const deactivate = () => {
        switch(selection){
            case 'settings':
                activeSettings(false);
                break;
            case 'search':
                activeSearch(false);
                break;
            case 'timeline':
                activeTimeline(false);
                break;
            case 'profile':
                activeProfile(false);
                break;
            /*case 'notifications':
                activeNotifications(false);
                break;*/
            case 'wgr':
                activeWGR(false);
                break;
            case 'wallet':
                activeWallet(false);
                break;
            case 'activities':
                activeActivities(false);
                break;
            case 'quotes':
                activeQutoes(false);
                break;
            case 'audios':
                activeAudios(false);
                break;
            case 'messages':
                activeMessages(false);
                break;
            case 'si':
                activeSI(false);
                break;
            case 'images':
                activeImages(false);
                break;
            case 'videos':
                activeVideos(false);
                break;
            case 'shops':
                activeShops(false);
                break;
            default:
                break;
        }
    }
    
    useEffect( ()=> {
        //console.log(window.location.href);
        if (!clicked && window.location.href !== "http://localhost:3000/"){
            let reloadChoice = JSON.parse(localStorage.getItem("choice"));
            //let reloadChoice = window.location.href.split("http://localhost:3000/");
            //console.log(reloadChoice);
            activate(reloadChoice);
        }else if(window.location.href === "http://localhost:3000/"){
            //change implementation account for browser navigation.
            activate("timeline");
        }
        if (gotMedia === false){
            loadMainMedia();
        }

        if(selection !== props.context.menuChoice){
            activate(props.context.menuChoice);
        }
    },[gotMedia, window.location.href, clicked, props.context.menuChoice, loadMainMedia]);

    return(
        <div className="custom-nav" id="custom-nav">
            <div className="nav-container">
                <div className="navbar-header">
                    <div className="columns no-padding no-margin">
                        <div className="column no-padding">
                            <div className="control-btn">
                                <Link to="/settings" onClick={e => {
                                        activate('settings');
                                        props.context.toggleMenu(e);
                                    }} >
                                    <div className={settingsbtn ? "is-active" : "is-not-active"}> 
                                        <FontAwesomeIcon icon={faCog}  /> 
                                        <p> Settings </p>
                                    </div>
                                </Link>
                            </div>
                        </div>
                        <div className="column no-padding">
                            <div className="control-btn">
                                <Link onClick={e => {
                                        activate('messages'); 
                                        props.context.toggleMenu(e);
                                    }} 
                                    to={`/messages/convo/direct/${props.context.recent}`}>
                                    <div className={messagebtn ? "is-active" : "is-not-active"}> 
                                        <FontAwesomeIcon icon={faPaperPlane} size="1x" /> 
                                            {" "}<span className="badge-length">0</span><br/>
                                        <b> W@H <br/> GW@@N</b> 

                                    </div>
                                        
                                </Link>
                            </div>
                        </div>
                        <div className="column no-padding">
                            <div className="control-btn is-fullwidth">
                                <Link onClick={e => { 
                                        activate('search');
                                        props.context.toggleMenu(e);
                                    }} to="/search"> 
                                    <div className={searchbtn ? "is-active" : "is-not-active"}> 
                                    <FontAwesomeIcon icon={faSearch}  /> 
                                    <p> Search </p> 
                                    </div>
                                    
                                </Link>  
                            </div>
                        </div>
                    </div>
                    <div className="username tag" style={{fontSize:"medium", width:"100%"}}> 
                        <span> {uname} </span>&nbsp;
                        <span> (rank) </span>&nbsp;
                        <span> <UserCog /> </span>&nbsp;
                    </div>
                </div>
                {toggleMenu && 
                    <div className="navbar-body">
                        <div className="display-pic-box">
                            <div className="media">
                                <figure className="display-figure">
                                    <img alt="display" className="display-image-large" onClick={e => setOpen(true)} src={imgView} />
                                    {openImage && (
                                    <Lightbox
                                        imageTitle={`${props.context.user.username}`}
                                        mainSrc={imgView}
                                        onCloseRequest={() => setOpen(false)}
                                        
                                    />
                                )}
                                </figure>   
                            </div>
                        </div>
                        
                        <div className="columns is-mobile">
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => {
                                        activate('timeline'); 
                                        props.context.toggleMenu(e);
                                    }} to="/">
                                    <div className={timelinebtn ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faClipboardList} /> <p>Timeline</p> </div>
                                    {" "}
                                </Link>
                            </div>
                            
                            
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => {
                                        activate('profile');
                                        props.context.toggleMenu(e); 
                                    }} to="/profile"> 
                                    <div className={profilebtn ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faIdCard}  /> <p>Profile</p> </div>
                                    {" "}
                                    
                                </Link>
                            </div>

                            
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('live') 
                                        props.context.toggleMenu(e);
                                    }} to="/live">
                                    <div className={false ? "is-active" : "is-not-active"}> 

                                        <div className="icon-badge">  
                                            <FontAwesomeIcon icon={faVideo}  /> 
                                            {" "}<span className="badge-length">0</span>
                                        </div> 
                                        <p> Live </p>
                                    </div>
                                        
                                </Link>
                            </div>
                        </div>

                        <div className="columns">
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('wgr') 
                                        props.context.toggleMenu(e);
                                    }} to="/wgr">
                                    <div className={wgrbtn ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faGlobe}  /> 
                                        <p> Reports </p>
                                    </div>
                                    
                                </Link> 
                            </div>
                        
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('si') 
                                        props.context.toggleMenu(e);
                                    }} to={`/social`}>
                                    <div className={sibtn ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faBookOpen}  /> 
                                        
                                        <p> Social </p>
                                    </div>
                                        
                                </Link>
                            </div>
                            

                            <div className="control-btn column is-one-third">
                                <Link onClick={e =>  { 
                                        activate('activities') 
                                        props.context.toggleMenu(e);
                                    }} to="/activities"> 
                                    <div className={activitiesbtn ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faCalendarAlt}  /> 
                                        {" "}<span className="badge-length">0</span>
                                        <p>Activities</p>
                                    </div>
                                    
                                </Link>  
                            </div>
                            
                        </div>

                        <div className="controls columns is-mobile"> 
                            <div className="control-btn column is-one-third">
                                    <Link onClick={e => { 
                                            activate('images')
                                            props.context.toggleMenu(e);
                                        }} to="/images">
                                        <div className={imagesbtn ? "is-active" : "is-not-active"}> 
                                            <FontAwesomeIcon icon={faImages}  />
                                            <p>Magazine</p>
                                        </div>
                                        
                                    </Link>
                                </div>
                            
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('audios'); 
                                        props.context.toggleMenu(e);
                                    }} to="/audios"> 
                                    <div className={audiosbtn ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faPlayCircle}  /> 
                                        <p> AV </p> 
                                    </div>   
                                </Link>  
                            </div>
                            
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('wallet');
                                        props.context.toggleMenu(e);
                                    }} to="/wallet">
                                    <div className={walletbtn ? "is-active" : "is-not-active"}> 
                                        <FontAwesomeIcon icon={faWallet}  /> 
                                        {" "}<span className="badge-length">0</span>
                                        <p> {gender === "male" ?  "BillFold" : "Purse" }</p> 
                                    </div>
                                    
                                </Link>
                            </div>

                            
                        </div>
                        
                        <div className="columns is-mobile">
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('Talkie'); 
                                        props.context.toggleMenu(e);
                                    }} to="/talkie">
                                    <div className={false ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faPhone}  />
                                        <p> Talkie </p> 
                                    </div>
                                    
                                </Link> 
                            </div>
                        
                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('specials')
                                        props.context.toggleMenu(e);
                                    }} to="/specials">
                                    <div className={false ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faLandmark}  /> 
                                        <p>Specials</p> 
                                    </div>
                                    
                                </Link>
                            </div>

                            <div className="control-btn column is-one-third">
                                <Link onClick={e => { 
                                        activate('shops') 
                                        props.context.toggleMenu(e);
                                    }} to="/shops"> 
                                    <div className={shopsbtn ? "is-active" : "is-not-active"}> 
                                    <FontAwesomeIcon icon={faStore}  /> <span className="badge-length">0</span>
                                        <p>Market</p>
                                    </div>
                                    
                                </Link>  
                            </div>
                            
                        </div>
                    </div>
                }
            </div>
        </div>
  
    );
}
export default withContext(Navbar);