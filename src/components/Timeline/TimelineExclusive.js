import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import {Link } from "react-router-dom";
//import Slider from "react-slick";
import MediaFooter from "../Audios/MediaFooter";
import MusicPlayer from "../Audios/MusicPlayer";
import VideoPlayer from "../Audios/VideoPlayer";
import TrendyFooter from "../Images/TrendyFooter";
import TrendyImage from "../Images/TrendyImage";
import TrendyQuote from "../Images/TrendyQuote";
import TrendyHeader from "../Images/TrendyHeader";
import MediaHeader from "../Audios/MediaHeader";
import { useCallback } from "react";

const TimelineExclusive = props => {

    //const accessLevel = props.context ? props.context.user.accessLevel : 0;
    const {aPree} = props;
    //const [view, setView] = useState("timeline");  

    //const [mainmedia, setMainmedia] = useState(null);
    //const [details, setDetails] = useState(aPree);
    let details = aPree;
    const [mediatype, setMediaType] = useState("");
    const [display_url, setDisplayUrl] = useState("");
    const [url, setUrl] = useState(null);
    //const [options, setOptions] = useState(null);
    //const [commentscount, setCommentsCount] = useState(aPree.comments); 
    let commentscount = aPree.comments;
    //const [operation, setOperation] = useState("timeline"); 
    let operation = "timeline";

    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);

    const loadMainMedia = useCallback(async() => {
        const user_id = aPree.user.user_id;
        if (aPree.user.has_dp === true){
            setImgView(`${process.env.PUBLIC_URL}/images/bio/display/${user_id}.jpg`);
        }else{
            setImgView(`${process.env.PUBLIC_URL}/images/bio/display/default.jpg`);
        }
        setGetMedia(true);
        return true;
    },[aPree]);

    useEffect( () => {
        if (details){
            
            if (aPree.attachment.mediatypes[0] === "audio"){
                setMediaType("audio/mp3");
                setUrl(`${process.env.PUBLIC_URL}/images/exclusives/exclusive${aPree.attachment.exclusive_id}/upload0.mp3`);
            }
            else if (aPree.attachment.mediatypes[0] === "video"){
                setMediaType("video/mp4");
                setUrl(`${process.env.PUBLIC_URL}/images/exclusives/exclusive${aPree.attachment.exclusive_id}/upload0.mp4`);
            }else if (aPree.attachment.mediatypes[0] === "image"){
                setUrl(`${process.env.PUBLIC_URL}/images/exclusives/exclusive${aPree.attachment.exclusive_id}/upload0.jpg`);
            }
            //setMainmedia(true);
            if (aPree.attachment.has_cover_art === true){
                setDisplayUrl(`${process.env.PUBLIC_URL}/images/exclusives/exclusive${aPree.attachment.exclusive_id}/display_art.jpg`);
            }

            if (!gotMedia){
                loadMainMedia();
            }
        }
        
    },[url, details, aPree, gotMedia, loadMainMedia]);

    return(
        <div className="hero">
            <div className="pree-item">
                <div className="content">
                    {(aPree.attachment.md === true || aPree.attachment.stereo === true) ? (
                        <div className="timeline-blueberry">
                           <div className="columns is-mobile no-margin">
                                <div className="column no-padding">
                                    <span className="special-header">
                                        <span className="tag" style={{textTransform:"capitalize"}}><i className="fas fa-certificate reaction-btn"></i>&nbsp; {aPree.attachment.genre}</span>  
                                    </span>
                                </div>
                                <div className="column no-padding has-text-right">
                                    <span className="special-header">
                                        <span className="tag"><i className="fas fa-cog reaction-btn"></i></span>
                                    </span>
                                </div>
                            </div>
                            <article className="message is-link">
                                <div className="message-header">
                                    <MediaHeader aPree={aPree} imgView={imgView} />
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
                                                                                    temp_url={url} mediatype={mediatype} display_url={display_url}
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
                                    <div className="exclusive-footer">
                                        <MediaFooter operation={operation} commentscount={commentscount} details={{"pree_id":aPree.pree_id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals, "comments" : aPree.comments}} />
                                    </div>
                                </div>
                                
                            </article>        
                        </div>
                    ):(
                        <div className="timeline-trendy">
                            <div className="columns is-mobile no-margin">
                                <div className="column no-padding">
                                    <span className="special-header">
                                        <span className="tag" style={{textTransform:"capitalize"}}><i className="fas fa-certificate"></i> &nbsp; {aPree.attachment.genre}</span>
                                    </span>
                                </div>
                                <div className="column no-padding has-text-right">
                                    <span className="special-header">
                                        <span className="tag"><i className="fas fa-cog reaction-btn"></i></span>
                                    </span>
                                </div>
                            </div>
                            <article className="message is-link">
                                <div className="message-header">
                                    <TrendyHeader aPree={aPree} imgView={imgView} />
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
                                    <div className="exclusive-footer">
                                        <TrendyFooter operation={operation} commentscount={commentscount} details={{"pree_id":aPree.pree_id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals,"is_approved":aPree.is_approved, "views" : aPree.attachment.views}}/>
                                    </div>
                                </div>
                                
                            </article>
                        </div>
                    )}
                
                </div>
            </div>
           <br />
        </div>
    )
}
export default withContext(TimelineExclusive);