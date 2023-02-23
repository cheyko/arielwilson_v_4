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
    const {subview} = props;
    const [WOVView, setWOVView] = useState(subview);

    useEffect( () => {  
        setWOVView(subview);
    
    },[subview]);

    return(
        <div className="shops-container">
            <div className="w-o-v">
                <div className="sub-content" onClick={e => setShowDropDown(false)}>
                    {WOVView === 'WOVHome' && 
                        <div className="content">
                            <WOVHome setWOVView={setWOVView}/>
                        </div>
                    }
                    {WOVView === 'WOVBuy' && 
                        <div className="content">
                            <WOVList WOVView={WOVView} setWOVView={setWOVView} />
                        </div>
                    }
                    {WOVView === 'WOVRent' && 
                        <div className="content">
                            <WOVRental />
                        </div>
                    }
                    {WOVView === 'WOVSell' && 
                        <div className="content">
                            <WOVSell />
                        </div>
                    }
                    {WOVView === 'WOVTravel' && 
                        <div className="content">
                            <WOVTravel />
                        </div>
                    }
                    {WOVView === 'WOVGarage' && 
                        <div className="content">
                            <WOVGarage />
                        </div>
                    }
                    {WOVView === 'WOVTraders' && 
                        <div className="content">
                            <h1>WOV-Traders</h1>
                        </div>
                    }
                    {WOVView === 'WOVWrecking' && 
                        <div className="content">
                            <h1>WOV-Crash</h1>
                        </div>
                    }
                    {WOVView === 'WOVInfo' && 
                        <div className="content">
                            <h1>WOV-Partnerships</h1>
                        </div>
                    }
                    {WOVView === 'WOVPS' && 
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