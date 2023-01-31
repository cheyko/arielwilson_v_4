import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
//import Slider from "react-slick";
import MediaHeader from "./MediaHeader";
import MediaControls from "./MediaControls";
import MediaInfo from "./MediaInfo";
import MusicPlayer from "./MusicPlayer";
import VideoPlayer from "./VideoPlayer";


const ViewMediaItem = props => {

    //const accessLevel = props.context ? props.context.user.accessLevel : 0;

    /*var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };*/

    let navigate = useNavigate();
    const [view, setView] = useState("view");
    let {id} = useParams();
    const [mainmedia, setMainmedia] = useState(null);
    //const [details, setDetails] = useState(null);
    const [mediatype, setMediaType] = useState("");
    const [url, setUrl] = useState("");
    const [options, setOptions] = useState(null); //details such as playback and unlock_fee, etc.
    const [operation, setOperation] = useState("view"); 
    const aPree = props.context.getPree(id);
    const [commentscount, setCommentsCount] = useState(aPree.comments); 
    const [returnHome, setReturn] = useState(false);

    useEffect( () => {
        window.scroll(0,0);
        if (aPree){
            if (aPree.attachment.mediatypes[0] === "audio"){
                setMediaType("audio/mp3");
            }
            else if (aPree.attachment.mediatypes[0] === "video"){
                setMediaType("video/mp4");
            }
            setMainmedia(true);
            setUrl(process.env.PUBLIC_URL + "/images/exclusives/exclusive" + aPree.attachment.exclusive_id + "/upload0");
        }
    },[url, aPree]);

    const updateSettings = () => {
        console.log(view);
        setOperation("edit");
    }

    return(
        <div className="hero">
            <div className="exclusive-content">
                <section className="page-header">
                    <div className="container">
                        <div className="container page-header has-text-centered">
                            <button className="button is-small is-pulled-left is-info" onClick={e => navigate(-1) }> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                            <div className="is-pulled-right"> 
                                <div className="dropdown is-right is-hoverable">
                                    <div className="dropdown-trigger">
                                        <button className="button is-small is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                                            <span className="icon is-small">
                                                <b> <i className="fas fa-bars"></i> </b>
                                            </span>
                                            <span>Options</span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-container" style={{padding:0}}>
                                            <span className="button dropdown-item" onClick={e => setView("upload")}>
                                                Upload Audio
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("resource")}>
                                                View Recent 
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("important")}>
                                                View Playlist  
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("live")}>
                                                Live ?
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="media is-fullwidth">
                                <div className="container is-fullwidth">
                                    <b className="title reaction-btn subpage-title" onClick={e => setReturn(true) }> <i className="fas fa-record-vinyl"></i> BLUEBERRY MD-STEREO ! </b>
                                    {returnHome && (
                                        <Navigate to="/audios" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-body">
                    <article className="message is-link">
                        <div className="message-header">
                            <MediaHeader operation={operation} commentscount={commentscount} details={{"id":aPree.id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals, "views" : aPree.attachment.views}} />
                        </div>
                        <div className="message-body no-padding">
                            <div className="container">
                                <div className="columns no-margin is-multiline">
                                    <div className="media-item column is-half no-padding">
                                        <div>
                                            <div className="mainmedia">
                                                {mainmedia ? 
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
                                                            <MediaInfo operation="upload" details={{"description":aPree.attachment.description}} />
                                                        </>
                                                    ):(
                                                        <span>{""}</span>
                                                    )
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-half media-item no-padding">
                                        <div className="media-controls">
                                            <div>
                                                <MediaControls operation={operation} setCommentsCount={setCommentsCount} details={aPree} options={options} setOptions={setOptions} updateSettings={updateSettings}/>
                                            </div>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </article>
                        
                </div>
                <footer className="footer" style={{backgroundColor:"tan"}}>
                    <h1>Footer</h1>
                </footer>
            </div>
        </div>
    )
}
export default withContext(ViewMediaItem);