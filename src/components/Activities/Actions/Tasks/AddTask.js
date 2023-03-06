import { useEffect, useState } from "react";
import Modal from "react-modal";
import withContext from "../../../../withContext";
//import getDateTime from "../../../../GlobalFunctions";
import axios from "axios";
import ViewUserCard from "../../../HelperComponents/ViewUserCard";
import $ from "jquery";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex:6
    },
    content : {
      width                 : '45rem',
      height                : '30rem',
      top                   : '55%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      background:'white',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '1rem',
      outline: 'none',
      padding: '40px'
    }
};

const AddTask = props => {

    const {operation} = props;

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }
    const user_id = props.context.user.id;
    const [title, setTitle] = useState("");
    const [start, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("Pending");
    const [end, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [project, setProject] = useState("Open");
    const projects = props.projects.filter((project,idx) => project !== "Open");
    //const [projects, setProjects] = useState([]);
    //const [gotProjects, setGotProjects] = useState(false);
    const [projectSelect, setSelect] = useState("Open")
    const [newProject, showNewProject] = useState(false);
    const [isFor, setFor] = useState(null);
    const [addFor, setAddFor] = useState(false);
    const [searchval, setSearchVal] = useState("");
    const [userlist, setUserList] = useState([]);
    const [user, setUser] = useState(null);

    const clearFunc = props => {
        setTitle("");
        setDescription("");
        setResponseMsg("");
        setProject("");
        showNewProject(false);
        setSearchVal("");
        setUserList([]);
        //setGotProjects(false);
        setAddFor(false);
    }

    const saveTask = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
        if (title !== "" && project !== "" && isFor !== null){
            const formData = new FormData();
            formData.append('theDateTime',theDateTime);
            formData.append('user_id',user_id);
            formData.append('isFor',isFor);
            formData.append('title',title);
            formData.append('project',project);
            formData.append('description',description);
            formData.append('start_date',start);
            formData.append('end_date',end);
            formData.append('status',status);
            if(operation === "edit"){
                formData.append('task_id',props.task.task_id);
                await axios.put('/api/tasks',formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(
                    (result) => {
                        if (result.status === 200){
                            //clearFunc();
                            setResponseMsg("Task was updated.");
                        }else{
                            setResponseMsg("Task was not updated, please try again. Contact us for suppport if problem persist.");
                        }
                    }
                );
            }else{
                await axios.post('/api/tasks',formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                }).then(
                    (result) => {
                        if (result.status === 200){
                            const task_id = result.data.task_id;
                            clearFunc();
                            setResponseMsg("Task was saved.");
                        }else{
                            setResponseMsg("Task was not saved, please try again. Contact us for suppport if problem persist.");
                        }
                    }
                );
            }
        }else{
            setResponseMsg("Task is missing some important details.");
            //return false;
        }
    }

    const loadTask = () => {
        const task = props.task;
        setTitle(task.title);
        setProject(task.project);
        setSelect(task.project);
        setDescription(task.description);
        setStartDate(task.start_date);
        setEndDate(task.end_date);
        setFor(task.is_for);
        if(task.is_for !== user_id){
            setAddFor(true);
            setUser(task.done_by);
        }
    }

    useEffect( () => {
        if(operation === 'edit'){
            loadTask();
        }
    },[operation,projects]);

    const selectUser = (index) => {
        setUser(userlist[index]);
        setFor(userlist[index].user_id)
        setSearchVal("");
        setUserList([]);
    
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'projectSelect':
                setSelect(e.target.value);
                if(e.target.value === 'New'){
                    showNewProject(true);
                    setProject("");
                }else{
                    showNewProject(false);
                    setProject(e.target.value);
                }
                break;
            case 'doing-checkbox':
                if(e.target.value === 'self'){
                    setFor(user_id);
                    setAddFor(false);
                    setUser(null);
                }else{
                    setAddFor(true);
                    setFor(null);
                }
                break;
            case 'searchval':
                setSearchVal(e.target.value);
                if( e.target.value !== ""){
                    const searchval = e.target.value;
                    axios.post('/api/search-frat',{searchval, user_id}).then(
                        (search) => {
                            if (search.status === 200){
                                if (search.data.userlist){
                                    setUserList(Array.from(search.data.userlist));
                                }
                            }else{
                                setResponseMsg("No user found with that username.")
                            }
                        }
                    ).catch( error => {
                        console.log(error);
                    });
                }else{
                    setUserList([]);
                }
                break;
            default:
                break;     
        } 
    }
    
    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setResponseMsg("");
        setModalOpen(false);
    }

    return(
        <>
            {/*<button onClick={e => openModal(e)} className={`button ${operation === "create" ? 'is-outlined':'is-primary'}`}> {operation === "create" ? "Create" : "Update"} </button>*/}
            <button onClick={e => openModal(e)} className={`button ${operation === "edit" ? 'is-fullwidth is-warning':'is-link'}`}> {operation === 'edit' ? "Edit" : "Create" }</button>

            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                    <div className="hero">
                        <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                        <p className="has-text-centered"> Task Details </p>
                        <form>
                            <div className="field">
                                <label className="label"> Title: </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label"> Project </label>
                                <div className="select">
                                    <select
                                        id="projectSelect"
                                        name="projectSelect"
                                        value={projectSelect}
                                        onChange={e => handleChange(e)}>
                                        <option value="Open">Open</option>
                                        <option value="New">New Project</option>
                                        {projects.map((project, index) => 
                                            <option key={index} value={project}>
                                                {project}
                                            </option>
                                        )}
                                    </select>
                                </div>
                                {newProject &&
                                    <div className="field">
                                        <label className="label"> New Project Title: </label>
                                        <input 
                                            className="input"
                                            type="text"
                                            value={project}
                                            onChange={e => setProject(e.target.value)}
                                        />
                                    </div>
                                }
                            </div>
                            <div className="field">
                                <label className="label"> Under Taken By: </label>
                                <label className="checkbox-options">
                                    Self {" "}{" "}
                                    <input checked={isFor === user_id ? true : false} id="self-radio" type="radio" name="doing-checkbox" onChange={e => handleChange(e)} value="self" />
                                </label>
                                <label className="checkbox-options">
                                    Frat User {" "}
                                    <input checked={isFor && isFor !== user_id ? true : false} id="user-radio" type="radio" name="doing-checkbox" onChange={e => handleChange(e)} value="another" />
                                </label>
                                {user !== null && 
                                    <article className="message is-primary">
                                        <div className="message-header">
                                            <button type="button" onClick={e => setUser(null)} className="delete" aria-label="delete"></button>
                                        </div>
                                        <div className="message-body">
                                            <ViewUserCard user={user} />
                                        </div>
                                    </article>
                                }
                                {addFor &&
                                <div>
                                    <div className="control has-icons-left has-icons-right">
                                        <input
                                            className="input"
                                            type="text"
                                            name="searchval"
                                            value={searchval}
                                            onChange={e => handleChange(e)}
                                            placeholder="Search for Frat User"
                                            />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-user"></i>
                                        </span>
                                        <span className="icon is-small is-right">
                                            <i className="fas fa-search"></i>
                                        </span>
                                    </div>
                                    <div className="card">
                                        {userlist && userlist.length > 0 ? (
                                            userlist.map((aUser, index) => (
                                                <div onClick={e => selectUser(index)} className="column" key={index}>
                                                    {aUser.username}
                                                </div>
                                            ))
                                        ):(
                                            <div className="container">
                                                {searchval === "" ?
                                                    <span></span>:
                                                    <span>No Frat Users found</span>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                                }
                            </div>
                            <div className="field">
                                <label className="label"> Start Date:</label>
                                <input 
                                    className="input" 
                                    type="date" 
                                    name="start"
                                    value={start}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label"> End Date:</label>
                                <input 
                                    className="input" 
                                    type="date" 
                                    name="end"
                                    value={end}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label"> Description: </label>
                                <textarea
                                    className="textarea"
                                    type="text"
                                    rows="4"
                                    style={{ resize: "none" }}
                                    name="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                            <br />
                            <span>{responseMsg}</span>
                            <br />
                            <div className="field is-clearfix is-pulled-right">
                                &nbsp;
                                <button onClick={e => {clearFunc();closeModal(e);}} className="button is-warning">
                                    Cancel
                                </button>
                                &nbsp;&nbsp;
                                <button onClick={e => saveTask(e)} className="button is-primary " type="button">
                                    {operation === 'edit' ? "Update" : "Submit" }
                                </button>
                                &nbsp;
                            </div>

                        </form>
                    </div>

            </Modal>

        </>
    )
}
export default withContext(AddTask);