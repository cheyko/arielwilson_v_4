import React from "react";
import withContext from '../../../withContext';
import "./index.css";
import KioskAdd from "./Kiosk/KioskAdd";

const BCSell = props => {

    return (
        <div className="hero sub-container">
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Kiosk Shop </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Add a Meal, Beverage or Dessert to the KIOSK </p>
                    </div>
                    <div className="content has-text-centered">
                        <KioskAdd />
                    </div>
                </div>
            </div>
            
            <hr/>
            
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Combinations </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Add Combos and deals to the KIOSK </p>
                    </div>
                    <div className="content has-text-centered">
                        <button className="button is-large is-link"> Add Combo </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(BCSell);