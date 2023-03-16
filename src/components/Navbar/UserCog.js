import React, { useState } from "react";
import withContext from "../../withContext";
import Modal from "react-modal";
import { useNavigate, useLocation } from "react-router-dom";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex: '10'
    },
    content : {
      width                 : '25rem',
      height                : '15rem',
      top                   : '50%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      background:'white',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '0.5rem',
      outline: 'none',
      padding: '20px',
      zIndex: '10'
    }
};

const UserCog = props => {

    let navigate = useNavigate();
    let location = useLocation();
    const [modalIsOpen, setModalOpen] = useState(false);
    const username = props.context.user ? props.context.user.username : "" ;

    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setModalOpen(false);
    }

    const logout = e => {
        props.context.logout(e);
        if(location.pathname === '/'){
            window.location.reload();
        }else{
            navigate("/");
        }
    }

    return(
        <span>
            <button onClick={e => openModal(e)} className="button usercog-btn large-text"><i style={{fontSize:"large"}} className="fa fa-user-cog"></i></button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                    
                <div className="hero" style={{width:"100%"}}>
                    <br /><br />
                    <button style={{margin:"0 auto",padding:"1rem"}} className="button is-link is-medium is-rounded" onClick={e => logout(e)}>   
                        <span>LOG-OUT {username}</span>
                    </button>
                    <div style={{width:"100%"}} className="modal-footer container">
                        <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    </div>
                </div>
            </Modal>

        </span>
    )
}
export default withContext(UserCog);