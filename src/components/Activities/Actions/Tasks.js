import React from "react";
import withContext from "../../../withContext";

const Tasks = props => {

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
                        <div className="box">
                            <div className="media">
                                <div className="media-left">
                                    <figure className="image is-64x64">
                                        <img
                                            src="https://bulma.io/images/placeholders/128x128.png"
                                            alt="test"
                                        />
                                    </figure>
                                </div>
                                <div className="media-content">
                                    <b><em>This is the Title </em> </b>
                                    <div className="columns">
                                        <div className="column">
                                            <b> Category: </b> <br/> <span>Sample</span>    
                                        </div>
                                        <div className="column">
                                            <b> Type: </b> <br/> <span>Sample</span>  
                                        </div>  
                                    </div>
                                    <div className="columns">
                                        <div className="column">
                                            <b> Status: </b> <br/> <span>Sample</span>          
                                        </div>
                                        <div className="column">
                                            <b> Created By: </b> <br/> <span>Sample</span>            
                                        </div>  
                                    </div>
                                </div>
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

export default withContext(Tasks);