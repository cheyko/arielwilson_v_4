import React, {useState, useEffect} from "react";
import withContext from "../../../withContext";
import "./index.css";
import PFHome from "./PFHome";
import PFList from "./PFList";
import PFSell from "./PFSell";
import PFRenovate from "./PFRenovate";
import PFLodge from "./PFLodge";


const PropFinder = props => {
    //const [showDropDown, setShowDropDown] = useState(false);
    const {subview} = props;
    const [PFView, setPFView] = useState(subview);
    const [PFType, setPFType] = useState("all");

    useEffect( () => {
        setPFView(subview);
        //localStorage.setItem("PFView", subview);
        //props.setSubView(PFView);
        //set current to local storage. 
    
    },[subview]);

    return(
        <div className="shops-container">
            <div className="prop-finder">                
                <div className="sub-content"> {/*onClick={e => setShowDropDown(false)}>*/}
                    {PFView === 'PFHome' && 
                        <div className="content">
                            <PFHome PFView={PFView} setPFView={setPFView} setPFType={setPFType} setSubView={props.setSubView}/>
                        </div>
                    }
                    {PFView === 'PFAll' && 
                        <div className="content">
                            <PFList PFView={PFView} setPFView={setPFView} PFType={PFType} setSubView={props.setSubView} />
                        </div>
                    }
                    {PFView === 'PFBuy' && 
                        <div className="content">
                            <PFList PFView={PFView} setPFView={setPFView} PFType={PFType} setSubView={props.setSubView} />
                        </div>
                    }
                    {PFView === 'PFRent' && 
                        <div className="content">
                            <PFList PFView={PFView} setPFView={setPFView} PFType={PFType} setSubView={props.setSubView} />
                        </div>
                    }
                    {PFView === 'PFSell' && 
                        <div className="content">
                            <PFSell />
                        </div>
                    }
                    {PFView === 'PFLodge' && 
                        <div className="content">
                            <PFLodge />
                        </div>
                    }
                    {PFView === 'PFRealtor' && 
                        <div className="content">
                            <div className="box">
                                <h1>PropFinder Realtors</h1>
                            </div>
                        </div>
                    }
                    {PFView === 'PFRenovate' && 
                        <div className="content">
                            <PFRenovate />
                        </div>
                    }
                    {PFView === 'PFPS' && 
                        <div className="content">
                            <div className="box">
                                <h1>PropFinder Partnerships</h1>
                            </div>
                        </div>
                    }
                    {PFView === 'PFInfo' && 
                        <div className="content">
                            <div className="box">
                                <h1>PF-I</h1>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}
export default withContext(PropFinder);