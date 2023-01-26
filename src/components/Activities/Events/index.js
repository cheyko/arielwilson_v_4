import React, {useState} from 'react';
import withContext from "../../../withContext";
import Concerts from './Concerts';
import Conferences from './Conferences';
import Functions from './Functions';
import Meetings from './Meetings';
import Parties from './Parties';

const Events = props => {
    const [tab, setTab] = useState("meetings");
    const [showMeetings, setShowMeetings] = useState(true); // a small group of people get together either virtually or physically; every member can have the floor (example: staff meeting, sunday school, social club gathering)
    const [showConferences, setShowConferences] = useState(false); // a mass group of people get together either virtually or physically; speakers and audience (example: tech beach, other conferences)
    const [showFunctions, setShowFunctions] = useState(false); // a gathering for a special and common purpose; can be private or public (example: wedding, graduation, P.M Breakfast)
    const [showConcerts, setShowConcerts] = useState(false); // a social event that showcases performance(s) with a stage and the audience; more often musical can be invitation, open or pay for entry based (example: reggae sunfest, jazz n blues, cochella, sands, rocnation brunch, hypno-splash, etc)
    const [showParties, setShowParties] = useState(false); // a social event that people attend to have a good time by listening to music and/or dancing; can be invitation or open based (example: birthday party, baby shower)

    const deactivate = () => {
        switch(tab){
            case "meetings":
                setShowMeetings(false);
                break;
            case "conferences":
                setShowConferences(false);
                break;
            case "functions":
                setShowFunctions(false);
                break;
            case "concerts":
                setShowConcerts(false);
                break;
            case "parties":
                setShowParties(false);
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
                                    <li className={`button ${showMeetings ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("meetings");
                                            setShowMeetings(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-users" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Meetings </span>
                                        </span>
                                    </li>
                                                
                                    <li className={`button ${showConferences ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("conferences");
                                            setShowConferences(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-handshake" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Conferences </span>
                                        </span>
                                    </li>

                                    <li className={`button ${showFunctions ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("functions");
                                            setShowFunctions(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-glass-cheers" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Functions </span>
                                        </span>
                                    </li>

                                    <li className={`button ${showConcerts ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("concerts");
                                            setShowConcerts(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-theater-masks" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Concerts </span>
                                        </span>
                                    </li> 

                                    <li className={`button ${showParties ? "is-active" : "is-not-active"}`}
                                        onClick={ e => {
                                            deactivate();
                                            setTab("parties");
                                            setShowParties(true);
                                        }}
                                    >
                                        <span className="reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-gifts" aria-hidden="true"></i></span>
                                            <span className="tabs-title"> Parties </span>
                                        </span>
                                    </li>                 
                                </ul>
                            </div>
                        </div>
                        <div className="message-body">
                            {showMeetings && 
                                <div className="meetings-div">
                                    <Meetings />
                                    <h1> Meetings Section </h1> 
                                </div>
                            }
                            {showConferences &&
                                <div className="conferences-div">
                                    <Conferences />
                                    <h1> Conferences Section </h1> 
                                </div>
                            }
                            {showFunctions &&
                                <div className="functions-div">
                                    <Functions />
                                    <h1> Functions Section </h1> 
                                </div>
                            }
                            {showConcerts &&
                                <div className="concerts-div">
                                    <Concerts />
                                    <h1> Concerts Section </h1> 
                                </div>
                            }
                            {showParties &&
                                <div className="parties-div">
                                    <Parties />
                                    <h1> Parties Section </h1> 
                                </div>
                            }
                        </div>
                    </div>
                </article>
            </div>    
        </div>
    )
}

export default withContext(Events);