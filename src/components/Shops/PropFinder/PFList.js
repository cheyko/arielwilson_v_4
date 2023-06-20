import React, {useCallback, useEffect, useState} from "react";
import withContext from '../../../withContext';
import PFLItem from "./PFLItem";
import ReactPaginate from 'react-paginate';
import "./index.css";
import axios from "axios";

const PFList = props => {
    const {PFView, PFType} = props;
    let fullList = props.context.listings ? props.context.listings : null;
    const [listings, setListings] = useState(fullList);

    if(listings === null){
        axios.get(`${process.env.REACT_APP_PROXY}/api/listings`).then(res => {
            if (res.status === 200){
                setListings(res.data);
                fullList = res.data;
            }
        });
    }
    let SelectedPFType;
    if(localStorage.getItem("PFType")){
        SelectedPFType = localStorage.getItem("PFType")
        localStorage.removeItem("PFType");
    }else{
        SelectedPFType = PFType;
    } 
    
    const perPage = 12;
    const pageCount = listings ? Math.ceil(listings.length / perPage) : 0;
    let slice;
    const [offset, setOffset] = useState(0);
    //filter implementation
    const Amounts = [1,2,3,4,5,6];
    let types = ["house","apartment","townhouse","residential","commercial","office","building","villa"];
    const [location, setLocation] = useState("");
    const val = PFView === "PFBuy" ? "Sale" : (PFView === "PFRent" ? "Rent" : "all");
    const [market, setMarket] = useState(val);
    const [typeOf, setTypeOf] = useState(SelectedPFType);
    const [beds, setBeds] = useState("Any");
    const [baths, setBaths] = useState("Any");
    const filterCache = localStorage.getItem("showfilter") === "true" ? true : false;
    //console.log(filterCache === false);
    const [showFilter, setShow] = useState(filterCache);
    const [filter, setFilter] = useState(null);
    const [sortOrder, setSortOrder] = useState("");
    const [fromVal, setFromVal] = useState(0);
    const [toVal, setToVal ] = useState(1000000000);
    
    
    const handlePageClick = (e) => {
        setOffset(e.selected * perPage);
        window.scrollTo(0, 0);
    };
    const convertPrice = (price, currency) => {
        //console.log(price > 100);
        //console.log(currency);
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
        if (location !== ""){
            result = result.filter(listing => listing.title.replace(/ /g,'').toLowerCase().includes(location.replace(/ /g,'').toLowerCase())
            ||  listing.address.replace(/ /g,'').toLowerCase().includes(location.replace(/ /g,'').toLowerCase()));
            console.log(result);
        }
        if (market && market !== "all"){
            result = result.filter(listing => listing.category === market);
        }
        if (typeOf && typeOf !== "all") {
            result = result.filter(listing => listing.typeOf === typeOf);
        }
        if (beds && beds !== "Any") {
            result = result.filter(listing => listing.beds === Number(beds));
            console.log(beds);
        }
        if (baths && baths !== "Any") {
            result = result.filter(listing => listing.baths === Number(baths));
            console.log(baths);
        }
        if (fromVal > 0){
            result = result.filter(listing => ( convertPrice(listing.price, listing.currency) >= Number(fromVal)));
            console.log(fromVal);
        }
        if (toVal > 0){
            result = result.filter(listing => convertPrice(listing.price, listing.currency) <= Number(toVal))
        }
        if (sortOrder) {
            if (sortOrder === 'highestfirst') {
              result = result.sort((a, b) => convertPrice(b.price, b.currency) - convertPrice(a.price, a.currency))
            }
            if (sortOrder === 'lowestfirst') {
              result = result.sort((a, b) => convertPrice(a.price, a.currency) - convertPrice(b.price, b.currency))
            }
        }
        setListings(result);
        setOffset(0);
        setFilter(false);
    },[location, typeOf, beds, baths, sortOrder, toVal, fromVal, market, fullList]);
    
    
    useEffect(() => {
        window.scrollTo(0, 0);
        if (filter === null){
            setMarket(val);
            //filterList();
        }
        if (filter === true){
            let pfview = market === "Sale" ? "PFBuy" : (market === "Rent" ? "PFRent" : "PFAll");
            //if(pfview === "PFBuy" || pfview === "PFRent"){
            props.setPFView(pfview);
            props.setSubView(pfview); 
            localStorage.setItem("subview",pfview);
            //} 
            //props.setPFView(pfview);
            //filterList();
        }
        if(listings && (filter === true || filter === null)){
            filterList();
        }
        //setFilter(false);
        //console.log("scroll");
    }, [val, market, filter, listings, props, filterList]);

    slice = listings ? listings.slice(offset, offset + perPage) : []; 

    return (
        <div className="hero has-text-centered">
            <div className="market-list">
                <div className="filter-list">
                    <div className="card" onClick={e => {setShow(!showFilter);localStorage.setItem("showfilter",(!showFilter));}}>
                        <i style={{fontSize:"x-large"}} className="button fas fa-caret-down">&nbsp; Lookup Property </i>
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
                                                        <label className="form-label" htmlFor="location">
                                                            <b>Location</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <input
                                                            className="input form-input"
                                                            type="text"
                                                            name="location"
                                                            value={location}
                                                            onChange={event => {
                                                                setLocation(event.target.value);
                                                                //filterList(event);
                                                                setFilter(true);
                                                            }}
                                                            placeholder="Enter Address"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="column is-7">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <div className="columns">
                                                            <div className="column">
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
                                                            <div className="column">
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
                                    </div>
                                </div>
                                <div className="column is-12">
                                    <div className="columns is-multiline is-mobile">    
                                        <div className="column is-half-mobile is-2-desktop">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="location">
                                                            <b>Market</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            name="market"
                                                            value={market}
                                                            onChange={event => {
                                                                setMarket(event.target.value);
                                                                //filterList(event);
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All </option>
                                                            <option value="Sale"> Buy </option>
                                                            <option value="Rent"> Rent </option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="column is-half-mobile is-2-desktop">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="location">
                                                            <b>Type</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            name="typeOf"
                                                            value={typeOf}
                                                            onChange={event => {
                                                                setTypeOf(event.target.value);
                                                                //filterList(event);
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All </option>
                                                            {types.map( (atype,index) => (
                                                                <option key={index} value={atype}>
                                                                {atype}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="column">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <div className="columns is-mobile">
                                                            <div className="column">
                                                                <div className="row">
                                                                    <b>Beds</b>
                                                                </div>
                                                                <div className="row">
                                                                    <select
                                                                        className="select form-select"
                                                                        id="amt"
                                                                        value={beds}
                                                                        onChange={event => {
                                                                            setBeds(event.target.value)
                                                                            setFilter(true);
                                                                        }}
                                                                    >
                                                                        <option value="Any"> Any </option>
                                                                        {Amounts.map(ba => (
                                                                            <option key={ba} value={ba}>
                                                                            {ba}
                                                                            </option>
                                                                        ))}
                                                                        <option value="more">{'>= 6'}</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                            <div className="column">
                                                                <div className="row">
                                                                    <b>Baths</b>
                                                                </div>
                                                                <div className="row">
                                                                    <select
                                                                        className="select form-select"
                                                                        id="baths"
                                                                        value={baths}
                                                                        onChange={event => {
                                                                            setBaths(event.target.value)
                                                                            setFilter(true);
                                                                        }}
                                                                        >
                                                                        <option value="Any"> Any </option>
                                                                        {Amounts.map(ba => (
                                                                            <option key={ba} value={ba}>
                                                                            {ba}
                                                                            </option>
                                                                        ))}
                                                                        <option value="more">{'>= 6'}</option>
                                                                    </select>
                                                                                                                                
                                                                </div>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="column is-4">
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
                    }
                    </div>
                <div className="houselistContainer box">
                    <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((listing, index) => (
                            <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile has-text-centered">
                                <PFLItem
                                    imageUrl={process.env.PUBLIC_URL + "/images/listings/listing" + listing.listing_id + "/0.jpg"}
                                    listing={listing}
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
                                        No Properties to match your search
                                    </span>
                                </div>
                            :
                                <div className="column has-text-centered">
                                    <span className="title has-text-grey-light">
                                        Loading Properties
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

export default withContext(PFList);