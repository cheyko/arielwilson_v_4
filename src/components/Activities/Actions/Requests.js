import React from "react";
import withContext from "../../../withContext";

const Requests = props => {

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <button className="button is-outlined">
                        Send
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
                    <div className="column is-half">
                        <div className="box">
                            <div className="media">
                                <div className="media-content">
                                    
                                    <b><em>This is the Request ? </em> </b>
                                    <div className="columns is-multiline">
                                        <div className="column">
                                            <button className="button"> Response 1 </button>   
                                        </div>
                                        <div className="column">
                                            <button className="button"> Response 2 </button>  
                                        </div>  
                                        <div className="column">
                                            <button className="button"> Response 3 </button>           
                                        </div>
                                        <div className="column">
                                            <button className="button"> Response 4 </button>            
                                        </div>  
                                    </div>
                                </div>
                            </div>
                            <div class="media">
                                <div class="media-left">
                                    <figure class="image is-48x48">
                                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                                    </figure>
                                </div>
                                <div class="media-content">
                                    <p class="title is-4">John Smith</p>
                                    <p class="subtitle is-6">@johnsmith</p>
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

export default withContext(Requests);