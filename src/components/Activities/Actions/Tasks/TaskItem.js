import React, { useState } from "react";
import withContext from "../../../../withContext";

const TaskItem = props => {
    const {task} = props;
    const [status, setStatus] = useState("");
    const statuses = ["Pending","In-Progress","Completed"];
    const [showUpdate, setShowUpdate] = useState(false);

    const handleStatus = (e) => {
        if (task.status !== e.target.value){
            setStatus(e.target.value);
            setShowUpdate(true);
        }else{
            setStatus(e.target.value);
            setShowUpdate(false);
        }
    }

    return (
        <div className="box">
            <div className="dropdown is-pulled-right is-hoverable">
                <div className="dropdown-trigger">
                    <b> <i style={{fontSize:"1.5rem"}} className="fas fa-ellipsis-h"></i> </b>
                </div>
                <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                    <div className="dropdown-content">
                        <span className="dropdown-item">
                            Edit Task
                        </span>
                        <span className="dropdown-item">
                            Delete Task
                        </span>
                    </div>
                </div>
            </div>
            <br />
            <div className="columns is-multiline is-mobile">
                <div className="media-left">
                    <figure className="image is-128x128">
                        <img
                            src="https://bulma.io/images/placeholders/128x128.png"
                            alt="test"
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <div className="">
                        <b><em>This is the Title </em> </b>
                    </div>
                    <div className="">
                        <b> Project: </b> <span>Sample</span>    
                    </div>
                    <div className="">
                        <b> Status: </b> 
                        <span className="select">
                            <select
                                id="status"
                                name="status"
                                value={status}
                                onChange={e => handleStatus(e)}>
                                    {statuses.map((vals, index) => 
                                        <option key={index} value={vals}>{vals}</option>
                                    )}
                                </select>

                        </span>          
                    </div>
                    {showUpdate && 
                        <div>
                            <br />
                            <button className="button is-primary"> Update</button>{" "}                        
                        </div>
                    }
                </div>
            </div>
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-4">John Smith</p>
                    <p className="subtitle is-6">@johnsmith</p>
                </div>
            </div>
        </div>
    )
}

export default withContext(TaskItem);