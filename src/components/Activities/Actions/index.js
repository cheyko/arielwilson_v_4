import React, {useState} from 'react';
import withContext from "../../../withContext";
import Logistics from './Logistics';
import Polls from './Polls';
import Requests from './Requests';
import Tasks from './Tasks';

const Actions = props => {
    const [tab, setTab] = useState("task");
    const [showTask, setShowTask] = useState(true); //things to do (self-initiated, given[accepted])
    const [showRequests, setShowRequests] = useState(false); // A question that requires a response
    const [showLogistics, setShowLogistics] = useState(false); // Logistically operations involving user or perhaps general operations as well ?
    const [showPolls, setShowPolls] = useState(false); // A question or list of questions sent to a single or multiple users

    const deactivate = () => {
        switch(tab){
            case "task":
                setShowTask(false);
                break;
            case "requests":
                setShowRequests(false);
                break;
            case "logistics":
                setShowLogistics(false);
                break;
            case "polls":
                setShowPolls(false);
                break;
            default:
                break;
        }
    }

    return (
        <div>
            <div className="actions-div">
                <article className="profile-container">
                    <div className="message">
                        <div className="message-header">
                            <div className="tabs is-boxed is-fullwidth">  
                                <ul>
                                    <li className={`button ${showTask ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("task");
                                            setShowTask(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-clipboard-list" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Tasks </span>
                                        </span>
                                    </li>
                                                
                                    <li className={`button ${showRequests ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("requests");
                                            setShowRequests(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-vote-yea" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Requests </span>
                                        </span>
                                    </li>

                                    <li className={`button ${showLogistics ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("logistics");
                                            setShowLogistics(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-truck" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Logistics </span>
                                        </span>
                                    </li>

                                    <li className={`button ${showPolls ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("polls");
                                            setShowPolls(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-poll" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Polls </span>
                                        </span>
                                    </li>                 
                                </ul>
                            </div>
                        </div>
                        <div className="message-body">
                            {showTask && 
                                <div className="task-div">
                                    <Tasks />
                                    <h1> Task Section </h1> 
                                </div>
                            }
                            {showRequests &&
                                <div className="requests-div">
                                    <Requests />
                                    <h1> Requests Section </h1> 
                                </div>
                            }
                            {showLogistics &&
                                <div className="logistics-div">
                                    <Logistics />
                                    <h1> Logistics Section </h1> 
                                </div>
                            }
                            {showPolls &&
                                <div className="polls-div">
                                    <Polls />
                                    <h1> Polls Section </h1> 
                                </div>
                            }
                        </div>
                    </div>
                </article>
            </div>    
        </div>
    )
}

export default withContext(Actions);