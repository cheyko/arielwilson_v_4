import React from "react";
import withContext from "../../../../withContext";
import AddPoll from "./AddPoll";
import PollItem from "./PollItem";

const Polls = props => {

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <AddPoll />
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
                        <PollItem />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Polls);