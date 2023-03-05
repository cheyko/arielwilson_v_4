import React, {useState} from 'react';
import withContext from "../../../withContext";
import Logistics from './Logistics';
import Polls from './Polls';
import Requests from './Request';
import Tasks from './Tasks';

const Actions = props => {
    const {subSection} = props;
    //const [tab, setTab] = useState("task");

    return (
        <div>
            <div className="hero-container">
                <article className="box">
                    <div className="">
                        
                        <div className="">
                            {subSection === 'tasks' && 
                                <div className="task-div">
                                    <Tasks />
                                    <h1> Task Section </h1> 
                                </div>
                            }
                            {subSection === 'requests' &&
                                <div className="requests-div">
                                    <Requests />
                                    <h1> Requests Section </h1> 
                                </div>
                            }
                            {subSection === 'logistics' &&
                                <div className="logistics-div">
                                    <Logistics />
                                    <h1> Logistics Section </h1> 
                                </div>
                            }
                            {subSection === 'polls' &&
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