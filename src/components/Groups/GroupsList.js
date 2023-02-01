import React, { useState, useEffect, useCallback } from "react";
import './index.css';
import withContext from '../../withContext';
import axios from 'axios';
//import ViewGroup from './ViewGroup';
import GroupItem from "./GroupItem";

// pass list of ID's as props and have function to get full userlist
// let id of 0 represent search 
// action options = [search, followers, following]
// route = /view-user-list/:id/:action
// example = /view-user-list/0/search ... /view-user-list/3/followers
// add back arrow in the future. 

const GroupsList = props => {

    const user_id = props.user_id;
    const option = props.option;
    const [viewlist, setViewList] = useState(null);
    const categories = ["Art", "Applications & Software", "Automobiles",  "Baby", "Books", "Beauty & Cosmetics", "Electronics", "Fashion", "Financial","Food & Beverages", "Furniture", "General" ,"Health", "Household", "Kitchen", "Industrial", "Movies", "Outdoors", "Religion","Scientific", "Space" ,"Sports", "Tools", "Toys", "Travel"];
    const [filter, setFilter] = useState(true);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [view, setView] = useState(option);

    const getYourGroups = useCallback( () => {
        axios.post('/api/get-groups',{user_id}).then(
            (result1) => {
                if (result1.status !== 200){
                    console.log('List of Followers were not sent from server.');
                }else{
                    setViewList(result1.data.groupslist);
                }
            }
        )
    },[user_id]);

    const getAllGroups = () => {
        axios.get('/api/get-groups').then(
            (result2) => {
                if (result2.status !== 200){
                    throw new Error('List of Followings were not sent from server.');
                }else{
                    setViewList(result2.data.groupslist);
                }
            }
        )
    }
    const handleChangeView = event => {
        if(event.target.value === "all"){
            getAllGroups();
        }else{
            getYourGroups();
        }
    }

    const filterList = useCallback( () => {
        let result;
        if (filter){
            if(name === "" && category === "all"){
                if(view === "all"){
                    getAllGroups();
                }else{
                    getYourGroups();
                }
            }
            if (name !== ""){
                result = viewlist.filter(group => group.name.replace(/ /g,'').toLowerCase().includes(name.replace(/ /g,'').toLowerCase()));   
                setViewList(result);          
            }
            if (category && category !== "all"){
                result = viewlist.filter(group => group.category === category);
                setViewList(result); 
            }  
        }  
          
        //setOffset(0);
        setFilter(false);
    },[name, category,filter, getYourGroups, viewlist, view]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (viewlist === null){
            switch(view){
                case 'another':
                case 'your':
                    getYourGroups();
                    break;
                case 'all':
                    getAllGroups();
                    break;
                default:
                    break;
            }
        }
        filterList();

    }, [viewlist, view, filterList, getYourGroups]);

    //console.log(viewlist);
    return (
        <div className="hero">
            <div className="hero-body has-text-centered">
                <div className="card" style={{marginLeft:"1rem"}}>
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-12">
                            <div className="columns">
                                <div className="column is-6">
                                    <div className="field">
                                        <div className="rows">
                                            <div className="row">
                                                <label className="form-label" htmlFor="location">
                                                    <b>Name</b>
                                                </label>
                                            </div>
                                            <div className="row">
                                                <input
                                                    className="input form-input"
                                                    type="text"
                                                    name="name"
                                                    value={name}
                                                    onChange={event => {
                                                        setName(event.target.value);
                                                        //filterList(event);
                                                        setFilter(true);
                                                    }}
                                                    placeholder="Enter Name"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="column is-6">
                                    <div className="columns">    
                                        <div className="column is-6">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="location">
                                                            <b>View</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            name="market"
                                                            value={view}
                                                            onChange={event => {
                                                                setView(event.target.value);
                                                                //filterList(event);
                                                                handleChangeView(event)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All Groups</option>
                                                            <option value="your"> Your Groups </option>
                                                            <option value="another"> Another </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                
                                        <div className="column is-6">
                                           
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="sortorder">
                                                            <b>Categories</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            id="category"
                                                            value={category}
                                                            onChange={event => {
                                                                setCategory(event.target.value)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All </option>
                                                            {categories.map( (atype,index) => (
                                                                <option key={index} value={atype}>
                                                                    {atype}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="columns is-multiline is-mobile">
                    { viewlist && viewlist.length > 0 ? (
                        viewlist.map((aGroup, index) => (
                            <div className="column" key={index}>
                                <GroupItem 
                                    key={index}
                                    group={aGroup}
                                />
                            </div>
                        ))
                    ):(
                        <div className="container">
                            <span className="title has-text-grey-light"> No Groups to be viewed </span>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
export default withContext(GroupsList);
