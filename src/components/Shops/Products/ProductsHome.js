import React, {useState} from "react";
import withContext from "../../../withContext";
import "./index.css";
import ProductItem from "./ProductItem";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faShoppingBag, faCreditCard, faTruckLoading, faTractor, faBlenderPhone, faFutbol, faPersonBooth, faCashRegister, faBoxOpen, faRegistered, faBoxes, faGifts, faShippingFast } from '@fortawesome/free-solid-svg-icons';
import { faHandHoldingUsd } from '@fortawesome/free-solid-svg-icons'
import { faWallet } from '@fortawesome/free-solid-svg-icons'
import { faShieldAlt } from '@fortawesome/free-solid-svg-icons'
import { faInfo} from '@fortawesome/free-solid-svg-icons'
import { faPeopleCarry } from '@fortawesome/free-solid-svg-icons'


const ProductsHome = props => {

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
    };
*/
    const settingsThumbs = {
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        margin: '10px',
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
    const products = props.context.products ? (props.context.products.length > 5 ? (props.context.products.slice(0,6)) : props.context.products ) : null ;;

    const [showDropDownLeft, setShowDropDownLeft] = useState(false);
    const [showDropDownMid, setShowDropDownMid] = useState(false);
    const [showDropDownRight, setShowDropDownRight] = useState(false);

    return(
        <div className="market-home">
            <div className="hero products-bg-one is-medium">
                <div className="hero-contain has-text-centered">
                    <br /><br />
                    <h1 className="title slogan" style={{color: "orange"}}> The Best Shopping Experience</h1>
                    <form>
                        <div className="field has-addons searchbar" style={{display: "inline-flex"}}>
                            <div className="control">
                                <input className="input is-focused" onChange={setSearch} type="text" placeholder="Search Products ....."/>
                            </div>
                            <div className="control">
                                <button type="submit" className="button is-link is-rounded is-focused"> Search </button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
            <div className="productlistContainer has-text-centered">
                <h1 className="title box"> View a Wide Range of Products </h1>
                <div className="item-box box">
                    <div className="product-sales"> 
                        <h1> Products </h1>
                        <div>
                            <div className="slick-wrapper has-text-centered">
                                {products && products.length > 0 ? (
                                    <>
                                        <Slider {...settingsThumbs}>
                                            {products.map((product, index) => (
                                                <div className="slick-slide" key={index}>
                                                    <ProductItem
                                                        imageUrl={process.env.PUBLIC_URL + "/images/products/product" + product.product_id + "/0"}
                                                        product={product}
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
                                                    //props.setPFView('All');
                                                    //props.setShowPFHome(false);
                                                    //props.setShowPFList(true);
                                                }}
                                            > 
                                                Explore More Products
                                            </button> 
                                        </div>
                                    </>
                                ) : (
                                    <div className="column">
                                        <span className="title has-text-grey-light">
                                            No Products available at this time!
                                        </span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="item-box box">
                    <div className="accomadations content"> 
                        <h1> Categories </h1>
                        <div className="container">
                            <div className="slick-wrapper has-text-centered">
                                <Slider {...settingsThumbs}>
                                    {placeholders.map((aSpot, index) => (
                                        <div key={index} className="slick-slide">
                                            <h3> {aSpot.text} </h3>
                                        </div>
                                    ))}
                                </Slider>
                            </div>
                            <div className="control">
                                <button className="button is-link"> See All Categories </button> 
                            </div>
                        </div>
                    </div>
                    
                </div>
            
            </div>
            <div className="hero">
                <div className="hero-contain">
                    <div className="box">
                        <h4 className="subtitle">
                            This is the Products Section of the Market. Browse this section to see a wide range of products
                            from various vendors. The W@H GW@@N MARKET has a variety of Products from all categories of items in e-commerce
                            and allows vendors to reach a broad customer base. W@H GW@@N Market has an efficient and cost effective payment 
                            system that accepts payment directly from your WG-Wallet or from Credit/Debit Card of international standard 
                            (Visa, Mastercard, American Express, etc). Shop now, add your desired items to the cart and then process payment afterwards;
                            catch the amazing deals on offer.
                        </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                            'Enterprise' also have products that are for rent. Perhaps purchasing an item for non-continuous use is not the 
                            best option; thus renting that item might be the most cost effective solution for the task at hand. Most common types of 
                            items that can be rented are tools, items used in decor, heavy duty equipments, electronics, amongst other items. </h4>
                        <hr></hr>
                        <h4 className="subtitle">
                             Become a Vendor by signing up with JS-Partnerships and get access to our wonderful platform which displays your goods
                             to an international audience with means of meeting the needs for getting your products to any destination required.
                         </h4>
                    </div>
                    <div className="columns is-multiline has-text-centered">
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faCreditCard} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faShoppingBag} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Product Sales</div>
                                </div>
                                <div className="card-content">
                                    <p> 'Enterprise' should have any item you desire in stock. Search through 
                                        the many Vendors, the many Categories and the many Products for your prefered goods. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            View Products
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
                                    <FontAwesomeIcon icon={faTruckLoading} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Become a Vendor</div>
                                </div>
                                <div className="card-content">
                                    <p> Place your Goods on 'Enterprise' and secure a fast and 
                                        garanteed sale; locally or even internationally. 'Enterprise' also
                                        has a shipping and delivery option. 
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Add Goods
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
                                    <FontAwesomeIcon icon={faTractor} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered">Rent an Item</div>
                                </div>
                                <div className="card-content">
                                    <p> Sometimes for a given task a single-use item is needed and for that reason it might
                                        be more beneficial to rent the Item instead of purchasing this item. 
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
                                    <FontAwesomeIcon icon={faBlenderPhone} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faFutbol} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Many Categories of Products </div>
                                </div>
                                <div className="card-content">
                                    <p> Search through the list of categories and get some inspiration as to the products 
                                        that you might desire.
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
                                    <FontAwesomeIcon icon={faCashRegister} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faPersonBooth} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Tonnes of Vendors in Market </div>
                                </div>
                                <div className="card-content">
                                    <p> 
                                        View the many economically friendly vendors that ensure that your products get from 
                                        distribution / manufacturing to your doorstep.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            See Vendors
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="column is-full-mobile is-one-third-desktop">
                            <div className="card frontpage-card">
                                <div className="card-image iconBox">
                                    <FontAwesomeIcon icon={faRegistered} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faBoxOpen} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Post your Item(s) for Rental </div>
                                </div>
                                <div className="card-content">
                                    <p> Increase the income of your business by securing more bookings;
                                        'Enterprise' provides a secure and reliable process that will ensure your
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
                                    <FontAwesomeIcon icon={faShieldAlt} size="3x"/>
                                    &nbsp;
                                    <FontAwesomeIcon icon={faBoxes} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Secure your Items </div>
                                </div>
                                <div className="card-content">
                                    <p> .........
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Use WH
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
                                    <FontAwesomeIcon icon={faGifts} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> JS-INFO </div>
                                </div>
                                <div className="card-content">
                                    <p> See the latest deals and get an idea of what products are popping on
                                        the market. Get tips and pointers for all your shopping endevours.
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
                                    <FontAwesomeIcon icon={faShippingFast} size="3x"/>
                                </div>
                                <div className="card-header">
                                    <div className="card-header-title is-centered"> Enterprise Partners </div>
                                </div>
                                <div className="card-content">
                                    <p> 
                                        Become a Vendor, or run many profitbale errands, or become an Associate in
                                        JS-Partners and joins the Worlds best MarketPlace.
                                    </p>
                                </div>
                                <div className="card-footer">
                                    <div className="card-footer-item">
                                        <button className="button is-info is-outlined ">
                                            Join JS-Partnerships
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
export default withContext(ProductsHome);