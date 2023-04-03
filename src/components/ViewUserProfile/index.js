import React, { useCallback, useEffect, useState } from "react";
import withContext from "../../withContext";
import axios from 'axios';
import { Navigate, useParams } from "react-router-dom";

import ProfileBio from '../Profile/ProfileBio';
import ProfileHeader from '../Profile/ProfileHeader';
import { useNavigate } from "react-router-dom";
import "./index.css";

import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const ViewUserProfile = props => {

    let navigate = useNavigate();

    //let userview = localStorage.getItem("userview");
    let {uname} = useParams();

    const [userview, setUserview] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);


    //Rendered cv and dp urls that have been uploaded b4 however on handleupload set these to the newly uploaded files to be viewed before potentially saved
    const [imgView, setImgView] = useState(null);
    const [vidView, setVidView] = useState(null);

    const [isFollower, setIsFollower] = useState(null);
    //const user_id = props.context.user ? props.context.user.id : 0;
    const token = props.context.token ? props.context.token : 0;
    const myuname = props.context.user ? props.context.user.username : "";
    const loadMainMedia = useCallback( async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video

        await axios.post(`${process.env.REACT_APP_PROXY}/api/get-user-media`,{uname}).then(
            (response) => {
                if (response.status === 200){
                    if (response.data.has_cv === true){
                        setVidView(process.env.PUBLIC_URL + "/images/bio/cover/" + response.data.user_id + ".mp4");
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
    },[uname]);


    useEffect( () => {
        if (!imgView && !vidView){
            loadMainMedia();
        }

        if (!userview){
            props.context.getUserView(uname).then(
                (result) => {
                    if (!result){
                        console.log("there was an error when search for my details");
                    }else{
                        setUserview(result);
                    }
                }
            );
        }

        if (isFollower === null){
            axios.post(`${process.env.REACT_APP_PROXY}/api/is-follower`,{token,uname}).then(
                (response) => {
                    if (response.status !== 200){
                        console.log('I need a better error messaging system');
                    }else{
                        setIsFollower(response.data.is_follower);
                    }
                    //console.log("test");
                }
            );
        }
    },[imgView, vidView,userview, uname, token, isFollower, loadMainMedia, props.context]);
    
    // have onclick functions for add-follower and unfollow
    
    const follow = () => {
        axios.post(`${process.env.REACT_APP_PROXY}/api/add-follower`,{token,uname}).then(
            (dofollow) => {
                if (dofollow.status !== 200){
                    console.log('User was followed successful.');
                }else{
                    setIsFollower(dofollow.data.is_follower);
                    setUserview(null);
                }
            }
        );
    }

    const unfollow = () => {
        axios.put(`${process.env.REACT_APP_PROXY}/api/un-follow`,{token,uname}).then(
            (unfollow) => {
                if (unfollow.status !== 200){
                    throw new Error('User was unfollowed succesfully.');
                }else{
                    setIsFollower(unfollow.data.is_follower);
                    setUserview(null);
                }
            }
        );
    }

    return (`${myuname}` === `${uname}`) ? (
        <Navigate to="/profile" />
    ):(  
        <div className="hero hero-container">
            <div className="card profile-box">
                 <button className="button is-info" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                 
                 <ProfileHeader showDropDown={showDropDown} setShowDropDown={setShowDropDown} isFollower={isFollower} follow={follow} unfollow={unfollow} user={userview} imgView={imgView} vidView={vidView} action="read" />
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
                        <ProfileBio user={userview} action="read"/>

                        <hr />
                        
                        <div className="multimedia-div">
                            <article className="profile-container">
                                <div className="message">
                                    <div className="message-header">
                                        <div className="has-text-centered">
                                            <p className="subtitle has-text-weight-bold profile-title"> Prees </p>
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
                                        <div>
                                            <p className="subtitle has-text-weight-bold profile-title"> Portfolios</p>
                                        </div>
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
                                        <div>
                                            <p className="subtitle has-text-weight-bold profile-title"> Preepedia </p>
                                        </div>
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
                                        <div>
                                            <p className="subtitle has-text-weight-bold profile-title"> Pree Reactions </p>
                                        </div>
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
                    <br />
                </Tabs>
            </div>
            
        </div>
    )
}

export default withContext(ViewUserProfile);