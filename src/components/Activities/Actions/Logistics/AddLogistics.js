import { useEffect, useState } from "react";
import Modal from "react-modal";
import withContext from "../../../../withContext";
//import getDateTime from "../../../../GlobalFunctions";

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

    const types = ["Envelope", "SmallBox", "LargeBox", "Bag"];
    const [typeOf, setTypeOf] = useState(null);
    const [description, setDescription] = useState("");
    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [searchval, setSearchVal] = useState("");
    const [userlist, setUserList] = useState([]);

    const clearFunc = () => {
        setTypeOf(null);
        setResponseMsg("");
        setSearchVal("");
        setUserList([]);
    }

    const saveRequest = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
    }

    const loadRequest = async(e) => {

    }

    useEffect( () => {

    });

    const handleChange = (e) => {
        switch(e.target.name){
            case 'projectSelect':
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
                                <label className="label"> Receiver: </label>
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
                                       Frat Users
                                    </div>
                                </div>
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