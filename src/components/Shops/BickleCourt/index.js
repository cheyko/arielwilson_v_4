import React, {useState} from "react";
import withContext from "../../../withContext";
import Kiosk from "./Kiosk";
import Spot from "./Spot";
//import Meal from "./Meal";
import BCHome from "./BCHome";
import Reservation from "./Reservation";
import BCSell from "./BCSell";
import Operator from "./Operator";

// use "meally" name in some way

const BickleCourt = props => {

    const [BCView, setBCView] = useState('BCHome');
    const [showDropDown, setShowDropDown] = useState(false);

    return(
        <div className="shops-container">
            <div className="bickle-court">
                <div className="card fixed-card">
                    <div className="pf-tabs tabs is-centered">
                        <ul>
                            <li className={`tabs-btn button ${BCView === "BCHome" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    setBCView('BCHome');
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-utensils" aria-hidden="true"></i><i style={{fontSize:"x-large"}} className="fas fa-wine-glass-alt" aria-hidden="true"></i></span>
                                </span>
                            </li>
                            
                            <li className={`tabs-btn button ${BCView === "Kiosk" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    setBCView('Kiosk');
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-tablet-alt" aria-hidden="true"></i></span>
                                    <span className="tabs-title">Kiosk</span> 
                                </span>
                            </li>

                            <li className={`tabs-btn button ${BCView === "Spots" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    setBCView('Spots');
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-map-pin" aria-hidden="true"></i></span>
                                    <span className="tabs-title">Spots</span>
                                </span>
                            </li>

                            <li className={`tabs-btn button ${BCView === "Sell" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    setBCView('Sell');
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-money-check-alt" aria-hidden="true"></i></span>
                                    <span className="tabs-title">SELL</span>  
                                </span>
                            </li>
                            
                            <li className={`tabs-btn button ${BCView === "Reservations" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    setBCView('Reservations');
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-concierge-bell" aria-hidden="true"></i></span>
                                    <span className="tabs-title">RESERVATIONS</span>  
                                </span>
                            </li>
                            
                            <li onClick={e => setShowDropDown(!showDropDown)} className={`tabs-btn button ${BCView === "Operators" || BCView === "Info" || BCView === "Partnerships" ? "is-active" : "is-not-active"}`}>
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
                                            <li className={`tabs-btn button ${BCView === "Operators" ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                
                                                setBCView('Operators');
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-street-view" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">OPERATORS</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${BCView === "Info" ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                            
                                                setBCView('Info');
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-info-circle" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">BC-INFO</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${BCView === "Partnerships" ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                            
                                                setBCView('Partnerships');
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-handshake" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">BC-Partnerships</span>  
                                                </span>
                                            </li> 
                                            <li className={`tabs-btn button ${false ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-hammer" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">......</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${false ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                setShowDropDown(false);                                               
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-house-damage" aria-hidden="true"></i></span>
                                                    <span className="tabs-title"> .....</span>  
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
                    {BCView === "BCHome" && 
                        <div className="content">
                            <BCHome  />
                        </div>
                    }
                    {BCView === "Kiosk" && 
                        <div className="content">
                            <Kiosk />
                        </div>
                    }
                    {BCView === "Spots" && 
                        <div className="content">
                            <Spot />
                        </div>
                    }
                    {BCView === "Sell" && 
                        <div className="content">
                            <BCSell />
                        </div>
                    }
                    {BCView === "Reservations" && 
                        <div className="content">
                            <Reservation />
                        </div>
                    }
                    {BCView === "Operators" && 
                        <div className="content">
                            <Operator />
                        </div>
                    }
                    {BCView === "Partnerships" && 
                        <div className="content">
                            <h1>BickleCourt Partnerships</h1>
                        </div>
                    }
                    {BCView === "Info" && 
                        <div className="content">
                            <h1>Bickle Lifestyle</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default withContext(BickleCourt);