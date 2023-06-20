import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import { useNavigate, useParams } from "react-router-dom";
//import Slider from "react-slick";
import TrendyControls from "./TrendyControls";
import TrendyFooter from "./TrendyFooter";
import TrendyImage from "./TrendyImage";
import TrendyQuote from "./TrendyQuote";
import TrendyHeader from "./TrendyHeader";
import { useCallback } from "react";

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
    let view = "view";
    let {id} = useParams();
    //const [mainmedia, setMainmedia] = useState(null);
    //const [details, setDetails] = useState(null);
    //const [mediatype, setMediaType] = useState("");
    const [url, setUrl] = useState("");
    const [options, setOptions] = useState(null); //details such as playback and unlock_fee, etc.
    const [operation, setOperation] = useState("view"); 
    //const aPree = props.context.getPree(id);
    const [aPree, setAPree] = useState(null);
    const [commentscount, setCommentsCount] = useState(0); 
    //const [returnHome, setReturn] = useState(false);

    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);
        
    const loadMainMedia = useCallback( () => {
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
        setOperation(view);
        window.scroll(0,0);
        if (aPree){
            setCommentsCount(aPree.comments);
            setUrl(`${process.env.PUBLIC_URL}/images/exclusives/exclusive${aPree.attachment.exclusive_id}/upload0.jpg`);

            if (!gotMedia){
                loadMainMedia();
            }
        }
        if (aPree === null){
            props.context.getPree(id).then((promise) => {
                setAPree(promise);
            });
        }
    },[url, aPree, view, commentscount, gotMedia, id, loadMainMedia, props.context]);

    const updateSettings = () => {

    }

    /*const goToUpload = () => {
        localStorage.setItem("trendy-view","upload");
        localStorage.setItem("mag-section","wg-influence");
        props.context.setMenuChoice("images");
        navigate('/images');
    }*/

    const goToTrendy = () => {
        localStorage.setItem("trendy-view","main");
        localStorage.setItem("mag-section","wg-influence");
        props.context.setMenuChoice("images");
        navigate('/images');
    }

    return(
        <div className="hero">
            {aPree ? 
                <div className="exclusive-content">
                    <section className="page-header">
                        <div className="container">
                            <div className="container page-header has-text-centered">
                                <button className="button is-small is-pulled-left is-info" onClick={e => navigate(-1) }> <i className="fas fa-arrow-circle-left"></i> </button>
                                {/*<div className="is-pulled-right"> 
                                    <div className="dropdown is-right is-hoverable">
                                        <div className="dropdown-trigger">
                                            <button className="button is-small is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                                                <span className="icon is-small">
                                                    <b> <i className="fas fa-bars"></i> </b>
                                                </span>
                                                
                                            </button>
                                        </div>
                                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                            <div className="dropdown-content" style={{padding:0}}>
                                                <span className="button dropdown-item" onClick={e => goToUpload()}>
                                                    Upload Media
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
            </div>*/}
                                
                                <div className="media is-fullwidth">
                                    <div className="content is-fullwidth">
                                        <b className="title reaction-btn subpage-title" onClick={e => goToTrendy()}> 
                                            <i className="fas fa-scroll"></i> 
                                                {" "}TRENDY INFLUENCE{" "}
                                            <i className="fas fa-camera-retro"></i> 
                                        </b>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <br />
                    <div className="page-body">
                        <div className="columns is-mobile no-margin">
                            <div className="column no-padding">
                                <span className="special-header">
                                    <span className="tag" style={{textTransform:"capitalize"}}><i className="fas fa-certificate"></i>&nbsp; {aPree.attachment.genre}</span>
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
                                                <div className="exclusive-footer">
                                                    <TrendyFooter operation={operation} commentscount={commentscount} details={{"pree_id":aPree.pree_id,"theDate":aPree.date_added.split(" "), "genre":aPree.attachment.genre, "playback":aPree.attachment.playback, "approvals": aPree.approvals, "disapprovals": aPree.disapprovals,"is_approved":aPree.is_approved, "views" : aPree.attachment.views}}/>
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
export default withContext(ViewTrend);