import { useEffect, useState } from "react";
import Modal from "react-modal";
import Encourage from "./Encourage";

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
      padding: '0px'
    }
};

const EncourageModal = (props) => {

    let {modalIsOpen} = props;
    let {wanted} = props;

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

                <Encourage wanted={wanted} use={"modal"} closeModal={closeModal} />
            </Modal>
        </div>
    )
}
export default EncourageModal;