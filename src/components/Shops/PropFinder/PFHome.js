import React, {useState} from "react";
import withContext from "../../../withContext";
import "./index.css";
import PFLItem from "./PFLItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckAlt } from '@fortawesome/free-solid-svg-icons'
import { faPiggyBank } from '@fortawesome/free-solid-svg-icons'
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { faBuilding} from '@fortawesome/free-solid-svg-icons'
import { faHouseUser } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'

import { faCampground } from '@fortawesome/free-solid-svg-icons'
import { faConciergeBell } from '@fortawesome/free-solid-svg-icons'
import { faWalking } from '@fortawesome/free-solid-svg-icons'
import { faHotel } from '@fortawesome/free-solid-svg-icons'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faToolbox } from '@fortawesome/free-solid-svg-icons'

import { faDoorClosed } from '@fortawesome/free-solid-svg-icons'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { faLaptopHouse } from '@fortawesome/free-solid-svg-icons'
import { faInfo} from '@fortawesome/free-solid-svg-icons'
import { faCity } from '@fortawesome/free-solid-svg-icons'
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons'
import { Link } from "react-router-dom";

const PFHome = props => {

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
    let types = ["house","apartment","townhouse","residential","commercial","office","building","villa"];
    const [searchval, setSearch] = useState("");
    //const imageUrls = []; //props.context;
    const listings = props.context.listings ? (props.context.listings.length > 5 ? (props.context.listings.slice(0,6)) : props.context.listings ) : null ;

    const [showDropDownLeft, setShowDropDownLeft] = useState(false);
    const [showDropDownMid, setShowDropDownMid] = useState(false);
    const [showDropDownRight, setShowDropDownRight] = useState(false);

    return(
        <div className="market-home">
            <div className="hero pf-bg-one is-medium">
                <div className="hero-contain has-text-centered">
                    <br /><br />
                    <h1 className="title slogan" style={{color: "yellow"}}> Properties to Buy, Rent, Sell, Stay + More </h1>
                    <form className="lookup-div">
                        <div className="field has-addons searchbar" style={{display: "inline-flex"}}>
                            <div className="control form-control">
                                <input className="input is-focused" value={searchval} onChange={e => setSearch(e.target.value)} type="text" placeholder="Enter Address ....."/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-link is-rounded"> Search </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="houselistContainer has-text-centered">
                <h3 className="title is-3 box" style={{color: "Black"}}> View a Wide Range of Properties </h3>
                <div className="item-box box">
                    <div className="realestate content"> 
                        <h1> Real Estate </h1>
                        <div>
                            <div className="slick-wrapper has-text-centered">
                                {listings && listings.length > 0 ? (
                                    <>
                                        <Slider {...settingsThumbs}>
                                            {listings.map((listing, index) => (
                                                <div className="slick-slide" key={index}>
                                                    <PFLItem
                                                        imageUrl={process.env.PUBLIC_URL + "/images/listings/listing" + listing.listing_id + "/0.jpg"}
                                                        listing={listing}
                                                        key={index}
                                                        page={"home"}
                                                    />
                                                </div>
                                            ))}
                                        </Slider>
                                        <div className="control">
                                            <button 
                                                className="button is-link"
                                                onClick={e => {
                                                    props.setPFView('PFAll');
                                                    props.setSubView('PFAll');
                                                    localStorage.setItem("subview","PFAll");
                                                }}
                                            > 
                                                Explore More Real Estate 
                                            </button> 
                                        </div>
                                    </>
                                ) : (
                                    <div className="column">
                                        <span className="title has-text-grey-light">
                                            No properties available at this time!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-box box">
                    <div className="accomadations content"> 
                        <h1> Accomadations </h1>
                        
                            <div className="slick-wrapper has-text-centered">
                                <Slider {...settingsThumbs}>
                                    {placeholders.map((aSpot, index) => (
                                        <div key={index} className="slick-slide">
                                            {/*<h3> {aSpot.text} </h3>*/}
                                            <div className="card mx-1">
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="control">
                        <button className="button is-link"> Explore More Accomadations </button> 
                    </div>
                    </div>
                    
                </div>

                <div className="item-box box">
                    <div className="accomadations content"> 
                        <h1> Real Estate Categories </h1>
                        
                            <div className="slick-wrapper has-text-centered">
                                <Slider {...settingsThumbs}>
                                    {types.map((aType, index) => (
                                        <div key={index} className="slick-slide">
                                            <div className="card mx-1" style={{cursor:"pointer"}} 
                                                onClick={e => {
                                                    props.setPFType(aType);
                                                    props.setPFView('PFAll');
                                                    props.setSubView('PFAll');
                                                    localStorage.setItem("subview","PFAll");
                                                }}>
                                                <div className="card-image">
                                                    <figure className="image is-4by3">
                                                        <img src={`${process.env.PUBLIC_URL}/images/defaults/prop-finder/${aType}.jpg`} alt="Placeholder" />
                                                        <h1 className="tag caption-tag"> 
                                                            <span className="tag is-large is-capitalized date-caption">{aType}</span> 
                                                        </h1>
                                                    </figure>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="control">
                        <Link to="/shops/PropFinder/realestate/categories"><button className="button is-link"> See all Categories </button> </Link>
                    </div>
                    </div>
                    
                </div>
            
            </div>

            <div className="hero">
                <div className="hero-contain">
                    <div className="box">
                        <h4 className="subtitle">
                            This Platform lists Houses, Apartments, Townhouses, Villas and Office Spaces;
                            for rent and for sale. Commercial or Residential Lots are available for Leasing 
                            or Purchasing. A wide variety of Sizes, Styles, Interior and Exterior Features.  </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            'CHECK OUT' the Various Accomadations on PropFinder that may appeal to your likening and you will surely find that ideal Hotel, Motel, Inn, Campground,
                            Resort and/or Spa to 'CHECK IN'. Book a site for your next getaway via PropFinder.</h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            PropFinder is a multi-purpose Real Estate platform that covers all your needs in regards to owning your own property.
                            The platform offers many renovation features. More importantly you can secure your property with PropFinder both Physically
                            and/or F.... </h4>
                    </div>
                    <div className="columns is-multiline has-text-centered">
                        <div className="column is-full-mobile is-one-third-desktop ">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faPiggyBank} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faMoneyCheckAlt} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Puchase a Property</div>
                                </div>
                                <div className="card-content">
                                    <p> Find the ideal property for sale by filtering through an 
                                        extensive list of properties with the best deals. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Search Listings
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
                                    <FontAwesomeIcon icon={faBuilding} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Put-Up a Listing</div>
                                </div>
                                <div className="card-content">
                                    <p> Place your Property on a virtual domain that will expose it to potential
                                        buyers or renters; locally and internationally.  
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Add Listing
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
                                    <FontAwesomeIcon icon={faHouseUser} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Rent a Space</div>
                                </div>
                                <div className="card-content">
                                    <p> Finding Rentals can be hard, search through our Listings to find the 
                                        ideal spot for your comfort, style and/or purpose.
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
                                    <FontAwesomeIcon icon={faConciergeBell} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faCampground} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Book the Best Accomadation</div>
                                </div>
                                <div className="card-content">
                                    <p> Find the ideal Accomadation for that special purpose; search through the many 
                                        locations and select the best deals that suit your needs. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Make Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faWalking} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faHotel} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Post your Spot For Bookings</div>
                                </div>
                                <div className="card-content">
                                    <p> Increase the income of your properties by securing more bookings;
                                        PropFinder provides a secure and reliable process that will ensure your
                                        property is visible to the "World at Large".  
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Secure Booking
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faToolbox} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faHome} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Get Your Property Renovated</div>
                                </div>
                                <div className="card-content">
                                    <p> 
                                        Renovation process can be tedious, contact the experts at PropFinder to renew the sparkle 
                                        in your property. View the extensive line of materials that you can use for your remodelling.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Start Renovating
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
                                    <FontAwesomeIcon icon={faDoorClosed} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Secure your Space </div>
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
                                    <FontAwesomeIcon icon={faLaptopHouse} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> PropFinder INFO </div>
                                </div>
                                <div className="card-content">
                                    <p>  
                                        View Tips, Articles and other materials that can offer inspiration for your
                                        Real Estate needs. Get the latest Scope on Accomadations and see whats popping.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            See the Deal
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
                                    <FontAwesomeIcon icon={faCity} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> PropFinder Partners </div>
                                </div>
                                <div className="card-content">
                                    <p> Join the team of professionals whom are remodelling properties. If your niche is sales then become a PF-Realtor or become a PF-I and start a 
                                        new and wonderful opportunity. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Join PF-Partnerships
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
export default withContext(PFHome);