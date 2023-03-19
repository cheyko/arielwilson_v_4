import { useEffect, useState } from "react";
import Modal from "react-modal";
import withContext from "../../../../withContext";
//import getDateTime from "../../../../GlobalFunctions";
import ViewUserCard from "../../../HelperComponents/ViewUserCard";
import axios from "axios";

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

const AddLogistics = props => {

    const {operation} = props;

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const user_id = props.context.user ? props.context.user.id : 0;
    const types = ["Envelope", "Small Box", "Large Box", "Bag"];
    const [typeOf, setTypeOf] = useState("");
    const [sendAddr, setSendAddr] = useState("");
    const [addSendAddr, setAddSend] = useState(false);
    const [receiver, setReceiver] = useState(null);
    const [recvAddr, setRecvAddr] = useState("");
    const [addRecvAddr, setAddRecv] = useState(false);
    const [description, setDescription] = useState("");
    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [searchval, setSearchVal] = useState("");
    const [userlist, setUserList] = useState([]);
    const [user, setUser] = useState(null);
    const [status, setStatus] = useState("Pending");


    const clearFunc = () => {
        setTypeOf("");
        setSendAddr("");
        setReceiver(null);
        setRecvAddr("");
        setDescription("");
        setResponseMsg("");
        setSearchVal("");
        setUserList([]);
    }

    const saveRequest = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
        if (receiver !== null && sendAddr !== '' && recvAddr !== ''){
            const formData = new FormData();
            formData.append('theDateTime',theDateTime);
            formData.append('sender',user_id);
            formData.append('receiver',receiver);
            formData.append('sendAddr',sendAddr);
            formData.append('recvAddr',recvAddr);
            formData.append('typeOf',typeOf);
            formData.append('status',status);
            formData.append('description',description);
            await axios.post('/api/logistics',formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then(
                (result) => {
                    if (result.status === 200){
                        const logistic_id = result.data.logistic_id;
                        clearFunc();
                        setResponseMsg("Logistic was saved.");
                    }else{
                        setResponseMsg("Logistic was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
        }else{
            setResponseMsg("Logistic is missing some important details.");
        }
    }

    const loadRequest = async(e) => {

    }

    useEffect( () => {

    });

    const handleChange = (e) => {
        switch(e.target.name){
            case 'send-radio':
                if(e.target.value === 'self'){
                    setSendAddr(props.context.user.location);
                    setAddSend(false);
                }else{
                    setSendAddr("");
                    setAddSend(true);
                }
                break;
            case 'sendAddr':
                setSendAddr(e.target.value);
                break;
            case 'recv-radio':
                if(e.target.value === 'system'){
                    setRecvAddr('system');
                    setAddRecv(false);
                }else{
                    setRecvAddr('');
                    setAddRecv(true);
                }
                break;
            case 'recvAddr':
                setRecvAddr(e.target.value);
                break;
            case 'searchval':
                setSearchVal(e.target.value);
                if( e.target.value !== ""){
                    const searchval = e.target.value;
                    axios.post('/api/search-users',{searchval, user_id}).then(
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

    const selectUser = (index) => {
        setUser(userlist[index]);
        setReceiver(userlist[index].user_id)
        setSearchVal("");
        setUserList([]);
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
                        <p className="has-text-centered"> Delivery Details </p>
                        <form>
                            <div className="field">
                                <label className="label"> Type: </label>
                                <div className="select">
                                    <select
                                        id="typeOf"
                                        name="typeOf"
                                        value={typeOf}
                                        onChange={e => setTypeOf(e.target.value)}>
                                            <option value="">Choose ...</option>
                                            {types.map((val, index) => 
                                                <option key={index} value={val}>{val}</option>
                                            )}
                                        </select>
                                </div>
                            </div>
                            <div className="field">
                                <label className="label">Send Address</label>
                                <label className="radio">
                                    Use Registered Location {" "}
                                    <input type="radio" name="send-radio" onChange={e => handleChange(e)} value="self" />
                                </label>
                                <label className="checkbox-options">
                                    Enter Location {" "}
                                    <input type="radio" name="send-radio" onChange={e => handleChange(e)} value="another" />
                                </label>
                                <hr />
                                {addSendAddr &&
                                <input 
                                    className="input"
                                    type="text"
                                    name="sendAddr"
                                    value={sendAddr}
                                    onChange={e => handleChange(e)}
                                />}
                            </div>
                            <div className="field">
                                <label className="label"> Receiver: </label>
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
                                <label className="label">Receive Address</label>
                                <label className="radio">
                                    Use Registered Location {" "}
                                    <input type="radio" name="recv-radio" onChange={e => handleChange(e)} value="system" />
                                </label>
                                <label className="checkbox-options">
                                    Enter Location {" "}
                                    <input type="radio" name="recv-radio" onChange={e => handleChange(e)} value="another" />
                                </label>
                                <hr />
                                {addRecvAddr &&
                                <input 
                                    className="input"
                                    type="text"
                                    name="recvAddr"
                                    value={recvAddr}
                                    onChange={e => handleChange(e)}
                                />}
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
export default withContext(AddLogistics);