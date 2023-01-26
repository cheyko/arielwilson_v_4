import React from "react";
import withContext from "../../../withContext";
//import { useHistory } from "react-router-dom";

const PagesSearch = props => {

    //let history = useHistory();

    return(
        <div className="container">

            <div className="card container has-text-centered">
                <button className="button is-pulled-left" onClick={e => props.setView("menu")}> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                
                <div className="media is-fullwidth">
                    <div className="content is-fullwidth ">
                            <b className="title"> <i className="fas fa-id-card"></i> Index </b>
                        <p>
                            Search for a specific profile, business or group.
                        </p>
                    </div>
                </div>
 
                    <div className="card-image">
                        <figure className="image is-3by1">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                        </figure>
                    </div>
                
            </div>
            <br />
            <div className="container">
                <div className="box">
                    <div className="field has-addons">
                        <div className="control has-icons-right is-fullwidth">
                            <input className="input" placeholder="Search Preepedia" type="text" name="checkprp" />
                            <span className="icon is-medium is-right">
                                <i className="fas fa-search"></i>
                            </span>
                            
                        </div>
                        <div className="control">
                            <button type="submit" className="button is-link is-rounded is-focused"> Search </button>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}
export default withContext(PagesSearch);