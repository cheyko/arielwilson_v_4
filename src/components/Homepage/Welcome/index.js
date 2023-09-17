import React, { useCallback, useEffect, useState } from "react";
import withContext from "../../../withContext";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

import '../index.css';
//import { Steps, Step } from "react-step-builder";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";

const Welcome = props => {
    
    //accept username and check if username is available
    //then accept bio details or allow user to skip 
    //then if uname is true : login user 

    let navigate = useNavigate();
    //let new_id = localStorage.getItem("user_id");
    const token = props.context.token ? props.context.token : 0;
    const [uname, setUname] = useState("");
    const [val, setVal] = useState("");
    const [tagline, setTagline] = useState("");
    const [uploaded, setUploaded] = useState(false);

    //const [unameError, setUnameError] = useState("");
    //const [unameConfirm, setUnameConfirm] = useState("");
    //const [showNextBtn, setBtnShow] = useState(true);

    const [showStep1, setShowStep1] = useState(true);
    const [showStep2, setShowStep2] = useState(false);
    const [showStep3, setShowStep3] = useState(false);

    const [responseMsg, setResponseMsg] = useState("");
    
    //create state to getmedia sand set state to false
    const [gotMedia, setGetMedia] = useState(false);
    
    //actual files that are uploaded
    const [cover, setCover] = useState(null);
    const [display, setDisplay] = useState(null);

    //Rendered cv and dp urls that have been uploaded b4 however on handleupload set these to the newly uploaded files to be viewed before potentially saved
    const [imgView, setImgView] = useState(null);
    const [vidView, setVidView] = useState(null);

    const hasUname = useCallback( async () => {
        //e.preventDefault();
        //setVal(null);
        
        //const user_id = props.context.user_id ? props.context.user_id : new_id;
        //console.log(user_id);
        const response = await axios.post('/api/has-uname',{token}).catch(
            (response) => {
                if (response.status !== 200) { 
                    return { status: response.status, message: 'Api call was not successful' } 
                }
            }
        )
        //console.log(response);
        if(response.status === 200 && response.data.uname){
            setVal(response.data.uname);
            setUname(response.data.uname);
            //setResponseMsg("Username is : ");
            setShowStep1(false);
            setShowStep2(true);
            return true;
        } 
        //setUname(response.data.uname);
        return false;
    }, [token] );


    const checkUname = async (e) => {
        setResponseMsg("");
        e.preventDefault();
        let userInput = e.target.value;

        if (userInput !== ""){
            await axios.post(`${process.env.REACT_APP_PROXY}/api/check-uname`,{userInput}).then(
                (response) => {
                    if (response.status === 200){
                        setUname(userInput);
                        setResponseMsg("Username available");
                        document.getElementById("save-btn").disabled = false;
                    }else{
                        setResponseMsg("Username not available");
                        document.getElementById("save-btn").disabled = true;
                        //setUname("");
                    }
                }
            )
        }else{
            document.getElementById("save-btn").disabled = true;
            setResponseMsg("Enter your prefered choice for username, this will be unique to your account solely.");
        }
        return true;
    }

    const saveUname = async (e) => {
        e.preventDefault();
        //allow user to save username to database
        //do axios put request to update the username of the user
        //const user_id = props.context.user_id ? props.context.user_id : new_id;
        await axios.put(`${process.env.REACT_APP_PROXY}/api/save-uname`,{token,uname}).then(
            (response) => {
                if (response.status === 200){
                    //change some bool to true to display the next button
                    //setBtnShow(true);
                    setResponseMsg("Username was added successfully and your new username is : " + uname);  
                    setVal(uname);
                    document.getElementById("next-btn").style.display = "block";
                    //clear input box and display success message
                    //setUname("");

                }else{
                    setResponseMsg("Username was not saved, please try again. Contact us for suppport if problem persist.");
                }
            }
        )
        //create profile record with just user_id
        return true;
    }

    const loadMainMedia = useCallback( async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        //const user_id = props.context.user_id ? props.context.user_id : new_id;
        //console.log(user_id);
        await axios.post(`${process.env.REACT_APP_PROXY}/api/get-main-media`,{token}).then(
            (response) => {
                if (response.status === 200){
                    if (response.data.has_cv === true){
                        setVidView(process.env.PUBLIC_URL + "/images/bio/cover/" + response.data.user_id +".mp4");
                    }else{
                        setVidView(process.env.PUBLIC_URL + "/images/bio/cover/default.mp4");
                    }

                    if (response.data.has_dp === true){
                        setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + response.data.user_id + ".jpeg");
                    }else{
                        setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
                    }
                    
                }
            }
        )
        return true;
    },[token]);

    const handleUpload = (e) => {
        const upload = Array.from(e.target.files);
        if (upload.length === 1) {
            switch(e.target.name){
                case 'video-upload':
                    setCover(upload[0]);
                    setVidView(URL.createObjectURL(upload[0]));
                    break;
                case 'image-upload':
                    setDisplay(upload[0]);
                    setImgView(URL.createObjectURL(upload[0]));
                    break;
                default:
                    break;
            }
        }else{
            setResponseMsg(String.format('{0} {1}',"Please upload only one (1) file for",e.target.name));
        }
        //console.log(vidView);
        setResponseMsg("");
        return true;
        //in the future render a modal and display the newly uploaded file with an ok btn then
        // set imgView and/or vidView to newly uploaded files 
    }

    const saveUpload = async (e) => {
        //const user_id = props.context.user_id ? props.context.user_id : new_id;
        e.preventDefault();
        const formData = new FormData();
        formData.append('token', token);
        formData.set('has_cover',false);
        formData.set('has_display',false);

        if (cover !== null){ 
            formData.set('has_cover',true); 
            formData.set('cover',cover);
        }
        if (display !== null) { 
            formData.set('has_display',true);
            formData.set('display',display);
        }
        
        if (cover || display){

            const result = await axios.post(`${process.env.REACT_APP_PROXY}/api/main-media`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                maxContentLength: 100000000,
                maxBodyLength: 1000000000
            }).catch( (result => {
                if (result.status !== 200) { 
                    return { status: result.status, message: 'Not successful' } 
                }
            }));

            if (result.status === 200){
                setResponseMsg("Media Saved.");
                //setCover(null);
                //setDisplay(null);
                setUploaded(true);
                return false;
            }else{
                setResponseMsg("Upload did not happen");
                return false;
            }
            //setShowStep1(false);
            //setShowStep2(false);
            //setShowStep3(true);
            //this is a test
            //loadMainMedia();
        }
        if (!cover || !display){
            setResponseMsg("No new media to upload");
            return false;
        }
        console.log("test4");
    }

    const endWelcome = () => {
        props.context.clearCred(uname);  
    }

    const next = (e,num) => {
        e.preventDefault();
        switch(num){
            case 1:
                setShowStep1(false);
                setShowStep2(true);
                break;
            case 2:
                setShowStep2(false);;
                setGetMedia(true);
                setShowStep3(true);
                break;
            default:
                break;
        }
        setResponseMsg("");
        return true;
    }

    const prev = (e,num) => {
        e.preventDefault();
        switch(num){
            case 2:
                setShowStep2(false);
                setShowStep1(true);
                break;
            case 3:
                setShowStep3(false);
                setShowStep2(true);
                break;
            default:
                break;
        }
        setResponseMsg("");
        return true;
    }

    const logout = e => {
        props.context.clearCred();
        props.context.logout(e).then((res) => {
            if (res === true){
                navigate("/home");
            }
        });
    }

    useEffect( () => {
        if ((val === "") && (uname === "")){
            document.getElementById("save-btn").disabled = true;
            hasUname();
            axios.post(`${process.env.REACT_APP_PROXY}/api/get-bio`,{token}).then(
                (response) => {
                    if (response.status === 200){
                        setShowStep2(false);
                        setShowStep3(true);
                    }
                }
            ).catch( error => {
                console.log(error);
            });
        }
        if (!gotMedia && showStep3){
            loadMainMedia();
        }
    },[val, uname, showStep3, token, gotMedia, hasUname, loadMainMedia]);

    return (
        <div className="hero-contain">
                <div className="box logout">
                    <button className="button is-dark" onClick={e => logout(e)}>Logout</button>
                </div>
                <h1 className="title"> Welcome to WAAPP </h1>
                <h3 className="subtitle"> You can now experience all the world has to offer. </h3>

                {showStep1 && <Step1 next={next} uname={uname} checkUname={checkUname} saveUname={saveUname} responseMsg={responseMsg} val={val}/> }
                
                {showStep2 && <Step2 prev={prev} next={next} setTagline={setTagline} responseMsg={responseMsg} setResponseMsg={setResponseMsg} /> }
                
                {showStep3 && <Step3 uploaded={uploaded} prev={prev} uname={uname} tagline={tagline} saveUpload={saveUpload} endWelcome={endWelcome} handleUpload={handleUpload} imgView={imgView} vidView={vidView} responseMsg={responseMsg} /> }
        </div>
    );
}
export default withContext(Welcome);