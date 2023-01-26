import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import {Link } from "react-router-dom";
//import Slider from "react-slick";
import MediaHeader from "../Audios/MediaHeader";
import MusicPlayer from "../Audios/MusicPlayer";
import VideoPlayer from "../Audios/VideoPlayer";
import TrendyHeader from "../Images/TrendyHeader";
import TrendyImage from "../Images/TrendyImage";
import TrendyQuote from "../Images/TrendyQuote";

const TimelineExclusive = props => {

    //const accessLevel = props.context ? props.context.user.accessLevel : 0;
    const {aPree} = props;
    const [view, setView] = useState("timeline");  

    const [mainmedia, setMainmedia] = useState(null);
    const [details, setDetails] = useState(aPree);
    const [mediatype, setMediaType] = useState(null);
    const [url, setUrl] = useState(null);
    const [options, setOptions] = useState(null);
    const [commentscount, setCommentsCount] = useState(aPree.comments); 
    const [operation, setOperation] = useState("timeline"); 

    useEffect( () => {
        if (details){
            if (aPree.attachment.mediatypes[0] === "audio"){
                setMediaType("audio/mp3");
            }
            else if (aPree.attachment.mediatypes[0] === "video"){
                setMediaType("video/mp4");
            }
            setMainmedia(true);
            setUrl(process.env.PUBLIC_URL + "/images/exclusives/exclusive" + aPree.attachment.exclusive_id + "/upload0");
        }
    },[url, details, aPree]);

    return(
        <div className="hero">
            <div className="pree-item">
                <div className="content">
                    {(aPree.attachment.md === true || aPree.attachment.stereo === true) ? (
                        <div className="timeline-blueberry">
                            <article className="message is-link">
                                <div className="message-header">
                                    <MediaHeader operation={operation} commentscount={commentscount} details={{"pree_id":aPree.pree_id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals, "comments" : aPree.comments}} />
                                </div>
                                
                                <div className="message-body">
                                    <Link to={`/view-blueberry/${aPree.pree_id}`}>
                                        <div className="content">
                                            <div className="columns no-margin">
                                                <div className="column no-padding">
                                                    <div className="card">
                                                        <div className="mainmedia">
                                                            {url ? 
                                                                (
                                                                    <>
                                                                        {mediatype.split('/')[0] === "audio" ?
                                                                            (
                                                                                <MusicPlayer 
                                                                                    temp_url={url} mediatype={mediatype} 
                                                                                    details={{"title":aPree.attachment.title, "artist":aPree.attachment.artistname, "playback":aPree.attachment.playback}}
                                                                                />
                                                                            
                                                                            ):(
                                                                                <VideoPlayer  
                                                                                    temp_url={url} mediatype={mediatype} 
                                                                                    details={{"title":aPree.attachment.title, "artist":aPree.attachment.artistname, "playback":aPree.attachment.playback}}
                                                                                />
                                                                            )
                                                                        }
                                                                    </>
                                                                ):(
                                                                    <span>{""}</span>
                                                                )
                                                            }
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                
                            </article>        
                        </div>
                    ):(
                        <div className="timeline-trendy">
                            <article className="message is-link">
                                <div className="message-header">
                                    <TrendyHeader operation={operation} commentscount={commentscount} details={{"pree_id":aPree.pree_id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals, "views" : aPree.attachment.views}}/>
                                </div>
                                
                                <div className="message-body">
                                    <Link to={`/view-trendy/${aPree.pree_id}`}>
                                        <div className="content">
                                            <div className="columns no-margin">
                                                <div className="column no-padding">
                                                    <div className="card">
                                                        <div className="mainmedia">
                                                            {aPree.attachment.magazine === true &&                                                            
                                                                <> 
                                                                    <TrendyImage temp_url={url}  
                                                                        details={{"title":aPree.attachment.title,"artist":aPree.attachment.artistname}}/>  
                                                                </>                 
                                                            } 
                                                            {aPree.attachment.influence === true &&
                                                                <>
                                                                    <TrendyQuote 
                                                                        details={{"title":aPree.attachment.title, "artist":aPree.attachment.artistname, "description":aPree.attachment.description}}
                                                                    />
                                                                </> 
                                                            }   
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                                
                            </article>
                        </div>
                    )}
                
                </div>
            </div>
            <hr className="h-line" />
        </div>
    )
}
export default withContext(TimelineExclusive);