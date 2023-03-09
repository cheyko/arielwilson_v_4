import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import withContext from "../../../../withContext";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import MeetingItem from "./MeetingItem";

const Meetings = props => {

    let navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [fullList, setFullList] = useState([]);
    const user_id = props.context.user.id;
    const [meetings, setMeetings] = useState([]);
    const [gotMeetings, setGotMeetings] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [start_date, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [end_date, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [metrics, setMetrics] = useState("All");
    const [entry, setEntry] = useState("All");
    const [mapping, setMapping] = useState("All");
    const [category, setCategory] = useState("All");
    const categories = ["Agriculture & Food", "Automobiles","Business", "Climate & Weather", "Education", "Entertainment", "General" , "Historical", "Law", "News", "Personal", "Political", "Religious", "Science & Technology", "Sports"];
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
            result = result.filter(meeting => meeting.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (category && category !== "All"){
            result = result.filter(meeting => meeting.category === category);
        }
        if (metrics && metrics !== "All"){
            result = result.filter(meeting => meeting.metrics === metrics);
        }
        if (entry && entry !== "All"){
            if(entry === 'Free' || entry === 'Invitation'){
                result = result.filter(meeting => meeting.tickets[0] === entry);
            }else{
                result = result.filter(meeting => (meeting.tickets[0] !== 'Free') && (meeting.tickets[0] !== 'Invitation'));
            }
        }
        if (mapping && mapping !== "All"){

        }
        
        setMeetings(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval, metrics, entry ,mapping, start_date, end_date, category, meetings]);

    useEffect(() => {
        if (gotMeetings === false){
            var typeOf = "Meeting"
            axios.post("/api/get-events",{user_id, typeOf}).then(res => {
                if (res.status === 200){
                    setFullList(res.data);
                    setMeetings(res.data);
                    setPageCount( Math.ceil(res.data.length / perPage));
                    setGotMeetings(true);
                }
            });
        }
        if(filter){
            filterList();
        }
    }, [gotMeetings, filter, filterList, meetings]);

    slice = meetings.slice(offset, offset + perPage); 
    
    console.log(slice);
    return(
        <div className="hero">
            <nav className="panel">
                <div className="panel-heading">
                    Meetings
                    <div className="is-pulled-right"><button onClick={e => setShowFilter(!showFilter)} className="button">Filter</button></div>
                    <div className="is-pulled-right">
                        <button onClick={e => navigate('/add-event')} className="button is-outlined">
                            Create
                        </button>{" "}
                    </div>
                </div>
                {showFilter && 
                    <>
                    <p className="panel-tabs">
                        <a onClick={e => {setMapping('All');setFilter(true);}} className={`${mapping === "All" ? "is-active" : ""}`}>All</a>
                        <a onClick={e => {setMapping('Mines');setFilter(true);}} className={`${mapping === "Mines" ? "is-active" : ""}`}>My Meetings</a>
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
                        <span className=""> Categories  </span>&nbsp;
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
                    <div className="panel-block">
                        <span className=""> Type  </span>&nbsp;
                        <div className="select is-fullwidth">
                            <select
                                value={metrics}
                                onChange={e => {setMetrics(e.target.value);setFilter(true);}}>
                                <option value="All">All</option>
                                <option value="virtual">Virtual</option>
                                <option value="physical">Physical</option>
                            </select>
                        </div>
                    </div>
                    <div className="panel-block">
                        <span className=""> Entry  </span>&nbsp;
                        <div className="select is-fullwidth">
                            <select
                                value={entry}
                                onChange={e => {setEntry(e.target.value);setFilter(true);}}>
                                <option value="All">All</option>
                                <option value="Free">Free</option>
                                <option value="Invitation">Invitation</option>
                                <option value="Ticket">Ticket</option>
                            </select>
                        </div>
                    </div>
                    <div className="panel-block columns is-multiline">
                        <span className="column is-half-mobile is-one-quarter-desktop has-text-centered"> Date Range  </span>
                        <div className="control column is-half-mobile is-one-quarter-desktop">
                            <input 
                                className="input" 
                                type="date" 
                                name="start_date"
                                value={start_date}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={e => setStartDate(e.target.value)}
                            />
                        </div>
                        <span className="column is-half-mobile is-one-quarter-desktop has-text-centered"> To </span>
                        <div className="control column is-half-mobile is-one-quarter-desktop">
                            <input 
                                className="input" 
                                type="date" 
                                name="end_date"
                                value={end_date}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={e => setEndDate(e.target.value)}
                            />
                        </div>
                    </div>
                    </>
                }
            </nav>
            <div className="hero">
                <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((meeting, index) => (
                            <div key={index} className="column is-half-desktop is-full-mobile">
                                <MeetingItem 
                                    meeting={meeting}
                                    key={index}
                                    setGotMeetings={setGotMeetings}
                                />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="column has-text-centered">
                                <span className="title has-text-grey-light">
                                    No Meeting Found
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
                    <button onClick={e => navigate('/add-event')} className="button is-outlined">
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
                        <MeetingItem />
                    </div>
                </div>
            </div>
        </div>
    )*/
}

export default withContext(Meetings);