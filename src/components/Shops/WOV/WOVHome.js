import React, {useState} from "react";
import withContext from "../../../withContext";
import "./index.css";
import VehicleItem from "./VehicleItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCarAlt, faMoneyCheckAlt, faMotorcycle, faTruckMonster } from '@fortawesome/free-solid-svg-icons'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { faShuttleVan} from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

import { faTaxi } from '@fortawesome/free-solid-svg-icons'
import { faRoad } from '@fortawesome/free-solid-svg-icons'
import { faKey } from '@fortawesome/free-solid-svg-icons'
import { faMoneyBill } from '@fortawesome/free-solid-svg-icons'
import { faTools } from '@fortawesome/free-solid-svg-icons'
import { faTruckPickup } from '@fortawesome/free-solid-svg-icons'

import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { faInfo} from '@fortawesome/free-solid-svg-icons'
import { faBus } from '@fortawesome/free-solid-svg-icons'
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons'


const WOVHome = props => {

    var placeholders = [
        {id : 0 , text : "test 0"},
        {id : 1 , text : "test 1"},
        {id : 2 , text : "test 2"},
        {id : 3 , text : "test 3"},
        {id : 4 , text : "test 4"},
        {id : 5 , text : "test 5"},
    ]

    /*var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };*/

    const settingsThumbs = {
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        margin: '5px',
        centerPadding: '10px',
        responsive:[
          {
            breakpoint: 600,
            settings: {
                slidesToShow: 1,
            }
          },
          {
            breakpoint: 1000,
            settings: {
                slidesToShow: 2,
            }
          },
          {
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
            }
          }
        ]
    };
    
    const [searchval, setSearch] = useState("");
    //const imageUrls = []; //props.context;
    //const listings = props.context.listings ? (props.context.listings.length > 5 ? (props.context.listings.slice(0,6)) : props.context.listings ) : null ;
    const vehicles = props.context.vehicles ? (props.context.vehicles.length > 5 ? (props.context.vehicles.slice(0,6)) : props.context.vehicles ) : null ;

    const [showDropDownLeft, setShowDropDownLeft] = useState(false);
    const [showDropDownMid, setShowDropDownMid] = useState(false);
    const [showDropDownRight, setShowDropDownRight] = useState(false);

    return(
        <div className="market-home">
            <div className="hero wov-bg-one is-medium">
                <div className="hero-body has-text-centered">
                    <br /><br />
                    <h1 className="title slogan" style={{color: "green"}}> Vehicles Galore ! ... WOV !!!!</h1>
                    <form>
                        <div className="field has-addons searchbar" style={{display: "inline-flex"}}>
                            <div className="control">
                                <input className="input is-focused" onChange={setSearch} type="text" placeholder="Search WOV ....."/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-link is-rounded is-focused"> Search </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="carlistContainer has-text-centered">
                <h3 className="title is-3 box" style={{color: "Black"}}> View a Wide Range of Vehicles </h3>
                <div className="item-box box">
                    <div className="automobile-sales content"> 
                        <h1> Automobile Sales </h1>
                        <div className="box">
                            <div className="slick-wrapper has-text-centered">
                                {vehicles && vehicles.length > 0 ? (
                                    <Slider {...settingsThumbs}>
                                        {vehicles.map((vehicle, index) => (
                                            <div className="slick-slide" key={index}>
                                                <VehicleItem
                                                    imageUrl={process.env.PUBLIC_URL + "/images/vehicles/vehicle" + vehicle.vehicle_id + "/0"}
                                                    vehicle={vehicle}
                                                    key={index}
                                                    page={"home"}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <div className="column">
                                        <span className="title has-text-grey-light">
                                            No Vehicles available at this time!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="control">
                    <button 
                        className="button is-link"
                        onClick={e => {
                            //props.setPFView('All');
                            //props.setShowPFHome(false);
                            //props.setShowPFList(true);
                        }}
                    > 
                        Explore More Vehicles
                    </button> 
                </div>
                </div>

                <div className="item-box box">
                    <div className="accomadations content"> 
                        <h1> Travelling </h1>
                        <div className="box">
                            <div className="slick-wrapper has-text-centered">
                                <Slider {...settingsThumbs}>
                                    {placeholders.map((aSpot, index) => (
                                        <div key={index} className="slick-slide">
                                            <h3> {aSpot.text} </h3>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                        </div>
                    </div>
                    <div className="control">
                        <button className="button is-link"> Explore Other Options </button> 
                    </div>
                </div>
            
            </div>
            <div className="hero">
                <div className="hero-body">
                    <div className="box">
                        <h4 className="subtitle">
                            This Platform lists Cars, Buses, Vans, Pick-Up Trucks, Trucks, Trailers and all other vehicles of all types and sizes;
                            for sale. Find Electrice, Gas or Diesel Vehicles as well as if you are looking for a Vehicle with 
                            Automatic Transmission or in with a manual Transmission. Vehicles of all Models, Makes, Color, Country of Origin and 
                            Manufacturing Year are listed on this Platform.
                        </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            'World of Vehicle' is also a platform that offers vehicle rentals as well as Vehicles for Hire.</h4>
                        <hr></hr>
                        <h4 className="subtitle">
                             Search 'World of Vehicle' for the best Vehicle Parts for repairs and services. 
                         </h4>
                    </div>
                    <div className="columns is-multiline has-text-centered">
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faPiggyBank} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faMoneyCheckAlt} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Vehicle Sales</div>
                                </div>
                                <div className="card-content">
                                    <p> Find your dream car by searching through a plethora of reliable and 
                                        wonderful list of vehicles. Get the next best deal. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Search Vehicles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faHandHoldingUsd} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faShuttleVan} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Put-Up a Vehicle</div>
                                </div>
                                <div className="card-content">
                                    <p> Place your Vehicle or Vehicles on World of Vehicle and secure a fast and 
                                        garanteed sale; locally or even internationally.  
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Add Vehicles
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faWallet} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faCarAlt} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Rent a Vehicle</div>
                                </div>
                                <div className="card-content">
                                    <p> Finding Rentals can be hard, search through our Listings to find the 
                                        ideal, reliable and most cost effective rental for your style and/or purpose.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Get Rental
                                        </button>
                                    </div>
                                </div>    
                            </div>
                        </div>
                        
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faBus} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faRoad} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Get Transported to your Destination</div>
                                </div>
                                <div className="card-content">
                                    <p> Find the ideal means of Transportation; search through the many 
                                        modes of transport and select your preference. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Get Transported
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faKey} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faMoneyBill} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Get Bookings, Post your Rentals now !</div>
                                </div>
                                <div className="card-content">
                                    <p> Increase the income of your business by securing more bookings;
                                        World of Vehicle provides a secure and reliable process that will ensure your
                                        rental is available.  
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Secure Rentees
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faTools} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faTruckPickup} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Get Your Vehicle Serviced or Repaired</div>
                                </div>
                                <div className="card-content">
                                    <p> 
                                        Get your vehicle services at one of our many trusted garages.
                                        WOV will ensure that your needs are met as the process is
                                        well documented and the priority is to ensure success. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Visit Garages
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faShieldAlt} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faTruckMonster} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Get your Vehicle Secured </div>
                                </div>
                                <div className="card-content">
                                    <p> .........
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Get .... C
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faInfo} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faMotorcycle} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> World Of Vehicles Information </div>
                                </div>
                                <div className="card-content">
                                    <p>  
                                        World of Vehicle Info is up to date with the Automobile Sector. See the latest
                                        innovations and features in the Vehicle World. Stay abreast visit WOV-Info Today. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            View Details
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faPeopleCarry} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faTaxi} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> World of Vehicle Partners </div>
                                </div>
                                <div className="card-content">
                                    <p> Register your Car Mart or Garage with WOV-Partners.
                                        Become a transporter or join the team of Associates providing our many services to customers.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            WOV-Partnerships
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="columns is-mobile is-multiline has-text-centered">
                        <div className="column">
                            <div id="left-dropdown" className={`dropdown ${showDropDownLeft ? "is-active" : ""}`} >
                                <div className="dropdown-trigger">
                                    <button onClick={ e => setShowDropDownLeft(!showDropDownLeft)} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span> Left Dropdown </span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <button onClick={e => console.log('test 1')} className="button dropdown-item">
                                            opt 1
                                        </button>
                                        <button onClick={e => console.log('test 2')} className="button dropdown-item">
                                            opt 2
                                        </button>
                                        <button onClick={e => console.log('test 3')} className="button dropdown-item">
                                            opt 3
                                        </button>
                                        <button onClick={e => console.log('test 4')} className="button dropdown-item">
                                            opt 4
                                        </button>
                                        <button onClick={e => console.log('test 5')} className="button dropdown-item">
                                            opt 5
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div id="mid-dropdown" className={`dropdown ${showDropDownMid ? "is-active" : ""}`} >
                                <div className="dropdown-trigger">
                                    <button onClick={ e => setShowDropDownMid(!showDropDownMid)} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span> Middle Dropdown </span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <button onClick={e => console.log('test 1')} className="button dropdown-item">
                                            opt 1
                                        </button>
                                        <button onClick={e => console.log('test 2')} className="button dropdown-item">
                                            opt 2
                                        </button>
                                        <button onClick={e => console.log('test 3')} className="button dropdown-item">
                                            opt 3
                                        </button>
                                        <button onClick={e => console.log('test 4')} className="button dropdown-item">
                                            opt 4
                                        </button>
                                        <button onClick={e => console.log('test 5')} className="button dropdown-item">
                                            opt 5
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div id="right-dropdown" className={`dropdown ${showDropDownRight ? "is-active" : ""}`} >
                                <div className="dropdown-trigger">
                                    <button onClick={ e => setShowDropDownRight(!showDropDownRight)} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                                        <span> Right Dropdown </span>
                                        <span className="icon is-small">
                                            <i className="fas fa-angle-down" aria-hidden="true"></i>
                                        </span>
                                    </button>
                                </div>
                                <div className="dropdown-menu" id="dropdown-menu" role="menu">
                                    <div className="dropdown-content">
                                        <button onClick={e => console.log('test 1')} className="button dropdown-item">
                                            opt 1
                                        </button>
                                        <button onClick={e => console.log('test 2')} className="button dropdown-item">
                                            opt 2
                                        </button>
                                        <button onClick={e => console.log('test 3')} className="button dropdown-item">
                                            opt 3
                                        </button>
                                        <button onClick={e => console.log('test 4')} className="button dropdown-item">
                                            opt 4
                                        </button>
                                        <button onClick={e => console.log('test 5')} className="button dropdown-item">
                                            opt 5
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </div>
    )
}
export default withContext(WOVHome);