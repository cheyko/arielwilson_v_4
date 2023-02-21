import React, {useState} from "react";
import withContext from "../../../withContext";
import "./index.css";
import ServiceItem from "./ServiceItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBusinessTime, faCertificate, faChalkboard, faChalkboardTeacher, faCreditCard, faDigitalTachograph, faEye, faHardHat, faListOl, faNetworkWired, faScrewdriver, faStamp, faUserAstronaut, faUserClock, faUserTie } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingUsd, faInfo } from '@fortawesome/free-solid-svg-icons'
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons'


const ServicesHome = props => {

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
    const imageUrls = []; //props.context;
    //const listings = props.context.listings ? (props.context.listings.length > 5 ? (props.context.listings.slice(0,6)) : props.context.listings ) : null ;
    const { services } = [];

    const [showDropDownLeft, setShowDropDownLeft] = useState(false);
    const [showDropDownMid, setShowDropDownMid] = useState(false);
    const [showDropDownRight, setShowDropDownRight] = useState(false);

    return(
        <div className="market-home">
            <div className="hero services-bg-one is-medium">
                <div className="hero-contain has-text-centered">
                    <br /><br />
                    <h1 className="title slogan" style={{color: "blueviolet"}}> Hire the Best; You will love the work done. </h1>
                    <form>
                        <div className="field has-addons searchbar" style={{display: "inline-flex"}}>
                            <div className="control">
                                <input className="input is-focused" onChange={setSearch} type="text" placeholder="Search Work Site ....."/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-link is-rounded is-focused"> Search </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="servicelistContainer has-text-centered">
                <h3 className="title is-3 box" style={{color: "Black"}}> See the Many Services Offered </h3>
                <div className="item-box box">
                    <div className="automobile-sales content"> 
                        <h1> Services </h1>
                        <div className="box">
                            <div className="slick-wrapper has-text-centered">
                                {services && services.length > 0 ? (
                                    <Slider {...settingsThumbs}>
                                        {services.map((service, index) => (
                                            <div className="slick-slide" key={index}>
                                                <ServiceItem
                                                    imageUrl={""/*process.env.PUBLIC_URL + "/vehicles/vehicle" + vehicle.vehicle_id + "/0"*/}
                                                    service={service}
                                                    key={index}
                                                />
                                            </div>
                                        ))}
                                    </Slider>
                                ) : (
                                    <div className="column">
                                        <span className="title has-text-grey-light">
                                            No Services available at this time!
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
                        <h1> Categories </h1>
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
                        <button className="button is-link"> See All Categories </button> 
                    </div>
                </div>
            
            </div>
            <div className="hero">
                <div className="hero-contain">
                    <div className="box">
                        <h4 className="subtitle">
                            This is the Services Section of the Market. This section has all types of services
                            that you may desire to resolve any issue or undertake any task. There are many types
                            of Services each belonging to its respective category and allows providers(workmen/workwomen)
                            to reach a broad customer base.
                        </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            'WorkStation' also have Self-Help tutorials that can be used to resolve task that do not require professional
                            attention. There are also produedures and instructions to complete many common or even the most unique task that may arise.
                            Recipes are also posted so get your 'cook on' by browsing through the many listings.
                        </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            Become a Provider by signing up with WS-Partnerships and get access to our wonderful platform which displays your talents and
                            reviews to a Global Audience. Offer the best service to the many deserving customers W@H GW@@N.
                         </h4>
                    </div>
                    <div className="columns is-multiline has-text-centered">
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faUserClock} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faCreditCard} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Aquire Service</div>
                                </div>
                                <div className="card-content">
                                    <p> Find the service you desire for any situation. If you have a problem 
                                        there is a solution on WorkStation.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Find Service
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
                                    <FontAwesomeIcon icon={faUserAstronaut} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Offer Service</div>
                                </div>
                                <div className="card-content">
                                    <p> Make use of the maximum potential of your skills; Solicit work from
                                        WorkStation and increase your clientele base. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Add Gig
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faChalkboard} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faEye} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">View Tutorials</div>
                                </div>
                                <div className="card-content">
                                    <p> Get the Know How for all the task that you will find yourself doing. Find
                                        Recipes to create outstanding dishes or Procedures to complete the challenges you 
                                        face. 

                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Seek Now
                                        </button>
                                    </div>
                                </div>    
                            </div>
                        </div>
 
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faScrewdriver} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faNetworkWired} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Many Categories of Services</div>
                                </div>
                                <div className="card-content">
                                    <p>
                                        The Service you desire is in one of our many categories on WorkStation. 
                                        Browse through our categories catalog; you may never know until you do.
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
                                    <FontAwesomeIcon icon={faUserTie} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faHardHat} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Checkout the Many Providers</div>
                                </div>
                                <div className="card-content">
                                    <p> 
                                        Get the Best Service at the best price. View our many dedicated providers
                                        whom will ensure your needs are fulfilled.   
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            See Providers
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
                                    <FontAwesomeIcon icon={faStamp} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Learn a Skill </div>
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
                                    <FontAwesomeIcon icon={faDigitalTachograph} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> WorkStation-INFO </div>
                                </div>
                                <div className="card-content">
                                    <p>  
                                        View Tips, Articles and other materials that can offer inspiration in the World
                                        of Technical Servicing and TradeWorks. Get the latest Scope and see whats popping.
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
                                    <FontAwesomeIcon icon={faBusinessTime} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> WorkStation Partners </div>
                                </div>
                                <div className="card-content">
                                    <p> Join the team of professionals whom are serving the world. If your niche is 
                                        teaching then become a WorkStation Instructor and start educating the masses.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Join WS-Partnerships
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
export default withContext(ServicesHome);