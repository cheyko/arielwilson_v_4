import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import { useNavigate, Navigate } from "react-router-dom";
//import Slider from "react-slick";
import TrendyControls from "./TrendyControls";
import TrendyHeader from "./TrendyHeader";
import TrendyImage from "./TrendyImage";
import TrendyQuote from "./TrendyQuote";

const ViewTrend = props => {

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
    const pree_id = props.match.params.id;
    //const [mainmedia, setMainmedia] = useState(null);
    //const [details, setDetails] = useState(null);
    //const [mediatype, setMediaType] = useState("");
    const [url, setUrl] = useState("");
    const [options, setOptions] = useState(null); //details such as playback and unlock_fee, etc.
    const [operation, setOperation] = useState("view"); 
    const aPree = props.context.getPree(pree_id);
    const [commentscount, setCommentsCount] = useState(aPree.comments); 
    const [returnHome, setReturn] = useState(false);

    useEffect( () => {
        setOperation(view);
        window.scroll(0,0);
        if (aPree){
            /*if (aPree.attachment.mediatypes[0] == "audio"){
                setMediaType("audio/mp3");
            }
            else if (aPree.attachment.mediatypes[0] == "video"){
                setMediaType("video/mp4");
            }*/
            //setMainmedia(true);
            setUrl(process.env.PUBLIC_URL + "/images/exclusives/exclusive" + aPree.attachment.exclusive_id + "/upload0");
        }
    },[url, aPree, view]);

    const updateSettings = () => {

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
                                        <div className="dropdown-content" style={{padding:0}}>
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
                                <div className="content is-fullwidth">
                                    <b className="title reaction-btn subpage-title" onClick={e => setView("main")}> 
                                        <i className="fas fa-scroll"></i> 
                                            {" "}TRENDY INFLUENCE{" "}
                                        <i className="fas fa-camera-retro"></i> 
                                    </b>
                                    {returnHome && (
                                        <Navigate to="/images" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <div className="page-body">
                    <article className="message is-link">
                        <div className="message-header">
                            <TrendyHeader operation={operation} commentscount={commentscount} details={{"pree_id":aPree.pree_id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals, "views" : aPree.attachment.views}}/>
                        </div>
                        <div className="message-body no-padding">
                            <div className="content">
                                <div className="columns no-margin is-multiline">
                                    <div className="media-item column is-half no-padding">
                                        <div className="container">
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
                                    <div className="column no-padding">
                                        <div className="card">
                                            <div className="trendy-controls">
                                                <div>
                                                    <TrendyControls operation={operation} setCommentsCount={setCommentsCount} details={aPree} options={options} setOptions={setOptions} updateSettings={updateSettings}/>
                                            
                                                </div>
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
export default withContext(ViewTrend);