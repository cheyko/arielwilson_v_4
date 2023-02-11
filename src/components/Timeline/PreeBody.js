import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import Slider from "react-slick";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faL, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';
import { faQuoteRight } from '@fortawesome/free-solid-svg-icons';
import {Link} from "react-router-dom";
import Lightbox from 'react-image-lightbox';

const PreeBody = props => {
    
    const {aPree} = props;
    const [theUrls, setUrls] = useState(null);
    const {clickable} = props;
    const [openImage, setOpen] = useState(false);
    const [val, setVal] = useState(0);

    var settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
    };
    
    useEffect( () => {
        function getUrls(){
            if (aPree.is_media === true){
                setUrls( [...Array(aPree.attachment.no_of_media).keys()] );
                //console.log(theUrls);
            }
            //in production this will return actual list of urls
        }
        getUrls();

    },[aPree.is_media,aPree.attachment.no_of_media]);

    return(
        <div className="message-body">
            <div className="rows">
                {clickable === "expand" ?
                (
                    <Link to={`/view-pree/${aPree.pree_id}`}>
                        {aPree.is_media === true ? (
                            <div className="media-content">
                                <div className="row media-file">
                                    <div className="pree-slider-wrapper">
                                        {theUrls && theUrls.length > 0 ? (
                                            <Slider {...settings}>
                                                {theUrls.map((aUrl, index) => (
                                                    <div key={index} className="slick-slide">
                                                        {aPree.attachment.has_image === true && 
                                                        (
                                                            <div className="image-container">
                                                                <figure key={index} className="image is-1by1">
                                                                    {/*<img src={aUrl} alt="upload" />*/}
                                                                    <img className="is-normal" alt="media" src={`${process.env.PUBLIC_URL}/images/media/pree${aPree.pree_id}/post${index}`} />
                                                                </figure>
                                                            </div>
                                                        )}
                                                        {aPree.attachment.has_audio === true && (
                                                            <div className="audio-container">
                                                                <audio className="audio-playback" key={index} controls>
                                                                    {/*<source src={aUrl} type="audio/mp3"/> */}
                                                                    <source src={`${process.env.PUBLIC_URL}/images/media/pree${aPree.pree_id}/post${index}`} type="audio/mp3"/>
                                                                </audio>
                                                            </div>
                                                        )}
                                                        {aPree.attachment.has_video === true && (
                                                            <div className="video-container">
                                                                <video id="video" key={index} controls>
                                                                    {/*<source src={aUrl} type="video/mp4"/>*/}
                                                                    <source src={`${process.env.PUBLIC_URL}/images/media/pree${aPree.pree_id}/post${index}`} type="video/mp4"/>
                                                                </video>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </Slider>
                                        ):(
                                            <div className="has-text-centered">
                                                <span className="is-bold">
                                                    Loading <br /> <i className="fas fa-spinner"></i>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="row media-caption">
                                    <b> {aPree.attachment.caption} </b>
                                </div>
                            </div>
                        ):(
                            <div className="quote-container">
                                <div className="row quote-content">
                                    <b> 
                                        <FontAwesomeIcon icon={faQuoteLeft} size="1x" /> 
                                            &nbsp; {aPree.attachment.the_quote} &nbsp;
                                        <FontAwesomeIcon icon={faQuoteRight} size="1x" />  
                                    </b>
                                </div>
                            </div>
                        )}
                    </Link>
                ):(
                    <div>
                        {aPree.is_media === true ? (
                            <div className="media-content">
                                <div className="row media-file">
                                    <div className="pree-slider-wrapper">
                                        {theUrls && theUrls.length > 0 ? (
                                            <Slider {...settings}>
                                                {theUrls.map((aUrl, index) => (
                                                    <div key={index} className="slick-slide">
                                                        {aPree.attachment.has_image === true && 
                                                        (
                                                            <div className="image-container">
                                                                <figure key={index} className="image is-1by1">
                                                                    {/*<img src={aUrl} alt="upload" />*/}
                                                                    <img className="reaction-btn is-normal" alt="media" onClick={e => {setOpen(true);setVal(index)}} src={`${process.env.PUBLIC_URL}/images/media/pree${aPree.pree_id}/post${index}`} />
                                                                    {openImage && (
                                                                    <Lightbox
                                                                        key={index}
                                                                        imageTitle={aPree.attachment.caption}
                                                                        mainSrc={`${process.env.PUBLIC_URL}/images/media/pree${aPree.pree_id}/post${val}`}
                                                                        onCloseRequest={() => setOpen(false)}
                                                                        
                                                                    />)}
                                                                </figure>
                                                            </div>
                                                        )}
                                                        {aPree.attachment.has_audio === true && (
                                                            <div className="audio-container">
                                                                <audio className="audio-playback" key={index} controls>
                                                                    {/*<source src={aUrl} type="audio/mp3"/> */}
                                                                    <source src={`${process.env.PUBLIC_URL}/images/media/pree${aPree.pree_id}/post${index}`} type="audio/mp3"/>
                                                                </audio>
                                                            </div>
                                                        )}
                                                        {aPree.attachment.has_video === true && (
                                                            <div className="video-container">
                                                                <video id="video" key={index} controls>
                                                                    {/*<source src={aUrl} type="video/mp4"/>*/}
                                                                    <source src={`${process.env.PUBLIC_URL}/images/media/pree${aPree.pree_id}/post${index}`} type="video/mp4"/>
                                                                </video>
                                                            </div>
                                                        )}
                                                    </div>
                                                ))}
                                            </Slider>
                                        ):(
                                            <div className="has-text-centered">
                                                <span className="is-bold">
                                                    Loading <br /> <i className="fas fa-spinner"></i>
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="row media-caption">
                                    <b> {aPree.attachment.caption} </b>
                                </div>
                            </div>
                        ):(
                            <div className="quote-container">
                                <div className="row quote-content">
                                    <b> 
                                        <FontAwesomeIcon icon={faQuoteLeft} size="1x" /> 
                                            &nbsp; {aPree.attachment.the_quote} &nbsp;
                                        <FontAwesomeIcon icon={faQuoteRight} size="1x" />  
                                    </b>
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    )

}

export default withContext(PreeBody);