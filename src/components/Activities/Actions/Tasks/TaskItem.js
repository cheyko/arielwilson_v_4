import React, { useState } from "react";
import withContext from "../../../../withContext";
import AddTask from "./AddTask";
import axios from "axios";
import { useEffect } from "react";
import Modal from "react-modal";

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
      width                 : 'auto',
      height                : 'auto',
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
      outline: 'none',
      padding: '0px'
    }
};


const TaskItem = props => {
    const {task} = props;
    const user_id = props.context.user.id;
    const [status, setStatus] = useState(task.status);
    const statuses = ["Pending","In-Progress","Completed"];
    const [showUpdate, setShowUpdate] = useState(false);
    const [showTask, setShowTask] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [showControls, setShowControls] = useState(true);

    const handleStatus = (e) => {
        if (task.status !== e.target.value){
            setStatus(e.target.value);
            setShowUpdate(true);
        }else{
            setStatus(e.target.value);
            setShowUpdate(false);
        }
    }

    const convertDate = (date) => {
        var new_date = new Date(date);        
        return new Date(new_date.setDate(new_date.getDate() + 1)).toDateString();;
    }

    const updateTask = async() => {
        const task_id = task.task_id;
        await axios.put(`${process.env.REACT_APP_PROXY}/api/update-task`,{user_id, task_id, status}).then(
            (result1) => {
                if (result1.status === 200){
                    setShowUpdate(false);
                    setResponseMsg("Task status was changed.");
                    props.setGotTask(false);
                }else{
                    setResponseMsg("There was an issue, Task status was not changed.");
                }
            }
        );
    }

    const deleteTask = async() => {
        const task_id = task.task_id;
        await axios.put(`${process.env.REACT_APP_PROXY}/api/delete-task`,{user_id, task_id}).then(
            (result1) => {
                if (result1.status === 200){
                    setResponseMsg("Task status was deleted.");
                    setShowControls(false);
                    props.setGotTask(false);
                }else{
                    setResponseMsg("There was an issue, Task status was not deleted.");
                }
            }
        );
    }

   useEffect(() => {
        if(status !== task.status){
            setStatus(task.status);
        }
    },[status, task]);

    const openModal = e => {
        e.preventDefault();
        setResponseMsg("");
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setResponseMsg("");
        setModalOpen(false);
    }

    return(
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {task.title}
                </p>
                <button onClick={e => setShowTask(!showTask)} className="card-header-icon" aria-label="more options">
                <span className="icon">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </header>
            {showTask && 
            <>
                <div className="card-content">
                    <div className="content">
                        <b>Project :</b><span> {task.project} </span>
                        <br />
                        <b>To Do :</b><span> {task.is_for === user_id ? "You" : <span className="has-text-link">@{task.done_by.username}</span>} </span>
                        <br />
                        <div>
                            <b> Status : </b> &nbsp;
                            <span className="select">
                                {status && <select
                                    id="status"
                                    name="status"
                                    value={status}
                                    onChange={e => handleStatus(e)}>
                                        {statuses.map((vals, index) => 
                                            <option key={index} value={vals}>{vals}</option>
                                        )}
                                </select>}

                            </span>          
                        </div>
                        <div>
                            {task.description}
                        </div>
                        <br/>
                        <div className="">
                            <time> {convertDate(task.start_date)} - {convertDate(task.end_date)}</time>
                        </div>
                        <small style={{color:"blue"}}>{responseMsg}</small>
                    </div>
                </div>
                <footer className="card-footer">
                    <span className="card-footer-item no-padding"><button onClick={e => updateTask()} className={`button is-fullwidth ${showUpdate ? 'is-primary':''}`}>Save</button></span>
                    <span className="card-footer-item no-padding"><AddTask task={task} operation="edit" projects={props.projects}/></span>
                    <span className="card-footer-item no-padding"><button onClick={e => openModal(e)} className="button is-danger is-fullwidth">Delete</button></span>
                </footer>
                <Modal 
                    isOpen={modalIsOpen}
                    onRequestClose={ e => closeModal(e)}
                    style={customStyles}>
                    <div className="hero">
                        <article className="message is-danger">
                            <div className="message-header">
                                <p>Delete Task</p>
                                <button onClick={e => closeModal(e)} className="delete" aria-label="delete"></button>
                            </div>
                            <div className="message-body has-text-centered">
                                <div>
                                    Are you sure you want to delete this Task ?
                                </div>
                                <br />
                                <small style={{color:"blue"}}>{responseMsg}</small>

                                {showControls &&
                                    <div>
                                        <button onClick={e => deleteTask()} style={{width:"7rem"}} className="button is-primary">Yes</button>
                                        {" "}
                                        <button onClick={e => closeModal(e)} style={{width:"7rem"}} className="button is-dark">No</button>
                                    </div>
                                }
                            </div>
                        </article>
                    </div>
                </Modal>

            </>
            }
        </div>
    )
}

export default withContext(TaskItem);