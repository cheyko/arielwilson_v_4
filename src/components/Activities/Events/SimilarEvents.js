import React from 'react';
import withContext from '../../../withContext';
import Slider from "react-slick";
import MeetingItem from "./Meetings/MeetingItem";

const SimilarEvents = (props) => {
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

    const convertPrice = (price, currency) => {
        //console.log(price > 100);
        //console.log(currency);
        if (currency === "JMD"){
          return price
        } else if (currency === "USD"){
          return price * 150
        } else if (currency === "GBP"){
          return price * 210
        } else if (currency === "EUR"){
          return price * 180
        }    
    }

    const { event } = props;
    //check house listing similarity inside houses.
    //const imageUrls = props.context.imageUrls;
    const matches  = [] ;/*? props.context.products.filter( aProduct => (aProduct.make === aProduct.make 
    && aProduct.vehicle_id !== aProduct.vehicle_id
    && aVehicle.model.replace(/ /g,'').toLowerCase().includes(vehicle.model.replace(/ /g,'').toLowerCase())
    ) 
    ||
    (aVehicle.typeOf === vehicle.typeOf 
    && aVehicle.vehicle_id !== vehicle.vehicle_id
    && Math.abs(Number(convertPrice(aVehicle.price, aVehicle.currency)) - Number(convertPrice(vehicle.price, vehicle.currency))) < 5000000)
    ||
    (aVehicle.make === vehicle.make 
    && aVehicle.vehicle_id !== vehicle.vehicle_id
    && Math.abs(Number(convertPrice(aVehicle.price, aVehicle.currency)) - Number(convertPrice(vehicle.price, vehicle.currency))) < 5000000)
    ||
    (aVehicle.vehicle_id !== vehicle.vehicle_id
    && Math.abs(Number(convertPrice(aVehicle.price, aVehicle.currency)) - Number(convertPrice(vehicle.price, vehicle.currency))) < 5000000)
) : [];*/
    
    const carousel = matches && matches.length ?
        matches.slice(0,6).map((match, index) => (
            <div onClick={ e => window.scrollTo(0,0)} key={index}>
                <MeetingItem 
                    meeting={event}
                    key={index}
                />
            </div>
        ))
        :
        (
            <div className="column">
                <span className="title has-text-grey-light">
                    No Similar Event Found !
                </span>
            </div>   
        )

    return (
        <div className="box has-text-centered">
            <strong className="is-size-4" style={{textDecoration:"underline"}}>
                <span>  Similar Events </span>  
            </strong>
            <div className="slick-wrapper">
                <Slider {...settingsSlider}>
                    {carousel}
                </Slider>
            </div> 
            {matches && matches.length > 0 &&
                <div className="content has-text-centered">
                    <br />
                    <button className="button is-link"> View Other Similar Events</button>
                </div>
            }
        </div>
    );

}

export default withContext(SimilarEvents);