import React, {Component} from "react";
import Modal from "react-modal";
//import withContext from "../withContext";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)'
    },
    content : {
      width                 : '20rem',
      height                : '25rem',
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
      padding: '20px'
    }
};

class TourModal extends Component {
    constructor(props){
        super(props);
        this.state = {
            modalIsOpen : false
        }
    }

    openModal = e => {
        e.preventDefault();
        this.setState({ modalIsOpen : !this.state.modalIsOpen});
    }

    closeModal = e => {
        e.preventDefault();
        this.setState({ modalIsOpen : false});
    }

    render(){
        return(
            <div>
                <button onClick={this.openModal} className="button is-primary is-small agentButton">Request a Tour</button>
                <Modal 
                    isOpen={this.state.modalIsOpen}
                    onRequestClose={this.closeModal}
                    style={customStyles}>
                    <div>
                        <h1 className="subtitle has-text-centered"> Requesting a Tour </h1>
                        <form>
                            <div className="field"> 
                                <label className="label">
                                    Enter Full Name :
                                </label>

                                <input className="input" type="text" />
                            </div>

                            <div className="field">
                                <label className="label">
                                    Enter Email Address :
                                </label>

                                <input className="input" type="email" />
                            </div>

                            <div className="field">
                                <label className="label">
                                    Enter Contact Number :
                                </label>

                                <input className="input" type="tele" />
                            </div>
                            
                        </form>
                    </div>
                </Modal>
    
            </div>
        );
    }
}

export default TourModal;