import React, {useState, useEffect} from 'react';
import withContext from '../../withContext';
import Highlights from './Highlights';
import News from "./News";
import './index.css';
import $ from 'jquery';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRss } from '@fortawesome/free-solid-svg-icons';
import { faAd } from '@fortawesome/free-solid-svg-icons';
import Sports from './Sports';
import Weather from './Weather';
import Entertainment from './Entertainment';
import Archives from './Archives';
import Business from './Business';
import WGRFooter from "./WGRFooter";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';


const WGR = props => {
    const [boxWidth, setWidth] = useState($(".ad-bar-container").width());
    const [start, setStart] = useState(true);
    const [toggleads , setToggleAds] = useState(true);
    const [togglebn , setToggleBN] = useState(false);

    const [showDropDown, setShowDropDown] = useState(false);
    const [rView, setView] = useState('highlights');
    const [showMore, setShowMore] = useState(false);

    useEffect( () => {
        window.scrollTo(0, 0);
        if (start){
            $(".ad-bar-container").animate({
                width: boxWidth
            });
            $(".bn-container").animate({
                width: 0
            });
        }
        //set current to local storage. 
    
    },[start, boxWidth]);

    const toggleAds = (e) => {
        e.preventDefault();
        if (toggleads === true){
            $(".ad-bar-container").animate({
                width: 0,
            });
        }else{
            $(".bn-container").animate({
                width: 0,
            });
            $(".ad-bar-container").animate({
                width: boxWidth,
            });
            
        }
        setToggleAds(!toggleads);
        setToggleBN(false);
        setStart(false);
    }

    const toggleBN = (e) => {
        console.log("TEST");
        e.preventDefault();
        if (togglebn === false){
            $(".ad-bar-container").animate({
                width: 0,
            });
            $(".bn-container").animate({
                width: boxWidth
            });
        }else{
            $(".bn-container").animate({
                width: 0,
            });
        }
        setToggleBN(!togglebn);
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
            <div className="card">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <span className="navbar-item">
                            <h1 className="title" style={{fontSize:"1rem"}}><b onClick={e => { setView('highlights'); toggleMenu(e) ; }}>WGR </b></h1>
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

                            <span className={`navbar-item ${rView === 'news' ? 'is-active' : ''}`} onClick={e => { setView('news'); toggleMenu(e);setShowMore(false);}}>
                                News
                            </span>

                            <span className={`navbar-item ${rView === 'sports' ? 'is-active' : ''}`} onClick={e => {setView('sports');toggleMenu(e);setShowMore(false)}}>
                                Sports
                            </span>

                            <span className={`navbar-item ${rView === 'weather' ? 'is-active' : ''}`} onClick={e => {setView('weather');toggleMenu(e);setShowMore(false);}}>
                                Weather 
                            </span>

                            <span className={`navbar-item ${rView === 'entertainment' ? 'is-active' : ''}`} onClick={e => {setView('entertainment');toggleMenu(e);setShowMore(false);}}>
                                Entertainment
                            </span>

                            <div className={`navbar-item has-dropdown is-hoverable ${(rView === 'business' || rView === 'sci-tech' || rView === 'culture' || rView === 'exclusives' || rView === 'archives') ? 'is-active' : ''}`} onMouseOver={e => setShowMore(true)} onMouseOut={ e => setShowMore(false)}>
                                <span id="more-dropdown" className="navbar-link" onClick={e => setShowMore(!showMore)}>
                                    <i className="fas fa-plus"> More </i> 
                                </span>

                                <div className="navbar-dropdown" style={showMore ? {display:"block"} : {display: "none"}}>
                                    <span className={`navbar-item ${rView === 'business' ? 'is-active' : ''}`} onClick={e => { setView('business');toggleMenu(e); setShowMore(!showMore);}}>
                                        Business
                                    </span>
                                    <span className={`navbar-item ${rView === 'sci-tech' ? 'is-active' : ''}`} onClick={e => { setView('sci-tech'); toggleMenu(e);setShowMore(!showMore);}}>
                                        Science & Techonolgy
                                    </span>
                                    <span className={`navbar-item ${rView === 'culture' ? 'is-active' : ''}`} onClick={e => {setView('culture'); toggleMenu(e);setShowMore(!showMore);}}>
                                        Culture
                                    </span>
                                    <hr className="navbar-divider" />
                                    <span className={`navbar-item ${rView === 'exclusives' ? 'is-active' : ''}`} onClick={e => {setView('exclusives');toggleMenu(e);setShowMore(!showMore);}}>
                                        Exclusives
                                    </span>
                                    <span className={`navbar-item ${rView === 'archives' ? 'is-active' : ''}`} onClick={e => {setView('archives');toggleMenu(e);setShowMore(!showMore);}}>
                                        Archives
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="navbar-end">
                            <div className="navbar-item">
                                <div className="buttons">
                                    <span onClick={ e => { toggleAds(e); toggleMenu(e);setShowMore(false);}} className="button is-light">
                                        <i className="fas fa-rss" aria-hidden="true"></i> &nbsp; Ads
                                    </span>
                                    <span onClick={ e => {toggleBN(e); toggleMenu(e);setShowMore(false);}} className="button is-primary">
                                        <strong>Breaking !</strong>
                                    </span>

                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <div className="page-content" style={{height:"30rem"}}>
                    {/*
                    <div className={`columns is-mobile ${toggleads ? "not-iso":"iso"} ${togglebn ? "bnview":""}`} onClick={e => setShowDropDown(false)}>
                        {toggleads && 
                            <div className="column is-one-quarter">
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
                        
                        {rView === 'highlights' && 
                            <div className="column wgr-articles"
                            onClick={e => {
                                setToggleAds(false);
                                setToggleBN(false);
                            }}>
                                <Highlights />
                            </div>
                        }
                        {rView === 'news' &&
                            <div className="column wgr-articles"
                                onClick={e => {
                                    setToggleAds(false);
                                    setToggleBN(false);
                                }}>
                                <News  />
                            </div>

                        }
                        {rView === 'sports' &&
                            <div className="column wgr-articles"
                            onClick={e => {
                                setToggleAds(false);
                                setToggleBN(false);
                            }}>
                                <Sports  />
                            </div>

                        }
                        {rView === 'weather' &&
                            <div className="column wgr-articles"
                            onClick={e => {
                                setToggleAds(false);
                                setToggleBN(false);
                            }}>
                                <Weather  />
                            </div>

                        }
                        {rView === 'entertainment' &&
                            <div className="column wgr-articles"
                            onClick={e => {
                                setToggleAds(false);
                                setToggleBN(false);
                            }}>
                                <Entertainment  />
                            </div>

                        }
                        {rView === 'archives' &&
                            <div className="column wgr-articles"
                            onClick={e => {
                                setToggleAds(false);
                                setToggleBN(false);
                            }}>
                                <Archives  />
                            </div>

                        }
                        {rView === 'business' &&
                            <div className="column wgr-articles"
                            onClick={e => {
                                setToggleAds(false);
                                setToggleBN(false);
                            }}>
                                <Business  />
                            </div>

                        }
                        {togglebn &&
                            <div className="aux-containers column is-one-fifth">
                                <div className="bn-container">
                                    <div className={` ${togglebn ? "bn-active" : "bn-not-active"} `} id="bn">
                                        <div className="bn-body">
                                            <article className="message">
                                                <Tabs>
                                                    <div className="message-header">
                                                        <i onClick={e => toggleBN(e)} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-times-circle" aria-hidden="true"></i>
                                                        <TabList>
                                                            <Tab>Breaking News</Tab>

                                                        </TabList>
                                                        <i onClick={e => console.log("expand")} style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-external-link-alt" aria-hidden="true"></i>
                                                    </div>
                                                    <div className="message-body">
                                                        <TabPanel>
                                                            <h1>Info</h1>
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
                            <WGRFooter />
                        </div>
                    </div>*/}
                </div>
            </div>
        </div>
    )
    /*return (
        <div className="hero">
            <div className="report-box">
                <div className="tabs-header wgr-tabs">               
                    <div className="card box-bg header-container">
                    <div className="tabs-bg has-text-centered card">
                            <div className="custom-heading cart-icon columns">
                                <div className="column">
                                    <button onClick={ e => toggleAds(e)} className="button">
                                        <FontAwesomeIcon icon={faAd} size="2x" />&nbsp;<span className="badge-link">0</span>
                                    </button> 
                                </div>
                                <div className="column is-half">
                                    <h1 className="custom-heading subtitle"><b>W@H GW@@N REPORTS</b></h1>
                                </div>
                                <div className="column has-text-right">
                                    <button onClick={ e => toggleBN(e)} className="button">
                                        <FontAwesomeIcon icon={faRss} size="2x" />&nbsp;
                                        <p><small><b>Breaking !</b></small>&nbsp;&nbsp;<span className="badge-order">1</span></p>
                                    </button> 
                                </div>
                            </div>
                        </div>
                        <div className="tabs-bg custom-tabs tabs is-fullwidth card">
                            <ul style={{margin:"0 auto"}}>
                                <li className={`button ${rView === 'highlights' ? "is-active" : "is-not-active"}`}
                                    onClick={ e => {
                                        setShowDropDown(false);
                                        setView('highlights');
                                    }}
                                >
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-satellite-dish" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> Highlights </span> 
                                </span>
                            
                                </li>
                                <li className={`button ${rView === 'news' ? "is-active" : "is-not-active"}`}
                                    onClick={ e => {
                                        setShowDropDown(false);
                                        setView('news');
                                    }}
                                >
                            
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-newspaper" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> News </span>  
                                </span>
                                
                                </li>
                                <li className={`button ${rView === 'sports' ? "is-active" : "is-not-active"}`}
                                    onClick={ e => {
                                        setShowDropDown(false);
                                        setView('sports');
                                    }}
                                >
                            
                                 
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-quidditch" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> Sports </span> 
                                </span>
                                 
                                </li>
                                <li className={`button ${rView === 'weather' ? "is-active" : "is-not-active"}`}
                                    onClick={ e => {
                                        setShowDropDown(false);
                                        setView('weather');
                                    }}
                                >
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-cloud-sun-rain" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> Weather </span>  
                                </span>
                               
                                </li>
                                <li className={`button ${rView === 'entertainment' ? "is-active" : "is-not-active"}`}
                                    onClick={ e => {
                                        setShowDropDown(false);
                                        setView('entertainment');
                                    }}
                                >
                                 
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-icons" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> Entertainment </span>  
                                </span>
                                
                                </li>
                                <li className={`button ${rView === 'archives' ? "is-active" : "is-not-active"}`}
                                    onClick={ e => {
                                        setShowDropDown(false);
                                        setView('archives');
                                    }}
                                >
                                
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-archive" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> Archives </span>  
                                </span>
                                
                                </li>

                                <li style={{cursor:"pointer"}} 
                                    onClick={e => setShowDropDown(!showDropDown)} 
                                    className={`tabs-btn button ${showDropDown || rView === 'business' || rView === 'scitech' ? "is-active" : "is-not-active"}`}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-plus" aria-hidden="true"></i></span>
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="additional-tabs custom-container">
                    <div className="columns">              
                        <div className="column">

                        </div>
                        <div className="column is-3">
                            {showDropDown &&
                                <div className="plus-tabs">
                                    <br /> 
                                    <div className="box tabs-box">
                                        <ul>
                                            <li className={`tabs-btn button ${rView === 'business' ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                //deactivate();
                                                setView('business');
                                                //setShowWOVG(true);
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-briefcase" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">Business</span> &nbsp;
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${false ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                //deactivate();
                                                setView('WOVG');
                                                //setShowWOVG(true);
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-sim-card" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">Sci-Tech</span> &nbsp;
                                                </span>
                                            </li> 
                                            <li className={`tabs-btn button ${false ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                //deactivate();
                                                setView('WOVC');
                                                //setShowWOVC(true);
                                                setShowDropDown(false);
                                                 
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-vest-patches" aria-hidden="true"></i></span>
                                                    <span className="tabs-title"> Culture </span>  
                                                </span>
                                            </li> 
                                            
                                            <li className={`tabs-btn button ${false ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                //deactivate();
                                                setView('WOVI');
                                                //setShowWOVI(true);
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-edit" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">Exclusives</span>  
                                                </span>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
            <div className="page-content">
                <div className={`wgr-content columns ${toggleads || togglebn ? "not-iso":"iso"}`} onClick={e => setShowDropDown(false)}>
                    {toggleads && 
                        <div className="aux-containers column is-one-fifth">
                            <div className="ad-bar-container">
                                <div className={` ${toggleads ? "ads-active" : "ads-not-active"} `} id="ad-bar">
                                    
                                    <div id="ad-bar">
                                        <div className="ads-header">
                                            <button onClick={e => toggleAds(e)} className="button is-pulled-right" aria-label="close">
                                                <i style={{fontSize:"x-large"}} className="fas fa-times-circle" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                        <div className="ads-body box">
                                            <h1>ADS</h1>
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
                                    </div>
                                </div>    
                            </div>
                        </div>
                    }
                    
                    {rView === 'highlights' && 
                        <div className="column wgr-articles"
                        onClick={e => {
                            setToggleAds(false);
                            setToggleBN(false);
                        }}>
                            <Highlights />
                        </div>
                    }
                    {rView === 'news' &&
                        <div className="column wgr-articles"
                            onClick={e => {
                                setToggleAds(false);
                                setToggleBN(false);
                            }}>
                            <News  />
                        </div>

                    }
                    {rView === 'sports' &&
                        <div className="column wgr-articles"
                        onClick={e => {
                            setToggleAds(false);
                            setToggleBN(false);
                        }}>
                            <Sports  />
                        </div>

                    }
                    {rView === 'weather' &&
                        <div className="column wgr-articles"
                        onClick={e => {
                            setToggleAds(false);
                            setToggleBN(false);
                        }}>
                            <Weather  />
                        </div>

                    }
                    {rView === 'entertainment' &&
                        <div className="column wgr-articles"
                        onClick={e => {
                            setToggleAds(false);
                            setToggleBN(false);
                        }}>
                            <Entertainment  />
                        </div>

                    }
                    {rView === 'archives' &&
                        <div className="column wgr-articles"
                        onClick={e => {
                            setToggleAds(false);
                            setToggleBN(false);
                        }}>
                            <Archives  />
                        </div>

                    }
                    {rView === 'business' &&
                        <div className="column wgr-articles"
                        onClick={e => {
                            setToggleAds(false);
                            setToggleBN(false);
                        }}>
                            <Business  />
                        </div>

                    }
                    {togglebn &&
                        <div className="aux-containers column is-one-fifth">
                             
                            <div className="bn-container">
                                <div className={` ${togglebn ? "bn-active" : "bn-not-active"} `} id="bn">
                                    <div className="bn-header">
                                        
                                        <div>
                                            <button onClick={e => toggleBN(e)} className="button" aria-label="close">
                                                <i style={{fontSize:"x-large"}} className="fas fa-times-circle" aria-hidden="true"></i>
                                            </button>
                                        </div>
                                    
                                    </div>
                                    <div className="bn-body box">
                                        <h1>Breaking !</h1>
                                    </div>
                                </div>    
                            </div>
                        </div>
                    }
                </div>  
                <div className="hero">
                    <div className="hero-body">
                        <WGRFooter />
                    </div>
                </div>
            </div>
        </div>
    )*/
}

export default withContext(WGR);