import axios from "axios";
import React, { useState, useEffect } from "react";
import withContext from "../../../withContext";
import {useNavigate, Link} from "react-router-dom";
import Slider from "react-slick";
import { useParams } from "react-router-dom";

const ViewPage = props => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    let navigate = useNavigate();

    let {id} = useParams();

    const page_id = id;
    const [pageview, setPageView] = useState(null);
    const [mainmedia, setMainmedia] = useState([]);
    const [captionlist, setCaptionlist] = useState([]);
    const [mediatypes, setMediaTypes] = useState([]);
    //const [medianum, setMediaNum] = useState([]);
    let count = 0;
    let finder = 0;
    
    useEffect(() => {
        if (!pageview){
            const result = axios.post(`${process.env.REACT_APP_PROXY}/api/get-page`, {page_id}).then(
                (result) => {
                    if (!result){
                        console.log("there was an error when search for group details");
                    }else{
                        setPageView(result.data.page);
                    }
                }
            );
        }else{
            setMainmedia([...Array(pageview.no_of_media).keys()]);
            setCaptionlist(pageview.captionlist);
            setMediaTypes(pageview.mediatypes);
            //setMediaNum([...Array(pageview.medianum)]);
            
            
        }
    },[pageview])

    const doHide = (e) => {
        document.getElementById(e.target.id).style.display = "none";
    }



    return (
        <div className="hero">
            <div className="hero-body">
                <div className="content search-page">
                    <div className="container page-header">
                        <div className="container has-text-centered">
                            <button className="button is-pulled-left" onClick={e => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                            <div className="is-pulled-right"> 
                                <div className="dropdown is-right is-hoverable">
                                    <div className="dropdown-trigger">
                                        <button className="button is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                                            <span className="icon is-small">
                                                <b> <i className="fas fa-bars"></i> </b>
                                            </span>
                                            <span>Options</span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content" style={{padding:0}}>
                                            <span className="button dropdown-item">
                                                <Link to={`/glossa/edit-page/${page_id}`}> Edit This Page  </Link>
                                            </span>
                                            <span className="button dropdown-item">
                                                Contribute To This Page
                                            </span>
                                            <span className="button dropdown-item">
                                                Query Information
                                            </span>
                                            <span className="button dropdown-item">
                                                Report This Page
                                            </span>
                                            <span className="button dropdown-item">
                                                Add to Important
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="media is-fullwidth">
                                <div className="content is-fullwidth">
                                    <Link to="/glossa"><b className="title reaction-btn subpage-title"> <i className="fas fa-book"></i> GLOSSA </b></Link>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
                <div className="container page-body">
                    {pageview ? (
                        <>
                        <article className="message">
                            <div className="message-header">
                                <div className="columns is-fullwidth">
                                    <div className="column">
                                        <span>
                                            <span className="tag" style={{textTransform:"capitalize"}}>{pageview.pagetype}</span>
                                                {/*{" "}<i className="fas fa-edit reaction-btn" onClick={e => {setAddPT(false);checkRadio();}}></i>*/}
                                        </span>
                                    </div>
                                    <div className="column">
                                        <span className="is-pulled-right">
                                            <span className="tag">{pageview.section}</span>
                                            {/*{" "}<i className="fas fa-edit reaction-btn" onClick={e => setAddSection(false)}></i>*/}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="message-body">
                                <div className="content">
                                    <div className="heading has-text-centered">
                                        {pageview.pagetype !== "mini-biography" && 
                                            <span>
                                                <b className="subtitle">{pageview.title}</b> {""}
                                            </span> 
                                        }
                                        {pageview.pagetype === "mini-biography" && 
                                            <span>
                                                <b className="subtitle">{pageview.additional.bioname}</b>{""}
                                                <p className='columns'>
                                                    <span className="column">Date of Birth : <small>{pageview.additional.dob}</small></span> 
                                                    <span className="column">Gender : <small>{pageview.additional.gender}</small></span> 
                                                </p>
                                            </span>
                                        }
                                    </div>
                                    <div className="mainmedia">
                                        <div className="slick-wrapper has-text-centered">
                                            {pageview.has_mainmedia ? 
                                                (
                                                <>
                                                    <Slider {...settings}>
                                                        {mainmedia.map((aFile, index) => (
                                                            <div key={index} className="slick-slide slide--has-caption">
                                                                {mediatypes[index] === "image" && 
                                                                (
                                                                    <figure key={index} className="image is-1by1">
                                                                        <p> <img className="slick-slide-image" alt="media" src={`${process.env.PUBLIC_URL}/images/glossa/page${pageview.page_id}/main${index}`} /></p>
                                                                        <figcaption className="figcaption">
                                                                            {captionlist[index]}
                                                                        </figcaption>
                                                                    </figure>
                                                                    
                                                                )}
                                                                {mediatypes[index] === "audio" && (
                                                                    <audio key={index} controls>
                                                                        <source src={`${process.env.PUBLIC_URL}/images/glossa/page${pageview.page_id}/main${index}`} type="audio/mp3"/>
                                                                        <figcaption className="figcaption">
                                                                            {captionlist[index]}
                                                                        </figcaption>
                                                                    </audio>
                                                                )}
                                                                {mediatypes[index] === "video" && (
                                                                    <video key={index} width="320" height="240" controls>
                                                                        <source src={`${process.env.PUBLIC_URL}/images/glossa/page${pageview.page_id}/main${index}`} type="video/mp4"/>
                                                                        <figcaption className="figcaption">
                                                                            {captionlist[index]}
                                                                        </figcaption>
                                                                    </video>
                                                                )}
                                                            </div>                                                            
                                                        ))}
                                                    </Slider>
                                                </>
                                                ):(
                                                    <span>{""}</span>
                                                )
                                            }                                            
                                        </div>
                                    </div>
                                    <div className="body">
                                        {pageview.intro !== "" && 
                                            <span>{pageview.intro}{" "} </span> 
                                        }
                                        {(pageview.subtitles.length > 0 || pageview.subContent.length > 0 ) &&
                                            pageview.subtitles.map((aSub, index) => {
                                                return(
                                                    <div key={index}>
                                                        <br />
                                                        <div className="field has-addons">
                                                            <b className="article-subtitle">{aSub}</b>
                                                        </div>
                                                        <div className="article-subcontent">
                                                            {pageview.subcontent.length > 0 ?
                                                            <>
                                                                {pageview.subcontent[index].map((paragraph,idx) => {
                                                                    const specific = [...Array(pageview.medianum)]
                                                                    {count += 1}
                                                                    if (pageview.medianum !== null && finder <= specific[0].length && count === Number(specific[0][finder])){
                                                                        finder += 1;
                                                                        const url = `${process.env.PUBLIC_URL}/images/glossa/page${pageview.page_id}/paragraph${count}`
                                                                        return(
                                                                            <div key={idx} className="article-paragraph columns">
                                                                                <span className="column">
                                                                                    {paragraph}{" "}
                                                                                </span>
                                                                                <span id={`hideImg${count -1}`} className="column is-one-quarter">
                                                                                    <figure key={index} className="image is-1by1">
                                                                                        <p> <img className="slick-slide-image" id={`hideImg${count -1}`} alt="media" src={url} onError={e => doHide(e)} /></p>
                                                                                        <figcaption className="figcaption">
                                                                                            <span>Test Caption</span>
                                                                                        </figcaption>
                                                                                    </figure>
                                                                                    
                                                                                </span>
                                                                            </div>
                                                                        )
                                                                    }else{
                                                                        return(
                                                                        <span key={idx} className="column">
                                                                            {paragraph}{" "}
                                                                        </span>);
                                                                    }
                                                                
                                                                })}
                                                                
                                                                {console.log("medianum is: " + typeof(pageview.medianum))}
                                                                
                                                            </>
                                                            :
                                                            <>
                                                                <span></span>
                                                            </>}
                                                        </div>
                                                    </div>
                                                )}
                                            )}

                                    </div>
                                </div>
                            </div>
                        </article>
                        
                        </>
                    ):(
                        <>
                            <div className="hero">
                                <div className="hero-body">
                                    <span>Page information was not found</span>
                                </div>

                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    )
    
    
}
export default withContext(ViewPage);