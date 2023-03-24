import { useEffect, useState } from "react";
import Modal from "react-modal";
import withContext from "../../../../withContext";
//import getDateTime from "../../../../GlobalFunctions";
import axios from "axios";
import ViewUserCard from "../../../HelperComponents/ViewUserCard";

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

    //const {operation} = props;

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const user_id = props.context.user.id;
    //const [typeOf, setTypeOf] = useState("Question");
    const [question, setQuestion] = useState("");
    //const [status, setStatus] = useState("Sent");
    let typeOf = "Personal";
    let status = "Sent";
    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [aChoice, setAChoice] = useState("");
    const [choices, setChoices] = useState([]);
    const [searchval, setSearchVal] = useState("");
    const [userlist, setUserList] = useState([]);
    const [isFor, setFor] = useState(null);
    const [isEdit, setEdit] = useState(false);
    const [editVal, setEditVal] = useState(null);
    const [user, setUser] = useState(null);

    const clearFunc = () => {
        setQuestion("");
        setResponseMsg("");
        setAChoice("");
        setChoices([]);
        setSearchVal("");
        setUserList([]);
        setEdit(false);
        setEditVal(null);
    }

    const saveRequest = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
        if (choices.length !== 0 && question !== "" && isFor !== null){
            const formData = new FormData();
            formData.append('theDateTime',theDateTime);
            formData.append('typeOf',typeOf);
            formData.append('user_id',user_id);
            formData.append('isFor',isFor);
            formData.append('question',question);
            formData.append('status',status);
            choices.forEach( (choice,index) => {
                formData.append('choices',choice);
            });
            await axios.post('/api/requests',formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(
                (result) => {
                    if (result.status === 200){
                        //const request_id = result.data.request_id;
                        clearFunc();
                        setResponseMsg("Request was saved.");
                    }else{
                        setResponseMsg("Request was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            //return true;
        }else{
            setResponseMsg("Request is missing some important details.");
            //return false;
        }
    }

    /*const loadRequest = async(e) => {

    }*/

    const addChoice = () => {
        setChoices([...choices, aChoice]);
        setAChoice("");
    }

    const editChoice = (index) => {
        setAChoice(choices[index]);
        setEditVal(index);
        setEdit(true);

    }

    const reAddChoice = () => {
        let temp = choices;
        temp[editVal] = aChoice;
        setChoices(temp);
        setAChoice("");
        setEdit(false);
        setEditVal(null);
    }

    const cancelEdit = () => {
        setAChoice("");
        setEdit(false);
        setEditVal(null);
    }

    const deleteChoice = (index) => {
        setChoices(choices.filter((val,idx) => index !== idx));
    }

    useEffect( () => {

    },[]);

    const selectUser = (index) => {
        setUser(userlist[index]);
        setFor(userlist[index].user_id)
        setSearchVal("");
        setUserList([]);
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'searchval':
                setSearchVal(e.target.value);
                if( e.target.value !== ""){
                    const searchval = e.target.value;
                    axios.post(`${process.env.REACT_APP_PROXY}/api/search-users`,{searchval, user_id}).then(
                        (search) => {
                            if (search.status === 200){
                                if (search.data.userlist){
                                    //setUserList(Array.from(search.data.userlist));
                                    setUserList(search.data.userlist);
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
            <button onClick={e => openModal(e)} className='button is-outlined'> Send </button>

            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                    <div className="hero">
                        <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                        <p className="has-text-centered"> Request Details </p>
                        <form>
                            <div className="field">
                                <label className="label"> Question: </label>
                                <textarea
                                    className="textarea"
                                    type="text"
                                    rows="3"
                                    style={{ resize: "none" }}
                                    name="question"
                                    value={question}
                                    onChange={e => setQuestion(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label"> Under Taken By: </label>
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
                                <div className="control has-icons-left has-icons-right">
                                    <input
                                        className="input"
                                        type="text"
                                        name="searchval"
                                        value={searchval}
                                        onChange={e => handleChange(e)}
                                        placeholder="Search for new recipient"
                                        />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-user"></i>
                                    </span>
                                    <span className="icon is-small is-right">
                                        <i className="fas fa-search"></i>
                                    </span>
                                    <div className="card">
                                        {userlist && userlist.length > 0 ? (
                                            userlist.map((aUser, index) => (
                                                <div onClick={e => selectUser(index)} className="column" key={index}>
                                                    <ViewUserCard key={index} user={aUser} />
                                                </div>
                                            ))
                                        ):(
                                            <div className="container">
                                                {searchval === "" ?
                                                    <span></span>:
                                                    <span>No Users found</span>
                                                }
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="field">
                                <span>Enter the different responses that you would like the recipient to choose from.</span>
                                <div className="choices">
                                    <div className=""><b>Choices</b></div>
                                    <div>
                                        {choices.map((val,index) => (
                                            <div key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index)}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => deleteChoice(index)}><i className="fas fa-trash"></i></span>{" "}
                                                <span>{index + 1}:</span>{" "}
                                                <span className={`${editVal === index ? 'background-warning' : ''}`}>{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <br />
                                <label className="label"> Enter Choice: </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="aChoice"
                                    value={aChoice}
                                    onChange={e => setAChoice(e.target.value)}
                                />
                                {isEdit ?
                                    <div>
                                        <span onClick={e => reAddChoice()} className="button is-small is-link is-underlined">Re-Add Choice</span>
                                        <span onClick={e => cancelEdit()} className="button is-small is-warning is-underlined">Cancel Edit</span>
                                    </div>
                                   :<span onClick={e => addChoice()} className="button is-small is-link is-underlined">Add Choice</span>
                                }
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
                                <button onClick={e => saveRequest(e)} className="button is-primary " type="submit">
                                    Submit
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