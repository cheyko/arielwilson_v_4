import React, { useEffect, useState } from 'react';
import withContext from '../../withContext';
import './index.css';
import $ from 'jquery';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faReceipt } from '@fortawesome/free-solid-svg-icons';
import { faAd } from '@fortawesome/free-solid-svg-icons';

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

    const [showDropDown, setShowDropDown] = useState(false);
    const [showMore, setShowMore] = useState(false);

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
            let reloadView = JSON.parse(localStorage.getItem("shopView"));
            if(reloadView){
                setShopView(reloadView);
            }else{
                setShopView("GM");
            }
        } 

        //set current to local storage. 
    
    },[start]);

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
        <div className="hero">
            <div className="card">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <a className="navbar-item">
                            <h1 onClick={e => setShopView('grandmarket')} className="subtitle"><i className="fas fa-bullhorn" aria-hidden="true"></i>&nbsp;<small>MARKET</small></h1>
                        </a>

                        <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <small>sections</small>
                        </a>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">
                            <div className="buttons">
                                <a className={`navbar-item button ${shopView === "enterprise" ? "is-active" : "is-not-active"}`} onClick={e => { setShopView("enterprise"); toggleMenu(e);}}>
                                    <i className="fas fa-shopping-cart" aria-hidden="true"></i> 
                                    &nbsp;<small>ENTERPRISE</small>
                                </a>

                                <a className={`navbar-item button ${shopView === "bickle" ? "is-active" : "is-not-active"}`} onClick={e => { setShopView("bickle"); toggleMenu(e);}}>
                                    <i className="fas fa-utensils" aria-hidden="true"></i> 
                                    &nbsp;<small>BICKLE COURT</small>
                                </a>

                                <a className={`navbar-item button ${shopView === "worksite" ? "is-active" : "is-not-active"}`} onClick={e => { setShopView("worksite"); toggleMenu(e);}}>
                                    <i className="fas fa-toolbox" aria-hidden="true"></i> 
                                    &nbsp;<small>WORKSITE</small>
                                </a>

                                <a className={`navbar-item button ${shopView === "propfinder" ? "is-active" : "is-not-active"}`} onClick={e => { setShopView("propfinder"); toggleMenu(e);}}>
                                    <i className="fas fa-sign" aria-hidden="true"></i> 
                                    &nbsp;<small>PROP-FINDER </small>
                                </a>

                                <a className={`navbar-item button ${shopView === "wov" ? "is-active" : "is-not-active"}`} onClick={e => { setShopView("wov"); toggleMenu(e);}}>
                                    <i className="fas fa-car" aria-hidden="true"></i> 
                                    &nbsp;<small>W.O.V</small>
                                </a>
                            </div>
                        </div>
                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">

                                    <a onClick={ e => {  toggleAds(e); toggleMenu(e);}} className="button is-small is-light">
                                    <i className="fas fa-rss" aria-hidden="true"></i> &nbsp; Ads
                                    </a>
                                    <a onClick={ e => {toggleCart(e); toggleMenu(e);}} className="button is-small is-primary">
                                        <i className="fas fa-receipt" aria-hidden="true"></i> &nbsp; <strong> Invoice </strong>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <br />
                <div className="page-content">
                    <div className="columns is-mobile no-margin no-padding">
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
                            <div onClick={e => {
                                setToggleAds(false);
                                setToggleCart(false);
                            }}>
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
                </div>
            </div>
        </div>
    )
    /*return (
        <div className="hero">
            <div className="wgr-box">
                <div className="tabs-header market-header">
                    <div className="card">
                        <div className="tabs-bg has-text-centered card">
                            <div className="custom-heading cart-icon columns">
                                <div className="column">
                                    <button onClick={ e => toggleAds(e)} className="button">
                                        <FontAwesomeIcon icon={faAd} size="2x" />&nbsp;<span className="badge-link">0</span>
                                    </button> 
                                </div>
                                <div className="column is-half">
                                    <h1 className="custom-heading subtitle"><b>MARKET</b></h1>
                                </div>
                                <div className="column has-text-right">
                                    <button onClick={ e => toggleCart(e)} className="button">
                                        <FontAwesomeIcon icon={faReceipt} size="2x" />&nbsp;
                                        <p><small><b>Invoice</b></small>&nbsp;<span className="badge-order">0</span></p>
                                    </button> 
                                </div>
                            </div>
                        </div>
                        
                        <div className="tabs-bg custom-tabs tabs is-centered card">
                            <ul>
                                <li className={`tabs-btn button ${showGM ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    deactivate();
                                    setShopView('GM');
                                    localStorage.setItem("shopView", JSON.stringify('GM'));
                                    setShowGM(true);
                                }}>
                                    <span className="reaction-btn">
                                        <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-bullhorn" aria-hidden="true"></i></span>
                                        <span className="tabs-title">GRANDMARKET</span> 
                                    </span>
                                </li>

                                <li className={`button tabs-btn ${showPS ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    deactivate();
                                    setShopView('PS');
                                    localStorage.setItem("shopView", JSON.stringify("PS"));
                                    setShowPS(true);
                                }}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-shopping-cart" aria-hidden="true"></i></span>
                                        <span className="tabs-title">ENTERPRISE</span>  
                                    </span>
                                </li>

                                <li className={`button tabs-btn ${showBC ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    deactivate();
                                    setShopView('BC');
                                    localStorage.setItem("shopView", JSON.stringify("BC"));
                                    setShowBC(true);
                                }}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-utensils" aria-hidden="true"></i><i style={{fontSize:"x-large"}} className="fas fa-wine-glass-alt" aria-hidden="true"></i></span>
                                        <span className="tabs-title">BICKLE COURT</span>  
                                    </span>
                                </li>

                                <li className={`button tabs-btn ${showSS ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    deactivate();
                                    setShopView('SS');
                                    localStorage.setItem("shopView", JSON.stringify("SS"));
                                    setShowSS(true);
                                }}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-toolbox" aria-hidden="true"></i></span>
                                        <span className="tabs-title">WORKSITE</span>  
                                    </span>
                                </li>

                                <li className={`button tabs-btn ${showPF ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    deactivate();
                                    setShopView('PF');
                                    localStorage.setItem("shopView", JSON.stringify("PF"));
                                    setShowPF(true);
                                }}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-sign" aria-hidden="true"></i></span>
                                        <span className="tabs-title">PROP-FINDER</span>  
                                    </span>
                                </li>
                                <li className={`button tabs-btn ${showWOV ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    deactivate();
                                    setShopView('WOV');
                                    localStorage.setItem("shopView", JSON.stringify("WOV"));
                                    setShowWOV(true);
                                }}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-car" aria-hidden="true"></i></span>
                                        <span className="tabs-title">WORLD.OF.VEHICLE</span> 
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shop-page-content">
                <div className="shop-content columns">
                        {toggleads &&
                            <div className="column is-one-quarter no-space">
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
                        <div onClick={e => {
                            setToggleAds(false);
                            setToggleCart(false);
                        }}>
                            {showGM &&
                            <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `} >
                                <div className="hero">
                                    <div className="shopbox box">
                                        <GrandMarket />
                                    </div>
                                </div>
                            </div>
                            }
                            {showPS &&
                            <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                <div className="hero">
                                    <div className="shopbox box">
                                        <Products />
                                    </div>
                                </div>
                            </div>
                            }
                            {showBC &&
                            <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `} >
                                <div className="hero">
                                    <div className="shopbox box">
                                        <BickleCourt />
                                    </div>
                                </div>
                            </div>
                            }
                            {showSS &&
                            <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                <div className="hero">
                                    <div className="shopbox box">
                                        <Services />
                                    </div>
                                </div>
                            </div>
                            }
                            {showPF &&
                            <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                <div className="hero">
                                    <div className="shopbox box">
                                        <PropFinder />
                                    </div>
                                </div>
                            </div>
                            }
                            {showWOV &&
                            <div className={`column ${toggleads || togglecart ? "reduced-column" : "self-column"} `}>
                                <div className="hero">
                                    <div className="shopbox box">
                                        <WOV />
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                        {togglecart &&
                            <div className="column is-one-quarter">
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
            </div>
        </div>
    )*/
}

export default withContext(Shops);