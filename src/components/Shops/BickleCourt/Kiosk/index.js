import React, {useEffect, useState} from "react";
import withContext from '../../../../withContext';
import "./index.css";
import Item from "../Item";
import ReactPaginate from 'react-paginate';

const Kiosk = props => {

    let fullList = props.context.items;
    const [items, setItems] = useState(fullList);
    const perPage = 12;
    const pageCount = Math.ceil(items.length / perPage);
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
            if(category === "Meals"){
                setTypes(mealsTypes);
            }else if(category === "Beverage"){
                setTypes(beverageTypes);
            }else if(category === "Dessert"){
                setTypes(dessertTypes);
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
    
    slice = items.slice(offset, offset + perPage); 

    return (
        <div className="hero sub-container has-text-centered">
            <div className="hero-body">
                <div className="container">
                    <div className="card">
                        <div className="columns is-multiline is-mobile">
                            <div className="column is-12">
                                <div className="columns">
                                    <div className="column is-6">
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
                                    
                                    <div className="column is-6">
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
                                                                <option value="all"> All </option>
                                                                <hr/>
                                                                
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
                    <div className="productlistContainer box">
                        <div className="columns is-multiline is-mobile">
                            {slice && slice.length > 0 ? (
                                slice.map((item, index) => (
                                    <div key={index} className="column item-box list-item is-one-third has-text-centered">
                                        <Item
                                            imageUrl={process.env.PUBLIC_URL + "/images/items/item" + item.item_id + "/0"}
                                            item={item}
                                            key={index}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="column has-text-centered">
                                    <span className="title has-text-grey-light">
                                        No Items to match your search
                                    </span>
                                </div>
                            )}
                            </div>
                            <div className="card paginationBox">
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
        </div>
    )
}

export default withContext(Kiosk);