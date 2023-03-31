import React, {useEffect, useState} from "react";
import withContext from "../../withContext";
import "./index.css"
import Religion from "./Religion";
import $ from 'jquery';

const Social = props => {
    
    const [sView, setView] = useState('religion');
    //const [showDropDown, setShowDropDown] = useState(false);
    //const [showMore, setShowMore] = useState(false);

    useEffect( () => {
        props.context.setShops();
    },[props.context]);

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return (
        <div className="hero social-container">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <small>sections</small>
                    </span>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start nav-row">
                        <div className="buttons">
                            <span className="navbar-item button" onClick={e => { setView('religion'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-pray" aria-hidden="true"></i></span> 
                                <span> Religion </span>
                            </span>

                            <span className="navbar-item button" onClick={e => { setView('gov'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-building" aria-hidden="true"></i></span>
                                <span> Gov </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('family'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-house-user" aria-hidden="true"></i></span>  
                                <span> Family </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('education'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-graduation-cap" aria-hidden="true"></i></span>  
                                <span> Education </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('justice'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-gavel" aria-hidden="true"></i></span>  
                                <span> Justice </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('finance'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-donate" aria-hidden="true"></i></span>  
                                <span> Finance </span>
                            </span>

                            <span className="navbar-item button" onClick={e => { setView('health'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-first-aid" aria-hidden="true"></i></span> 
                                <span> Health </span>
                            </span>

                            <span className="navbar-item button" onClick={e => { setView('cuisine'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-drumstick-bite" aria-hidden="true"></i></span> 
                                <span> Cuisine </span>
                            </span>
                        </div>
                    </div>
                    <div className="navbar-start nav-row">
                        <div className="buttons">
                            <span className="navbar-item button" onClick={e => { setView('science'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-microscope" aria-hidden="true"></i></span>  
                                <span> Science </span>
                            </span>

                            <span className="navbar-item button" onClick={e => { setView('tech'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-microchip" aria-hidden="true"></i></span> 
                                <span> Tech </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('groups'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-users" aria-hidden="true"></i></span> 
                                <span> Groups </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('agri-green'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-tree" aria-hidden="true"></i></span> 
                                <span> Agri-Green </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('charity'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-hand-holding-heart" aria-hidden="true"></i></span>  
                                <span> Charity </span>
                            </span>
                            <span className="navbar-item button" onClick={e => { setView('media'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-tv" aria-hidden="true"></i></span>  
                                <span> Media </span>
                            </span>

                            <span className="navbar-item button" onClick={e => { setView('culture'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-people-arrows" aria-hidden="true"></i></span> 
                                <span> Culture </span>
                            </span>

                            <span className="navbar-item button" onClick={e => { setView('industry'); /*setShowMore(false);*/}}>
                                <span className="icon is-small"><i  className="fas fa-industry" aria-hidden="true"></i></span> 
                                <span> Industry </span>
                            </span>
                        </div>
                    </div>
                
                </div>
            
            </nav>
            <div className="social-page-content">
                <div className="hero-contain">
                    <br />
                    <div className="social-content">
                        { sView === "religion" && 
                            <div>
                                <Religion />
                            </div>
                        }
                    </div>
                </div>
            </div>
        
        </div>
    )
/*
    return(
        <div className="hero">
            
            <div className="social wgr-box">
                <div className="tabs-header wgr-tabs">
                    
                    <div className="card social-header social-box-bg">
                        <div className="has-text-centered">
                            <h1 className="custom-heading subtitle"><b>SOCIAL</b></h1>
                        </div>
                        <div id="tabs-row-1" className="tabs-bg custom-tabs tabs is-centered card">
                            <ul style={{margin:"0 auto"}}>
                                <li className={`button ${sView === 'religion' ? "is-active" : "is-not-active"}`}
                                onClick={ e => {
                                    setView('religion');
                                }}
                            >
                            
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-pray" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> RELIGION </span> 
                                </span>
                            
                                </li>
                                <li className="button is-not-active">
                            
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-building" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> GOVERNMENT </span>  
                                </span>
                                
                                </li>
                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-house-user" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> FAMILY </span> 
                                </span>
                                
                                </li>
                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-graduation-cap" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> EDUCATION </span> 
                                </span>
                                
                                </li>
                                <li className="button tabs-btn is-not-active">
                            
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-gavel" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> JUSTICE </span> 
                                </span>
                            
                                </li>

                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-donate" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> FINANCE </span> 
                                </span>
                                
                                </li>
                                
                                
                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-first-aid" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> HEALTH </span> 
                                </span>
                                
                                </li>
                            </ul>
                        </div>
                        <div id="tabs-row-2" className="tabs-bg custom-tabs tabs is-centered card">
                            <ul style={{margin:"0 auto"}}>
                            <li className="button is-not-active">
                            
                            <span className="reaction-btn">
                                <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-microscope" aria-hidden="true"></i></span>
                                <span className="tabs-title"> SCIENCE </span>  
                            </span>
                            
                            </li>

                                
                                <li className="button is-not-active">
                            
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-microchip" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> TECHNOLOGY </span>  
                                </span>
                                
                                </li>
                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-users" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> GROUPS </span> 
                                </span>
                                
                                </li>
                                
                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-tree" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> AGRI-GREEN </span> 
                                </span>
                                
                                </li>

                                <li className="button is-not-active">
                            
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-hand-holding-heart" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> CHARITY </span>  
                                </span>
                                
                                </li>
                                
                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-tv" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> MEDIA </span> 
                                </span>
                                
                                </li>
                                <li className="button is-not-active">
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-people-arrows" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> CULTURE </span> 
                                </span>
                                
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <br /><br />
            <div className="hero-body">
                <div className="social-content">
                    { sView === "religion" && 
                        <div>
                            <Religion />
                        </div>
                    }
                </div>
            </div>
        </div>
    )*/
}
export default withContext(Social);