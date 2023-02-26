import React, {useState} from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext";
import ConcertItem from "./ConcertItem";

const Concerts = props => {

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
                <div className="rows">
                    <div className="row">
                        <div class="box">
                            <div className="columns">
                                <div class="column">
                                    <figure class="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                    </figure>
                                     
                                <h1 className="subtitle"><strong>This is the Title of the Concert</strong></h1>
                            
                                </div>
                                <div class="column">
                                    <ConcertItem />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Concerts);