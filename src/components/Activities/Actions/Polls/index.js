import React, { useState, useEffect, useCallback } from "react";
import withContext from "../../../../withContext";
import AddPoll from "./AddPoll";
import PollItem from "./PollItem";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const Polls = props => {

    const [showFilter, setShowFilter] = useState(false);
    const [fullList, setFullList] = useState([]);
    const user_id = props.context.user.id;
    const [polls, setPolls] = useState([]);
    const [gotPolls, setGotPolls] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [status, setStatus] = useState("All");
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
            result = result.filter(poll => poll.question.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (status && status !== "All") {
            result = result.filter(poll => poll.status === status);
        }
        if (category && category !== "All"){
            result = result.filter(poll => poll.category === category);
        }
        if (mapping && mapping !== "All"){
            if (mapping === "Created"){
                result = result.filter(poll => poll.did_vote === true);
            }
            else{
                result = result.filter(poll => poll.lister.user_id === user_id);
            }

        }
        
        setPolls(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval,mapping, status, category, polls]);

    useEffect(() => {
        if (gotPolls === false){
            axios.post("/api/get-polls",{user_id}).then(res => {
                if (res.status === 200){
                    setFullList(res.data);
                    setPolls(res.data);
                    setPageCount( Math.ceil(res.data.length / perPage));
                    setGotPolls(true);
                }
            });
        }
        if(filter){
            filterList();
        }
    }, [gotPolls, filter, filterList, polls]);

    slice = polls.slice(offset, offset + perPage); 

    console.log(slice);

    return(
        <div className="hero">
            <nav className="panel">
                <div className="panel-heading">
                    Polls
                    <div className="is-pulled-right"><button onClick={e => setShowFilter(!showFilter)} className="button">Filter</button></div>
                    <div className="is-pulled-right"><AddPoll /></div>
                </div>
                {showFilter && 
                    <>
                    <p className="panel-tabs">
                        <a onClick={e => {setMapping('All');setFilter(true);}} className={`${mapping === "All" ? "is-active" : ""}`}>All</a>
                        <a onClick={e => {setMapping('Created');setFilter(true);}} className={`${mapping === "Created" ? "is-active" : ""}`}>Created</a>
                        <a onClick={e => {setMapping('Voted');setFilter(true);}} className={`${mapping === "Voted" ? "is-active" : ""}`}>Voted</a>
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
                        <span className=""> Status  </span>&nbsp;
                        <div className="select is-fullwidth">
                            <select
                                value={status}
                                onChange={e => {setStatus(e.target.value);setFilter(true);}}>
                                <option value="All">All</option>
                                <option value="Open">Open</option>
                                <option value="Closed">Closed</option>
                            </select>
                        </div>
                    </div>
                    </>
                }
            </nav>
            <div className="hero">
                <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((poll, index) => (
                            <div key={index} className="column is-half-desktop is-full-mobile">
                                <PollItem 
                                    poll={poll}
                                    key={index}
                                    setGotPolls={setGotPolls}
                                />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="column has-text-centered">
                                <span className="title has-text-grey-light">
                                    No Poll Found
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

export default withContext(Polls);