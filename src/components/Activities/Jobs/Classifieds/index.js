import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext";
import ClassifiedItem from "./ClassifiedItem";
import axios from "axios";
import ReactPaginate from 'react-paginate';

const Classifieds = props => {

    let navigate = useNavigate();
    const [showFilter, setShowFilter] = useState(false);
    const [fullList, setFullList] = useState([]);
    const user_id = props.context.user ? props.context.user.id : 0;
    const [classifieds, setClassifieds] = useState([]);
    const [gotClassifieds, setGotClassifieds] = useState(false);
    const [pageCount, setPageCount] = useState(0);
    const [metrics, setMetrics] = useState("All");
    const [typeOf, setTypeOf] = useState("All");
    const types = ["Full-Time", "Part-Time", "Day-Job", "Contract", "Consultant"];
    const [mapping, setMapping] = useState("All");
    const [category, setCategory] = useState("All");
    const categories = ["Agriculture, Food, and Natural Resources", "Architecture and Construction", "Arts, Audio/Video Technology, and Communication",
                        "Business and Finance", "Government and Public Administration", "Health Science", "Information Technology", "Law, Public Safety, Corrections, and Security",
                        "Marketing","Science, Technology, Engineering, and Math"];
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
        if (metrics && metrics !== "All"){
            result = result.filter(job => job.metrics === metrics);
        }
        if (typeOf && typeOf !== "All"){
            result = result.filter(job => job.typeOf === typeOf);
        }
        
        setClassifieds(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval, metrics ,mapping, typeOf, category]);

    useEffect(() => {
        if (gotClassifieds === false){
            axios.get("/api/classifieds").then(res => {
                if (res.status === 200){
                    setFullList(res.data);
                    setClassifieds(res.data);
                    setPageCount( Math.ceil(res.data.length / perPage));
                    setGotClassifieds(true);
                }
            });
        }
        if(filter){
            filterList();
        }
    }, [gotClassifieds, filter, filterList]);

    slice = classifieds.slice(offset, offset + perPage); 
    

    /*const [isChecked, setVal] = useState(false);
    const isFree = true;

    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        //isChecked ? console.log(isChecked) : console.log("test") ;
    }*/

    return(
        <div className="hero">
            <nav className="panel">
                <div className="panel-heading">
                    <div className="columns">
                        <span className="column p-0 m-0 is-half">
                            Classifieds
                        </span>
                        <span className="column has-text-right p-0 m-0 is-half">
                            <button onClick={e => navigate('/add-classified')} className="button is-outlined">Create</button>
                            <button onClick={e => setShowFilter(!showFilter)} className="button">Filter</button>
                        </span>
                    </div>
                </div>
                {showFilter && 
                    <>
                    <p className="panel-tabs">
                        <a onClick={e => {setMapping('All');setFilter(true);}} className={`${mapping === "All" ? "is-active" : ""}`}>All</a>
                        <a onClick={e => {setMapping('Saved');setFilter(true);}} className={`${mapping === "Saved" ? "is-active" : ""}`}>My Jobs</a>
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
                    <div className="panel-block">
                        <div className="columns p-0 m-0 is-fullwidth">
                            <div className="column is-one-quarter has-text-right">
                                <b> Site  </b> 
                            </div>
                            <div className="column p-0 m-0 is-three-quarters">
                                <div className="select is-fullwidth">
                                    <select
                                        value={metrics}
                                        onChange={e => {setMetrics(e.target.value);setFilter(true);}}>
                                        <option value="All">All</option>
                                        <option value="remote">Remote</option>
                                        <option value="on-site">On-Site</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="panel-block">
                        <div className="columns p-0 m-0 is-fullwidth">
                            <div className="column is-one-quarter has-text-right">
                                <b> Type  </b>
                            </div>
                            <div className="column p-0 m-0 is-three-quarters">
                                <div className="select is-fullwidth">
                                    <select
                                        value={typeOf}
                                        onChange={e => {setTypeOf(e.target.value);setFilter(true);}}>
                                        <option value="All">All</option>
                                        {types.map((val, index) => 
                                            <option key={index} value={val}>
                                                {val}
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
                        slice.map((job, index) => (
                            <div key={index} className="column is-half-desktop is-full-mobile">
                                <ClassifiedItem 
                                    job={job}
                                    key={index}
                                />
                            </div>
                        ))
                    ) : (
                        <>
                            <div className="column has-text-centered">
                                <span className="title has-text-grey-light">
                                    No Jobs Found
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

export default withContext(Classifieds);