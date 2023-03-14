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
                        
                    {subSection === 'classifieds' && 
                        <div className="classifieds-div">
                            <Classifieds />
                        </div>
                    }
                    {subSection === 'applications' &&
                        <div className="applications-div">
                            <Applications />
                        </div>
                    }
                    {subSection === 'assignments' &&
                        <div className="assigments-div">
                            <Assignments />
                        </div>
                    }
                    {subSection === 'volunteer' &&
                        <div className="volunteer-div">
                            <Volunteer />
                        </div>
                    }
                </article>
            </div>    
        </div>
    )
}

export default withContext(Jobs);