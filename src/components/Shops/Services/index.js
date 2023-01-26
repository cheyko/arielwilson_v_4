import React, {useState, useEffect} from "react";
import withContext from "../../../withContext";
import "./index.css";

import ServicesHome from "./ServicesHome";
import ServicesList from "./ServicesList";
import Provider from "./Offer";
import Categories from "./Categories";
import Offer from "./Offer";
import SelfHelp from "./SelfHelp";

const Services = props => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [ServicesView, setServicesView] = useState('ServicesHome');

    useEffect( () => {

        //set current to local storage. 
    
    },[]);

    return(
        <div className="shops-container">
            <div className="w-o-v">
                <div className="card fixed-card">
                    <div className="services-tabs tabs is-centered">
                        <ul>
                            <li className={`tabs-btn button ${ServicesView === "ServicesHome" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    setServicesView('ServicesHome');
                                   
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-toolbox" aria-hidden="true"></i></span> 
                                </span>
                            </li>
                            
                            <li className={`tabs-btn button ${ServicesView === "ServicesGet" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false); 
                                    setServicesView('ServicesGet');
                                     
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-wrench" aria-hidden="true"></i></span>
                                    <span className="tabs-title">SERVICES</span>  
                                </span>
                            </li>

                            <li className={`tabs-btn button ${ServicesView === "ServicesST" ? "is-active" : "is-not-active"}`}
                                onClick={ () => {
                                    setServicesView('ServicesST');
                                    setShowDropDown(false);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-briefcase" aria-hidden="true"></i></span>
                                    <span className="tabs-title">WORKSTATIONS</span>  
                                </span>
                            </li> 

                            

                            <li className={`tabs-btn button ${ServicesView === "Offer" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                           
                                    setServicesView('Offer');
                                    
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-money-check-alt" aria-hidden="true"></i></span>
                                    <span className="tabs-title"> OFFER SERVICE </span>  
                                </span>
                            </li>
                            <li className={`tabs-btn button ${ServicesView === "ServicesSH" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                            
                                    setServicesView('ServicesSH');
                                 
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fab fa-hire-a-helper" aria-hidden="true"></i></span>
                                    <span className="tabs-title">SELF HELP</span>  
                                </span>
                            </li>
                            <li onClick={e => setShowDropDown(!showDropDown)} className={`tabs-btn button ${ServicesView === "Providers" || ServicesView === "ServicesI" || ServicesView === "ServicesPS"|| ServicesView === "Categories" ? "is-active" : "is-not-active"}`}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-plus" aria-hidden="true"></i></span>
                                </span>
                            </li>
                        </ul>
                    </div>  
                </div> 
                <div className="additional-tabs container" style={{height:"0rem"}}>
                    <div className="columns">              
                        <div className="column">

                        </div>
                        <div className="column is-4">
                            {showDropDown &&
                                <div className="plus-tabs">
                                    <br /> 
                                    <div className="box tabs-box">
                                        <ul>
                                            <li className={`tabs-btn button ${ServicesView === "Providers" ? "is-active" : "is-not-active"}`}
                                                onClick={e => {

                                                    setServicesView('Providers');
                                                  
                                                    setShowDropDown(false);
                                                }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-hard-hat" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">PROVIDERS</span>  
                                                </span>
                                            </li>
                                            <li className={`tabs-btn button ${ServicesView === "Categories" ? "is-active" : "is-not-active"}`}
                                                onClick={e => {

                                                    setServicesView('Categories');

                                                    setShowDropDown(false);
                                                }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-swatchbook" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">CATEGORIES</span>  
                                                </span>
                                            </li>
                                            
                                            <li className={`tabs-btn button ${ServicesView === "Courses" ? "is-active" : "is-not-active"}`}
                                                onClick={e => {

                                                    setServicesView('Courses');

                                                    setShowDropDown(false);
                                                }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-school" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">COURSES</span>  
                                                </span>
                                            </li>

                                            <li className={`tabs-btn button ${ServicesView === "ServicesI" ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {

                                                setServicesView('ServicesI');

                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-info-circle" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">WS-INFO</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${ServicesView === "ServicesPS" ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {

                                                setServicesView('ServicesPS');

                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-handshake" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">WS-PARTNERSHIPS</span>  
                                                </span>
                                            </li> 
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="sub-content" onClick={e => setShowDropDown(false)}>
                    {ServicesView === "ServicesHome" && 
                        <div className="content">
                            <ServicesHome setServicesView={setServicesView}/>
                        </div>
                    }
                    {ServicesView === "ServicesST" && 
                        <div className="content">
                            <h1> Stations List </h1>
                        </div>
                    }
                    {ServicesView === "Courses" && 
                        <div className="content">
                            <h1> Courses </h1>
                        </div>
                    }
                    {ServicesView === "Categories" && 
                        <div className="content">
                            <Categories />
                        </div>
                    }
                    {ServicesView === "ServicesGet" && 
                        <div className="content">
                            <ServicesList ServicesView={ServicesView} setServicesView={setServicesView} />
                        </div>
                    }
                    {ServicesView === "Providers" && 
                        <div className="content">
                            <Provider />
                        </div>
                    }
                    {ServicesView === "Offer" && 
                        <div className="content">
                            <Offer />
                        </div>
                    }
                    {ServicesView === "ServicesSH" && 
                        <div className="content">
                            <SelfHelp />
                        </div>
                    }
                    {ServicesView === "ServicesPS" && 
                        <div className="content">
                            <h1>Services Partnerships</h1>
                        </div>
                    }
                    {ServicesView === "ServicesI" && 
                        <div className="content">
                            <h1>Services-Info</h1>
                        </div>
                    }
                </div>
            
            </div>
        </div>
    )
}
export default withContext(Services);