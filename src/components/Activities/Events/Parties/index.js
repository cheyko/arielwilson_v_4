import React from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext";
import PartyItem from "./PartyItem";

const Parties = props => {

    let navigate = useNavigate();

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <button onClick={e => navigate('/add-event')} className="button is-outlined">
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
                <div className="columns">
                    <div className="column">
                        <PartyItem />
                    </div>
                    <div className="column">
                        
                         
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Parties);