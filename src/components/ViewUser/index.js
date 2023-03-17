import React, { useEffect, useState} from "react";
import './index.css'
import axios from 'axios';
import withContext from '../../withContext';
import {Link} from "react-router-dom";
import EncourageModal from "../HelperComponents/EncourageModal";

const ViewUser = props => {

    const {user} = props;
    const userview_id = user.user_id;

    const user_id = props.context.user ? props.context.user.id : 0;
    
    const [isFollower, setIsFollower] = useState(null);
    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [wanted, setWanted] = useState("");

    const loadMainMedia = () => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        //const user_id = userview_id;

        if (user.has_dp === true){
            setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + userview_id);
        }else{
            setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
        }
        setGetMedia(true);
        return true;
    }

    useEffect( () => {
        // call function is-follower
        if (isFollower === null){
            setIsFollower(user.is_follower);
        }
        if (!gotMedia){
            loadMainMedia();
        }
    },[gotMedia, isFollower, loadMainMedia]); 

    const follow = () => {
        console.log("follow function");
        if (props.context.user){
            axios.post('/api/add-follower',{user_id,userview_id}).then(
                (dofollow) => {
                    if (dofollow.status !== 200){
                        console.log('User was followed successful.');
                    }else{
                        setIsFollower(dofollow.data.is_follower);
                    }
                }
            );
        }else{
            setWanted("follow Users so you can keep up with their prees on your timeline.");
            setModalOpen(true);
        }
        //isFollower(true);
    }

    const unfollow = () => {
        console.log("unfollow function");
        axios.put('/api/un-follow',{user_id,userview_id}).then(
            (unfollow) => {
                if (unfollow.status !== 200){
                    console.log('User was unfollowed succesfully.');
                }else{
                    setIsFollower(unfollow.data.is_follower);
                }
            }
        );
        //isFollower(false);
    }

    //console.log(isFollower);
    // have onclick functions for add-follower and unfollow

    return (
        <>
            <EncourageModal wanted={wanted}  modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
            <div className="card view-user-card">
                <div className="card-content" style={{padding:"0.5rem"}}>
                    <Link className="user-item" to={`/view-user-profile/${user.user_id}`}>
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-64x64">
                                    <img className="is-rounded" src={imgView} alt="display" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{user.firstname + " " + user.lastname} </p>
                                <p className="subtitle is-6">@{user.username}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="content">
                        <Link className="user-item has-text-centered" to={`/view-user-profile/${user.user_id}`}>
                            <span> #{user.tagline} </span>
                            <br />
                        </Link>
                        <div className="columns is-mobile">
                            <Link className="user-item column" to={`/view-user-profile/${user.user_id}`}>
                                 <span> {user.location} </span> 
                            </Link>
                            <div className="column is-one-third"> <button onClick={isFollower ? unfollow : follow } className={`button is-rounded is-info is-small ${isFollower ? "is-outlined" : ""}`}> {isFollower ? "Unfollow" : "Follow"} </button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default withContext(ViewUser);