import React, { useState } from "react";
import withContext from "../../withContext";
import Modal from "react-modal";
import axios from "axios";
import ViewConvoUser from "./ViewConvoUser";
import "./index.css";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex:'3'
    },
    content : {
      width: '35rem',
      height                : '35rem',
      top                   : '55%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      background:'burlywood',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '0.5rem',
      outline: 'none',
      padding: '20px',
      zIndex:'3'
    }
};

const NewConvo = props => {

    let {modalIsOpen} = props;
    const [searchval, setSearchVal] = useState("");
    const [responseMsg, setResponseMsg] = useState("");
    const [userlist, setUserList] = useState([]);

    const handleChange = (e) => {
        setSearchVal(e.target.value);
        const searchval = e.target.value;
        const user_id = props.context.user.id;

        if( e.target.value !== ""){

            axios.post('/api/search-users',{searchval, user_id}).then(
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
    }

    const closeModal = e => {
        e.preventDefault();
        props.setModalOpen(false);
    }

    return(
        <div>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>

                    <h1 className="subtitle">New Convo</h1>
                    <span className="help"> Search for a new recipient via their username.</span>
                    <form>
                        <div className="field">
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
                            </div>
                            <p id="responseMsg" className="help is-danger">{responseMsg}</p>
                        </div>
                    </form>
                    <div className="userslist">
                    { userlist && userlist.length > 0 ? (
                        userlist.map((aUser, index) => (
                            <div className="column" key={index}>
                                <ViewConvoUser 
                                    key={index}
                                    user={aUser}
                                    setTabs={props.setTabs}
                                />
                            </div>
                        ))
                    ):(
                        <div className="container">
                            
                        </div>
                    )}
                    </div>
                </Modal>
        </div>
    );
}
export default withContext(NewConvo);