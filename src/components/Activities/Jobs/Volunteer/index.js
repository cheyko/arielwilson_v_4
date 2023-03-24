import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext";
import VolunteerItem from "./VolunteerItem";
import axios from "axios";
import ReactPaginate from 'react-paginate';


const Volunteer = props => {

    /*const [isChecked, setVal] = useState(false);
    const isFree = true;

    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        isChecked ? console.log(isChecked) : console.log("test") ;
    }*/

    let navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [fullList, setFullList] = useState([]);
    //const user_id = props.context.user ? props.context.user.id : 0;
    const [activities, setActivities] = useState([]);
    const [gotActivities, setGotActivities] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [mapping, setMapping] = useState("All");
    const [category, setCategory] = useState("All");
    const categories = ["Animals","Community","Education","Health and Social Care", "Political", "Sports","Environmental"];
    const [searchval, setSearchVal] = useState("");
    const [filter, setFilter] = useState(null);
    const perPage = 12;

    let slice;
    const [offset, setOffset] = useState(0);

    const handlePageClick = (e) => {
        setOffset(e.selected * perPage);
        window.scrollTo(0, 0);
    };

    const filterList = useCallback(() => {
        let result = fullList;
        if (searchval && searchval !== ""){
            result = result.filter(job => job.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (category && category !== "All"){
            result = result.filter(job => job.category === category);
        }
        
        setActivities(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval, category]);

    useEffect(() => {
        if (gotActivities === false){
            axios.get(`${process.env.REACT_APP_PROXY}/api/volunteer`).then(res => {
                if (res.status === 200){
                    setFullList(res.data);
                    setActivities(res.data);
                    setPageCount( Math.ceil(res.data.length / perPage));
                    setGotActivities(true);
                }
            });
        }
        if(filter){
            filterList();
        }
    }, [gotActivities, filter, filterList]);

    slice = activities.slice(offset, offset + perPage); 
    

    return(
        <div className="hero">
            <nav className="panel">
                <div className="panel-heading">
                    <div className="columns">
                        <span className="column p-0 m-0 is-half">
                            Volunteer
                        </span>
                        <span className="column has-text-right p-0 m-0 is-half">
                            <button onClick={e => navigate('/add-volunteer')} className="button is-outlined">Create</button>
                            <button onClick={e => setShowFilter(!showFilter)} className="button">Filter</button>
                        </span>
                    </div>
                </div>
                {showFilter && 
                    <>
                    <p className="panel-tabs">
                        <span onClick={e => {setMapping('All');setFilter(true);}} className={`${mapping === "All" ? "is-active" : ""}`}>All</span>
                        <span onClick={e => {setMapping('Saved');setFilter(true);}} className={`${mapping === "Saved" ? "is-active" : ""}`}>My Volunteerting</span>
                    </p>
                    <div className="panel-block">
                        <p className="control has-icons-left">
                        <input
                            className="input form-input"
                            type="text"
                            name="searchval"
                            value={searchval}
                            onChange={event => {
                                setSearchVal(event.target.value);
                                setFilter(true);
                            }}
                            placeholder="Search"
                        />
                        <span className="icon is-left">
                            <i className="fas fa-search" aria-hidden="true"></i>
                        </span>
                        </p>
                    </div>
                    <div className="panel-block">
                        <div className="columns p-0 m-0 is-fullwidth">
                            <div className="column is-one-quarter has-text-right"> <b> Categories </b>   </div>
                            <div className="column p-0 m-0 is-three-quarters">
                                <div className="select is-fullwidth">
                                    <select
                                        value={category}
                                        onChange={e => {setCategory(e.target.value);setFilter(true);}}>
                                        <option value="All">All</option>
                                        {categories.map((cat, index) => 
                                            <option key={index} value={cat}>
                                                {cat}
                                            </option>
                                        )}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    </>
                }
            </nav>
            <div className="hero">
                <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((activity, index) => (
                            <div key={index} className="column is-half-desktop is-half-tablet is-full-mobile">
                                <VolunteerItem 
                                    activity={activity}
                                    key={index}
                                />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="column has-text-centered">
                                <span className="title has-text-grey-light">
                                    No Volunteering Activity Found
                                </span>
                            </div>
                        </>
                    )}
                </div>
                <div className="paginationBox box">
                    <ReactPaginate
                        previousLabel="prev"
                        nextLabel="next"
                        breakLabel={'...'}
                        breakClassName={'break-me'}
                        pageCount={pageCount}
                        marginPagesDisplayed={2}
                        pageRangeDisplayed={5}
                        onPageChange={handlePageClick}
                        containerClassName={'pagination'}
                        subContainerClassName={'pages pagination'}
                        activeClassName={'active'}
                        />
                </div>
            </div>
        </div>
    )

    /*return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <button onClick={e => navigate('/add-volunteer')} className="button is-outlined">
                        Create
                    </button>{" "}
                    <button className="button is-outlined">
                        Updates
                    </button>{" "}
                    <button className="button is-outlined">
                        Filter
                    </button>
                </div>
            </div>
            <div className="hero">
                <div className="columns">
                    <div className="column">
                        <VolunteerItem />
                    </div>
                    <div className="column">
                        
                         
                    </div>
                </div>
            </div>
        </div>
    )*/
}


export default withContext(Volunteer);