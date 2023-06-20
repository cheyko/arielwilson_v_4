import React from 'react';
import withContext from '../../../../withContext';
import Slider from "react-slick";
import PropertyItem from "./PropertyItem";

const SimilarProperties = (props) => {
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

    const { property } = props;
    const matches  = [] ;

    
    const carousel = matches && matches.length ?
        matches.slice(0,6).map((match, index) => (
            <div onClick={ e => window.scrollTo(0,0)} key={index}>
                <PropertyItem 
                    property={match}
                    key={index}
                />
            </div>
        ))
        :
        (
            <div className="column">
                <span className="title has-text-grey-light">
                    No Property Event Found !
                </span>
            </div>   
        )

    return (
        <div className="box has-text-centered">
            <strong className="is-size-4" style={{textDecoration:"underline"}}>
                <span>  Similar Properties </span>  
            </strong>
            <div className="slick-wrapper">
                <Slider {...settingsSlider}>
                    {carousel}
                </Slider>
            </div> 
            {matches && matches.length > 0 &&
                <div className="content has-text-centered">
                    <br />
                    <button className="button is-link"> View Other Similar Properties</button>
                </div>
            }
        </div>
    );

}
export default withContext(SimilarProperties);
