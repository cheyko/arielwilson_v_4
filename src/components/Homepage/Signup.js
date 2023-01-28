import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import Modal from "react-modal";
import axios from "axios";
//import {useHistory} from "react-router-dom";
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

const Signup = props => {
    //let history = useHistory();

    const [firstname, setFname] = useState("");
    const [lastname, setLname] = useState("");
    const [email, setEmail] = useState("");
    const [gender, setGender] = useState("");
    const [password, setPassword] = useState("");
    const [phonenumber, setPhone] = useState("");
    const [re_password, setRePassword] = useState("");
    const [error, setError] = useState("");
    const [check, setCheck] = useState(null);
    //const [] = useState();

    useEffect( () => {
        if (email !== ""){
            axios.post('/api/check-email', {email}).then( response => {
                if (response.status === 200){
                    console.log("2");
                    setCheck(true);
                    setError("Email available.");
                    return true;
                    
                }else{
                    console.log("3");
                    setCheck(false);
                    setError("Email already registered.");
                    return false;
                }
            }).catch(error => {
                console.log(error)
            });
        }

    },[firstname,check,lastname,email,gender,password,phonenumber,re_password,error]);

    const [modalIsOpen, setModalOpen] = useState(false);

    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setModalOpen(false);
        clearModal();
    }

    const clearModal = () => {
        setFname("");
        setLname("");
        setGender("");
        setEmail("");
        setPassword("");
        setPhone("");
        setRePassword("");
    }

    function handleChange(e){
        if(e.target.name === "firstname"){ setFname(e.target.value); }
        else if(e.target.name === "lastname"){ setLname(e.target.value); }
        else if(e.target.name === "gender"){ setGender(e.target.value); }
        else if(e.target.name === "email"){ setEmail(e.target.value); }
        else if(e.target.name === "password"){ setPassword(e.target.value); }
        else if(e.target.name === "phonenumber"){ setPhone(e.target.value); }
        else if(e.target.name === "re_password"){ setRePassword(e.target.value); }
        
        setError("");
    }

    const checkEmail = (email) => {
        console.log("1");

    }

    const signUp = e => {
        e.preventDefault();
        //const {firstname,lastname,email,password, re_password, phonenumber} = this.state;
        setError("");
        if (!firstname || !lastname || !gender || !email || !password || !phonenumber || !re_password){
            setError("Fill all Fields !");
            setCheck(false);
        }

        if (password !== re_password){
            setError("Passwords Do not match.");
            setCheck(false);
        }
 
        if (check === true){
            console.log("5");
            props.context.signUp(firstname,lastname,gender,email,password,phonenumber).then(
            (res) => {
                if (res === true){
                    //call some context function that setState email and password. 
                    //redirect to welcome page.
                    //If neccessary clear these email and password states after welcome process is finished.
                    
                    props.context.welcomeFunc(email,password);
                    setModalOpen(false);
                    return true;
                }else{
                    setModalOpen(true);
                    setError("There was some issue signing up.");
                    return false;
                }

            });
        }
    }

    return(
        <div className="has-text-centered">
            <small style={{color:"yellow",fontWeight:"bold"}}>Sign-Up Today, Create an Attaché and Experience <b>W@H GW@@N</b>.</small>
            <button className="button is-link is-fullwidth signup-btn" onClick={e => openModal(e)}>   
                <span>Create an Attaché</span>
            </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                    
                <div className="hero" style={{width:"100%",backgroundColor:"burlywood"}}>
                    <form className="modal-form">
                        <h1 className="title has-text-centered" style={{color:"crimson"}}> W@H GW@@N ENROLMENT </h1>
                        <span className="modal-heading"> 
                            Register and Experience all the World has to offer. Once you have 
                            created your <span className="define"> Attaché </span> ; then you will 
                            have a Profile, a Wallet and a Direct messaging system with tête-à-tête & Group Convos. 
                            Post <span className="define"> Prees </span> to your timeline, View All the Prees of the World and Indulge in 
                            <span className="define"> Exclusive Prees </span> from the World's Finest. 
                            Do Business in a <span className="define">Grand Market</span> Space. Watch and Share live experiences.
                            Get Reports on All the News, Sports, Weather, Entertainment, etc. <span className="define">Never Miss A Beat</span>. 
                            This platform was made specially for you.
                        </span>
                        <hr />
                        <div className="columns is-mobile has-text-left">
                            <div className="column">
                                <div className="field">
                                    <label className="label">Firstname: </label>
                                    <input
                                    className="input"
                                    type="text"
                                    name="firstname"
                                    value={firstname}
                                    onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Lastname: </label>
                                    <input
                                    className="input"
                                    type="text"
                                    name="lastname"
                                    value={lastname}
                                    onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Gender: </label>
                                    <span><input
                                    className="radio"
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    onChange={e => handleChange(e)}
                                    /> Male </span>
                                    <span><input
                                    className="radio"
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    onChange={e => handleChange(e)}
                                    /> Female </span>
                                </div>
                                <div className="field">
                                    <label className="label">Phone Number: </label>
                                    <input
                                    className="input"
                                    type="tel"
                                    name="phonenumber"
                                    value={phonenumber}
                                    onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Email: </label>
                                    <input
                                    className="input"
                                    type="email"
                                    name="email"
                                    value={email}
                                    onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Password: </label>
                                    <input
                                    className="input"
                                    type="password"
                                    name="password"
                                    value={password}
                                    onChange={e => handleChange(e)}
                                    />
                                </div>
                                <div className="field">
                                    <label className="label">Re-Type Password: </label>
                                    <input
                                    className="input"
                                    type="password"
                                    name="re_password"
                                    value={re_password}
                                    onChange={e => handleChange(e)}
                                    />
                                </div>
                                {error && (
                                    <div className="has-text-danger">{error}</div>
                                )}
                                <div className="field is-clearfix">
                                    <button onClick={e => signUp(e)} className="button is-primary is-pulled-right">
                                        Submit
                                    </button>
                                    <button style={{float:'right'}} className="button is-danger is-pulled-left" onClick={e => closeModal(e)}>
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                
                    <div style={{width:"100%"}} className="modal-footer container">
                        <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    </div>
                </div>
            </Modal>
            
        </div>
    )
}

export default withContext(Signup);