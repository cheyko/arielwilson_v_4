import React, {useState, useEffect, useCallback, useMemo} from "react";
import withContext from "../../withContext";
import PreeItem from "../Timeline/PreeItem";
import TilePreeItem from "../HelperComponents/TilePreeItem";
import Trendy from "./Trendy";
import "./index.css";
import $ from 'jquery';

const Images = props => {

    const loadImages = useMemo(() => props.context.prees ? props.context.prees.filter(pree => (pree.is_media === true && pree.attachment.has_image === true) || pree.is_media === false) : [],[props.context.prees]);
    const [images, renderImages] = useState([]);
    let sessionVar = localStorage.getItem("mag-section") ? localStorage.getItem("mag-section") : "all";
    const [section, setSection] = useState(sessionVar);
    //const [showDropDown, setShowDropDown] = useState(false);
    //const [showMore, setShowMore] = useState(false);

    const showImages = useCallback( () => {
        if (props.context.user){
            let results;
            switch(section){
                case "all":
                    results = loadImages;
                    renderImages(results);
                    break;
                case "yours":
                    results = loadImages.filter( (pree) => pree.user.user_id === props.context.user.id);
                    renderImages(results);
                    break;
                case "tagged":
                    results = loadImages.filter( (pree) => pree.user.user_id === props.context.user.id);
                    renderImages(results);
                    break;
                default:
                    break;
            }
        }
    },[loadImages, props.context.user,section]);

    useEffect( () => {
        if (section === "all" || section === "yours"){
            showImages();
        }
    },[section, showImages]);

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return (
        <div className="hero">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <span className="navbar-item">
                        <h1 className="subtitle"><b>MAGAZINE</b></h1>
                    </span>

                    <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <small>sections</small>
                    </span>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="buttons">
                            <span className={`navbar-item button ${section === "all" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("all"); localStorage.setItem("mag-section","all"); toggleMenu(e);}}>
                                <i className="fas fa-images" aria-hidden="true"></i> &nbsp;<strong>ALL</strong>
                            </span>

                            <span className={`navbar-item button ${section === "yours" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("yours"); localStorage.setItem("mag-section","yours"); toggleMenu(e);}}>
                                <i className="fas fa-user" aria-hidden="true"></i> &nbsp;<strong>YOURS</strong>
                            </span>

                            <span className={`navbar-item button ${section === "tagged" ? "is-active" : "is-not-active"}`} onClick={e => {setSection("tagged"); localStorage.setItem("mag-section","tagged"); toggleMenu(e);}}>
                                <i className="fas fa-at" aria-hidden="true"></i> &nbsp;<strong>TAGGED</strong>
                            </span>

                            <span className={`navbar-item button ${section === "favourites" ? "is-active" : "is-not-active"}`} onClick={e => {setSection("favourites"); localStorage.setItem("mag-section","favourites"); toggleMenu(e);}}>
                                <i className="fab fa-gratipay" aria-hidden="true"></i> &nbsp;<strong>FAVOURITES</strong> 
                            </span>
                            
                            <span onClick={ e => { setSection("wg-influence"); localStorage.setItem("mag-section","wg-influence"); toggleMenu(e);}} className={`navbar-item button ${section === "wg-influence" ? "is-active" : "is-not-active"}`}>
                                <i className="fas fa-scroll" aria-hidden="true"></i> 
                                &nbsp;<strong>TRENDY</strong>&nbsp;
                                <i className="fas fa-camera-retro" aria-hidden="true"></i> 
                            </span>
                        </div>
                    </div>
                </div>
            </nav>
            <br />
            <div className="page-content">
                <div className="images-div">
                    {section === "all" &&
                        (
                            <div className="all-images prees-container">
                                <div className="Top-images">
                                    <div className="media-header"></div>
                                    <h1> Top Images </h1>
                                </div>
                                <hr />
                                {images && images.length > 0 ? (
                                    images.map((quote, index) => (
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
                                            No Images a Gwaan right now.
                                        </span>
                                    </div>
                                )}
                            </div>
                        )
                    }
                    {section === "yours" &&
                        (
                            <div className="your-images">
                                <div className="columns is-multiline is-mobile p-0 m-0">
                                    {images && images.length > 0 ? (
                                        images.map((quote, index) => (
                                            <div key={index} className="column p-0 m-0 tile-column is-one-third-desktop is-one-third-tablet is-half-mobile">
                                                <TilePreeItem
                                                    aPree={quote}
                                                    key={index}
                                                />
                                            </div>
                                        )) 
                                    ) : (
                                        <div className="column">
                                            <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                                                You have No Images.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )
                    }

                    {section === "tagged" &&
                        ( 
                            <div className="tagged-images">
                                <h1> TAGGED </h1>
                            </div>
                        )
                    }

                    {section === "wg-influence" &&

                        ( 
                            <div className="professional-images">
                                <Trendy />
                            </div>
                        )
                    }

                    {section === "favourites" &&
                        (
                            <div className="favourite-images">
                                <h1> FAVOURITES </h1>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    )
}

export default withContext(Images);