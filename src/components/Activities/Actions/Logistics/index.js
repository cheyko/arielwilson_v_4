import React from "react";
import withContext from "../../../../withContext";
import AddLogistics from "./AddLogistics";
import LogisticsItem from "./LogisticsItem";

const Logistics = props => {

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <AddLogistics />
                    <button className="button is-outlined">
                        Updates
                    </button>{" "}
                    <button className="button is-outlined">
                        Filter
                    </button>
                </div>
            </div>
            <div className="hero">
                <LogisticsItem />
            </div>
        </div>
    )
}

export default withContext(Logistics);