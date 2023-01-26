import React from "react";
import withContext from "../../../withContext";
import PFAdd from "./PFAdd";

const PFSell = props => {

    return (
        <div className="hero sub-container">
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Real Estate </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Sell or Rent Property </p>
                    </div>
                    <div className="content has-text-centered">
                        <PFAdd />
                    </div>
                </div>
            </div>
            
            <hr/>
            
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Accomadation </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> List Property for Bookings </p>
                    </div>
                    <div className="content has-text-centered">
                        <button className="button is-large is-link"> Add Lodging </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(PFSell);