import React, {useState, useEffect} from "react";
import withContext from "../../../withContext";
import "./index.css";

import ServicesHome from "./ServicesHome";
import ServicesList from "./ServicesList";
import Provider from "./Offer";
import Categories from "./Categories";
import Offer from "./Offer";
//import SelfHelp from "./SelfHelp";

const Services = props => {
    //const [showDropDown, setShowDropDown] = useState(false);
    const {subview} = props;
    const [ServicesView, setServicesView] = useState(subview);

    useEffect( () => {
        setServicesView(subview);
        //set current to local storage. 
    
    },[subview]);

    return(
        <div className="shops-container">
            <div className="w-o-v">
                <div className="sub-content">{/*onClick={e => setShowDropDown(false)}>*/}
                    {ServicesView === "ServicesHome" && 
                        <div className="content">
                            <ServicesHome setServicesView={setServicesView}/>
                        </div>
                    }
                    {ServicesView === "WSCategories" && 
                        <div className="content">
                            <Categories />
                        </div>
                    }
                    {ServicesView === "ServicesGet" && 
                        <div className="content">
                            <ServicesList ServicesView={ServicesView} setServicesView={setServicesView} />
                        </div>
                    }
                    {ServicesView === "Workstation" && 
                        <div className="content">
                            <Provider />
                        </div>
                    }
                    {ServicesView === "Offer" && 
                        <div className="content">
                            <Offer />
                        </div>
                    }
                    {ServicesView === "WSPS" && 
                        <div className="content">
                            <h1>Services Partnerships</h1>
                        </div>
                    }
                    {ServicesView === "WSInfo" && 
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