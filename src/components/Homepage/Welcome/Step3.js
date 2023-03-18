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
            {/*<button className="button is-medium is-info" onClick={e => props.prev(e,3)}> Previous Step </button>*/}

            <p className="subtitle"> <b> Step 3 of 3 </b> Add Display Photo and Cover Video</p>

            <div className="main-media-video" style={{margin:"0 auto",height:"360px",width:"640px"}}>
                <div style={{height:"10rem"}}>
                    <div className="video-upload">
                        <label htmlFor="file-input-video">
                            <span className="cv-video-icon is-pulled-right"> <FontAwesomeIcon icon={faVideo} size="2x" /> </span> 
                        </label>
                        <input id="file-input-video" name="video-upload" single="true" type="file" onChange={e => {props.handleUpload(e);e.preventDefault();}}/>
                    </div> 
                    {props.vidView ? 
                        <video key={props.vidView} className="the-vid" width="640" height="480" controls>
                            <source src={props.vidView} type="video/mp4"/>
                        </video> 
                        : 
                        <video className="the-vid" width="640" height="480" controls>
                            <source src="/images/bio/cover/default.mp4" type="video/mp4"/>
                        </video>
                    }
                </div>
            </div>
            <div className="main-media-image has-text-centered">       
                <figure className="display-figure">
                    <div className="image-upload">
                        <label htmlFor="file-input-image">
                            <span className="dp-camera-icon is-pulled-right"> <FontAwesomeIcon icon={faCamera} size="2x" /> </span>
                        </label>
                        <input id="file-input-image" name="image-upload" single="true" type="file" onChange={e => props.handleUpload(e)}/>
                    </div> 
                    {props.imgView ? <img alt="display" className="display-image-large" src={props.imgView} /> : <img alt="display" className="display-image-large" src="/images/bio/display/default.jpeg" />}  
                </figure>
                <div className="username">
                    {props.uname} 
                </div>
                <div className="tagline has-text-centered">
                    {props.tagline} 
                </div>
            </div>
            <div>
                <button onClick={e => props.saveUpload(e)} className="button is-medium is-info"> Save Changes to Main Media </button> 
                <hr/>
                <p>{props.responseMsg}</p> 
                <button onClick={props.endWelcome} className="button is-medium is-success"> {props.uploaded === true ? "Pree W@H GW@@N" : "Skip Upload 'N' Pree W@H GW@@N"} </button> 
                <hr/> 
            </div>
            </div>
        </div>
    )
}
export default withContext(Step3);