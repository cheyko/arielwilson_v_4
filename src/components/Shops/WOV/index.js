import React, {useState, useEffect} from "react";
import withContext from "../../../withContext";
import "./index.css";
import WOVHome from "./WOVHome";
import WOVList from "./WOVList";
import WOVSell from "./WOVSell";
import WOVGarage from "./WOVGarage";
import WOVTravel from "./WOVTravel";
import WOVRental from "./WOVRental";

const WOV = props => {
    const [showDropDown, setShowDropDown] = useState(false);

    const [WOVView, setWOVView] = useState({page:'WOVHome'});
    const [showWOVHome , setShowWOVHome] = useState(true);
    const [showWOVList, setShowWOVList] = useState(false);
    const [showWOVR, setShowWOVR] = useState(false);
    const [showWOVS, setShowWOVS] = useState(false);
    const [showWOVT, setShowWOVT] = useState(false);
    const [showWOVTR, setShowWOVTR] = useState(false);
    const [showWOVG, setShowWOVG] = useState(false);
    const [showWOVC, setShowWOVC] = useState(false);
    const [showWOVPS, setShowWOVPS] = useState(false);
    const [showWOVI, setShowWOVI] = useState(false);

    useEffect( () => {

        if (showWOVList){
            //filter based on the View

        }

        //set current to local storage. 
    
    },[showWOVList]);

    const deactivate = () => {
        switch(WOVView.page){
            case 'WOVBuy':
                setShowWOVList(false);
                break;
            case 'WOVRent':
                setShowWOVR(false);
                break;
            case 'WOVSell':
                setShowWOVS(false);
                break;
            case 'WOVG':
                setShowWOVG(false);
                break;
            case 'WOVT':
                setShowWOVT(false);
                break;
            case 'WOVTR':
                setShowWOVTR(false);
                break;
            case 'WOVC':
                setShowWOVC(false);
                break;
            case 'WOVPS':
                setShowWOVPS(false);
                break;
            case 'WOVI':
                setShowWOVI(false);
                break;            
            default:
                setShowWOVHome(false);
                break;
        }
    }

    return(
        <div className="shops-container">
            <div className="w-o-v">
                <div className="card fixed-card">
                    <div className="wov-tabs tabs is-centered">
                        <ul>
                            <li className={`tabs-btn button ${showWOVHome ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setWOVView('WOVHome');
                                    setShowWOVHome(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-car" aria-hidden="true"></i></span> 
                                </span>
                            </li>
                            <li className={`tabs-btn button ${WOVView.page === "WOVBuy" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setWOVView({page:'WOVBuy'});
                                    setShowWOVList(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-car-side" aria-hidden="true"></i></span>
                                    <span className="tabs-title">BUY</span>  
                                </span>
                            </li>

                            <li className={`tabs-btn button ${WOVView.page === "WOVRent" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setWOVView({page:'WOVRent'});
                                    setShowWOVR(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-caravan" aria-hidden="true"></i></span>
                                    <span className="tabs-title">RENT</span>   
                                </span>
                            </li>

                            <li className={`tabs-btn button ${WOVView.page === "WOVSell" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setWOVView({page:'WOVSell'});
                                    setShowWOVS(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-money-check-alt" aria-hidden="true"></i></span>
                                    <span className="tabs-title">SELL</span>  
                                </span>
                            </li>
                            <li className={`tabs-btn button ${WOVView.page === "WOVT" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setWOVView({page:'WOVT'});
                                    setShowWOVT(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-route" aria-hidden="true"></i></span>
                                    <span className="tabs-title">TRAVELS</span>  
                                </span>
                            </li>
                            <li onClick={e => setShowDropDown(!showDropDown)} className={`tabs-btn button ${showWOVG || showWOVC || showWOVI || showWOVPS ? "is-active" : "is-not-active"}`}>
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
                                            <li className={`tabs-btn button ${showWOVG ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setWOVView({page:'WOVTR'});
                                                setShowWOVG(true);
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-industry" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">TRADERS</span> &nbsp;
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${showWOVG ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setWOVView({page:'WOVG'});
                                                setShowWOVG(true);
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-garage" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">GARAGE</span> &nbsp;
                                                </span>
                                            </li> 
                                            <li className={`tabs-btn button ${showWOVC ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setWOVView({page:'WOVC'});
                                                setShowWOVC(true);
                                                setShowDropDown(false);
                                                 
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-car-crash" aria-hidden="true"></i></span>
                                                    <span className="tabs-title"> WOV-C </span>  
                                                </span>
                                            </li> 
                                            
                                            <li className={`tabs-btn button ${showWOVI ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setWOVView({page:'WOVI'});
                                                setShowWOVI(true);
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-info-circle" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">WOV-INFO</span>  
                                                </span>
                                            </li>
                                            <li className={`tabs-btn button ${showWOVPS ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setWOVView({page:'WOVPS'});
                                                setShowWOVPS(true);
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-handshake" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">WOV-Partnerships</span>  
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
                    {showWOVHome && 
                        <div className="content">
                            <WOVHome setShowWOVHome={setShowWOVHome} setShowWOVList={setShowWOVList} setWOVView={setWOVView}/>
                        </div>
                    }
                    {showWOVList && 
                        <div className="content">
                            <WOVList WOVView={WOVView} setWOVView={setWOVView} />
                        </div>
                    }
                    {showWOVR && 
                        <div className="content">
                            <WOVRental />
                        </div>
                    }
                    {showWOVS && 
                        <div className="content">
                            <WOVSell />
                        </div>
                    }
                    {showWOVT && 
                        <div className="content">
                            <WOVTravel />
                        </div>
                    }
                    {showWOVG && 
                        <div className="content">
                            <WOVGarage />
                        </div>
                    }
                    {showWOVC && 
                        <div className="content">
                            <h1>WOV-C</h1>
                        </div>
                    }
                    {showWOVPS && 
                        <div className="content">
                            <h1>WOV-Partnerships</h1>
                        </div>
                    }
                    {showWOVI && 
                        <div className="content">
                            <h1>WOV-I</h1>
                        </div>
                    }
                </div>
            
            </div>
        </div>
    )
}
export default withContext(WOV);