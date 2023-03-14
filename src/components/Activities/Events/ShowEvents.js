import { useNavigate } from "react-router-dom";
import React, { useState, useEffect, useCallback } from "react";
import withContext from "../../../withContext";
import axios from "axios";
import ReactPaginate from 'react-paginate';
import EventItem from "./EventItem";

const ShowEvents = props => {

    let navigate = useNavigate();
    const {typeOf} = props;
    const [showFilter, setShowFilter] = useState(false);
    const [fullList, setFullList] = useState([]);
    const user_id = props.context.user.id;
    const [events, setEvents] = useState([]);
    const [gotEvents, setGotEvents] = useState(false);
    const [pageCount, setPageCount] = useState(0);
   //const [start_date, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [start_date, setStartDate] = useState("");
    //const [end_date, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [end_date, setEndDate] = useState("");
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
            result = result.filter(event => event.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (category && category !== "All"){
            result = result.filter(event => event.category === category);
        }
        if (metrics && metrics !== "All"){
            result = result.filter(event => event.metrics === metrics);
        }
        if (entry && entry !== "All"){
            if(entry === 'Free' || entry === 'Invitation'){
                result = result.filter(event => event.tickets[0] === entry);
            }else{
                result = result.filter(event => (event.tickets[0] !== 'Free') && (event.tickets[0] !== 'Invitation'));
            }
        }
        if (start_date !== "" || end_date !== ""){
            if (end_date === ""){
                result = result.filter((event) => {
                    for (let i=0; i < event.dates.length ; i++){
                        if(start_date <= event.dates[i]){
                            return event;
                        }
                    }
                });
            }
            else if (start_date === ""){
                result = result.filter((event) => {
                    for (let i=0; i < event.dates.length ; i++){
                        if(end_date >= event.dates[i]){
                            return event;
                        }
                    }
                });
            }else{
                result = result.filter((event) => {
                    for (let i=0; i < event.dates.length ; i++){
                        if(start_date <= event.dates[i] && end_date >= event.dates[i]){
                            return event;
                        }
                    }
                });
            }
            //result = result.filter(event => start_date < event.dates[0]);
        }
        if (mapping && mapping !== "All"){

        }
        
        setEvents(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval, metrics, entry ,mapping, start_date, end_date, category, events]);

    useEffect(() => {
        if (gotEvents === false){
            axios.post("/api/get-events",{user_id, typeOf}).then(res => {
                if (res.status === 200){
                    setFullList(res.data);
                    setEvents(res.data);
                    setPageCount( Math.ceil(res.data.length / perPage));
                    setGotEvents(true);
                }
            });
        }
        if(filter){
            filterList();
        }
    }, [gotEvents, filter, filterList, events]);

    slice = events.slice(offset, offset + perPage); 
    
    console.log(slice);
    return(
        <div className="hero">
            <nav className="panel">
                <div className="panel-heading">
                    {typeOf === "Party" ? "Parties" : typeOf+"s"}
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
                        <a onClick={e => {setMapping('Mines');setFilter(true);}} className={`${mapping === "Mines" ? "is-active" : ""}`}>My {typeOf === "Party" ? "Parties" : typeOf+"s"}</a>
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
                                onChange={e => {setStartDate(e.target.value);setFilter(true);}}
                            />
                        </div>
                        <span className="column is-half-mobile is-one-quarter-desktop has-text-centered"> To </span>
                        <div className="control column is-half-mobile is-one-quarter-desktop">
                            <input 
                                className="input" 
                                type="date" 
                                name="end_date"
                                value={end_date}
                                onChange={e => {setEndDate(e.target.value);setFilter(true);}}
                            />
                        </div>
                    </div>
                    </>
                }
            </nav>
            <div className="hero">
                <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((event, index) => (
                            <div key={index} className="column is-half-desktop is-half-tablet is-full-mobile">
                                <EventItem 
                                    event={event}
                                    key={index}
                                    setGotEvents={setGotEvents}
                                />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="column has-text-centered">
                                <span className="title has-text-grey-light">
                                    No {typeOf} Found
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
}

export default withContext(ShowEvents);