import React, {useState} from "react";
import withContext from "../../../withContext";
import "./index.css";
//import ServiceItem from "./ServiceItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBeer, faBusinessTime, faCarrot, faCashRegister, faCertificate, faChalkboard, faChalkboardTeacher, faClipboardList, faCloudMeatball, faCocktail, faCookie, faCreditCard, faDigitalTachograph, faDrumstickBite, faEye, faHardHat, faIceCream, faListOl, faMitten, faNetworkWired, faPizzaSlice, faScrewdriver, faStamp, faTicketAlt, faUserAstronaut, faUserClock, faUserTie } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingUsd, faInfo } from '@fortawesome/free-solid-svg-icons'
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons'
import {faHouzz} from "@fortawesome/free-brands-svg-icons";


const BCHome = props => {

    var placeholders = [
        {id : 0 , text : "test 0"},
        {id : 1 , text : "test 1"},
        {id : 2 , text : "test 2"},
        {id : 3 , text : "test 3"},
        {id : 4 , text : "test 4"},
        {id : 5 , text : "test 5"},
    ]

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };

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
    const imageUrls = []; //props.context;
    //const listings = props.context.listings ? (props.context.listings.length > 5 ? (props.context.listings.slice(0,6)) : props.context.listings ) : null ;
    const { services } = [];

    const [showDropDownLeft, setShowDropDownLeft] = useState(false);
    const [showDropDownMid, setShowDropDownMid] = useState(false);
    const [showDropDownRight, setShowDropDownRight] = useState(false);

    return(
        <div className="market-home">
            <div className="hero bc-bg-one is-medium">
                <div className="hero-contain has-text-centered">
                    <br /><br />
                    <h1 className="title slogan" style={{color:"crimson"}}> Wine & Dine, Order Right on Time.</h1>
                    <form>
                        <div className="field has-addons searchbar" style={{display: "inline-flex"}}>
                            <div className="control">
                                <input className="input is-focused" onChange={setSearch} type="text" placeholder="Search Bickle Court ....."/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-link is-rounded is-focused"> Search </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="bicklelistContainer has-text-centered">
                <h3 className="title is-3 box" style={{color: "Black"}}> View the Kiosk to See All Meals, Beverages and Desserts. </h3>
                <div className="item-box box">
                    <div className="automobile-sales content"> 
                        <h1> KIOSK </h1>
                        <div className="box">
                            <div className="slick-wrapper has-text-centered">
                                {services && services.length > 0 ? (
                                    <Slider {...settingsThumbs}>
                                        {services.map((service, index) => (
                                            <div className="slick-slide" key={index}>
                                                {/*<ServiceItem
                                                    service={service}
                                                    key={index}
                                                />*/}
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <div className="column">
                                        <span className="title has-text-grey-light">
                                            Court Empty
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
                        Explore More Services
                    </button> 
                </div>
                </div>

                <div className="item-box box">
                    <div className="accomadations content"> 
                        <h1> Spots </h1>
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
                        <button className="button is-link"> See All Spots </button> 
                    </div>
                </div>
            
            </div>
            <div className="hero">
                <div className="hero-contain">
                    <div className="box">
                        <h4 className="subtitle">
                            BickleCourt as in 'Bickle', the Jamaican Word for Food is an Awesome Platform hosting 
                            Spots(Restaurants, Bars, Lounges, Delis, Commisarries, etc) that place there Food, Beverages, Pasteries and other
                            items for you to order and enjoy. The Meals that are prepared just for your are all on the 'KIOSK'. 
                            Don't wait nor Hesitate order now, add delivery and Enjoy. Get amazing combo deal and specials inside The BickleCourt.
                        </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            'BickleCourt' allows you to view the Spot's Shelve and/or Menu. With an extensive list of Spots in your proximity and as well as those you
                            would desire to travel miles to experience; if the spot has accomadations for physical entry. 
                            Seeking Fine Dining then Make a Reservation you will have a Good Time. 
                        </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            Have a Spot by signing up with BC-Partnerships and get access to our wonderful platform; A massive virtual Food, 
                            Beverages and Desserts Court. Offer the best Meals and Hospitallity to the many deserving customers, W@H GW@@N.
                            Post Recipes, share some of your specialties and Receive Reviews.
                         </h4>
                    </div>
                    <div className="columns is-multiline has-text-centered">
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faUserClock} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faTicketAlt} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Place an Order</div>
                                </div>
                                <div className="card-content">
                                    <p> Find Meal, or Beverage or Pastry of your choice. The Best Meal Plan
                                        is to get it from the BickleCourt.

                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Order Now 
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
                                    <FontAwesomeIcon icon={faCashRegister} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Have A Spot </div>
                                </div>
                                <div className="card-content">
                                    <p> Make your Place of Business an entity inside the Bickle Court. Expose your 
                                        available items, collect orders and even host reservations.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Add Spot
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faClipboardList} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faEye} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">View Recipes</div>
                                </div>
                                <div className="card-content">
                                    <p> Cooking, Baking, Making a Drink, 'Whipping up a Storm', Check out a 
                                        special set of ingredients and procedures to have the best 
                                        satisfaction.

                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Check it Out
                                        </button>
                                    </div>
                                </div>    
                            </div>
                        </div>

                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faPizzaSlice} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faIceCream} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faBeer} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Many Categories to Choose</div>
                                </div>
                                <div className="card-content">
                                    <p>
                                        The Meals, drinks or desserts that you desire should be listed under on of the many categories
                                        that BickleCourt has. Many different choices select the your most desired.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            View Categories
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faCocktail} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faHouzz} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Checkout the Many Spots</div>
                                </div>
                                <div className="card-content">
                                    <p> 
                                        Get the Value for your Stash. View our many dedicated Spots
                                        Order, or Reserve or even Travel to the SPot physically if you see something you want.  
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            See Spots
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faListOl} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faChalkboardTeacher} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Post a Tutorial or Procedure</div>
                                </div>
                                <div className="card-content">
                                    <p> 
                                        Increase your status quo on W@H GW@@N, make life easier for the masses;
                                        post instructions and procedures to whatever task that you may know.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Add Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faCertificate} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faMitten} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Learn to Cook </div>
                                </div>
                                <div className="card-content">
                                    <p> .........
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Get Certified
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
                                    <FontAwesomeIcon icon={faCookie} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> BickleCourt-INFO </div>
                                </div>
                                <div className="card-content">
                                    <p>  
                                        View Tips, Articles and other materials to get the Latest Meal Plans, Know hows and
                                        the most Important news in Everything Food and Drink.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Get the Scope
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
                                    <FontAwesomeIcon icon={faCarrot} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> BickleCourt Partners </div>
                                </div>
                                <div className="card-content">
                                    <p> Passionate about the Culnary Arts, become a member of the team whether its ingredible meals, 
                                        healthy Eating or just having a worthwhile experience BickleCourt wants everyone to enjoy.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Join BC-Partnerships
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
export default withContext(BCHome);