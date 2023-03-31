import React, { useEffect, useState } from "react";
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
    let list = props.context.userlist;
    const [viewlist, setViewList] = useState(null);
    let navigate = useNavigate();

    useEffect( () => {
        const user_id  = id;
        if (viewlist === null){
            switch(action){
                case 'search':
                    setViewList(list);
                    break;
                case 'followers':
                    axios.post('/api/get-followers',{user_id}).then(
                        (result1) => {
                            if (result1.status !== 200){
                                console.log('List of Followers were not sent from server.');
                            }else{
                                setViewList(result1.data.followerslist);
                            }
                        }
                    )
                    break;
                case 'figures': //change function to get-figures
                    axios.post('/api/get-figures',{user_id}).then(
                        (result2) => {
                            if (result2.status !== 200){
                                throw new Error('List of Followings were not sent from server.');
                            }else{
                                setViewList(result2.data.figureslist);
                            }
                        }
                    )
                    break;
                case 'fraternity':
                    axios.post('/api/get-fraternity',{user_id}).then(
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
    },[viewlist, action, id, list])


    console.log(viewlist);

    return (
        <div className="hero">
            <div className="hero-container has-text-centered">
                <div className="is-pulled-left">
                    <button className="button is-fixed is-info" style={{zIndex:"3"}} onClick={e => navigate(-1) }> <i className="fas fa-arrow-circle-left"></i> </button>
                
                </div>
                            
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
