import { useState } from "react";
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

const WelcomeMsg = (props) => {

    const [modalIsOpen, setModalOpen] = useState(true);

    const closeModal = e => {
        e.preventDefault();
        setModalOpen(false);
        props.context.closeWelcomeMsg();
    }

    return(
        <div>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                    <div className="hero" style={{height:"100%"}}>
                        <div className="card" style={{height:"100%"}}>
                            <article className="message is-info" style={{height:"100%"}}>
                                <div className="message-header">
                                    <p>W@H GW@@N</p>
                                    <button onClick={ e => closeModal(e)} className="is-large delete" aria-label="delete"></button>
                                </div>
                                <div className="message-body">
                                    <h1 className="title"> Sign-Up successful to W@H GW@@N ! </h1>
                                    <div className="info">
                                        <h3 className="subtitle"> Follow more profiles to experience more of what W@H GW@@N has to offer. </h3>
                                    </div>  
                                </div>
                            </article>
                        </div>
                    </div>
            </Modal>
        </div>
    )
}
export default WelcomeMsg;