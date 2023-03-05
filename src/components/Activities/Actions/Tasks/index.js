import React from "react";
import withContext from "../../../../withContext";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";

const Tasks = props => {

    return (
        <div className="hero">
            <nav class="panel">
  <p class="panel-heading">
    Tasks
    <div className="is-pulled-right"><button className="button">Filter</button></div>
    <div className="is-pulled-right"><AddTask /></div>
  </p>
  <p class="panel-tabs">
    <a class="is-active">All</a>
    <a>Public</a>
    <a>Private</a>
    <a>Sources</a>
    <a>Forks</a>
  </p>
  <div class="panel-block">
    <p class="control has-icons-left">
      <input class="input" type="text" placeholder="Search" />
      <span class="icon is-left">
        <i class="fas fa-search" aria-hidden="true"></i>
      </span>
    </p>
    </div>
  <div class="panel-block">
        <span className=""> Projects  </span>&nbsp;
        <div className="select is-fullwidth">
            <select>
                <option>All</option>
                <option>Open</option>
            </select>
        </div>

  </div>
</nav>
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