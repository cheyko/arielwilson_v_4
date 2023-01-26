import React, {useState} from "react";
import withContext from "../../withContext";
import {Link} from "react-router-dom";
import Lightbox from 'react-image-lightbox';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const ProfileHeader = props => {

    const action = props.action ? props.action : "";

    const user = props.user ? props.user : "";

    const [openImage, setOpen] = useState(false);

    return(
        <>
            <div className="top-div hero-contain">  
                <div className="main-media-video">
                    <div className="container has-text-centered">
                        {action === 'read-write' && props.showEdit &&
                            <div className="video-upload">
                                <label htmlFor="file-input-video">
                                    <span className="cv-video-icon is-pulled-right"> <FontAwesomeIcon icon={faVideo} size="2x" /> </span> 
                                </label>
                                <input id="file-input-video" name="video-upload" single type="file" onChange={e => props.handleUpload(e)}/>
                            </div> 
                        }
                        <video className="the-vid" width="640" height="480" controls>
                            <source src={props.vidView} type="video/mp4"/>
                        </video>
                    </div>
                </div>
                <br />
                {action === 'read' && 
                    <div className="controls columns is-mobile">
                        <div className="column">
                            <div className={`dropdown ${props.showDropDown ? "is-active" : ""}`} >
                                <div className="dropdown-trigger">
                                    <button onClick={ e => props.setShowDropDown(!props.showDropDown)} className="button is-info is-rounded" aria-haspopup="true" aria-controls="dropdown-menu">
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
                        <div className="column has-text-centered" style={{padding:"0px"}}>
                            <Link to={`/messages/convo/direct/${user.user_id}`}><button style={{fontSize:"large"}} className="button"> <i className="fas fa-envelope"></i> </button></Link>
                        </div>
                        <div className="column" style={{padding:"0px"}}>
                            <button onClick={props.isFollower ? props.unfollow : props.follow } className={`button is-link is-pulled-right ${props.isFollower ? "is-outlined" : ""}`}> {props.isFollower ? "Unfollow" : "Follow"} </button>
                        </div>
                    </div>
                }
                {action === 'read-write' && 
                    <div className="controls columns is-mobile">
                        <div className="column" style={{padding:"0px"}}>
                            <div className={`dropdown ${props.showDropDown ? "is-active" : ""}`} >
                                <div className="dropdown-trigger">
                                    <button onClick={ e => props.setShowDropDown(!props.showDropDown)} className="button is-info is-rounded" aria-haspopup="true" aria-controls="dropdown-menu">
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
                        <div className="column" style={{padding:"0px"}}>
                            {!props.showEdit ?
                            (
                                <button onClick={ e => props.setShowEdit(!props.showEdit)} className={`button is-link is-pulled-right is-rounded ${props.showEdit ? "is-outlined" : ""}`}> 
                                    Edit Media 
                                </button>
                            ):(
                                <div>
                                    <button onClick={ e => props.setShowEdit(!props.showEdit)} className={`profile-btn button is-link is-pulled-right ${props.showEdit ? "is-outlined" : ""}`}> 
                                        Cancel
                                    </button> 
                                    
                                    <button onClick={ e => props.saveUpload(e)} className={`profile-btn button is-link is-pulled-right ${props.showEdit ? "is-outlined" : ""}`}> 
                                        Save
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                }
                <div className="main-media-image has-text-centered">       
                    <figure className="display-pic-large image">
                        {action === 'read-write' && props.showEdit &&
                            <div className="image-upload">
                                <label htmlFor="file-input-image">
                                    <span className="dp-camera-icon is-pulled-right"> <FontAwesomeIcon icon={faCamera} size="2x" /> </span>
                                </label>
                                <input id="file-input-image" name="image-upload" single type="file" onChange={e => props.handleUpload(e)}/>
                            </div> 
                        }
                        <img alt="display" onClick={e => setOpen(true)} className="is-rounded" src={props.imgView} />   
                        {openImage && (
                            <Lightbox
                                imageTitle={`${user.username}`}
                                mainSrc={props.imgView}
                                onCloseRequest={() => setOpen(false)}
                                
                            />
                        )}
                    </figure>
                    <div className="username tag" style={{fontWeight:"bold",fontSize:"large"}}>
                        @{user.username} 
                    </div>
                    <div className="card tagline has-text-centered" >
                        #{user.tagline} 
                    </div>
                </div>
                <br/>{props.responseMsg}<br/>
            </div>
        </>
    )

}
export default withContext(ProfileHeader);