import React, { useState } from "react";
//import { Switch, Route,Link, BrowserRouter as Router } from "react-router-dom";
import SetAccess from "./SetAccess";
import SetGeneral from "./SetGeneral";
import SetSafety from "./SetSafety";
import "./index.css";
import SetNotification from "./SetNotification";
import SetAccount from "./SetAccount";
import SetAccessibility from "./SetAccessibility";

const Settings = props => {

    //revert to card structure ....... similar to e-commerce tutorial
    
    const [showGeneral, settingGeneral] = useState(false);
    const [showAccess, settingAccess] = useState(false);
    const [showSafety, settingSafety] = useState(false);

    const [showNotification, settingNotification] = useState(false);
    const [showAccount, settingAccount] = useState(false);
    const [showAccessibilty, settingAccessibility] = useState(false);

    function setOption(e,opt){
        e.preventDefault();
        switch(opt){
            case 1:
                settingGeneral(false);
                settingSafety(false);
                settingNotification(false);
                settingAccount(false);
                settingAccessibility(false);
                settingAccess(true);
                break;
            case 2:
                settingGeneral(false);
                settingAccess(false);
                settingNotification(false);
                settingAccount(false);
                settingAccessibility(false);
                settingSafety(true);
                break;
            case 3:
                settingGeneral(false);
                settingAccess(false);
                settingSafety(false);
                settingNotification(true);
                settingAccount(false);
                settingAccessibility(false);
                break;
            case 4:
                settingGeneral(false);
                settingAccess(false);
                settingSafety(false);
                settingNotification(false);
                settingAccount(true);
                settingAccessibility(false);
                break;
            case 5:
                settingGeneral(false);
                settingAccess(false);
                settingSafety(false);
                settingNotification(false);
                settingAccount(false);
                settingAccessibility(true);
                break;
            default:
                settingGeneral(true);
                settingAccess(false);
                settingSafety(false);
                settingNotification(false);
                settingAccount(false);
                settingAccessibility(false);
                break;
        }
    }

    return (
        <div className="hero">
            <div className="hero-body">
                <div className="content settings-page">
                    <div className="has-text-centered">
                        <h1 className="subtitle"><b>SETTINGS</b></h1>
                    </div>
                    <div className="columns">
                        <div className="column is-one-fifth">
                            <ul className="settingsOptions">
                                <li className={showGeneral ? `is-active` : ``} onClick={e => setOption(e,0)}>
                                    General 
                                </li>
                                <br/>
                                <li className={showAccess ? `is-active` : ``} onClick={e => setOption(e,1)}>
                                    Access
                                </li>
                                <br/>
                                <li className={showSafety ? `is-active` : ``} onClick={e => setOption(e,2)}>
                                    Safety
                                </li>
                                <br/>
                                <li className={showNotification ? `is-active` : ``} onClick={e => setOption(e,3)}>
                                    Notifications
                                </li>
                                <br/>
                                <li className={showAccount ? `is-active` : ``} onClick={e => setOption(e,4)}>
                                    Account
                                </li>
                                <br/>
                                <li className={showAccessibilty ? `is-active` : ``} onClick={e => setOption(e,5)}>
                                    Accessibilty Features
                                </li>
                            </ul>
                        </div>
                        <div className="column">
                            {showGeneral && <SetGeneral /> }
                            {showAccess && <SetAccess /> }
                            {showSafety && <SetSafety /> }
                            {showNotification && <SetNotification />}
                            {showAccount && <SetAccount />}
                            {showAccessibilty && <SetAccessibility />}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Settings;


