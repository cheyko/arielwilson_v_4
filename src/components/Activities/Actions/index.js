import React from 'react';
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
                                </div>
                            }
                            {subSection === 'requests' &&
                                <div className="requests-div">
                                    <Requests />
                                </div>
                            }
                            {subSection === 'logistics' &&
                                <div className="logistics-div">
                                    <Logistics />
                                </div>
                            }
                            {subSection === 'polls' &&
                                <div className="polls-div">
                                    <Polls />
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