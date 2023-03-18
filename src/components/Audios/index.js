import React, {useState, useEffect, useCallback} from "react";
import withContext from "../../withContext";
import PreeItem from "../Timeline/PreeItem";
import TilePreeItem from "../HelperComponents/TilePreeItem";
import MediaPlayer from "./MediaPlayer";
import $ from 'jquery';

const Audios = props => {

    const [audios, renderAudios] = useState([]);
    let sessionVar = localStorage.getItem("av-section") ? localStorage.getItem("av-section") : "all";
    const [section, setSection] = useState(sessionVar);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const showAudios = useCallback( () => {
        if (props.context.user){
            let results;
            const loadAudios = props.context.prees ? props.context.prees.filter(pree => pree.is_media === true && (pree.attachment.has_audio === true || pree.attachment.has_video === true)) : [];

            switch(section){
                case "all":
                    results = loadAudios;
                    renderAudios(results);
                    break;
                case "yours":
                    results = loadAudios.filter( (pree) => pree.user.user_id === props.context.user.id);
                    renderAudios(results);
                    break;
                case "tagged":
                    results = loadAudios.filter( (pree) => pree.user.user_id === props.context.user.id);
                    renderAudios(results);
                    break;
                default:
                    break;
            }
        }
    }, [section, props.context.user]);

    useEffect( () => {
        if (section === "all" || section === "yours"){
            showAudios();
        }
    },[section, showAudios]);


    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return (
        <div className="hero">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="subtitle"><b>AUDIOVISUAL</b></h1>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <small>sections</small>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="buttons">
                            <a className={`navbar-item button ${section === "all" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("all"); localStorage.setItem("av-section","all"); toggleMenu(e)}}>
                                <i className="fas fa-play-circle" aria-hidden="true"></i> &nbsp; <strong>ALL</strong>
                            </a>

                            <a className={`navbar-item button ${section === "yours" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("yours");  localStorage.setItem("av-section","yours"); toggleMenu(e);}}>
                                <i className="fas fa-user" aria-hidden="true"></i> &nbsp; <strong>YOURS</strong> 
                            </a>

                            <a className={`navbar-item button ${section === "tagged" ? "is-active" : "is-not-active"}`} onClick={e => {setSection("tagged"); localStorage.setItem("av-section","tagged");toggleMenu(e);}}>
                                <i className="fas fa-at" aria-hidden="true"></i> &nbsp; <strong>TAGGED</strong> 
                            </a>

                            <a className={`navbar-item button ${section === "favourites" ? "is-active" : "is-not-active"}`} onClick={e => {setSection("favourites"); localStorage.setItem("av-section","favourites"); toggleMenu(e);}}>
                                <i className="fab fa-gratipay" aria-hidden="true"></i> &nbsp; <strong>FAVOURITES</strong> 
                            </a>

                            <a className={`navbar-item button ${section === "wg-stereo" ? "is-active" : "is-not-active"}`} onClick={e => {setSection("wg-stereo"); localStorage.setItem("av-section","wg-stereo");toggleMenu(e);}}>
                                <i className="fas fa-film" aria-hidden="true"></i> 
                                    &nbsp; <strong>BLUEBERRY</strong> &nbsp; 
                                <i className="fas fa-record-vinyl" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            <br />
            <div className="page-content">
                <div className="audios-div">
                    {section === "all" &&
                        (
                            <div className="all-audios prees-container">
                                <div className="Top-audios">
                                    <div className="media-header"></div>
                                    <h1> Top Audios </h1>
                                </div>
                                <hr />
                                {audios && audios.length > 0 ? (
                                    audios.map((quote, index) => (
                                        <PreeItem
                                            aPree={quote}
                                            key={index}
                                            showComments={false}
                                            clickable={"expand"}
                                        />
                                    )) 
                                ) : (
                                    <div className="column">
                                        <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                                            No Audios a Gwaan right now.
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    {section === "yours" &&
                        (
                            <div className="your-audios">
                                <div className="columns is-multiline is-mobile">
                                    {audios && audios.length > 0 ? (
                                        audios.map((quote, index) => (
                                            <div key={index} className="column tile-column is-one-third">
                                                <TilePreeItem
                                                    aPree={quote}
                                                    key={index}
                                                />
                                            </div>
                                        )) 
                                    ) : (
                                        <div className="column">
                                            <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                                                You have No Audios.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }

                    {section === "tagged" &&

                        ( 
                            <div className="tagged-audios">
                                <h1> TAGGED </h1>
                            </div>
                        )
                    }

                    {section === "wg-stereo" &&

                        ( 
                            <div className="professional-audios ">
                                <MediaPlayer />
                            </div>
                        )
                    }

                    {section === "favourites" &&
                        (
                            <div className="favourite-audios">
                                <h1> FAVOURITES </h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )

}

export default withContext(Audios);