import React from "react";
import withContext from "../../../../withContext";
import AddRequest from "./AddRequest";
import RequestItem from "./RequestItem";

const Requests = props => {

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">

                    <AddRequest />
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
                        <RequestItem />
                    </div>
                    <div className="column">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Requests);