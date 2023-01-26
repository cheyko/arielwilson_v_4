import React, {useState} from 'react';
import withContext from '../../withContext';
import Actions from './Actions';
import Events from './Events';
import './index.css';
import Jobs from './Jobs';
import Schedule from './Schedule';
import $ from "jquery";

const Activities = props => {
    const [theSection, setSection] = useState("actions");
    const [showDropDown, setShowDropDown] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return (
        <div className="hero">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="subtitle"><b>ACTIVITIES</b></h1>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <small>sections</small>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="buttons">
                            <a className={`navbar-item button ${theSection === "schedule" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("schedule"); toggleMenu(e);}}>
                                <i className="fas fa-clock" aria-hidden="true"></i> &nbsp; SCHEDULE
                            </a>

                            <a className={`navbar-item button ${theSection === "actions" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("actions");toggleMenu(e);}}>
                                <i className="fas fa-tasks" aria-hidden="true"></i> &nbsp; ACTIONS
                            </a>

                            <a className={`navbar-item button ${theSection === "events" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("events"); toggleMenu(e);}}>
                                <i className="fas fa-calendar-week" aria-hidden="true"></i> &nbsp; EVENTS
                            </a>

                            <a className={`navbar-item button ${theSection === "jobs" ? "is-active" : "is-not-active"}`} onClick={e => { setSection("jobs"); toggleMenu(e);}}>
                                <i className="fas fa-hard-hat" aria-hidden="true"></i> &nbsp;  JOBS
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        
            <div className="page-content">
                {theSection === "actions" &&
                    <Actions />
                }
                {theSection === "schedule" &&
                    <Schedule />
                }
                {theSection === "events" &&
                    <Events />
                }
                {theSection === "jobs" &&
                    <Jobs />
                }
            </div>
        
        </div>
    )
} 
export default withContext(Activities);