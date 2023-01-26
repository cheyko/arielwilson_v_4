import React, {useState} from "react";
//import Profile from ".";
import withContext from "../../withContext";

import Modal from "react-modal";
import Bio from "../HelperComponents/Bio";
import {Link} from 'react-router-dom';

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
      height                : '25rem',
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
      borderRadius: '0.5rem',
      outline: 'none',
      padding: '20px'
    }
};

const ProfileBio = props => {
    
    const action = props.action;
    const user = props.user;
    console.log(user);
    
    const getBirthday = (param) => {
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var bday = new Date(param);
        return months[bday.getMonth()] + " " + (bday.getDate() + 1) ;
    }

    let birthday = props.user ? getBirthday(props.user.dob) : null;

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setModalOpen(false);
    }

    return(
        <>
        {user &&
            <div className="bio-div">
                <article className="profile-container">
                    <div className="message">
                        <div className="message-header">
                            <div>
                                <p className="subtitle has-text-weight-bold profile-title"> Bio </p>
                            </div>
                            {action === 'read-write' && 
                                <div className="tabs">
                                    <ul>
                                        <li className="button" onClick={e => openModal(e)}>
                                            <span className="icon is-small"><i className="fas fa-edit" aria-hidden="true"></i></span>
                                            <span> Edit </span>
                                        </li>
                                    </ul>
                                </div>
                            }
                        </div>
                        <div className="message-body">
                            <div className="rows">
                                <div className="row">
                                    <div className="bio-details">
                                        <div className="columns is-mobile">
                                            <span className="column"> <i className="fas fa-user"></i> {user.firstname + " " + user.lastname} </span>
                                            <span className="column"> <i className="fas fa-map-marker-alt"></i> {user.location} </span>
                                            <span className="column"> <i className="fas fa-calendar-alt"></i> {birthday} </span>
                                        </div>
                                    </div> 
                                    <div className="follow-details">
                                        <div className="columns is-mobile">
                                            <span className="column"> <Link className="link-to-viewlist" to={`/view-user-list/${user.user_id}/following`}><strong> <i className="fas fa-address-book"> </i> Figures </strong></Link> {user.following} </span>
                                            <span className="column"> <Link className="link-to-viewlist" to={`/view-user-list/${user.user_id}/followers`}><strong> <i className="far fa-address-book"> </i> Followers </strong></Link> {user.followers}</span>
                                            <span className="column"> <Link className="link-to-viewlist" to={`/view-user-list/${user.user_id}/fraternity`}><strong> <i className="fas fa-id-card-alt"> </i> Fraternity </strong></Link> {user.linkages}  </span>
                                        </div>
                                    </div> 
                                    <div className="bio-details">
                                        <div className="columns is-mobile">
                                            <span className="column"> <i className="fas fa-heartbeat"></i> Heartbeat </span>
                                            <span className="column"> <i className="fas fa-house-user"></i> Family </span>
                                            <span className="column"> <Link className="link-to-viewlist" to={`/groups/${user.user_id}/${action === 'read-write' ? "your" : "another"}`}><strong> <i className="fas fa-users"></i> Groups</strong> </Link>{user.groups} </span>
                                        </div>
                                    </div> 
                                    <br/>
                                    <div className="self-description">
                                        <p> <em>{user.description}</em> </p>
                                    </div> 
                                </div>
                            </div>
                        </div>
                    </div>
                </article>
                <Modal 
                    isOpen={modalIsOpen}
                    onRequestClose={ e => closeModal(e)}
                    style={customStyles}>
                        <div className="hero">
                            <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                            <Bio responseMsg={responseMsg} setResponseMsg={setResponseMsg} func="edit"/>
                        </div>

                </Modal>
            </div>  
        }  
        </>
    )

}
export default withContext(ProfileBio);