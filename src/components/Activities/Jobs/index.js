import React, {useState} from 'react';
import withContext from "../../../withContext";
import Applications from './Applications';
import Assignments from './Assignments';
import Classifieds from './Classifieds';
import Volunteer from './Volunteer';

const Jobs = props => {
    const [tab, setTab] = useState("classifieds");
    const [showClassifieds, setShowClassifieds] = useState(true); // job vacancies and professional or social oppportunities
    const [showApplications, setShowApplications] = useState(false); // Applications to job vacancies and Recruitings to the User. 
    const [showAssignments, setShowAssignments] = useState(false); // Work expected to be completed and should generally have a compensation for user (fused with workstation ??? even if market provide a dashboard page)
    const [showVolunteer, setShowVolunteer] = useState(false); // Work that does not entail compensation however provides recognition.

    const deactivate = () => {
        switch(tab){
            case "classifieds":
                setShowClassifieds(false);
                break;
            case "applications":
                setShowApplications(false);
                break;
            case "assignments":
                setShowAssignments(false);
                break;
            case "volunteer":
                setShowVolunteer(false);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div className="events-div">
                <article className="profile-container">
                    <div className="message">
                        <div className="message-header">
                            <div className="tabs is-boxed is-fullwidth">  
                                <ul>
                                    <li className={`button ${showClassifieds ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("classifieds");
                                            setShowClassifieds(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="far fa-newspaper" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Classifieds </span>
                                        </span>
                                    </li>
                                                
                                    <li className={`button ${showApplications ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("applications");
                                            setShowApplications(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-flag-checkered" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Applications </span>
                                        </span>
                                    </li>

                                    <li className={`button ${showAssignments ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("assignments");
                                            setShowAssignments(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-thumbtack" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Assignments </span>
                                        </span>
                                    </li>

                                    <li className={`button ${showVolunteer ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("volunteer");
                                            setShowVolunteer(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-hospital-user" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Volunteer </span>
                                        </span>
                                    </li>                
                                </ul>
                            </div>
                        </div>
                        <div className="message-body">
                            {showClassifieds && 
                                <div className="classifieds-div">
                                    <Classifieds />
                                    <h1> Classifieds Section </h1> 
                                </div>
                            }
                            {showApplications &&
                                <div className="applications-div">
                                    <Applications />
                                    <h1> Applications Section </h1> 
                                </div>
                            }
                            {showAssignments &&
                                <div className="assigments-div">
                                    <Assignments />
                                    <h1> Assignments Section </h1> 
                                </div>
                            }
                            {showVolunteer &&
                                <div className="volunteer-div">
                                    <Volunteer />
                                    <h1> Volunteer Section </h1> 
                                </div>
                            }
                        </div>
                    </div>
                </article>
            </div>    
        </div>
    )
}

export default withContext(Jobs);