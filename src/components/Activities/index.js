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
    const [subSection, setSubSection] = useState("tasks");
    const [actionsMenu, showActionsMenu] = useState(false);
    const [eventsMenu, showEventsMenu] = useState(false);
    const [jobsMenu, showJobsMenu] = useState(false);

    //const [showDropDown, setShowDropDown] = useState(false);
    //const [showMore, setShowMore] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return(
        <div className="hero special-nav">
            <div className="activities-div">
                <nav className="navbar" role="navigation" aria-label="main navigation">
                    <div className="navbar-brand">
                        <span className="navbar-item">
                            <h1 className="title" style={{fontSize:"1rem"}}><b onClick={e => {setSection('schedule'); toggleMenu(e);}}>Activities </b></h1>
                        </span>

                        <span role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>                    
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <span aria-hidden="true"></span>
                            <small>sections</small>
                        </span>
                    </div>

                    <div id="navbarBasicExample" className="navbar-menu">
                        <div className="navbar-start">

                            <span className={`navbar-item ${theSection === 'schedule' ? 'is-active' : ''}`} onClick={e => { setSection('schedule');}}>
                                <i className="fas fa-clock" aria-hidden="true">  </i> &nbsp; Schedule
                            </span>

                            <div className={`navbar-item has-dropdown is-hoverable ${theSection === 'actions' ? 'is-active' : ''}`}  onMouseOver={e => showActionsMenu(true)} onMouseOut={ e => showActionsMenu(false)}>
                                <span id="more-dropdown" className="navbar-link"onClick={ e => showActionsMenu(!actionsMenu)}>
                                    <i className="fas fa-exclamation" aria-hidden="true"> </i> &nbsp; ACTIONS
                                </span>

                                <div className="navbar-dropdown" style={actionsMenu ? {display:"block"} : {display: "none"}}>
                                    <span className={`navbar-item ${subSection === 'tasks' ? 'is-active' : ''}`} onClick={e => { setSubSection('tasks');setSection("actions"); toggleMenu(e); showActionsMenu(!actionsMenu);localStorage.setItem("subSection","tasks");localStorage.setItem("section","actions")}}>
                                        <i className="fas fa-tasks" aria-hidden="true">  </i> &nbsp; Tasks
                                    </span>
                                    <span className={`navbar-item ${subSection === 'requests' ? 'is-active' : ''}`} onClick={e => { setSubSection('requests');setSection("actions"); toggleMenu(e);showActionsMenu(!actionsMenu);localStorage.setItem("subSection","requests");localStorage.setItem("section","actions")}}>
                                        <i className="fas fa-vote-yea" aria-hidden="true"> </i> &nbsp; Requests
                                    </span>
                                    <span className={`navbar-item ${subSection === 'logistics' ? 'is-active' : ''}`} onClick={e => { setSubSection('logistics');setSection("actions"); toggleMenu(e); showActionsMenu(!actionsMenu);localStorage.setItem("subSection","logistics");localStorage.setItem("section","actions")}}>
                                        <i className="fas fa-truck" aria-hidden="true">  </i> &nbsp; Logistics
                                    </span>
                                    <span className={`navbar-item ${subSection === 'polls' ? 'is-active' : ''}`} onClick={e => { setSubSection('polls');setSection("actions"); toggleMenu(e);showActionsMenu(!actionsMenu);localStorage.setItem("subSection","polls");localStorage.setItem("section","actions")}}>
                                        <i className="fas fa-poll" aria-hidden="true">  </i> &nbsp; Polls
                                    </span>
                                </div>
                            </div>

                            <div className={`navbar-item has-dropdown is-hoverable ${theSection === 'events' ? 'is-active' : ''}`}  onMouseOver={e => showEventsMenu(true)} onMouseOut={ e => showEventsMenu(false)}>
                                <span id="more-dropdown" className="navbar-link"onClick={ e => showEventsMenu(!eventsMenu)}>
                                <i className="fas fa-calendar-week" aria-hidden="true">  </i> &nbsp; EVENTS
                                </span>

                                <div className="navbar-dropdown" style={eventsMenu ? {display:"block"} : {display: "none"}}>
                                    <span className={`navbar-item ${subSection === 'meetings' ? 'is-active' : ''}`} onClick={e => { setSubSection('meetings');setSection("events"); toggleMenu(e); showEventsMenu(!eventsMenu);localStorage.setItem("subSection","meetings");localStorage.setItem("section","events")}}>
                                        <i className="fas fa-users" aria-hidden="true"> </i> &nbsp; Meetings
                                    </span>
                                    <span className={`navbar-item ${subSection === 'conferences' ? 'is-active' : ''}`} onClick={e => { setSubSection('conferences');setSection("events"); toggleMenu(e);showEventsMenu(!eventsMenu);localStorage.setItem("subSection","conferences");localStorage.setItem("section","events")}}>
                                        <i className="fas fa-handshake" aria-hidden="true">  </i> &nbsp; Conferences
                                    </span>
                                    <span className={`navbar-item ${subSection === 'functions' ? 'is-active' : ''}`} onClick={e => { setSubSection('functions');setSection("events"); toggleMenu(e); showEventsMenu(!eventsMenu);localStorage.setItem("subSection","functions");localStorage.setItem("section","events")}}>
                                        <i className="fas fa-glass-cheers" aria-hidden="true"> </i> &nbsp; Functions
                                    </span>
                                    <span className={`navbar-item ${subSection === 'concerts' ? 'is-active' : ''}`} onClick={e => { setSubSection('concerts');setSection("events"); toggleMenu(e);showEventsMenu(!eventsMenu);localStorage.setItem("subSection","concerts");localStorage.setItem("section","events")}}>
                                        <i className="fas fa-theater-masks" aria-hidden="true"> </i> &nbsp; Concerts
                                    </span>
                                    <span className={`navbar-item ${subSection === 'shows' ? 'is-active' : ''}`} onClick={e => { setSubSection('shows');setSection("events"); toggleMenu(e);showEventsMenu(!eventsMenu);localStorage.setItem("subSection","shows");localStorage.setItem("section","events")}}>
                                        &nbsp;<i className="fas fa-microphone" aria-hidden="true"> </i> &nbsp; Shows
                                    </span>
                                    <span className={`navbar-item ${subSection === 'parties' ? 'is-active' : ''}`} onClick={e => { setSubSection('parties');setSection("events"); toggleMenu(e);showEventsMenu(!eventsMenu);localStorage.setItem("subSection","parties");localStorage.setItem("section","events")}}>
                                        <i className="fas fa-gifts" aria-hidden="true"> </i> &nbsp; Parties
                                    </span>
                                </div>
                            </div>

                            <div className={`navbar-item has-dropdown is-hoverable ${theSection === 'jobs' ? 'is-active' : ''}`}  onMouseOver={e => showJobsMenu(true)} onMouseOut={ e => showJobsMenu(false)}>
                                <span id="more-dropdown" className="navbar-link"onClick={ e => showJobsMenu(!jobsMenu)}>
                                    <i className="fas fa-hard-hat" aria-hidden="true">  </i> &nbsp; JOBS
                                </span>

                                <div className="navbar-dropdown" style={jobsMenu ? {display:"block"} : {display: "none"}}>
                                    <span className={`navbar-item ${subSection === 'classifieds' ? 'is-active' : ''}`} onClick={e => { setSubSection('classifieds');setSection("jobs"); toggleMenu(e); showJobsMenu(!jobsMenu);localStorage.setItem("subSection","classifieds");localStorage.setItem("section","jobs")}}>
                                        <i className="fas fa-newspaper" aria-hidden="true">  </i> &nbsp; Classifieds
                                    </span>
                                    <span className={`navbar-item ${subSection === 'applications' ? 'is-active' : ''}`} onClick={e => { setSubSection('applications');setSection("jobs"); toggleMenu(e);showJobsMenu(!jobsMenu);localStorage.setItem("subSection","applications");localStorage.setItem("section","jobs")}}>
                                        <i className="fas fa-flag-checkered" aria-hidden="true"> </i> &nbsp; Applications
                                    </span>
                                    <span className={`navbar-item ${subSection === 'assignments' ? 'is-active' : ''}`} onClick={e => { setSubSection('assignments');setSection("jobs"); toggleMenu(e); showJobsMenu(!jobsMenu);localStorage.setItem("subSection","assignments");localStorage.setItem("section","jobs")}}>
                                        <i className="fas fa-thumbtack" aria-hidden="true"> </i> &nbsp; Assignments
                                    </span>
                                    <span className={`navbar-item ${subSection === 'volunteer' ? 'is-active' : ''}`} onClick={e => { setSubSection('volunteer');setSection("jobs"); toggleMenu(e);showJobsMenu(!jobsMenu);localStorage.setItem("subSection","volunteer");localStorage.setItem("section","jobs")}}>
                                        <i className="fas fa-hospital-user" aria-hidden="true">  </i> &nbsp; Volunteer
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </nav>
                <br/>
                <div className="page-content">
                    {theSection === "actions" &&
                        <Actions subSection={subSection} />
                    }
                    {theSection === "schedule" &&
                        <Schedule subSection={subSection} />
                    }
                    {theSection === "events" &&
                        <Events subSection={subSection} />
                    }
                    {theSection === "jobs" &&
                        <Jobs subSection={subSection} />
                    }
                </div>
            </div>
        </div>
    )
    /*return (
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
    )*/
} 
export default withContext(Activities);