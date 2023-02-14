import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import { Navigate, useNavigate, useParams } from "react-router-dom";
//import Slider from "react-slick";
import MediaFooter from "./MediaFooter";
import MediaControls from "./MediaControls";
import MediaInfo from "./MediaInfo";
import MusicPlayer from "./MusicPlayer";
import VideoPlayer from "./VideoPlayer";
import MediaHeader from "./MediaHeader";


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
    const [display_url, setDisplayUrl] = useState("");
    //const [details, setDetails] = useState(null);
    const [mediatype, setMediaType] = useState("");
    const [url, setUrl] = useState("");
    const [options, setOptions] = useState(null); //details such as playback and unlock_fee, etc.
    const [operation, setOperation] = useState("view"); 
    //const aPree = props.context.getPree(id);
    const [aPree, setAPree] = useState(null);
    const [commentscount, setCommentsCount] = useState(0); 
    const [returnHome, setReturn] = useState(false);

    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);
        
    const loadMainMedia = () => {
        const user_id = aPree.user.user_id;
        if (aPree.user.has_dp === true){
            setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + user_id);
        }else{
            setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
        }
        setGetMedia(true);
        return true;
    }

    useEffect( () => {
        window.scroll(0,0);
        if (aPree){
            if (aPree.attachment.mediatypes[0] === "audio"){
                setMediaType("audio/mp3");
            }
            else if (aPree.attachment.mediatypes[0] === "video"){
                setMediaType("video/mp4");
            }
            setCommentsCount(aPree.comments);
            setMainmedia(true);
            setUrl(process.env.PUBLIC_URL + "/images/exclusives/exclusive" + aPree.attachment.exclusive_id + "/upload0");
            if (aPree.attachment.has_cover_art === true){
                setDisplayUrl(process.env.PUBLIC_URL + "/images/exclusives/exclusive" + aPree.attachment.exclusive_id + "/display_art");
            }

            if (!gotMedia){
                loadMainMedia();
            }
        }
        if (aPree === null){
            props.context.getPree(id).then((promise) => {
                setAPree(promise);
            });
        }
    },[url, aPree, view, commentscount, gotMedia]);

    const updateSettings = () => {
        setOperation("edit");
    }
    const goToBlueBerry = () => {
        localStorage.setItem("bb-view","main");
        localStorage.setItem("av-section","wg-stereo");
        props.context.setMenuChoice("audios");
        navigate('/audios');
    }

    return(
        <div className="hero">
            {aPree ?
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
                                    <b className="title reaction-btn subpage-title" onClick={e => goToBlueBerry() }> <i className="fas fa-record-vinyl"></i> BLUEBERRY MD-STEREO ! </b>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-body">
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
                                                            <div className="exclusive-footer">
                                                                <MediaFooter operation={operation} commentscount={commentscount} details={{"pree_id":aPree.pree_id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals, "views" : aPree.attachment.views}} />
                                                            </div>
                                                            <MediaInfo operation={operation} details={{"description":aPree.attachment.description}} />
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
            :
                <div className="hero-container">
                    <div className="hero-body">
                        <span className="is-size-3" style={{color:"gray"}}>
                            Pree is not found !
                        </span>
                    </div>
                </div>
            }
        </div>
    )
}
export default withContext(ViewMediaItem);