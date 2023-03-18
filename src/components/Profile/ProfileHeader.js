import React, {useEffect, useState} from "react";
import withContext from "../../withContext";
import {Link} from "react-router-dom";
import Lightbox from 'react-image-lightbox';
import EncourageModal from "../HelperComponents/EncourageModal";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const ProfileHeader = props => {

    const action = props.action ? props.action : "";

    const user = props.user ? props.user : "";

    const [openImage, setOpen] = useState(false);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [wanted, setWanted] = useState("");

    //const videoUrl = props.vidView;

    return(
        <>
            <EncourageModal wanted={wanted}  modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
            <div className="top-div hero-contain">  
                <div className="main-media-video">
                    <div className="container has-text-centered">
                        {action === 'read-write' && props.showEdit &&
                            <div className="video-upload">
                                <label htmlFor="file-input-video">
                                    <span className="cv-video-icon is-pulled-right"> <FontAwesomeIcon icon={faVideo} size="2x" /> </span> 
                                </label>
                                <input id="file-input-video" name="video-upload" single="true" type="file" onChange={e => props.handleUpload(e)}/>
                            </div> 
                        }
                       {props.vidView ? 
                        <video key={props.vidView} className="the-vid" width="640" height="480" controls>
                            <source src={props.vidView} type="video/mp4" /> 
                    </video> : <span></span>}
                        {/*<iframe className="the-vid" width="640" height="480" src={props.vidView} allow="" sandbox>
                        </iframe>*/}
                    </div>
                </div>
                <br />
                {action === 'read' && 
                    <div className="controls columns is-mobile">
                        <div className="column">
                            <div className={`dropdown ${props.showDropDown ? "is-active" : ""}`} >
                                <div className="dropdown-trigger">
                                    <button onClick={ e => props.setShowDropDown(!props.showDropDown)} className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span style={{fontSize:"x-large"}}> <i className="fas fa-ellipsis-h"></i> </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <span className="dropdown-item">
                                            Dropdown item
                                        </span>
                                        <span className="dropdown-item">
                                            Other dropdown item
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column has-text-centered" onClick={e => localStorage.setItem("msg-view","message")}>
                            {props.context.user ? 
                                <Link to={`/messages/convo/direct/${user.user_id}`}><button style={{fontSize:"large"}} className="button"> <i className="fas fa-envelope"></i> </button></Link>
                                :
                                <button style={{fontSize:"large"}} onClick={e => {setWanted("message this user");setModalOpen(true);}} className="button"> <i className="fas fa-envelope"></i> </button> 
                            }
                        </div>
                        <div className="column">
                            {props.context.user ? 
                                <button onClick={props.isFollower ? props.unfollow : props.follow } className={`button is-link is-pulled-right`}> {props.isFollower ? "Unfollow" : "Follow"} </button>
                                :
                                <button onClick={e => {setWanted("follow this user and others");setModalOpen(true);}} className={`button is-link is-pulled-right`}> Follow </button>
                            }
                        </div>
                    </div>
                }
                {action === 'read-write' && 
                    <div className="controls columns is-mobile">
                        <div className="column">
                            <div className={`dropdown ${props.showDropDown ? "is-active" : ""}`} >
                                <div className="dropdown-trigger">
                                    <button onClick={ e => props.setShowDropDown(!props.showDropDown)} className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span style={{fontSize:"x-large"}}> <i className="fas fa-ellipsis-h"></i> </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <span className="dropdown-item">
                                            Dropdown item
                                        </span>
                                        <span className="dropdown-item">
                                            Other dropdown item
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            {!props.showEdit ?
                            (
                                <button onClick={ e => {props.context.user ? props.setShowEdit(!props.showEdit) : setWanted("Edit Your Profile Media");setModalOpen(true);}} className={`button is-link is-pulled-right`}> 
                                    Edit Media 
                                </button>
                            ):(
                                <div>
                                    <button onClick={ e => props.cancelUpload(e)} className={`profile-btn button is-link is-pulled-right`}> 
                                        Cancel
                                    </button> 
                                    
                                    <button onClick={ e => props.saveUpload(e)} className={`profile-btn button is-link is-pulled-right`}> 
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                }
                <div className="main-media-image has-text-centered">       
                    <figure className="display-figure">
                        {action === 'read-write' && props.showEdit &&
                            <div className="image-upload">
                                <label htmlFor="file-input-image">
                                    <span className="dp-camera-icon is-pulled-right"> <FontAwesomeIcon icon={faCamera} size="2x" /> </span>
                                </label>
                                <input id="file-input-image" name="image-upload" single="true" type="file" onChange={e => props.handleUpload(e)}/>
                            </div> 
                        }
                        <img alt="display" onClick={e => setOpen(true)} className="display-image-large" src={props.imgView} />   
                        {openImage && (
                            <Lightbox
                                imageTitle={`${user.username}`}
                                mainSrc={props.imgView}
                                onCloseRequest={() => setOpen(false)}
                                
                            />
                        )}
                    </figure>
                    <div className="username tag" style={{fontWeight:"bold",fontSize:"large"}}>
                        {action === "read-write" && !props.context.user ? "Guest" : "@" + user.username} 
                    </div>
                    <div className="card tagline has-text-centered" >
                        {action === "read-write" && !props.context.user ? "Welcome Guest, create a profile to have a tagline" : "#" + user.tagline} 
                    </div>
                </div>
                <br/>{props.responseMsg}<br/>
            </div>
        </>
    )

}
export default withContext(ProfileHeader);