import React from "react";
import withContext from '../../../withContext';
//import axios from 'axios';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { faVideo } from '@fortawesome/free-solid-svg-icons';

const Step3 = props => {
    //run state upgrade on getMedia to true

    return(
        <div className="hero">
            <div>
            <button className="button is-medium is-info" onClick={e => props.prev(e,3)}> Previous Step </button>

            <h3 className="subtitle has-text-weight-bold"> Step 3 of 3 </h3>

            <h3 className="subtitle"> Add Display Photo and Cover Video </h3>

            <div className="main-media-video" style={{margin:"0 auto",height:"360px",width:"640px"}}>
                <div style={{height:"10rem"}}>
                    <div className="video-upload">
                        <label htmlFor="file-input-video">
                            <span className="cv-video-icon is-pulled-right"> <FontAwesomeIcon icon={faVideo} size="2x" /> </span> 
                        </label>
                        <input id="file-input-video" name="video-upload" single type="file" onChange={e => {props.handleUpload(e);e.preventDefault();}}/>
                    </div> 
                    <video className="the-vid" width="640" height="480" controls>
                        <source src={props.vidView} type="video/mp4"/>
                    </video>
                </div>
            </div>
            <div className="main-media-image">       
                <fiqure className="display-pic-large has-text-centered image">
                    <div className="image-upload">
                        <label htmlFor="file-input-image">
                            <span className="dp-camera-icon is-pulled-right"> <FontAwesomeIcon icon={faCamera} size="2x" /> </span>
                        </label>
                        <input id="file-input-image" name="image-upload" single type="file" onChange={e => props.handleUpload(e)}/>
                    </div> 
                    <img alt="display" className="is-rounded" src={props.imgView} />   
                </fiqure>
                <div className="username">
                    {props.uname} 
                </div>
                <div className="tagline has-text-centered">
                    {props.tagline} 
                </div>
            </div>
            <div>
                <br/>
                <button onClick={e => props.saveUpload(e)} className="button is-medium is-info"> Save Changes to Main Media </button> 
                <hr/>
                <br/>{props.responseMsg}<br/>
                <button onClick={props.endWelcome} className="button is-medium is-success"> {props.uploaded === true ? "Pree W@H GW@@N" : "Skip Upload 'N' Pree W@H GW@@N"} </button> 
                <hr/><br/>
            </div>
            </div>
        </div>
    )
}
export default withContext(Step3);