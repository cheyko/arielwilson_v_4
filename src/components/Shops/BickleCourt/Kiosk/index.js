import React, {useEffect, useState} from "react";
import withContext from '../../../../withContext';
import "./index.css";
import Item from "../Item";
import ReactPaginate from 'react-paginate';
import axios from "axios";

const Kiosk = props => {

    let fullList = props.context.items ? props.context.items : null ;
    const [items, setItems] = useState(fullList);

    if(items === null){
        axios.get("/api/items").then(res => {
            if (res.status === 200){
                setItems(res.data);
                fullList = res.data;
            }
        });
    }
    const perPage = 12;
    const pageCount = items ? Math.ceil(items.length / perPage) : 0;
    let slice;
    const [offset, setOffset] = useState(0);

    const categories = ["Meal", "Beverage","Dessert"];
    const mealsTypes = ["Dish","Side","Sandwich","Soup"];
    const beverageTypes = ["Alcohol","Juice","Mix", "Diary"];
    const dessertTypes = ["Ice-Cream","Cake","Candy","Diary"];
    const pigments = ["black", "blue", "brown", "gold", "green", "grey", "orange", "purple", "red", "silver", "tan", "white", "yellow"];

    const [searchval, setSearchVal] = useState("");
    const [category, setCategory] = useState("All");
    const [typeOf, setTypeOf] = useState("All");
    const [types,setTypes] = useState([]);
    const [filter, setFilter] = useState(false);
    const [sortOrder, setSortOrder] = useState("");
    const [fromVal, setFromVal] = useState(0);
    const [toVal, setToVal] = useState(1000000000);
    const [caloriesLimit, setCaloriesLimit] = useState(100);
    const [showFilter, setShow] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        if(filter){
            filterList();
        }
    }, [filter]);

    const handlePageClick = (e) => {
        setOffset(e.selected * perPage);
        window.scrollTo(0, 0);
    };

    const convertPrice = (price, currency) => {
        if (currency === "JMD"){
          return price;
        } else if (currency === "USD"){
          return price * 150;
        } else if (currency === "GBP"){
          return price * 210;
        } else if (currency === "EUR"){
          return price * 180;
        }    
    }

    const filterList = () => {
        let result = fullList;
        if (searchval && searchval !== ""){
            result = result.filter(item => item.name.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (category && category !== "All") {
            result = result.filter(item => item.category === category);
            if(category === "Meal"){
                setTypes(mealsTypes);
            }else if(category === "Beverage"){
                setTypes(beverageTypes);
            }else if(category === "Dessert"){
                setTypes(dessertTypes);
            }else{
                setTypes([]);
            }
        }
        if (typeOf && typeOf !== "All") {
            result = result.filter(item => item.typeOf === typeOf);
        }
        if (fromVal > 0){
            result = result.filter(item => (convertPrice(item.price, item.currency) >= Number(fromVal)));
        }
        if (toVal > 0){
            result = result.filter(item => convertPrice(item.price, item.currency) <= Number(toVal));
        }
        if (sortOrder) {
            if (sortOrder === 'highestfirst') {
              result = result.sort((a, b) => convertPrice(b.price, b.currency) - convertPrice(a.price, a.currency));
            }
            if (sortOrder === 'lowestfirst') {
              result = result.sort((a, b) => convertPrice(a.price, a.currency) - convertPrice(b.price, b.currency));
            }
        }
        setItems(result);
        setOffset(0);
        setFilter(false);
    }
    
    slice = items ? items.slice(offset, offset + perPage) : []; 

    return (
        <div className="hero has-text-centered">
            <div className="market-list">
                <div className="filter-list">
                    <div className="card" onClick={e => setShow(!showFilter)}>
                        <i style={{fontSize:"x-large"}} className="button fas fa-caret-down">&nbsp; Lookup Bickle </i>
                    </div>
                    {showFilter && 
                        <div className="card hero-body">
                            <div className="columns is-multiline">
                                <div className="column is-6">
                                    <div className="field">
                                        <label className="form-label" htmlFor="searchval">
                                            <b>Search</b>
                                        </label>
                                    
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
                                        
                                <div className="column is-6">
                                    <div className="columns"> 
                                        <div className="column">
                                            <div className="field">
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
                                        </div>
                                        <div className="column">
                                            <div className="field">
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
                            <div className="columns">
                                <div className="column is-6">
                                    <div className="columns is-mobile">
                                        <div className="column is-6">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="category">
                                                            <b>Category</b>
                                                        </label>
                                                    </div>
                                                    <div className="select row">
                                                        <select
                                                            id="category"
                                                            value={category}
                                                            onChange={event => {
                                                                setCategory(event.target.value)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All </option>                                                                                                       
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
                                        <div className="column is-6">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="category">
                                                            <b>Type Of</b>
                                                        </label>
                                                    </div>
                                                    <div className="select row">
                                                        <select
                                                            id="category"
                                                            value={category}
                                                            onChange={event => {
                                                                setTypeOf(event.target.value)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="All"> All </option>
                                                            {types.map(opt => (
                                                                <option key={opt} value={opt}>
                                                                    {opt.toUpperCase()}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                                <div className="column is-6">
                                    <div className="columns is-mobile">
                                        <div className="column is-6">
                                            <div className="field">
                                                <b>Calories {"<"} </b>
                                                <input
                                                    className="input form-input"
                                                    type="number"
                                                    name="caloriesLimit"
                                                    value={caloriesLimit}
                                                    onChange={event => {
                                                        setCaloriesLimit(event.target.value);
                                                        setFilter(true);
                                                    }}
                                                    placeholder="Maximum Calories"
                                                />
                                            </div>
                                        
                                        </div>  
                                        <div className="column is-6">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="sortorder">
                                                            <b>Sort</b>
                                                        </label>
                                                    </div>
                                                    <div className="select row">
                                                        <select
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
                <div className="kiosklistContainer box">
                    <div className="columns is-multiline is-mobile">
                        {slice && slice.length > 0 ? (
                            slice.map((item, index) => (
                                <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile has-text-centered">
                                    <Item
                                        imageUrl={process.env.PUBLIC_URL + "/images/items/item" + item.item_id + "/0"}
                                        item={item}
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
                                            No Bickle to match your search
                                        </span>
                                    </div>
                                :
                                    <div className="column has-text-centered">
                                        <span className="title has-text-grey-light">
                                            Loading Kiosk
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

export default withContext(Kiosk);