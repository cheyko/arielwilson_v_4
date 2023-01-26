import React, {useEffect} from 'react';
import withContext from '../../withContext';
import "./Helper.css"
//import axios from "axios";
import {Link} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';

const TilePreeItem = props => {

    const {aPree} = props;

    useEffect( ()=> {

    });

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
            return aTime.getHours() + ":" + (aTime.getMinutes() < 10 ? "0"+ aTime.getMinutes() : aTime.getMinutes())  + "am";
        }else if (aTime.getHours() === 12){
            return aTime.getHours() + ":" + (aTime.getMinutes() < 10 ? "0"+ aTime.getMinutes() : aTime.getMinutes()) + "pm"
        }else{
            return aTime.getHours() % 12 + ":" + (aTime.getMinutes() < 10 ? "0"+ aTime.getMinutes() : aTime.getMinutes()) + "pm"
        }
    }
    
    return (
        <div className="hero">
            <div className="tile-item">
                <Link to={`/view-pree/${aPree.pree_id}`}>
                    <div className="rows">
                        <div className="row">
                            {aPree.is_media === true ? (
                                <div className="tiled-media">
                                    <div className="media-types">
                                        {aPree.attachment.has_image === true && 
                                        (
                                            <div className="tiled-image">
                                                <div class="card">
                                                    <div class="card-image">
                                                        <figure className="image is-5by4 img-holder">
                                                            <img className="is-normal" alt="media" src={`${process.env.PUBLIC_URL}/media/pree${aPree.pree_id}/post0`} />
                                                            <small className="tag caption-tag"> 
                                                                <span className="tag date-caption">{formatTime(aPree.date_added)}</span> 
                                                            </small>
                                                        </figure>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {aPree.attachment.has_audio === true && (
                                            <div className="tiled-audio">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <audio className="audio-playback" controls>
                                                            <source src={`${process.env.PUBLIC_URL}/media/pree${aPree.pree_id}/post0`} type="audio/mp3"/>
                                                        </audio>
                                                        <small className="tag caption-tag"> 
                                                            <span className="tag date-caption">{formatTime(aPree.date_added)}</span> 
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                        {aPree.attachment.has_video === true && (
                                            <div className="tiled-video">
                                                <div className="card">
                                                    <div className="card-content">
                                                        <video width="320" height="240" controls>
                                                            <source src={`${process.env.PUBLIC_URL}/media/pree${aPree.pree_id}/post0`} type="video/mp4"/>
                                                        </video>
                                                        <small className="tag caption-tag"> 
                                                            <span className="tag date-caption">{formatTime(aPree.date_added)}</span> 
                                                        </small>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>      
                                </div>
                            ):(
                                <div className="tiled-quote has-text-centered">
                                    <div className="a-quote">
                                        <div className="card">
                                            <div className="card-content">
                                                <b> 
                                                    <FontAwesomeIcon icon={faQuoteLeft} size="1x" /> 
                                                        &nbsp; {aPree.attachment.the_quote} &nbsp;
                                                    <FontAwesomeIcon icon={faQuoteRight} size="1x" />  
                                                </b>
                                                <small className="tag caption-tag"> 
                                                    <span className="tag date-caption">{formatTime(aPree.date_added)}</span> 
                                                </small>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                        {/*<div className="row has-text-right">
                            <small className="tag"> {formatTime(aPree.date_added)} </small>
                            </div>*/}
                    </div>
                </Link>
            </div>
        </div>
    )
}
export default withContext(TilePreeItem);