import React, {useCallback, useEffect, useState} from "react";
import withContext from '../../../withContext';
import "./index.css";
import ServiceItem from "./ServiceItem";
import ReactPaginate from 'react-paginate';
import axios from "axios";

const ServicesList = props => {

    let fullList = props.context.services ? props.context.services : null ;
    const [services, setServices] = useState(fullList);

    if(services === null){
        axios.get(`${process.env.REACT_APP_PROXY}/api/services`).then(res => {
            if (res.status === 200){
                setServices(res.data);
                fullList = res.data;
            }
        });
    }

    const perPage = 12;
    const pageCount = services ? Math.ceil(services.length / perPage) : 0;
    let slice;
    const [offset, setOffset] = useState(0);

    const categories = ["Beauty & Grooming", "Clothing","Construction","Creative", "Electronics","Entertainment","Food & Beverages", "General", "Heath & Wellness", "Household", "Industrial", "I.T", "Landscaping", "Legal", "Medical",  "Religious", "Sports" ];
    //const deliverables = ["Appointment", "Application", "Booking", "Content", "Consultation", "Design", "Evaluation","File","service", "Repair", "Representation"];

    const [searchval, setSearchVal] = useState("");
    const [category, setCategory] = useState("All");
    //const [level, setLevel] = useState("All");
    const [filter, setFilter] = useState(null);
    const [sortOrder, setSortOrder] = useState("");
    const [fromVal, setFromVal] = useState(0);
    const [toVal, setToVal ] = useState(1000000000);
    const [showFilter, setShow] = useState(null);

    const handlePageClick = (e) => {
        setOffset(e.selected * perPage);
        window.scrollTo(0, 0);
    };

    const convertPrice = (price, currency) => {
        if (currency === "JMD"){
          return price
        } else if (currency === "USD"){
          return price * 150
        } else if (currency === "GBP"){
          return price * 210
        } else if (currency === "EUR"){
          return price * 180
        }    
    }

    const filterList = useCallback(() => {
        let result = fullList;
        if (searchval && searchval !== ""){
            result = result.filter(service => service.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase())
            || service.address.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (category && category !== "All") {
            result = result.filter(service => service.category === category);
        }
        if (fromVal > 0){
            result = result.filter(service => ( convertPrice(service.price, service.currency) >= Number(fromVal)));
        }
        if (toVal > 0){
            result = result.filter(service => convertPrice(service.price, service.currency) <= Number(toVal))
        }
        if (sortOrder) {
            if (sortOrder === 'highestfirst') {
              result = result.sort((a, b) => convertPrice(b.price, b.currency) - convertPrice(a.price, a.currency))
            }
            if (sortOrder === 'lowestfirst') {
              result = result.sort((a, b) => convertPrice(a.price, a.currency) - convertPrice(b.price, b.currency))
            }
        }
        setServices(result);
        setOffset(0);
        setFilter(false);
    },[fullList, searchval, category, fromVal, toVal, sortOrder]);
    
    useEffect(() => {
        window.scrollTo(0, 0);
        if(filter){
            filterList();
        }
    }, [filter, filterList]);

    slice = services ? services.slice(offset, offset + perPage) : []; 

    return (
        <div className="hero has-text-centered">
            <div className="market-list">
                <div className="filter-list">
                    <div className="card" onClick={e => setShow(!showFilter)}>
                        <i style={{fontSize:"x-large"}} className="button fas fa-caret-down">&nbsp; Lookup Service </i>
                    </div>
                    {showFilter &&
                        <div className="card hero-body">
                            <div className="columns is-multiline is-mobile">
                                <div className="column is-12">
                                    <div className="columns">
                                        <div className="column is-5">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="searchval">
                                                            <b>Search</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
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
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="column is-7">
                                            <div className="columns"> 
                                                <div className="column is-6" style={{paddingInline:"0"}}>
                                                    <div className="field">
                                                        <div className="rows">
                                                            <div className="row">
                                                                <div className="columns">
                                                                    <div className="column" style={{paddingInline:"0"}}>
                                                                        <b>($) From</b>
                                                                        <input
                                                                            className="input form-input"
                                                                            type="number"
                                                                            name="fromVal"
                                                                            value={fromVal}
                                                                            onChange={event => {
                                                                                setFromVal(event.target.value);
                                                                                setFilter(true);
                                                                            }}
                                                                            placeholder="From"
                                                                        />
                                                                    </div>
                                                                    <div className="column" style={{paddingInline:"0"}}>
                                                                        <b>Up To</b>
                                                                        <input
                                                                            className="input form-input"
                                                                            type="number"
                                                                            name="toVal"
                                                                            value={toVal}
                                                                            onChange={event => {
                                                                                setToVal(event.target.value);
                                                                                setFilter(true);
                                                                            }}
                                                                            placeholder="To"
                                                                        />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                        
                                                <div className="column is-3">
                                                    <div className="field">
                                                        <div className="rows">
                                                            <div className="row">
                                                                <label className="form-label" htmlFor="category">
                                                                    <b>Category</b>
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
                                                                    <option value="All"> All </option>
                                                                    
                                                                    {categories.map(opt => (
                                                                        <option key={opt} value={opt}>
                                                                            {opt.toUpperCase()}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                        </div>
                                                    </div>
                                                
                                                </div>  
                                                <div className="column is-3">
                                                    <div className="field">
                                                        <div className="rows">
                                                            <div className="row">
                                                                <label className="form-label" htmlFor="sortorder">
                                                                    <b>Sort</b>
                                                                </label>
                                                            </div>
                                                            <div className="row">
                                                                <select
                                                                    className="select form-select"
                                                                    id="sortorder"
                                                                    value={sortOrder}
                                                                    onChange={event => {
                                                                        setSortOrder(event.target.value)
                                                                        setFilter(true);
                                                                    }}>
                                                                    <option value=""> Random </option>
                                                                    <option value={("Highest First").replace(' ', '').toLowerCase()}> Highest First </option>
                                                                    <option value={("Lowest First").replace(' ', '').toLowerCase()}> Lowest First </option>
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
                    }
                </div>
                <div className="servicelistContainer box">
                        <div className="columns is-multiline is-mobile">
                        {slice && slice.length > 0 ? (
                            slice.map((service, index) => (
                                <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile has-text-centered">
                                    <ServiceItem
                                        imageUrl={process.env.PUBLIC_URL + "/images/services/service" + service.service_id + "/0.jpeg"}
                                        service={service}
                                        key={index}
                                        page={"list"}
                                    />
                                </div>
                            ))
                        ) : (
                            <>
                                {(filter !== null) ?
                                    <div className="column has-text-centered">
                                        <span className="title has-text-grey-light">
                                            No Service to match your search
                                        </span>
                                    </div>
                                :
                                    <div className="column has-text-centered">
                                        <span className="title has-text-grey-light">
                                            Loading Services
                                        </span>
                                    </div>
                                }
                            </>
                        )}
                        </div>
                        <div className="paginationBox">
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
        </div>
    )
}

export default withContext(ServicesList);