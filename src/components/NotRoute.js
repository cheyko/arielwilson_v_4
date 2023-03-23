import React from "react";
import { useNavigate } from "react-router-dom";

const NotRoute = props => {
    let navigate = useNavigate();
    return(
        <div className="hero">
            <div className="card" style={{minHeight:"100vh"}}>
                <div className="hero-container has-text-centered" style={{padding:"3rem 3rem"}}>
                    <span className="has-text-info"> Sorry, Page does not exist, try another Route or do a search for the page you were looking for.</span>
                    <br />
                    <button type="button" title="search-btn" onClick={e => navigate('/search')} className="button is-link m-5">Search</button>
                </div>
            </div>
        </div>
    )
}
export default NotRoute;