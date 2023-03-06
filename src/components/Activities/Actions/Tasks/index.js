import React, { useState, useEffect, useCallback } from "react";
import withContext from "../../../../withContext";
import AddTask from "./AddTask";
import TaskItem from "./TaskItem";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const Tasks = props => {

    const [showFilter, setShowFilter] = useState(false);
    const [fullList, setFullList] = useState([]);
    const user_id = props.context.user.id;
    const [tasks, setTasks] = useState([]);
    const [gotTask, setGotTask] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [status, setStatus] = useState("All");
    const [project, setProject] = useState("All");
    const [projects, setProjects] = useState([]);
    const [gotProjects, setGotProjects] = useState(false);
    const [searchval, setSearchVal] = useState("");
    const [filter, setFilter] = useState(null);
    const perPage = 12;
    //const pageCount = tasks ? Math.ceil(services.length / perPage) : 0;
    let slice;
    const [offset, setOffset] = useState(0);

    const handlePageClick = (e) => {
        setOffset(e.selected * perPage);
        window.scrollTo(0, 0);
    };

    const filterList = useCallback(() => {
        let result = fullList;
        if (searchval && searchval !== ""){
            result = result.filter(task => task.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (status && status !== "All") {
            result = result.filter(task => task.status === status);
        }
        if (project && project !== "All"){
            result = result.filter(task => task.project === project);
        }
        
        setTasks(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval, status, project, tasks]);

    useEffect(() => {
        if (gotTask === false){
            axios.post("/api/get-tasks",{user_id}).then(res => {
                if (res.status === 200){
                    setFullList(res.data);
                    setTasks(res.data);
                    setPageCount( Math.ceil(res.data.length / perPage));
                    setGotTask(true);
                }
            });
        }
        if(gotProjects === false){
            
            axios.post('/api/get-projects',{user_id}).then(
                (response) => {
                    if (response.status === 200){
                        if (response.data.projectlist){
                            setProjects(Array.from(response.data.projectlist));
                            setGotProjects(true);
                        }
                    }
                }
            ).catch( error => {
                console.log(error);
            });
        }
        if(filter){
            filterList();
        }
    }, [gotTask, filter, filterList, tasks]);

    slice = tasks.slice(offset, offset + perPage); 

    console.log(slice);
    return (
        <div className="hero">
            <nav className="panel">
                <div className="panel-heading">
                    Tasks
                    <div className="is-pulled-right"><button onClick={e => setShowFilter(!showFilter)} className="button">Filter</button></div>
                    <div className="is-pulled-right"><AddTask projects={projects}/></div>
                </div>
                {showFilter && 
                    <>
                    <p className="panel-tabs">
                        <a href="#" onClick={e => {setStatus('All');setFilter(true);}} className={`${status === "All" ? "is-active" : ""}`}>All</a>
                        <a href="#" onClick={e => {setStatus('Pending');setFilter(true);}} className={`${status === "Pending" ? "is-active" : ""}`}>Pending</a>
                        <a href="#" onClick={e => {setStatus('In-Progress');setFilter(true);}} className={`${status === "In-Progress" ? "is-active" : ""}`}>In-progress</a>
                        <a href="#" onClick={e => {setStatus('Completed');setFilter(true);}} className={`${status === "Completed" ? "is-active" : ""}`}>Completed</a>
                    </p>
                    <div className="panel-block">
                        <p className="control has-icons-left">
                        <input
                            className="input form-input"
                            type="text"
                            name="searchval"
                            value={searchval}
                            onChange={event => {
                                setSearchVal(event.target.value);
                                setFilter(true);
                            }}
                            placeholder="Search"
                        />
                        <span className="icon is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <span className=""> Projects  </span>&nbsp;
                        <div className="select is-fullwidth">
                            <select
                                value={project}
                                onChange={e => {setProject(e.target.value);setFilter(true);}}>
                                <option value="All">All</option>
                                {projects.map((project, index) => 
                                    <option key={index} value={project}>
                                        {project}
                                    </option>
                                )}
                            </select>
                        </div>
                    </div>
                    </>
                }
            </nav>
            <div className="hero">
                <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((task, index) => (
                            <div key={index} className="column is-half-desktop is-full-mobile">
                                <TaskItem
                                    task={task}
                                    key={index}
                                    setGotTask={setGotTask}
                                    projects={projects}
                                />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="column has-text-centered">
                                <span className="title has-text-grey-light">
                                    No Task Found
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <div className="paginationBox box">
                    <ReactPaginate
                        previousLabel="prev"
                        nextLabel="next"
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        />
                </div>
            </div>
        </div>
    )
}

export default withContext(Tasks);