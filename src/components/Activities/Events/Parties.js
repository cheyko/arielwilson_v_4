import React from "react";
import withContext from "../../../withContext";

const Parties = props => {

    /* const [isChecked, setVal] = useState(false);
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
                <div className="columns">
                    <div className="column">
                        <div className="card">
                            
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <h1 className="subtitle"><strong>This is the Title of the Party</strong></h1>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        
                         
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Parties);