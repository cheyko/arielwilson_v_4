import React, {useState} from 'react';
import withContext from "../../../withContext";
import Concerts from './Concerts';
import Conferences from './Conferences';
import Functions from './Functions';
import Meetings from './Meetings';
import Parties from './Parties';
import Shows from './Shows';

const Events = props => {
    const {subSection} = props;

    return (
        <div>
            <div className="hero-container">
                <article className="box">
                    <div className="">
                        {subSection === 'meetings' && 
                            <div className="meetings-div">
                                <Meetings />
                            </div>
                        }
                        {subSection === 'conferences' &&
                            <div className="conferences-div">
                                <Conferences />
                            </div>
                        }
                        {subSection === 'functions' &&
                            <div className="functions-div">
                                <Functions />
                            </div>
                        }
                        {subSection === 'concerts' &&
                            <div className="concerts-div">
                                <Concerts />
                            </div>
                        }
                        {subSection === 'shows' &&
                            <div className="shows-div">
                                <Shows />
                            </div>
                        }
                        {subSection === 'parties' &&
                            <div className="parties-div">
                                <Parties />
                            </div>
                        }
                    </div>
                </article>
            </div>    
        </div>
    )
}

export default withContext(Events);