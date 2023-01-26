import React from "react";
import withContext from "../../../withContext";
import WOVAdd from "./WOVAdd";

const WOVSell = props => {

    return (
        <div className="hero sub-container">
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Automobile Sales </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Sell Vehicles </p>
                    </div>
                    <div className="content has-text-centered">
                        <WOVAdd />
                    </div>
                </div>
            </div>
            
            <hr/>
            
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Travelling </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Add Profile for Pick-Ups </p>
                    </div>
                    <div className="content has-text-centered">
                        <button className="button is-large is-link"> Add Travelling </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(WOVSell);