import React, { useEffect, useState, useCallback } from "react";
import withContext from "../../withContext";
import "./index.css";
import {Link, useLocation, useNavigate} from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import UserCog from "./UserCog";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookOpen, faClipboardList, faCog, faPaperPlane, faPlayCircle, faCalendarAlt, faGlobe, faShoppingBag } from '@fortawesome/free-solid-svg-icons';
import { faIdCard, faPhone, faImages, faVideo, faSearch, faWallet, faLandmark, faStore } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

const Navbar = props => {

    let navigate = useNavigate();
    let location = useLocation();
    const token = props.context.token ? props.context.token : 0;
    const uname = props.context.user ? props.context.user.username : "";
    //const user = props.context.user;
    const gender = props.context.user ? props.context.user.gender : "";
    const [selection, setSelection] = useState("");
    //const [clicked, setClick] = useState(false);

    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);
    const [openImage, setOpen] = useState(false);
    const [path, setPath] = useState("");

    const loadMainMedia = useCallback(async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        //const user_id = props.context.user ? props.context.user.id : 0;
        if (token === 0){
            setImgView(`${process.env.PUBLIC_URL}/images/bio/display/default.jpeg`);
        }else{
            await axios.post(`${process.env.REACT_APP_PROXY}/api/get-main-media`,{token}).then(
                (response) => {
                    if (response.status === 200){
                        if (response.data.has_dp === true){
                            setImgView(`${process.env.PUBLIC_URL}/images/bio/display/${response.data.user_id}.jpeg`);
                        }else{
                            setImgView(`${process.env.PUBLIC_URL}/images/bio/display/default.jpeg`);
                        }
                    }
                }
            );
        }
        return true;
    },[token]);

    const activate = (choice) => {
        setSelection(choice);
    }
    
    useEffect( ()=> {
        const newpath = location.pathname.split('/')[1];
        if(path !== newpath){
            if(newpath === "view-pree" || newpath === "view-group"){
                setSelection("");
                setPath("");
            }else if(newpath === "view-blueberry"){
                setSelection("audios");
                setPath("images");
            }else if(newpath === "view-trendy"){
                setSelection("images");
                setPath("images");
            }else if(newpath === "view-user-profile"){
                setSelection("profile");
                setPath("profile");
            }else if(newpath === "preepedia" || newpath === "view-user-list" || newpath === "groups" || newpath === "view-group"){
                setSelection("search");
                setPath("search");
            }else if(newpath === "listing-view" || newpath === "vehicle-view" || newpath === "product-view" || newpath === "service-view" || newpath === "item-view" ||
                    newpath === "service-add" || newpath === "vehicle-add"){
                setSelection("shops");
                setPath("shops");
            }else if(newpath === "volunteer-view" || newpath === "add-event" || newpath === "add-classified" || newpath === "add-volunteer" || newpath === "event-view" ||
                     newpath === "classified-view" || newpath === "vehicle-add"){
                    setSelection("activities");
                    setPath("activities");
            }else{
                setSelection(newpath);
                setPath(newpath);
            }
        }
        if (gotMedia === false){
            loadMainMedia();
            setGetMedia(true);
        }
        
        if (document.documentElement.classList.contains("hide-scroll") === true){
            document.documentElement.classList.remove("hide-scroll");
        }
    },[gotMedia, path, location, loadMainMedia]); //, clicked, selection

    return(
        <div className="custom-nav has-text-centered" id="custom-nav">
            <div className="nav-container">
                <div className="navbar-header">
                    <div className="columns no-padding no-margin">
                        <div className="column no-padding">
                            <div className="control-btn">
                                <Link to="/settings" onClick={e => {
                                        activate('settings');
                                        props.context.toggleMenu(e);
                                    }} >
                                    <div className={selection === "settings" ? "is-active" : "is-not-active"}> 
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
                                    to={'/message'/*`/messages/convo/direct/${props.context.recent}`*/}>
                                    <div className={selection === "messages" ? "is-active" : "is-not-active"}> 
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
                                    <div className={selection === "search" ? "is-active" : "is-not-active"}> 
                                    <FontAwesomeIcon icon={faSearch}  /> 
                                    <p> Search </p> 
                                    </div>
                                    
                                </Link>  
                            </div>
                        </div>
                    </div>
                    {props.context.user ? 
                    <div className="username tag" style={{fontSize:"medium", width:"100%"}}> 
                        <span> {uname} </span>&nbsp;
                        <span> (rank) </span>&nbsp;
                        <span> <UserCog /> </span>&nbsp;
                    </div>:
                    <div className='card p-1'>
                        <p>Login to do more on W@H GW@@N</p>
                        <button onClick={e => navigate("/home")} className='button is-link'>Login / Signup</button>
                    </div>
                    }
                </div>
                
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
                                    activate(''); 
                                    props.context.toggleMenu(e);
                                }} to="/">
                                <div className={selection === "" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faClipboardList} /> <p>Timeline</p> </div>
                                {" "}
                            </Link>
                        </div>
                        
                        
                        <div className="control-btn column is-one-third">
                            <Link onClick={e => {
                                    activate('profile');
                                    props.context.toggleMenu(e); 
                                }} to="/profile"> 
                                <div className={selection === "profile" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faIdCard}  /> <p>Profile</p> </div>
                                {" "}
                                
                            </Link>
                        </div>

                        
                        <div className="control-btn column is-one-third">
                            <Link onClick={e => { 
                                    activate('live') 
                                    props.context.toggleMenu(e);
                                }} to="/live">
                                <div className={selection === "live" ? "is-active" : "is-not-active"}> 

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
                                <div className={selection === "wgr" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faGlobe}  /> 
                                    <p> Reports </p>
                                </div>
                                
                            </Link> 
                        </div>
                    
                        <div className="control-btn column is-one-third">
                            <Link onClick={e => { 
                                    activate('social') 
                                    props.context.toggleMenu(e);
                                }} to={`/social`}>
                                <div className={selection === "social" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faBookOpen}  /> 
                                    
                                    <p> Social </p>
                                </div>
                                    
                            </Link>
                        </div>
                        

                        <div className="control-btn column is-one-third">
                            <Link onClick={e =>  { 
                                    activate('activities') 
                                    props.context.toggleMenu(e);
                                }} to="/activities"> 
                                <div className={selection === "activities" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faCalendarAlt}  /> 
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
                                    <div className={selection === "images" ? "is-active" : "is-not-active"}> 
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
                                <div className={selection === "audios" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faPlayCircle}  /> 
                                    <p> AV </p> 
                                </div>   
                            </Link>  
                        </div>
                        
                        <div className="control-btn column is-one-third">
                            <Link onClick={e => { 
                                    activate('wallet');
                                    props.context.toggleMenu(e);
                                }} to="/wallet">
                                <div className={selection === "wallet" ? "is-active" : "is-not-active"}> 
                                    {props.context.user ? 
                                    <div>
                                        {gender === "male" ?
                                        <div>
                                            <FontAwesomeIcon icon={faWallet}  /> 
                                            {" "}<span className="badge-length">0</span>
                                            <p> BillFold </p> 
                                        </div>:
                                        <div>
                                            <FontAwesomeIcon icon={faShoppingBag}  /> 
                                            {" "}<span className="badge-length">0</span>
                                            <p> Purse </p> 
                                        </div>
                                        }
                                    </div>:
                                    <div>
                                        <FontAwesomeIcon icon={faWallet}  /> 
                                        {" "}<span className="badge-length">0</span>
                                        <p> Wallet </p> 
                                    </div>
                                    }
                                </div>
                            </Link>
                        </div>
                    </div>
                    
                    <div className="columns is-mobile">
                        <div className="control-btn column is-one-third">
                            <Link onClick={e => { 
                                    activate('talkie'); 
                                    props.context.toggleMenu(e);
                                }} to="/talkie">
                                <div className={selection === "talkie" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faPhone}  />
                                    <p> Talkie </p> 
                                </div>
                                
                            </Link> 
                        </div>
                    
                        <div className="control-btn column is-one-third">
                            <Link onClick={e => { 
                                    activate('specials')
                                    props.context.toggleMenu(e);
                                }} to="/specials">
                                <div className={selection === "specials" ? "is-active" : "is-not-active"}> <FontAwesomeIcon icon={faLandmark}  /> 
                                    <p>Specials</p> 
                                </div>
                                
                            </Link>
                        </div>

                        <div className="control-btn column is-one-third">
                            <Link onClick={e => { 
                                    activate('shops') 
                                    props.context.toggleMenu(e);
                                }} to="/shops"> 
                                <div className={selection === "shops" ? "is-active" : "is-not-active"}> 
                                    <FontAwesomeIcon icon={faStore} /> 
                                    <span className="badge-length">0</span>
                                    <p>Market</p>
                                </div>
                                
                            </Link>  
                        </div>
                        
                    </div>
                </div>
            </div>
        </div>
  
    );
}
export default withContext(Navbar);