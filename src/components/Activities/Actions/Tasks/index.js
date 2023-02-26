import React from "react";
import withContext from "../../../../withContext";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

const Tasks = props => {

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <AddTask />
                    <button className="button is-outlined">
                        Updates
                    </button>{" "}
                    <button className="button is-outlined">
                        Filter
                    </button>
                </div>
            </div>
            <div className="hero">
                <div className="columns">
                    <div className="column">
                        <TaskItem  task={{status:"Pending"}}/>
                    </div>
                    <div className="column">

                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Tasks);