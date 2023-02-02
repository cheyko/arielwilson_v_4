import React, { useState } from "react";
import './index.css';
import withContext from '../../withContext';
import axios from 'axios';
import ViewUser from '../ViewUser';
import { useNavigate, useParams } from "react-router-dom";

// pass list of ID's as props and have function to get full userlist
// let id of 0 represent search 
// action actions = [search, followers, following]
// route = /view-user-list/:id/:action
// example = /view-user-list/0/search ... /view-user-list/3/followers
// add back arrow in the future. 

const ViewUserList = props => {

    let {id} = useParams();
    let {action} = useParams();
    const [viewlist, setViewList] = useState(null);
    let navigate = useNavigate();

    if (viewlist === null){
        switch(action){
            case 'search':
                setViewList(props.context.userlist);
                break;
            case 'followers':
                axios.post('/api/get-followers',{id}).then(
                    (result1) => {
                        if (result1.status !== 200){
                            console.log('List of Followers were not sent from server.');
                        }else{
                            setViewList(result1.data.followerslist);
                        }
                    }
                )
                break;
            case 'following':
                axios.post('/api/get-followings',{id}).then(
                    (result2) => {
                        if (result2.status !== 200){
                            throw new Error('List of Followings were not sent from server.');
                        }else{
                            setViewList(result2.data.followingslist);
                        }
                    }
                )
                break;
            case 'fraternity':
                axios.post('/api/get-fraternity',{id}).then(
                    (result3) => {
                        if (result3.status !== 200){
                            throw new Error('List of Fraternity were not sent from server.');
                        }else{
                            setViewList(result3.data.fraternitylist);
                        }
                    }
                )
                break;
            default:
                break;
        }
    }

    console.log(viewlist);

    console.log(viewlist ? viewlist.length > 0 : null);

    return (
        <div className="hero">
            <div className="hero-body has-text-centered">
                <button className="button is-pulled-left is-info" onClick={e => navigate(-1) }> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                            
                <h1 className="title">{action}</h1>
                <div className="columns is-multiline is-mobile">
                    { viewlist && viewlist.length > 0 ? (
                        viewlist.map((aUser, index) => (
                            <div className="column" key={index}>
                                <ViewUser 
                                    key={index}
                                    user={aUser}
                                />
                            </div>
                        ))
                    ):(
                        <div className="container">
                            <span className="title has-text-grey-light"> No Users to be viewed </span>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
export default withContext(ViewUserList);
