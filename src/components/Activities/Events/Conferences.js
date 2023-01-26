import React from "react";
import withContext from "../../../withContext";

const Conferences = props => {

    const handleToggleChange = (e) => {
        var isChecked = document.getElementById("response_value").checked;
        console.log(isChecked);
    }

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
                        <div className="box">
                            <div className="columns">
                                <div className="column is-half">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                        </figure>
                                    </div>
                                </div>
                                <div className="column"> 
                                    <div className="content">
                                        <b><em>This is the Title </em> </b> 
                                        <p><small> This is a small description of meeting. </small></p>
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <b>Status : </b> {" "}<br /> <span> On Schedule </span>
                                        </div>
                                        <div className="column">
                                            <b>Response : </b> {" "} 
                                        
                                            <label className="switch">
                                                <input onChange={ e => handleToggleChange(e) } id="response_value" type="checkbox" />
                                                <div className="slider round" >
                                                    <span className="on">Attending</span>
                                                    <span className="off">Not - Attending</span>
                                                </div>
                                            </label>
                                                
                                        </div>
                                    </div>
                                    <div className="media">
                                        <div className="media-content">
                                            
                                            <div className="columns">
                                                <div className="column">
                                                    <b> Category: </b> <span>Sample</span> <br />   
                                                    <b> Place: </b> <span>Sample</span>  
                                                </div>
                                                <div className="column">
                                                    <b> Date: </b> <span>Sample</span>  <br />
                                                    <b> Attendees: </b> <span>Sample</span>  
                                                </div>  
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Conferences);