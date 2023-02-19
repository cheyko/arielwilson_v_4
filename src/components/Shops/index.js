import React, { useEffect, useState } from 'react';
import withContext from '../../withContext';
import './index.css';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
//import { faReceipt } from '@fortawesome/free-solid-svg-icons';
//import { faAd } from '@fortawesome/free-solid-svg-icons';

import Products from "./Products";
import Services from "./Services";
import PropFinder from "./PropFinder";
import WOV from "./WOV";
import ShopsFooter from './ShopsFooter';
import GrandMarket from './GrandMarket';
import BickleCourt from './BickleCourt';


const Shops = props => {
    const [boxWidth, setWidth] = useState($(".ad-bar-container").width());
    const [start, setStart] = useState(true);
    const [toggleads , setToggleAds] = useState(true);
    const [togglecart , setToggleCart] = useState(false);
    
    const [shopView, setShopView] = useState("");
    const [subview, setSubView] = useState("");

    const [enterpriseMenu, setEnterpriseMenu] = useState(false);
    const [bickleMenu, setBickleMenu] = useState(false);
    const [worksiteMenu, setWSMenu] = useState(false);
    const [propfinderMenu, setPFMenu] = useState(false);
    const [wovMenu, setWOVMenu] = useState(false);

    //const [showDropDown, setShowDropDown] = useState(false);
    //const [showMore, setShowMore] = useState(false);

    useEffect( () => {
        window.scrollTo(0, 0);
        props.context.setShops();
        
        if (start){
            $(".ad-bar-container").animate({
                width: boxWidth
            });
            $(".cart-container").animate({
                width: 0
            });
        }
        if (shopView === ""){
            let reloadView = localStorage.getItem("shopView");
            let reloadSubView = localStorage.getItem("subview");
            if(reloadView){
                setShopView(reloadView);
                setSubView(reloadSubView);
            }else{
                setShopView("grandmarket");
            }
        } 

        //set current to local storage.    
    },[start,shopView, subview]);

    const toggleAds = (e) => {
        e.preventDefault();
        if (toggleads === true){
            $(".ad-bar-container").animate({
                width: 0,
            });
        }else{
            $(".cart-container").animate({
                width: 0,
            });
            $(".ad-bar-container").animate({
                width: boxWidth,
            });
            
        }
        setToggleAds(!toggleads);
        setToggleCart(false);
        setStart(false);
    }

    const toggleCart = (e) => {
        e.preventDefault();
        if (togglecart === false){
            $(".ad-bar-container").animate({
                width: 0,
            });
            $(".cart-container").animate({
                width: boxWidth
            });
        }else{
            $(".cart-container").animate({
                width: 0,
            });
        }
        setToggleCart(!togglecart);
        setToggleAds(false);
        setStart(false);
    }


    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return (
        <div className="hero special-nav">
            <div className='shops-div'>
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <span className="navbar-item">
                            <h1 onClick={e => setShopView('grandmarket')} className="title" style={{fontSize:"1rem"}}><b>MARKET</b></h1>
                        </span>

                        <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <small>sections</small>
                        </span>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">

                            <div className={`navbar-item has-dropdown is-hoverable ${shopView === 'enterprise' ? 'is-active' : ''}`}  onMouseOver={e => setEnterpriseMenu(true)} onMouseOut={ e => setEnterpriseMenu(false)}>
                                <span id="more-dropdown" className="navbar-link"onClick={ e => setEnterpriseMenu(!enterpriseMenu)}>
                                    <i className="fas fa-shopping-cart head-icon" aria-hidden="true"> &nbsp; <span className='mobile'>Enterprise</span> </i> 
                                </span>

                                <div className="navbar-dropdown" style={enterpriseMenu ? {display:"block"} : {display: "none"}}>
                                    <div className='not-mobile'>
                                        <span className={`navbar-item ${subview === 'ProductsHome' ? 'is-active' : ''}`} onClick={e => { setSubView('ProductsHome');setShopView("enterprise");toggleMenu(e); setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsHome");localStorage.setItem("shopView","enterprise")}}>
                                            <i className="fas fa-shopping-cart" aria-hidden="true"> ENTERPRISE </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <div className='mobile'>
                                        <span className={`navbar-item ${subview === 'ProductsHome' ? 'is-active' : ''}`} onClick={e => { setSubView('ProductsHome');setShopView("enterprise");toggleMenu(e); setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsHome");localStorage.setItem("shopView","enterprise")}}>
                                            <i className="fas fa-shopping-cart" aria-hidden="true"> Home </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <span className={`navbar-item ${subview === 'ProductsBuy' ? 'is-active' : ''}`} onClick={e => { setSubView('ProductsBuy');setShopView("enterprise"); toggleMenu(e); setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsBuy");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-shopping-basket" aria-hidden="true"> Buy </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'ProductStalls' ? 'is-active' : ''}`} onClick={e => { setSubView('ProductStalls');setShopView("enterprise"); toggleMenu(e);setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsStall");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-store-alt" aria-hidden="true"> Stalls </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'ProductsRental' ? 'is-active' : ''}`} onClick={e => {setSubView('ProductsRental');setShopView("enterprise"); toggleMenu(e);setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsRental");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-dolly" aria-hidden="true"> Rentals </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'ProductsSell' ? 'is-active' : ''}`} onClick={e => {setSubView('ProductsSell');setShopView("enterprise");toggleMenu(e);setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsSell");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-money-check-alt" aria-hidden="true"> Sell </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'ProductsCategories' ? 'is-active' : ''}`} onClick={e => {setSubView('ProductsCategories');setShopView("enterprise");toggleMenu(e);setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsCategories");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-pallet" aria-hidden="true"> Categories </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'ProductsWH' ? 'is-active' : ''}`} onClick={e => {setSubView('ProductsWH');setShopView("enterprise");toggleMenu(e);setEnterpriseMenu(!enterpriseMenu); localStorage.setItem("subview","ProductsWH");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-warehouse" aria-hidden="true"> WareHouse </i> 
                                    </span>
                                    <span className={`navbar-item ${subview === 'ProductsInfo' ? 'is-active' : ''}`} onClick={e => {setSubView('ProductsInfo');setShopView("enterprise");toggleMenu(e);setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsInfo");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-info-circle" aria-hidden="true"> Information </i> 
                                    </span>
                                    <span className={`navbar-item ${subview === 'ProductsPS' ? 'is-active' : ''}`} onClick={e => {setSubView('ProductsPS');setShopView("enterprise");toggleMenu(e);setEnterpriseMenu(!enterpriseMenu);localStorage.setItem("subview","ProductsPS");localStorage.setItem("shopView","enterprise")}}>
                                        <i className="fas fa-handshake" aria-hidden="true"> Partnerships </i> 
                                    </span>
                                </div>
                            </div>
                            <div className={`navbar-item has-dropdown is-hoverable ${shopView === 'bickle' ? 'is-active' : ''}`} onMouseOver={e => setBickleMenu(true)} onMouseOut={ e => setBickleMenu(false)}>
                                <span id="more-dropdown" className="navbar-link" onClick={ e => setBickleMenu(!bickleMenu)}>
                                    <i className="fas fa-utensils head-icon" aria-hidden="true"> &nbsp; <span className='mobile'>Bickle Court</span> </i> 
                                </span>

                                <div className="navbar-dropdown" style={bickleMenu ? {display:"block"} : {display: "none"}}>
                                    <div className='not-mobile'>
                                        <span className={`navbar-item ${subview === 'BCHome' ? 'is-active' : ''}`} onClick={e => { setSubView('BCHome');setShopView("bickle");toggleMenu(e); setBickleMenu(!bickleMenu);localStorage.setItem("subview","BCHome");localStorage.setItem("shopView","bickle")}}>
                                            <i className="fas fa-utensils" aria-hidden="true"> BICKLE COURT </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <div className='mobile'>
                                        <span className={`navbar-item ${subview === 'BCHome' ? 'is-active' : ''}`} onClick={e => { setSubView('BCHome');setShopView("bickle");toggleMenu(e); setBickleMenu(!bickleMenu);localStorage.setItem("BCHome","ProductsHome");localStorage.setItem("shopView","bickle")}}>
                                            <i className="fas fa-utensils" aria-hidden="true"> Home </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <span className={`navbar-item ${subview === 'Kiosk' ? 'is-active' : ''}`} onClick={e => { setSubView('Kiosk');setShopView("bickle");toggleMenu(e); setBickleMenu(!bickleMenu);localStorage.setItem("subview","Kiosk");localStorage.setItem("shopView","bickle")}}>
                                        <i className="fas fa-tablet-alt" aria-hidden="true"> Kiosk </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'Spots' ? 'is-active' : ''}`} onClick={e => { setSubView('Spots');setShopView("bickle"); toggleMenu(e);setBickleMenu(!bickleMenu);localStorage.setItem("subview","Spots");localStorage.setItem("shopView","bickle")}}>
                                        <i className="fas fa-map-pin" aria-hidden="true"> Spots </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'Reservations' ? 'is-active' : ''}`} onClick={e => {setSubView('Reservations');setShopView("bickle"); toggleMenu(e);setBickleMenu(!bickleMenu);localStorage.setItem("subview","Reservations");localStorage.setItem("shopView","bickle")}}>
                                        <i className="fas fa-concierge-bell" aria-hidden="true"> Reservations </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'BickleSell' ? 'is-active' : ''}`} onClick={e => {setSubView('BickleSell');setShopView("bickle");toggleMenu(e);setBickleMenu(!bickleMenu);localStorage.setItem("subview","BickleSell");localStorage.setItem("shopView","bickle")}}>
                                        <i className="fas fa-money-check-alt" aria-hidden="true"> Sell </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'BickleCategories' ? 'is-active' : ''}`} onClick={e => {setSubView('BickleCategories');setShopView("bickle");toggleMenu(e);setBickleMenu(!bickleMenu);localStorage.setItem("subview","BickleCategories");localStorage.setItem("shopView","bickle")}}>
                                        <i className="fas fa-pallet" aria-hidden="true"> Categories </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'BickleInfo' ? 'is-active' : ''}`} onClick={e => {setSubView('BickleInfo');setShopView("bickle");toggleMenu(e);setBickleMenu(!bickleMenu);localStorage.setItem("subview","BickleInfo");localStorage.setItem("shopView","bickle")}}>
                                        <i className="fas fa-info-circle" aria-hidden="true"> Information </i> 
                                    </span>
                                    <span className={`navbar-item ${subview === 'BicklePS' ? 'is-active' : ''}`} onClick={e => {setSubView('BicklePS');setShopView("bickle");toggleMenu(e);setBickleMenu(!bickleMenu);localStorage.setItem("subview","BicklePS");localStorage.setItem("shopView","bickle")}}>
                                        <i className="fas fa-handshake" aria-hidden="true"> Partnerships </i> 
                                    </span>
                                </div>
                            </div>
                            <div className={`navbar-item has-dropdown is-hoverable ${shopView === 'worksite' ? 'is-active' : ''}`}  onMouseOver={e => setWSMenu(true)} onMouseOut={ e => setWSMenu(false)}>
                                <span id="more-dropdown" className="navbar-link" onClick={ e => setWSMenu(!worksiteMenu)}>
                                    <i className="fas fa-toolbox head-icon" aria-hidden="true"> &nbsp; <span className='mobile'>Worksite</span> </i> 
                                </span>

                                <div className="navbar-dropdown" style={worksiteMenu ? {display:"block"} : {display: "none"}}>
                                    
                                    <div className='not-mobile'>
                                        <span className={`navbar-item ${subview === 'ServicesHome' ? 'is-active' : ''}`} onClick={e => { setSubView('ServicesHome');setShopView("worksite");toggleMenu(e); setWSMenu(!worksiteMenu);localStorage.setItem("subview","ServicesHome");localStorage.setItem("shopView","worksite")}}>
                                            <i className="fas fa-toolbox" aria-hidden="true"> WORKSITE </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <div className='mobile'>
                                        <span className={`navbar-item ${subview === 'ServicesHome' ? 'is-active' : ''}`} onClick={e => { setSubView('ServicesHome');setShopView("worksite");toggleMenu(e); setWSMenu(!worksiteMenu);localStorage.setItem("subview","ServicesHome");localStorage.setItem("shopView","worksite")}}>
                                            <i className="fas fa-toolbox" aria-hidden="true"> Home </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    
                                    <span className={`navbar-item ${subview === 'ServicesGet' ? 'is-active' : ''}`} onClick={e => { setSubView('ServicesGet');setShopView("worksite");toggleMenu(e); setWSMenu(!worksiteMenu);localStorage.setItem("subview","ServicesGet");localStorage.setItem("shopView","worksite")}}>
                                        <i className="fas fa-wrench" aria-hidden="true"> Services </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'Workstation' ? 'is-active' : ''}`} onClick={e => { setSubView('Workstation');setShopView("worksite"); toggleMenu(e);setWSMenu(!worksiteMenu);localStorage.setItem("subview","Workstation");localStorage.setItem("shopView","worksite")}}>
                                        <i className="fas fa-briefcase" aria-hidden="true"> WorkStations </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'Offer' ? 'is-active' : ''}`} onClick={e => {setSubView('Offer');setShopView("worksite"); toggleMenu(e);setWSMenu(!worksiteMenu);localStorage.setItem("subview","Offer");localStorage.setItem("shopView","worksite")}}>
                                        <i className="fas fa-money-check-alt" aria-hidden="true"> Offer Services </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WSCategories' ? 'is-active' : ''}`} onClick={e => {setSubView('WSCategories');setShopView("worksite");toggleMenu(e);setWSMenu(!worksiteMenu);localStorage.setItem("subview","WSCategories");localStorage.setItem("shopView","worksite")}}>
                                        <i className="fas fa-swatchbook" aria-hidden="true"> Categories </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WSInfo' ? 'is-active' : ''}`} onClick={e => {setSubView('WSInfo');setShopView("worksite");toggleMenu(e);setWSMenu(!worksiteMenu);localStorage.setItem("subview","WSInfo");localStorage.setItem("shopView","worksite")}}>
                                        <i className="fas fa-info-circle" aria-hidden="true"> Information </i> 
                                    </span>
                                    <span className={`navbar-item ${subview === 'WSPS' ? 'is-active' : ''}`} onClick={e => {setSubView('WSPS');setShopView("worksite");toggleMenu(e);setWSMenu(!worksiteMenu);localStorage.setItem("subview","WSPS");localStorage.setItem("shopView","worksite")}}>
                                        <i className="fas fa-handshake" aria-hidden="true"> Partnerships </i> 
                                    </span>
                                </div>
                            </div>
                            <div className={`navbar-item has-dropdown is-hoverable ${shopView === 'propfinder' ? 'is-active' : ''}`} onMouseOver={e => setPFMenu(true)} onMouseOut={ e => setPFMenu(false)}>
                                <span id="more-dropdown" className="navbar-link" onClick={ e => setPFMenu(!propfinderMenu)}>
                                    <i className="fas fa-sign head-icon" aria-hidden="true"> &nbsp; <span className='mobile'>Prop-Finder</span> </i> 
                                </span>

                                <div className="navbar-dropdown" style={propfinderMenu ? {display:"block"} : {display: "none"}}>
                                    <div className='not-mobile'>
                                        <span className={`navbar-item ${subview === 'PFHome' ? 'is-active' : ''}`} onClick={e => { setSubView('PFHome');setShopView("propfinder");toggleMenu(e); setPFMenu(!propfinderMenu);localStorage.setItem("subview","PFHome");localStorage.setItem("shopView","propfinder")}}>
                                            <i className="fas fa-sign" aria-hidden="true"> PROP-FINDER </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <div className='mobile'>
                                        <span className={`navbar-item ${subview === 'PFHome' ? 'is-active' : ''}`} onClick={e => { setSubView('PFHome');setShopView("propfinder");;toggleMenu(e); setPFMenu(!propfinderMenu);localStorage.setItem("subview","PFHome");localStorage.setItem("shopView","propfinder")}}>
                                            <i className="fas fa-sign" aria-hidden="true"> Home </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <span className={`navbar-item ${subview === 'PFBuy' ? 'is-active' : ''}`} onClick={e => { setSubView('PFBuy');setShopView("propfinder");toggleMenu(e); setPFMenu(!propfinderMenu);localStorage.setItem("subview","PFBuy");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-house-user" aria-hidden="true"> Buy </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'PFRent' ? 'is-active' : ''}`} onClick={e => { setSubView('PFRent');setShopView("propfinder"); toggleMenu(e);setPFMenu(!propfinderMenu);localStorage.setItem("subview","PFRent");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-door-open" aria-hidden="true"> Rent </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'PFSell' ? 'is-active' : ''}`} onClick={e => {setSubView('PFSell');setShopView("propfinder");toggleMenu(e);setPFMenu(!propfinderMenu);localStorage.setItem("subview","PFSell");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-money-check-alt" aria-hidden="true"> Sell </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'PFLodge' ? 'is-active' : ''}`} onClick={e => {setSubView('PFLodge');setShopView("propfinder");toggleMenu(e);setPFMenu(!propfinderMenu);localStorage.setItem("subview","PFLodge");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-hotel" aria-hidden="true"> Lodging </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'PFRealtor' ? 'is-active' : ''}`} onClick={e => {setSubView('PFRealtor');setShopView("propfinder");toggleMenu(e);setPFMenu(!propfinderMenu);localStorage.setItem("subview","PFRealtor");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-user-secret" aria-hidden="true"> Realtors </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'PFRenovate' ? 'is-active' : ''}`} onClick={e => {setSubView('PFRenovate');setShopView("propfinder");toggleMenu(e);setPFMenu(!propfinderMenu);;localStorage.setItem("subview","PFRenovate");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-hammer" aria-hidden="true"> Renovate </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'PFInfo' ? 'is-active' : ''}`} onClick={e => {setSubView('PFInfo');setShopView("propfinder");toggleMenu(e);setEnterpriseMenu(!propfinderMenu);;localStorage.setItem("subview","PFInfo");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-info-circle" aria-hidden="true"> Information </i> 
                                    </span>
                                    <span className={`navbar-item ${subview === 'PFPS' ? 'is-active' : ''}`} onClick={e => {setSubView('PFPS');setShopView("propfinder");toggleMenu(e);setEnterpriseMenu(!propfinderMenu);;localStorage.setItem("subview","PFPS");localStorage.setItem("shopView","propfinder")}}>
                                        <i className="fas fa-handshake" aria-hidden="true"> Partnerships </i> 
                                    </span>
                                </div>
                            </div>
                            <div className={`navbar-item has-dropdown is-hoverable ${shopView === 'wov' ? 'is-active' : ''}`} onMouseOver={e => setWOVMenu(true)} onMouseOut={ e => setWOVMenu(false)}>
                                <span id="more-dropdown" className="navbar-link" onClick={ e => setWOVMenu(!wovMenu)}>
                                    <i className="fas fa-car head-icon" aria-hidden="true"> &nbsp; <span className='mobile'>World of Vehicle</span> </i> 
                                </span>

                                <div className="navbar-dropdown" style={wovMenu ? {display:"block"} : {display: "none"}}>
                                    <div className='not-mobile'>
                                        <span className={`navbar-item ${subview === 'WOVHome' ? 'is-active' : ''}`} onClick={e => { setSubView('WOVHome');setShopView("wov");toggleMenu(e); setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVHome");localStorage.setItem("shopView","wov")}}>
                                            <i className="fas fa-car" aria-hidden="true"> WORLD OF VEHICLE </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <div className='mobile'>
                                        <span className={`navbar-item ${subview === 'WOVHome' ? 'is-active' : ''}`} onClick={e => { setSubView('WOVHome');setShopView("wov");toggleMenu(e); setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVHome");localStorage.setItem("shopView","wov")}}>
                                            <i className="fas fa-car" aria-hidden="true"> Home </i>
                                        </span>
                                        <hr className="navbar-divider" />
                                    </div>
                                    <span className={`navbar-item ${subview === 'WOVBuy' ? 'is-active' : ''}`} onClick={e => { setSubView('WOVBuy');setShopView("wov");toggleMenu(e); setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVBuy");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-car-side" aria-hidden="true"> Buy </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVRent' ? 'is-active' : ''}`} onClick={e => { setSubView('WOVRent');setShopView("wov"); toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVRent");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-caravan" aria-hidden="true"> Rent </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVSell' ? 'is-active' : ''}`} onClick={e => {setSubView('WOVSell');setShopView("wov"); toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVSell");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-money-check-alt" aria-hidden="true"> Sell </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVTravel' ? 'is-active' : ''}`} onClick={e => {setSubView('WOVTravel');setShopView("wov");toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVTravel");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-route" aria-hidden="true"> Travel </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVTraders' ? 'is-active' : ''}`} onClick={e => {setSubView('WOVTraders');setShopView("wov"); toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVTravel");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-industry" aria-hidden="true"> Traders </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVGarage' ? 'is-active' : ''}`} onClick={e => {setSubView('WOVGarage');setShopView("wov");toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVGarage");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-warehouse" aria-hidden="true"> Garage </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVWrecking' ? 'is-active' : ''}`} onClick={e => {setSubView('WOVWrecking');setShopView("wov");toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVWrecking");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-car-crash" aria-hidden="true"> Wrecking </i>
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVInfo' ? 'is-active' : ''}`} onClick={e => {setSubView('WOVInfo');setShopView("wov");toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVInfo");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-info-circle" aria-hidden="true"> Information </i> 
                                    </span>
                                    <span className={`navbar-item ${subview === 'WOVPS' ? 'is-active' : ''}`} onClick={e => {setSubView('WOVPS');setShopView("wov");toggleMenu(e);setWOVMenu(!wovMenu);localStorage.setItem("subview","WOVPS");localStorage.setItem("shopView","wov")}}>
                                        <i className="fas fa-handshake" aria-hidden="true"> Partnerships </i> 
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">

                                    <span onClick={ e => {  toggleAds(e); toggleMenu(e);}} className="button is-light">
                                    <i className="fas fa-rss" aria-hidden="true"></i> &nbsp; Ads
                                    </span>
                                    <span onClick={ e => {toggleCart(e); toggleMenu(e);}} className="button  is-primary">
                                        <i className="fas fa-receipt" aria-hidden="true"></i> &nbsp; <strong> Invoice </strong>
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <br />
                <div className="page-content">
                    <div className='shops-body columns is-mobile'>
                        {toggleads &&
                            <div className=''>
                                <div className='ad-bar-container box no-padding'>
                                    <article className='message'>
                                        <div className='message-header ads-header'>
                                            <h1 className="ads-heading">ADS</h1>&nbsp;
                                            <i onClick={e => console.log("expand")} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-external-link-alt" aria-hidden="true"></i>
                                            <span style={{width:"100%"}}>
                                                <i onClick={e => toggleAds(e)} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-times-circle is-pulled-right" aria-hidden="true"></i>
                                            </span>
                                        </div>
                                        <div className='message-body'>
                                            <ul>
                                                <li>
                                                    test 1
                                                </li>
                                                <li>
                                                    test 2
                                                </li>
                                                <li>
                                                    test 3
                                                </li>
                                                <li>
                                                    test 4
                                                </li>
                                                <li>
                                                    test 5
                                                </li>
                                            </ul>
                                        </div>
                                        
                                    </article>
                                </div>
                            </div>
                        }
                        <div className='column no-padding'>
                            <div className='container'>
                                {shopView === "grandmarket" &&
                                <div>
                                    <div className="hero">
                                        <div className="box">
                                            <GrandMarket />
                                        </div>
                                    </div>
                                </div>
                                }

                                {shopView === "enterprise" &&
                                <div>
                                    <div className="hero">
                                        <div className="card">
                                            <Products subview={subview}/>
                                        </div>
                                    </div>
                                </div>
                                }

                                {shopView === "bickle" &&
                                <div>
                                    <div className="hero">
                                        <div className="card">
                                            <BickleCourt subview={subview}/>
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "worksite" &&
                                <div>
                                    <div className="hero">
                                        <div className="card">
                                            <Services subview={subview}/>
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "propfinder" &&
                                <div>
                                    <div className="hero">
                                        <div className="card">
                                            <PropFinder subview={subview}/>
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "wov" &&
                                <div>
                                    <div className="hero">
                                        <div className="card">
                                            <WOV subview={subview}/>
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                        </div>
                        {togglecart &&
                            <div className=''>
                                <div className='cart-container box no-padding'>
                                    <article className="message">
                                        <Tabs>
                                            <div className="message-header">
                                                <i onClick={e => toggleCart(e)} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-times-circle" aria-hidden="true"></i>
                                                <TabList>
                                                    <Tab>Orders</Tab>
                                                    <Tab>Bills</Tab>
                                                </TabList>
                                                <i onClick={e => console.log("expand")} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-external-link-alt" aria-hidden="true"></i>
                                            </div>
                                            <div className="message-body">
                                                <TabPanel>
                                                    <h1>Orders</h1>
                                                </TabPanel>
                                                <TabPanel>
                                                    <h1>Bills</h1>
                                                </TabPanel>
                                            </div>
                                        </Tabs>
                                    </article>
                                </div>
                            </div>
                        }
                    </div>
                    <div className="hero columns">
                         
                        <ShopsFooter />
                        
                    </div>
                    {/*
                    <div className="columns is-mobile">
                            {toggleads &&
                                <div className="column no-padding is-one-quarter">
                                    <div className="ad-bar-container">
                                        <div className={` ${toggleads ? "ads-active" : "ads-not-active"} `} id="ad-bar">
                                            
                                            <article id="ad-bar" className="message">
                                                <div className="message-header ads-header">
                                                    <h1 className="ads-heading">ADS</h1>&nbsp;
                                                    <i onClick={e => console.log("expand")} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-external-link-alt" aria-hidden="true"></i>
                                                    <span style={{width:"100%"}}>
                                                        <i onClick={e => toggleAds(e)} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-times-circle is-pulled-right" aria-hidden="true"></i>
                                                    </span>
                                                </div>
                                                <div className="message-body ads-body">
                                                    
                                                    <ul>
                                                        <li>
                                                            test 1
                                                        </li>
                                                        <li>
                                                            test 2
                                                        </li>
                                                        <li>
                                                            test 3
                                                        </li>
                                                        <li>
                                                            test 4
                                                        </li>
                                                        <li>
                                                            test 5
                                                        </li>
                                                    </ul>
                                                </div>
                                            </article>
                                        </div>    
                                    </div>
                                </div>
                            }
                            <div onClick={e => {setToggleAds(false);setToggleCart(false);}}>
                                {shopView === "grandmarket" &&
                                <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `} >
                                    <div className="hero">
                                        <div className="card">
                                            <GrandMarket />
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "enterprise" &&
                                <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                    <div className="hero">
                                        <div className="card">
                                            <Products />
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "bickle" &&
                                <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `} >
                                    <div className="hero">
                                        <div className="card">
                                            <BickleCourt />
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "worksite" &&
                                <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                    <div className="hero">
                                        <div className="card">
                                            <Services />
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "propfinder" &&
                                <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                    <div className="hero">
                                        <div className="card">
                                            <PropFinder />
                                        </div>
                                    </div>
                                </div>
                                }
                                {shopView === "wov" &&
                                <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                    <div className="hero">
                                        <div className="card">
                                            <WOV />
                                        </div>
                                    </div>
                                </div>
                                }
                            </div>
                            {togglecart &&
                                <div className="column is-one-quarter no-padding">
                                    <div className="cart-container">
                                        <div className={` ${togglecart ? "cart-active" : "cart-not-active"} `} id="cart">
                                            <div className="cart-body">
                                                <article className="message">
                                                    <Tabs>
                                                        <div className="message-header">
                                                            <i onClick={e => toggleCart(e)} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-times-circle" aria-hidden="true"></i>
                                                            <TabList>
                                                                <Tab>Orders</Tab>
                                                                <Tab>Bills</Tab>
                                                            </TabList>
                                                            <i onClick={e => console.log("expand")} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-external-link-alt" aria-hidden="true"></i>
                                                        </div>
                                                        <div className="message-body">
                                                            <TabPanel>
                                                                <h1>Orders</h1>
                                                            </TabPanel>
                                                            <TabPanel>
                                                                <h1>Bills</h1>
                                                            </TabPanel>
                                                        </div>
                                                    </Tabs>
                                                </article>
                                            </div>
                                        </div>    
                                    </div>
                                </div>
                            }
                    </div>
                    <div className="hero">
                        <div className="hero-body">
                            <ShopsFooter />
                        </div>
                    </div>
                        */}
                </div>
            </div>
        </div>
    )
}

export default withContext(Shops);