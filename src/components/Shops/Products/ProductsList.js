import React, {useCallback, useEffect, useState} from "react";
import withContext from '../../../withContext';
import "./index.css";
import ProductItem from "./ProductItem";
import ReactPaginate from 'react-paginate';

const ProductsList = props => {

    let fullList = props.context.products;
    const [products, setProducts] = useState(fullList);
    const perPage = 12;
    const pageCount = Math.ceil(products.length / perPage);
    let slice;
    const [offset, setOffset] = useState(0);

    const categories = ["Art", "Applications & Software", "Automobiles",  "Baby", "Books", "Beauty & Cosmetics", "Electronics", "Fashion", "Food & Beverages", "Furniture" ,"Health", "Household", "Kitchen", "Industrial", "Outdoors", "Scientific", "Sports", "Tools", "Toys", "Travel"];
    //const types = ["Devices", "Packages", "Containers", "Items", "Foods", "Consumables", "Wearables", "Disposables"]
    const consumerBrands = ["Alberta","Aunt Jemina","Grace","Kellog","Lasco","Walkerswood","Nestle","National","Holiday", "Pilsbury","Excelsior", "Hershey", "Uncle Ben", "Reeces", "M&M", "Planters", "Oreo", "Campbell's","Heinz", "Dove", "Fritto lay", "Nature Valley", "Starbust", "Haagen-Dadz","Ben and Jerry", "Hostess", "Canbury", "Ferero Rocher", "DiGiornio"];
    const beverageBrands = ["Coca-Cola","Pepsi","Red-bull","Smirnoff","Red Stripe", "Corona", "BudWeiser"]
    //const specialBrands = ["Tesla", ""];
    const techBrands = ["Apple", "Boosch","Google", "Samsung", "Microsoft ", "Huawei","Sony", "Lenovo", "Nokia", "LG", "Panasonic", "Dell", "Compaq", "Whirlpool"]
    const industrialBrands = ["Black and Decker","Stanley", "John Deere", "DeWalt", "Behr","Sherwin Williams", "Tractor Supply Company" , "Milwaukee", "Hilti"]
    const sportwearBrands = ["Adidas", "Nike", "Fila", "Puma", "Kappa", "Reebok", "Jordan", "Under Armour", "Sportwear", "" ]
    const clothingBrands = ["Lees", "Levi", "Fruit of the Loom", "Hanes", "American Polo"]
    const designerBrands = ["Tom Ford", "Gucci", "Louis Vitton", "Prada", "Alexander Macquain", "Balenciaga", "Ralph Lauren"]
    const familyBrands = ["Duracell", "Bounty", "Band-Aid", "Huggies" ,"Ziploc", "Energizer", "Dawn", "Lysol"]
    //const normalBrands = ["Malboro"];
    const conditions = ["new", "used", "pre-own"]

    const [searchval, setSearchVal] = useState("");
    const [brand, setBrand] = useState("All");
    const [category, setCategory] = useState("All");
    const [condition, setCondition] = useState("All");
    const [color, setColor] = useState("All");
    const [showFilter, setShow] = useState(false);
    const [filter, setFilter] = useState(false);
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

    const filterList = useCallback( () => {
        let result = fullList;
        if (searchval && searchval !== ""){
            result = result.filter(product => product.name.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase())
            || product.brand.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (brand && brand !== "All") {
            result = result.filter(product => product.brand === brand);
        }
        if (category && category !== "All") {
            result = result.filter(product => product.category === category);
        }
        if (condition && condition !== "All") {
            result = result.filter(product => product.condition === condition);
        }
        if (color && color !== "Any") {
            result = result.filter(product => product.color === color);
        }
        if (fromVal > 0){
            result = result.filter(product => ( convertPrice(product.price, product.currency) >= Number(fromVal)));
        }
        if (toVal > 0){
            result = result.filter(product => convertPrice(product.price, product.currency) <= Number(toVal))
        }
        if (sortOrder) {
            if (sortOrder === 'highestfirst') {
              result = result.sort((a, b) => convertPrice(b.price, b.currency) - convertPrice(a.price, a.currency))
            }
            if (sortOrder === 'lowestfirst') {
              result = result.sort((a, b) => convertPrice(a.price, a.currency) - convertPrice(b.price, b.currency))
            }
        }
        setProducts(result);
        setOffset(0);
        setFilter(false);
    },[brand, category, color, condition, fromVal, fullList, searchval, sortOrder, toVal]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if(filter){
            filterList();
        }
    }, [filter, filterList]);
    
    slice = products.slice(offset, offset + perPage); 

    return (
        <div className="hero has-text-centered">
            <div className="hero-contain">
                <div className="filter-list">
                    <div className="card" onClick={e => setShow(!showFilter)}>
                        <i style={{fontSize:"x-large"}} className="button fas fa-caret-down">&nbsp; filter list </i>
                    </div>
                    {showFilter &&
                        <div className="card">
                            <div className="columns is-multiline">

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
                                                        //filterList(event);
                                                        setFilter(true);
                                                    }}
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="column is-3" >
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
                                <div className="column is-3" >
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
                                 
                            <div className="columns is-multiline">  
                                <div className="column is-3">
                                    <div className="field">
                                        <div className="rows">
                                            <div className="row">
                                                <label className="form-label" htmlFor="condition">
                                                    <b>Condition</b>
                                                </label>
                                            </div>
                                            <div className="row">
                                                <select
                                                    className="select form-select"
                                                    id="condition"
                                                    value={condition}
                                                    onChange={event => {
                                                        setCondition(event.target.value)
                                                        setFilter(true);
                                                    }}>
                                                    <option value="All"> All </option>
                                                    <hr />
                                                    {conditions.map(opt => (
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
                                                <label className="form-label" htmlFor="brand">
                                                    <b>Brands</b>
                                                </label>
                                            </div>
                                            <div className="row">
                                                <select
                                                    className="select form-select"
                                                    id="brand"
                                                    value={brand}
                                                    onChange={event => {
                                                        setBrand(event.target.value)
                                                        setFilter(true);
                                                    }}>
                                                    <option value="all"> All </option>
                                                    <hr></hr>
                                                    <optgroup label="Consumer Brands">
                                                        {consumerBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                    <hr></hr>
                                                    <optgroup label="Beverages Brands">
                                                        {beverageBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                    <hr></hr>
                                                    <optgroup label="Tech Brands">
                                                        {techBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                    <hr></hr>
                                                    <optgroup label="Industrial Brands">
                                                        {industrialBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                    <hr></hr>
                                                    <optgroup label="Sports Brands">
                                                        {sportwearBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup>
                                                    
                                                    <hr></hr>
                                                    <optgroup label="Clothing Brands"> 
                                                        {clothingBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup>

                                                    <hr></hr>
                                                    <optgroup label="Designer Brands"> 
                                                        {designerBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup>

                                                    <hr></hr>
                                                    <optgroup label="Family Brands"> 
                                                        {familyBrands.map(opt => (
                                                            <option key={opt} value={opt}>
                                                                {opt.toUpperCase()}
                                                            </option>
                                                        ))}
                                                    </optgroup> 
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
                    }
                </div>
                <div className="productlistContainer box">
                            <div className="columns is-multiline is-mobile">
                            {slice && slice.length > 0 ? (
                                slice.map((product, index) => (
                                    <div key={index} className="column is-one-third-desktop is-full-mobile has-text-centered">
                                        <ProductItem
                                            imageUrl={process.env.PUBLIC_URL + "/images/products/product" + product.product_id + "/0"}
                                            product={product}
                                            key={index}
                                        />
                                    </div>
                                ))
                            ) : (
                                <div className="column has-text-centered">
                                    <span className="title has-text-grey-light">
                                        No Products to match your search
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
    )
}

export default withContext(ProductsList);