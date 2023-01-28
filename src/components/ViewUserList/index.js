import React, { useState } from "react";
import './index.css';
import withContext from '../../withContext';
import axios from 'axios';
import ViewUser from '../ViewUser';
import { useNavigate } from "react-router-dom";

// pass list of ID's as props and have function to get full userlist
// let id of 0 represent search 
// action options = [search, followers, following]
// route = /view-user-list/:id/:action
// example = /view-user-list/0/search ... /view-user-list/3/followers
// add back arrow in the future. 

const ViewUserList = props => {

    const user_id = props.match.params.id;
    const option = props.match.params.action;
    const [viewlist, setViewList] = useState(null);
    let navigate = useNavigate();

    if (viewlist === null){
        switch(option){
            case 'search':
                setViewList(props.context.userlist);
                break;
            case 'followers':
                const result1 = axios.post('/api/get-followers',{user_id}).then(
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
                const result2 = axios.post('/api/get-followings',{user_id}).then(
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
                const result3 = axios.post('/api/get-fraternity',{user_id}).then(
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
                            
                <h1 className="title">{option}</h1>
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
