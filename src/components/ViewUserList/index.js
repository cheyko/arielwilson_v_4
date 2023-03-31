import React, { useEffect, useReducer } from "react";
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

function reducer(state, action) {
    const user_id  = action.id;
    if (action.type === 'search') {
      return action.val;
    }else if(action.type === 'followers'){
        axios.post('/api/get-followers',{user_id}).then(
            (result1) => {
                if (result1.status !== 200){
                    console.log('List of Followers were not sent from server.');
                }else{
                    return (result1.data.followerslist);
                }
            }
        )
    }else if(action.type === 'figures'){
        axios.post('/api/get-figures',{user_id}).then(
            (result2) => {
                if (result2.status !== 200){
                    throw new Error('List of Followings were not sent from server.');
                }else{
                    return (result2.data.figureslist);
                }
            }
        )
    }else if(action.type === 'fraternity'){
        axios.post('/api/get-fraternity',{user_id}).then(
            (result3) => {
                if (result3.status !== 200){
                    throw new Error('List of Fraternity were not sent from server.');
                }else{
                    return (result3.data.fraternitylist);
                }
            }
        )
    }
    throw Error('Unknown action.');
  }

const ViewUserList = props => {

    let {id} = useParams();
    let {action} = useParams();
    const [viewlist, setViewList] = useReducer(reducer, null);
    //const [viewlist, setViewList] = useState(null);
    let navigate = useNavigate();

    useEffect( () => {
        if (viewlist === null){
            switch(action){
                case 'search':
                    setViewList({ type: 'search', val: props.context.userlist });
                    //setViewList(props.context.userlist);
                    break;
                case 'followers':
                    setViewList({ type: 'followers', id });
                    /*axios.post('/api/get-followers',{user_id}).then(
                        (result1) => {
                            if (result1.status !== 200){
                                console.log('List of Followers were not sent from server.');
                            }else{
                                setViewList(result1.data.followerslist);
                            }
                        }
                    )*/
                    break;
                case 'figures': //change function to get-figures
                    setViewList({ type: 'figures' , id});

                    /*axios.post('/api/get-figures',{user_id}).then(
                        (result2) => {
                            if (result2.status !== 200){
                                throw new Error('List of Followings were not sent from server.');
                            }else{
                                setViewList(result2.data.figureslist);
                            }
                        }
                    )*/
                    break;
                case 'fraternity':
                    setViewList({ type: 'fraternity', id });
                    /*axios.post('/api/get-fraternity',{user_id}).then(
                        (result3) => {
                            if (result3.status !== 200){
                                throw new Error('List of Fraternity were not sent from server.');
                            }else{
                                setViewList(result3.data.fraternitylist);
                            }
                        }
                    )*/
                    break;
                default:
                    break;
            }
        }
    },[viewlist, action, id, props.context.userlist])


    console.log(viewlist);

    console.log(viewlist ? viewlist.length > 0 : null);

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
