import React from 'react';
import withContext from '../../../withContext';
import VehicleItem from "./VehicleItem";
import Slider from "react-slick";

const SimilarVehicle= (props) => {
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

    const { vehicle } = props;
    //check house listing similarity inside houses.
    //const imageUrls = props.context.imageUrls;
    const matches  = props.context.vehicles ? props.context.vehicles.filter( aVehicle => (aVehicle.make === vehicle.make 
                                                    && aVehicle.vehicle_id !== vehicle.vehicle_id
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
                                                ) : [];
    
    const carousel = matches && matches.length ?
        matches.slice(0,6).map((match, index) => (
            <div onClick={ e => window.scrollTo(0,0)} key={index}>
                <VehicleItem
                    imageUrl={process.env.PUBLIC_URL + "/images/vehicles/vehicle" + match.vehicle_id + "/0.jpg"}
                    vehicle={match}
                    key={index}
                    val={index}
                />
                
            </div>
        ))
        
        
        :
        (
            <div className="column">
                <span className="title has-text-grey-light">
                    No Similar Vehicles Found !
                </span>
            </div>   
        )

    return (
        <div className="hero has-text-centered similar-container">
            <div className="hero-body similar-vehicle">
                <strong className="is-size-4" style={{textDecoration:"underline"}}>
                    <span>  Similar Vehicles </span>  
                </strong>
                <div className="slick-wrapper">
                    <Slider {...settingsSlider}>
                        {carousel}
                    </Slider>
                </div> 
                {matches.length > 0 &&
                    <div className="content has-text-centered">
                        <br />
                        <button className="button is-link"> View Other Similar Vehicles</button>
                    </div>
                }
                
            </div>
        </div>
    );

}

export default withContext(SimilarVehicle);