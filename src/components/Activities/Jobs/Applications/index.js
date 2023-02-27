import React from "react";
import withContext from "../../../../withContext";
import ApplicationItem from "./ApplicationItem";

const Applications = props => {

    /*const [isChecked, setVal] = useState(false);
    const isFree = true;

    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        //isChecked ? console.log(isChecked) : console.log("test") ;
    }*/

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <button className="button is-outlined">
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
                <div className="rows">
                    <div className="row">
                        <ApplicationItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Applications);