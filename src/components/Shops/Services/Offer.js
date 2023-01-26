import React from "react";
import withContext from "../../../withContext";
import ServicesAdd from "./ServicesAdd";

const Offer = props => {

    return (
        <div className="hero sub-container">
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Professional Services </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Offer Services </p>
                    </div>
                    <div className="content has-text-centered">
                        <ServicesAdd />
                    </div>
                </div>
            </div>
            
            <hr/>
            
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> WorkStation </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Create A WorkStation where you can 
                        collectively describe all your services and easily solicit new and existing
                        customers.  </p>
                    </div>
                    <div className="content has-text-centered">
                        <button className="button is-large is-link"> Create WorkStation </button>
                    </div>
                </div>
            </div>

            <hr/>
            
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> SH </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Give SH Tips & Procedures </p>
                    </div>
                    <div className="content has-text-centered">
                        <button className="button is-large is-link"> Add Procedure </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(Offer);