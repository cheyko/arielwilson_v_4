import React, {useState} from 'react';
import withContext from "../../../withContext";
import Applications from './Applications';
import Assignments from './Assignments';
import Classifieds from './Classifieds';
import Volunteer from './Volunteer';

const Jobs = props => {

    const {subSection} = props;

    return (
        <div>
            <div className="hero-container">
                <article className="box">
                    <div className="message">
                        <div className="message-header">
                            {subSection.toUpperCase()}
                        </div>
                        <div className="message-body">
                            {subSection === 'classifieds' && 
                                <div className="classifieds-div">
                                    <Classifieds />
                                    <h1> Classifieds Section </h1> 
                                </div>
                            }
                            {subSection === 'applications' &&
                                <div className="applications-div">
                                    <Applications />
                                    <h1> Applications Section </h1> 
                                </div>
                            }
                            {subSection === 'assignments' &&
                                <div className="assigments-div">
                                    <Assignments />
                                    <h1> Assignments Section </h1> 
                                </div>
                            }
                            {subSection === 'volunteer' &&
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