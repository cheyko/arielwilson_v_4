import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import axios from 'axios';
import './index.css';

//import Bio from '../HelperComponents/Bio';
import ProfileBio from './ProfileBio';
import ProfileHeader from './ProfileHeader';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

// main difference between user profile and viewing other profiles is that user profile is editable
// while viewing other users profile is read only as well as viewing attributes(privacy)

const Profile = props => {
    
    const [myView, setMyView] = useState(null);

    //Rendered cv and dp urls that have been uploaded b4 however on handleupload set these to the newly uploaded files to be viewed before potentially saved
    const [imgView, setImgView] = useState(null);
    const [vidView, setVidView] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);
    const [showEdit, setShowEdit] = useState(false);

    //actual files that are uploaded
    const [cover, setCover] = useState(null);
    const [display, setDisplay] = useState(null);
    const [responseMsg, setResponseMsg] = useState("");

    useEffect(() => {
        window.scroll(0,0);
        if (!imgView && !vidView){
            loadMainMedia();
        }

        if (!myView){
            const result = props.context.getMyView().then(
                (result) => {
                    if (!result){
                        console.log("there was an error when search for my details");
                    }else{
                        setMyView(result);
                    }
                }
            );
        }
    },[myView,imgView,vidView]);

    const loadMainMedia = async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        const user_id = props.context.user ? props.context.user.id : 0;

        const response = await axios.post('/api/get-main-media',{user_id}).then(
            (response) => {
                if (response.status === 200){
                    if (response.data.has_cv === true){
                        setVidView(process.env.PUBLIC_URL + "/images/bio/cover/" + user_id);
                    }else{
                        setVidView(process.env.PUBLIC_URL + "/images/bio/cover/default.mp4");
                    }

                    if (response.data.has_dp === true){
                        setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + user_id);
                    }else{
                        setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
                    }
                    
                }
            }
        )
        return true;
    }

    const handleUpload = (e) => {
        const upload = [e.target.files];
        if(upload.length > 0){
            switch(e.target.name){
                case 'video-upload':
                    setCover(upload[0][0]);
                    setVidView(URL.createObjectURL(upload[0][0]));
                    break;
                case 'image-upload':
                    setDisplay(upload[0][0]);
                    setImgView(URL.createObjectURL(upload[0][0]));
                    break;
                default:
                    break;
            }
            return true;            
        }else{
            return false;
        }
        //in the future render a modal and display the newly uploaded file with an ok btn then
        // set imgView and/or vidView to newly uploaded files 
    }

    const saveUpload = async (e) => {
        e.preventDefault();
        setShowEdit(false);
        const user_id = props.context.user ? props.context.user.id : 0;
        const formData = new FormData();
        formData.append('user_id', user_id);
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

            const result = await axios.post('/api/main-media', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                maxContentLength: 100000000,
                maxBodyLength: 1000000000
            }).catch( (result => {
                if (result.status !== 200) { return { status: result.status, message: 'Not successful' } }
            }))

            if (result.status === 200){
                setResponseMsg("");
                setCover(null);
                setDisplay(null);
                //setImgView(null);
                //setVidView(null);
                //setShowEdit(true);
                /********* Refresh the Page ********/
            }else{
                setResponseMsg("Upload did not happen");
                return false;
            }
            //this is a test
            //setShowEdit(false);
            //loadMainMedia();
        }
        
        window.location.reload();
        //return true;
    }

    return (
        <div className="hero hero-container">
            <div className="card profile-box">
                
                <ProfileHeader showEdit={showEdit} setShowEdit={setShowEdit} handleUpload={handleUpload} saveUpload={saveUpload} showDropDown={showDropDown} setShowDropDown={setShowDropDown} user={myView} imgView={imgView} vidView={vidView} action="read-write"  />
                
                <Tabs>
                    <div className="card has-text-centered has-text-weight-bold">
                        <TabList>
                            <Tab>Bio & PRees</Tab>
                            <Tab>Professional</Tab>
                            <Tab>Portfolio</Tab>
                            <Tab>PreePedia</Tab>
                            <Tab>PRee Reactions</Tab>
                        </TabList>
                    </div>
                    <TabPanel>
                        <ProfileBio user={myView} action="read-write" />

                        <hr />
                        
                        <div className="multimedia-div">
                            <article className="profile-container">
                                <div className="message">
                                    <div className="message-header">
                                        <div className="has-text-centered">
                                            <p className="subtitle has-text-weight-bold profile-title"> {myView ? "@"+myView.username : ""} Prees </p>
                                        </div>
                                        <div className="tabs is-boxed">
                                            <ul>
                                                <li className="button">
                                                <span>
                                                    <span className="icon is-small"><i className="fas fa-upload" aria-hidden="true"></i></span>
                                                    <span>All</span>
                                                </span>
                                                </li>

                                                <li className="button is-active">
                                                <span>
                                                    <span className="icon is-small"><i className="far fa-images" aria-hidden="true"></i></span>
                                                    <span>Magazine</span>
                                                </span>
                                                </li>
                                                
                                                <li className="button">
                                                <span>
                                                    <span className="icon is-small"><i className="fas fa-play-circle" aria-hidden="true"></i></span>
                                                    <span>AV</span>
                                                </span>
                                                </li>
                                            
                                            </ul>
                                        </div>
                                            
                                    </div>
                                    
                                    <div className="message-body">
                                        <h1>Content</h1>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="professional-div">
                            <article className="profile-container">
                                <div className="message">
                                    <div className="message-header">
                                        <div className="tabs">
                                            <ul>
        
                                                <li className="button">
                                                    <span className="icon is-small"><i className="fas fa-search" aria-hidden="true"></i></span>
                                                    <span>Search</span>
                                                </li>

                                                <li className="button">
                                                    <span className="icon is-small"><i className="fas fa-edit" aria-hidden="true"></i></span>
                                                    <span>Edit</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="message-body">
                                        <h1> List </h1>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </TabPanel>
                    <TabPanel>                            
                        <div className="portfolio-div">
                            <article className="profile-container">
                                <div className="message">
                                    <div className="message-header">
                                        <div className="tabs is-boxed">
                                            <ul>
                                                <li className="button is-active">
                                                <span>
                                                    <span className="icon is-small"><i className="fas fa-briefcase" aria-hidden="true"></i></span>
                                                    <span>Business</span>
                                                </span>
                                                </li>

                                                <li className="button">
                                                <span>
                                                    <span className="icon is-small"><i className="fas fa-link" aria-hidden="true"></i></span>
                                                    <span>Website</span>
                                                </span>
                                                </li>

                                                <li className="button">
                                                <span>
                                                    <span className="icon is-small"><i className="far fa-file-alt" aria-hidden="true"></i></span>
                                                    <span>Documents</span>
                                                </span>
                                                </li>

                                                <li className="button">
                                                    <span className="icon is-small"><i className="fas fa-edit" aria-hidden="true"></i></span>
                                                    <span>Edit</span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="message-body">
                                        {true && 
                                            <div className="product-div">
                                                <h1> Product Shops </h1> 
                                            </div>
                                        }
                                        {true &&
                                            <div className="service-div">
                                                <h1> Service Shops </h1> 
                                            </div>
                                        }
                                    </div>
                                </div>
                            </article>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="preepedia-div">
                            <article className="profile-container">
                                <div className="message">
                                    <div className="message-header">
                                        <div className="tabs is-boxed">
                                            <ul>
                                                <li className="button is-active">
                                                    <span>
                                                        <span className="icon is-small"><i className="fas fa-file-invoice" aria-hidden="true"></i></span>
                                                        <span> Publications </span>
                                                    </span>
                                                </li>
                                                
                                                <li className="button">
                                                    <span>
                                                        <span className="icon is-small"><i className="fas fa-pencil-alt" aria-hidden="true"></i></span>
                                                        <span>Contributions</span>
                                                    </span>
                                                </li>
                                                <li className="button">
                                                    <span>
                                                        <span className="icon is-small"><i className="fas fa-edit" aria-hidden="true"></i></span>
                                                        <span>Edit</span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="message-body">
                                        <div className="publications-div">
                                            <h1> Publications </h1> 
                                        </div>
                                        <div className="contributions-div">
                                            <h1> Contributions </h1> 
                                        </div>
                                    </div>
                                </div>
                            </article>
                        </div>
                    </TabPanel>
                    <TabPanel>
                        <div className="reactions-div">
                            <article className="profile-container">
                                <div className="message">
                                    <div className="message-header">
                                        <div className="tabs is-boxed">
                                            <ul>
                                                <li className="button">
                                                    <span>
                                                        <span className="icon is-small"><i className="far fa-comments" aria-hidden="true"></i></span>
                                                        <span> Comments </span>
                                                    </span>
                                                </li>

                                                <li className="button is-active">
                                                    <span>
                                                        <span className="icon is-small"><i className="fas fa-heart" aria-hidden="true"></i></span>
                                                        <span> Approvals </span>
                                                    </span>
                                                </li>

                                                <li className="button">
                                                    <span>
                                                        <span className="icon is-small"><i className="fas fa-heart-broken" aria-hidden="true"></i></span>
                                                        <span> Disapprovals </span>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    
                                    <div className="message-body">
                                        <h1>Reactions</h1>
                                    </div>
                                </div>
                            </article>
                        </div>      
                    </TabPanel>
                    <br/>
                </Tabs>
            </div>
        </div>
    )
}

export default withContext(Profile);