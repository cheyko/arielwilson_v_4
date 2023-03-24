import React, {useEffect, useState} from "react";
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

    const {subview} = props;
    const [BCView, setBCView] = useState(subview);
    //const [showDropDown, setShowDropDown] = useState(false);

    useEffect(() => {
        setBCView(subview);
    },[subview])
    return(
        <div className="shops-container">
            <div className="bickle-court">
                <div className="sub-content"> {/* onClick={e => setShowDropDown(false)}>*/}
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
                    {BCView === "BickleSell" && 
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
                    {BCView === "BickleCategories" && 
                        <div className="content">
                            <h1>BickleCourt Categories</h1>
                        </div>
                    }
                    {BCView === "BicklePS" && 
                        <div className="content">
                            <h1>BickleCourt Partnerships</h1>
                        </div>
                    }
                    {BCView === "BickleInfo" && 
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