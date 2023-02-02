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
    let {id} = useParams();

    const [userview, setUserview] = useState(null);
    const [showDropDown, setShowDropDown] = useState(false);


    //Rendered cv and dp urls that have been uploaded b4 however on handleupload set these to the newly uploaded files to be viewed before potentially saved
    const [imgView, setImgView] = useState(null);
    const [vidView, setVidView] = useState(null);

    const [isFollower, setIsFollower] = useState(null);
    const user_id = props.context.user ? props.context.user.id : 0;
    const loadMainMedia = useCallback( async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        const user_id = id;

        await axios.post('/api/get-main-media',{user_id}).then(
            (response) => {
                if (response.status === 200){
                    if (response.data.has_cv === true){
                        setVidView(process.env.PUBLIC_URL + "/bio/cover/" + user_id);
                    }else{
                        setVidView(process.env.PUBLIC_URL + "/bio/cover/default.mp4");
                    }

                    if (response.data.has_dp === true){
                        setImgView(process.env.PUBLIC_URL + "/bio/display/" + user_id);
                    }else{
                        setImgView(process.env.PUBLIC_URL + "/bio/display/default.jpeg");
                    }
                    
                }
            }
        )
        return true;
    },[id]);


    useEffect( () => {
        if (!imgView && !vidView){
            loadMainMedia();
        }

        if (!userview){
            props.context.getUserView(id).then(
                (result) => {
                    if (!result){
                        console.log("there was an error when search for my details");
                    }else{
                        setUserview(result);
                    }
                }
            );
        }

        if (!isFollower){
            axios.post('/api/is-follower',{user_id,id}).then(
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
    },[imgView, vidView,userview, id, user_id, isFollower, loadMainMedia, props.context]);
    
    // have onclick functions for add-follower and unfollow
    
    const follow = () => {
        console.log("follow function");
        axios.post('/api/add-follower',{user_id,id}).then(
            (dofollow) => {
                if (dofollow.status !== 200){
                    console.log('User was followed successful.');
                }else{
                    setIsFollower(dofollow.data.is_follower);
                }
            }
        );
        //isFollower(true);
    }

    const unfollow = () => {
        console.log("unfollow function");
        axios.put('/api/un-follow',{user_id,id}).then(
            (unfollow) => {
                if (unfollow.status !== 200){
                    throw new Error('User was unfollowed succesfully.');
                }else{
                    setIsFollower(unfollow.data.is_follower);
                }
            }
        );
        //isFollower(false);
    }

    return (`${user_id}` === `${id}`) ? (
        <Navigate to="/profile" />
    ):(  
        <div className="hero">
            <div className="hero-body">
                
                <div className="hero-body box userview-profile-box" style={{width:"90%",margin:"0 auto"}}>
                 
                    <button className="button return-btn is-info" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                 
                    <ProfileHeader showDropDown={showDropDown} setShowDropDown={setShowDropDown} isFollower={isFollower} follow={follow} unfollow={unfollow} user={userview} imgView={imgView} vidView={vidView} action="read" />
                    
                    <br />

                    <Tabs>
                        <TabList>
                            <Tab>Bio & PRees</Tab>
                            <Tab>Professional</Tab>
                            <Tab>Portfolio</Tab>
                            <Tab>PreePedia</Tab>
                            <Tab>PRee Reactions</Tab>
                        </TabList>
                        <TabPanel>
                            <ProfileBio user={userview} action="read"/>

                            <hr />
                            
                            <div className="multimedia-div">
                                <article className="profile-container">
                                    <div className="message">
                                        <div className="message-header">
                                            <div className="has-text-centered">
                                                <p className="subtitle has-text-weight-bold profile-title"> {userview ? "@"+userview.username : ""} Prees </p>
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
                        <br/>
                    </Tabs>
            
                    
                      
                </div>
            </div>
        </div>
    )
}

export default withContext(ViewUserProfile);