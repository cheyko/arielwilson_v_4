import React, {useState} from 'react';
import withContext from "../../../withContext";
import Concerts from './Concerts';
import Conferences from './Conferences';
import Functions from './Functions';
import Meetings from './Meetings';
import Parties from './Parties';

const Events = props => {
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
                            {subSection === 'meetings' && 
                                <div className="meetings-div">
                                    <Meetings />
                                    <h1> Meetings Section </h1> 
                                </div>
                            }
                            {subSection === 'conferences' &&
                                <div className="conferences-div">
                                    <Conferences />
                                    <h1> Conferences Section </h1> 
                                </div>
                            }
                            {subSection === 'functions' &&
                                <div className="functions-div">
                                    <Functions />
                                    <h1> Functions Section </h1> 
                                </div>
                            }
                            {subSection === 'concerts' &&
                                <div className="concerts-div">
                                    <Concerts />
                                    <h1> Concerts Section </h1> 
                                </div>
                            }
                            {subSection === 'parties' &&
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