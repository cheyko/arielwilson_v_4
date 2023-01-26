import React, {useState, useEffect} from "react";
import withContext from "../../withContext";
import PreeItem from "../Timeline/PreeItem";
import TilePreeItem from "../HelperComponents/TilePreeItem";

const Videos = props => {

    const loadVideos = props.context.prees ? props.context.prees.filter(pree => pree.is_media === true && pree.attachment.has_video === true) : [];
    const [videos, renderVideos] = useState([]);
    const [section, setSection] = useState("all");

    useEffect( () => {
        if (section === "all" || section === "yours"){
            showVideos();
        }
    },[section]);

    const showVideos = () => {
        let results;
        switch(section){
            case "all":
                results = loadVideos;
                renderVideos(results);
                break;
            case "yours":
                results = loadVideos.filter( (pree) => pree.user.user_id === props.context.user.id);
                renderVideos(results);
                break;
            case "tagged":
                results = loadVideos.filter( (pree) => pree.user.user_id === props.context.user.id);
                renderVideos(results);
                break;
            default:
                break;
        }
    }

    return (
        <div className="hero">
             <div className="videos-page hero-body">
                <div className="tabs-container-plus">
                    <div className="tabs-header wgr-tabs">                      
                        <div className="card box-bg header-container">
                            <div className="has-text-centered">
                                <h1 className="custom-heading subtitle"><b>VIDEOS</b></h1>
                            </div>
                            <div className="tabs-bg custom-tabs tabs is-fullwidth card">
                                <ul>
                                    <li>
                                        <button 
                                            className={`button ${section === "all" ? "is-active" : "is-not-active"}`}
                                            onClick={e => {
                                                //showvideos(e,"all");
                                                setSection("all");
                                                showVideos();
                                            }} 
                                        >
                                            <span className="icon is-small">
                                                <i style={{fontSize:"x-large"}} className="fas fa-quote-left" aria-hidden="true"></i>
                                            </span>
                                            {" "}
                                            <span className="icon is-small">
                                                <i style={{fontSize:"x-large"}} className="fas fa-quote-right" aria-hidden="true"></i>
                                            </span>
                                            &nbsp;
                                            <span className="tabs-title"> ALL </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button  
                                            className={`button ${section === "yours" ? "is-active" : "is-not-active"}`} 
                                            onClick={e => {
                                                //showvideos(e,"yours");
                                                setSection("yours");
                                                showVideos();
                                            }} 
                                        >
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-user" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> YOURS </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`button ${section === "tagged" ? "is-active" : "is-not-active"}`} 
                                            onClick={e => {
                                                //showvideos(e,"yours");
                                                setSection("tagged");
                                            }} 
                                        >
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-at" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> TAGGED </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button  
                                            className={`button ${section === "favourites" ? "is-active" : "is-not-active"}`}
                                            onClick={e => {
                                                //showvideos(e,"yours");
                                                setSection("favourites");
                                            }} 
                                        >
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fab fa-gratipay" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> FAVOURITES </span>
                                        </button>
                                    </li>
                                    <li>
                                        <button 
                                            className={`button ${section === "wg-influence" ? "is-active" : "is-not-active"}`}
                                            onClick={e => {
                                                //showvideos(e,"yours");
                                                setSection("wg-md");
                                            }} 
                                        >
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-film" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> WG MAX-DEFINITION* </span>
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="custom-page-content">
                    <div className="videos-div">
                        {section === "all" &&
                            (
                                <div className="all-videos prees-container">
                                    <div className="Top-videos">
                                        <div className="media-header"></div>
                                        <h1> Top videos </h1>
                                    </div>
                                    <hr />
                                    {videos && videos.length > 0 ? (
                                        videos.map((item, index) => (
                                            <PreeItem
                                                aPree={item}
                                                key={index}
                                                showComments={false}
                                                clickable={"view"}
                                            />
                                        )) 
                                    ) : (
                                        <div className="column">
                                            <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                                                No videos a Gwaan right now.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        {section === "yours" &&
                            (
                                <div className="your-videos">
                                    <div className="columns is-multiline is-mobile">
                                        {videos && videos.length > 0 ? (
                                            videos.map((quote, index) => (
                                                <div key={index} className="column video-column is-one-third">
                                                    <TilePreeItem
                                                        aPree={quote}
                                                        key={index}
                                                    />
                                                </div>
                                            )) 
                                        ) : (
                                            <div className="column">
                                                <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                                                    You have No videos.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }

                        {section === "tagged" &&

                        ( 
                            <div className="tagged-videos">
                                <h1> TAGGED </h1>
                            </div>
                        )
                        }

                        {section === "wg-md" &&

                            ( 
                                <div className="professional-videos">
                                    <h1>WG MAX-DEFINITION</h1>
                                </div>
                            )
                        }

                        {section === "favourites" &&
                            (
                                <div className="favourite-videos">
                                    <h1> FAVOURITES </h1>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Videos);