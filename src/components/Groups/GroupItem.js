import React, {useCallback, useEffect, useState} from "react";
import './index.css'
import axios from 'axios';
import withContext from '../../withContext';
import {Link} from "react-router-dom";

const GroupItem = props => {

    const {group} = props;
    const group_id = group.group_id

    const user_id = props.context.user ? props.context.user.id : 0;
    
    const [inGroup, setInGroup] = useState(null);
    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);

    const loadMainMedia = useCallback( async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video

        await axios.post('/api/get-group-media',{group_id}).then(
            (response) => {
                if (response.status !== 200){
                    throw new Error("Response Status was not ok.")
                }else{
                    if (response.data.has_dp === true){
                        setImgView(process.env.PUBLIC_URL + "/group/display/" + group_id);
                    }else{
                        setImgView(process.env.PUBLIC_URL + "/group/display/default.jpeg");
                    }
                    setGetMedia(true);
                }
            }
        );

        return true;
    },[group_id]);
    
    useEffect( () => {
        // call function is-follower
        if (!inGroup){
            const result = axios.post('/api/in-group',{user_id,group_id}).then(
                (result) => {
                    if (result.status !== 200){
                        throw new Error("Response Status was not ok.");
                    }
                }
            );
            if (result.status === 200){
                setInGroup(result.data.in_group);
            }
        }
        if (!gotMedia){
            loadMainMedia();
        }
    },[inGroup,gotMedia, user_id, group_id, loadMainMedia]); 



    const join = () => {
        console.log("join function");
        const dojoin = axios.post('/api/join-group',{user_id,group_id}).then(
            (dojoin) => {
                if (dojoin.status !== 200){
                    throw new Error("Response Status was not ok.");
                }
            }
        );
        if (dojoin.status === 200){
            setInGroup(dojoin.data.in_group);
        }
    }

    const leaveGroup = () => {
        console.log("leave group function");
        const unjoin = axios.put('/api/un-join',{user_id,group_id}).then(
            (unjoin) => {
                if (unjoin.status !== 200){
                    throw new Error("Response Status was not ok.")
                }
            }
        );
        if (unjoin.status === 200){
            setInGroup(unjoin.data.in_group);
        }
        //isFollower(false);
    }

    //console.log(isFollower);
    // have onclick functions for add-follower and unfollow

    return (
        <>
            <div className="card view-user-card">
                <div className="card-content" style={{padding:"0.5rem"}}>
                    <Link className="group-item" to={`/view-group/${group.group_id}`}>
                        <div className="media">
                            <div className="media-left">
                                <figure className="display-pic-small image is-64x64">
                                    <img src={imgView} alt="display" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{group.name} </p>
                                <p className="subtitle is-6">{group.tagline}</p>
                            </div>
                        </div>
                    </Link>
                    <div className="content">
                        <Link className="user-item" to={`/view-group/${group.group_id}`}>
                            <span> {group.description} </span>
                            <br />
                        </Link>
                        <div className="columns">
                            <div className="column"> <span> {group.category} </span> </div>
                            <div className="column"> <span> {group.members} <i className="fas fa-users"></i> </span> </div>
                            <div className="column"> <button onClick={ e => inGroup ? leaveGroup : join } className={`button is-rounded is-info is-small ${inGroup ? "is-outlined" : ""}`}> {inGroup ? "Leave" : "Join"} </button> </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default withContext(GroupItem);