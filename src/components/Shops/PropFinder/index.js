import React, {useState, useEffect} from "react";
import withContext from "../../../withContext";
import "./index.css";
import PFHome from "./PFHome";
import PFList from "./PFList";
import PFSell from "./PFSell";
import PFRenovate from "./PFRenovate";
import PFLodge from "./PFLodge";


const PropFinder = props => {
    const [showDropDown, setShowDropDown] = useState(false);

    const [PFView, setPFView] = useState('PFHome');
    const [showPFHome , setShowPFHome] = useState(true);
    const [showPFList, setShowPFList] = useState(false);
    const [showPFS, setShowPFS] = useState(false);
    const [showPFLodge, setShowPFLodge] = useState(false);
    const [showPFR, setShowPFR] = useState(false);
    const [showPFC, setShowPFC] = useState(false);
    const [showPFPS, setShowPFPS] = useState(false);
    const [showPFI, setShowPFI] = useState(false);


    useEffect( () => {

        if (showPFList){
            //filter based on the View

        }

        //set current to local storage. 
    
    },[showPFList]);

    const deactivate = () => {
        switch(PFView){
            case 'PFBuy':
                setShowPFList(false);
                break;
            case 'PFRent':
                setShowPFList(false);
                break;
            case 'PFSell':
                setShowPFS(false);
                break;
            case 'PFLodge':
                setShowPFLodge(false);
                break;
            case 'PFR':
                setShowPFR(false);
                break;
            case 'PFC':
                setShowPFC(false);
                break;
            case 'PFPS':
                setShowPFPS(false);
                break;
            case 'PFI':
                setShowPFI(false);
                break;            
            default:
                setShowPFHome(false);
                break;
        }
    }
    
    return(
        <div className="shops-container">
            <div className="prop-finder">
                <div className="card fixed-card">
                    <div className="pf-tabs tabs is-centered">
                        <ul>
                            <li className={`tabs-btn button ${showPFHome ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setPFView('PFHome');
                                    setShowPFHome(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-sign" aria-hidden="true"></i></span>
                                </span>
                            </li>
                            
                            <li className={`tabs-btn button ${PFView === "PFBuy" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setPFView('PFBuy');
                                    setShowPFList(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-house-user" aria-hidden="true"></i></span>
                                    <span className="tabs-title">BUY</span> 
                                </span>
                            </li>

                            <li className={`tabs-btn button ${PFView === "PFRent" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setPFView('PFRent');
                                    setShowPFList(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-door-open" aria-hidden="true"></i></span>
                                    <span className="tabs-title">RENT</span>
                                </span>
                            </li>

                            <li className={`tabs-btn button ${PFView === "PFSell" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setPFView('PFSell');
                                    setShowPFS(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-money-check-alt" aria-hidden="true"></i></span>
                                    <span className="tabs-title">SELL</span>  
                                </span>
                            </li>
                            
                            <li className={`tabs-btn button ${PFView === "PFLodge" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setPFView('PFLodge');
                                    setShowPFLodge(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-hotel" aria-hidden="true"></i></span>
                                    <span className="tabs-title">LODGING</span>  
                                </span>
                            </li>
                            
                            <li onClick={e => setShowDropDown(!showDropDown)} className={`tabs-btn button ${showPFR || showPFC || showPFI || showPFPS ? "is-active" : "is-not-active"}`}>
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
                                            <li className={`tabs-btn button ${showPFR ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setPFView('PFR');
                                                setShowPFR(true);
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-user-secret" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">REALTORS</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${showPFR ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setPFView('PFR');
                                                setShowPFR(true);
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-hammer" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">RENOVATE</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${showPFC ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setPFView('PFC');
                                                setShowPFC(true);
                                                setShowDropDown(false);
                                                 
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-house-damage" aria-hidden="true"></i></span>
                                                    <span className="tabs-title"> PF-C....</span>  
                                                </span>
                                            </li>

                                            <li className={`tabs-btn button ${showPFI ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setPFView('PFI');
                                                setShowPFI(true);
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-info-circle" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">PF-INFO</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${showPFPS ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setPFView('PFPS');
                                                setShowPFPS(true);
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-handshake" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">PF-Partnerships</span>  
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
                    {showPFHome && 
                        <div className="content">
                            <PFHome setShowPFHome={setShowPFHome} setShowPFList={setShowPFList} setPFView={setPFView}/>
                        </div>
                    }
                    {showPFList && 
                        <div className="content">
                            <PFList PFView={PFView} setPFView={setPFView} />
                        </div>
                    }
                    {showPFS && 
                        <div className="content">
                            <PFSell />
                        </div>
                    }
                    {showPFLodge && 
                        <div className="content">
                            <PFLodge />
                        </div>
                    }
                    {showPFR && 
                        <div className="content">
                            <PFRenovate />
                        </div>
                    }
                    {showPFC && 
                        <div className="content">
                            <h1>PF-C</h1>
                        </div>
                    }
                    {showPFPS && 
                        <div className="content">
                            <h1>PropFinder Partnerships</h1>
                        </div>
                    }
                    {showPFI && 
                        <div className="content">
                            <h1>PF-I</h1>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default withContext(PropFinder);