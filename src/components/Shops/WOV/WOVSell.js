import React from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../withContext";

const WOVSell = props => {

    let navigate = useNavigate();

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
                        <button onClick={e => navigate('/vehicle-add')} className="button is-link is-large"> Add Vehicle </button>
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