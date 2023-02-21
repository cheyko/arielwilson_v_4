import React from 'react';
import withContext from '../../../withContext';
import PFLItem from "./PFLItem";
import Slider from "react-slick";

const SimilarListing = (props) => {
    const settingsSlider = {
        mobileFirst: true,
        speed:1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '10px'
    };
    const { listing } = props;
    //check house listing similarity inside houses.
    //const imageUrls = props.context.imageUrls;
    const matches  = props.context.listings ? props.context.listings.filter( aListing => (aListing.category === listing.category 
                                                    && aListing.typeOf === listing.typeOf
                                                    && aListing.title !== listing.title
                                                    ) 
                                                    ||
                                                    (aListing.category === listing.category 
                                                    && aListing.typeOf === listing.typeOf
                                                    && aListing.title !== listing.title
                                                    && Math.abs(Number(aListing.price) - Number(listing.price)) < 10000000)
                                                ) : [];
    
    const carousel = matches && matches.length ?
        matches.slice(0,6).map((match, index) => (
            <div onClick={ e => window.scrollTo(0,0)} key={index}>
                <PFLItem
                    imageUrl={process.env.PUBLIC_URL + "/images/listings/listing" + match.listing_id + "/0"}
                    listing={match}
                    key={index}
                    val={index}
                />
                
            </div>
        ))
        
        
        :
        (
            <div className="column">
                <span className="title has-text-grey-light">
                    No Similar Properties Found !
                </span>
            </div>   
        )

    return (
        <div className="hero has-text-centered similar-container">
            <div className="hero-body similar-listings">
                <strong className="is-size-4" style={{textDecoration:"underline"}}>
                    <span> Similar Properties </span> 
                </strong>
                <div className="slick-wrapper">
                    <Slider {...settingsSlider}>
                        {carousel}
                    </Slider>
                </div> 
                {matches.length > 0 &&
                    <div className="content has-text-centered">
                        <br />
                        <button className="button is-link"> View Other Similar Listings</button>
                    </div>
                }
                
            </div>
        </div>
    );

}

export default withContext(SimilarListing);