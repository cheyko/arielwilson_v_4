import React, { useState, useEffect, useCallback } from "react";
import withContext from "../../../../withContext";
import AddRequest from "./AddRequest";
import RequestItem from "./RequestItem";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const Requests = props => {
    const [showFilter, setShowFilter] = useState(false);
    const [fullList, setFullList] = useState([]);
    const user_id = props.context.user.id;
    const [requests, setRequests] = useState([]);
    const [gotRequest, setGotRequest] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [status, setStatus] = useState("All");
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
            result = result.filter(request => request.question.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (status && status !== "All") {
            result = result.filter(task => task.status === status);
        }        
        setRequests(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval, status, requests]);

    useEffect(() => {
        if (gotRequest === false){
            axios.post("/api/get-requests",{user_id}).then(res => {
                if (res.status === 200){
                    setFullList(res.data);
                    setRequests(res.data);
                    setPageCount( Math.ceil(res.data.length / perPage));
                    setGotRequest(true);
                }
            });
        }
        if(filter){
            filterList();
        }
    }, [gotRequest, filter, filterList, requests]);

    slice = requests.slice(offset, offset + perPage); 
    console.log(slice);

    return (
        <div className="hero">
            <nav className="panel">
                <div className="panel-heading">
                    Request
                    <div className="is-pulled-right"><button onClick={e => setShowFilter(!showFilter)} className="button">Filter</button></div>
                    <div className="is-pulled-right"><AddRequest /></div>
                </div>
                {showFilter && 
                    <>
                    <p className="panel-tabs">
                        <a href="#" onClick={e => {setStatus('All');setFilter(true);}} className={`${status === "All" ? "is-active" : ""}`}>All</a>
                        <a href="#" onClick={e => {setStatus('Sent');setFilter(true);}} className={`${status === "Sent" ? "is-active" : ""}`}>Un-Answered</a>
                        <a href="#" onClick={e => {setStatus('Responded');setFilter(true);}} className={`${status === "Responded" ? "is-active" : ""}`}>Answered</a>
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
                    </>
                }
            </nav>
            <div className="hero">
                <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((request, index) => (
                            <div key={index} className="column is-half-desktop is-full-mobile">
                                <RequestItem
                                    request={request}
                                    key={index}
                                    setGotRequest={setGotRequest}
                                />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="column has-text-centered">
                                <span className="title has-text-grey-light">
                                    No Request Found
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

export default withContext(Requests);