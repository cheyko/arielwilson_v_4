import React from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext";
import VolunteerItem from "./VolunteerItem";

const Volunteer = props => {

    /*const [isChecked, setVal] = useState(false);
    const isFree = true;

    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        isChecked ? console.log(isChecked) : console.log("test") ;
    }*/

    let navigate = useNavigate();

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <button onClick={e => navigate('/add-volunteer')} className="button is-outlined">
                        Create
                    </button>{" "}
                    <button className="button is-outlined">
                        Updates
                    </button>{" "}
                    <button className="button is-outlined">
                        Filter
                    </button>
                </div>
            </div>
            <div className="hero">
                <div className="columns">
                    <div className="column">
                        <VolunteerItem />
                    </div>
                    <div className="column">
                        
                         
                    </div>
                </div>
            </div>
        </div>
    )
}


export default withContext(Volunteer);