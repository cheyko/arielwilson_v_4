import React from "react";
import withContext from "../../../withContext";

const Logistics = props => {

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
                <div className="card">
                    <div className="media">
                        <div className="content">
                            <b>Status</b> {" "} <span>On its Way</span> <span> 3 days</span> remaining.
                        </div>
                    </div>
                    <div className="columns">
                        <div className="column is-half">
                            <div className="card-image">
                                <figure className="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                </figure>
                            </div>
                            <div className="media columns">
                                <span className="column">Sample Description</span>
                            </div>
                        </div>
                        <div className="column is-half">
                            <div className="card-content">
                                <div className="media columns">
                                    <b className="column is-3">Type</b> 
                                    <span className="column">Sample</span>
                                </div>
                                <div className="media columns">
                                    <div className="label column is-3"> <b>Sender</b></div>
                                    <div className="media-left column is-2">
                                        <figure className="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                                        </figure>
                                    </div>
                                    <div className="media-content column">
                                        <p className="title is-4">John Smith</p>
                                        <p className="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>
                                <div className="media columns">
                                    <div className="label column is-3"> <b>Receiver</b> </div>
                                    <div className="media-left column is-2">
                                        <figure className="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">John Smith</p>
                                        <p className="subtitle is-6">@johnsmith</p>
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

export default withContext(Logistics);