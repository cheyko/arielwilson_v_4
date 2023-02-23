import React, {useEffect, useState} from "react";
import withContext from '../../../withContext';
import VehicleItem from "./VehicleItem";
import ReactPaginate from 'react-paginate';
import "./index.css";
import axios from "axios";

const WOVList = props => {
    //const {WOVView} = props;
    let fullList = props.context.vehicles;
    const [vehicles, setVehicles] = useState(fullList);

    if(vehicles.length == 0){
        axios.get("/api/vehicles").then(res => {
            if (res.status === 200){
                setVehicles(res.data);
                fullList = res.data;
            }
        });
    }

    const perPage = 12;
    const pageCount = Math.ceil(vehicles.length / perPage);
    let slice;
    const [offset, setOffset] = useState(0);

    //filter implementation
    const Amounts = [1,2,3,4,5,6,7];
    const makes = ["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge", "Fiat","Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar","Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda","Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Porshe", "Ram", "Scion","Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other"];
    const types = ["Bus", "Convertible", "Coupe", "Hybrid", "Luxury","Minivan", "Pick-Up", "Sedan", "Sport", "SUV", "Truck", "Van", "Wagon"];
    const fuels = ["gas","diesel","electric","lpg"];
    const transmissions = ["automatic","manual","tiptronic"];
    const conditions = ["new", "used", "pre-own"]
    const colors = ["black", "blue", "brown", "gold", "green", "grey", "orange", "purple", "red", "silver", "tan", "white", "yellow"];

    const [make, setMake] = useState("");
    const [typeOf, setTypeOf] = useState("");
    const [condition, setCondition] = useState("");
    const [fuel, setFuel] = useState("");
    const [transmission, setTransmission] = useState("");
    const [color, setColor] = useState("");
    const [seats, setSeats] = useState(0);
    const [showFilter, setShow] = useState(false);
    const [filter, setFilter] = useState(null);
    const [sortOrder, setSortOrder] = useState("");
    const [fromVal, setFromVal] = useState(0);
    const [toVal, setToVal ] = useState(1000000000);
    //const val = WOVView.make &&  === "PFBuy" ? "Sale" : (PFView === "PFRent" ? "Rent" : "all");

    useEffect(() => {
        window.scrollTo(0, 0);
        /*if (!filter){
            //setMarket(val);
        }else{
            let pfview = market === "Sale" ? "PFBuy" : (market === "Rent" ? "PFRent" : "all"); 
            props.setPFView(pfview);
        }*/
        filterList();
        
    }, [make, typeOf, condition, fuel, transmission, color, seats, toVal, fromVal]);
    
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

    const filterList = () => {
        let result = fullList;
        if (make && make !== "All"){
            result = result.filter(vehicle => vehicle.make === make);
        }
        if (typeOf && typeOf !== "All") {
            result = result.filter(vehicle => vehicle.typeOf === typeOf);
        }
        if (condition && condition !== "All") {
            result = result.filter(vehicle => vehicle.condition === condition);
        }
        if (fuel && fuel !== "Any") {
            result = result.filter(vehicle => vehicle.fuel === fuel);
        }
        if (transmission && transmission !== "Any") {
            result = result.filter(vehicle => vehicle.transmission === transmission);
        }
        if (color && color !== "Any") {
            result = result.filter(vehicle => vehicle.color === color);
        }
        if (seats && seats !== "Any") {
            result = result.filter(vehicle => vehicle.seats === Number(seats));
        }
        if (fromVal > 0){
            result = result.filter(vehicle => ( convertPrice(vehicle.price, vehicle.currency) >= Number(fromVal)));
        }
        if (toVal > 0){
            result = result.filter(vehicle => convertPrice(vehicle.price, vehicle.currency) <= Number(toVal))
        }
        if (sortOrder) {
            if (sortOrder === 'highestfirst') {
              result = result.sort((a, b) => convertPrice(b.price, b.currency) - convertPrice(a.price, a.currency))
            }
            if (sortOrder === 'lowestfirst') {
              result = result.sort((a, b) => convertPrice(a.price, a.currency) - convertPrice(b.price, b.currency))
            }
        }
        setVehicles(result);
        setOffset(0);
        setFilter(false);
    }
    
    slice = vehicles.slice(offset, offset + perPage); 

    return (
        <div className="hero has-text-centered">
            <div className="market-list">
                <div className="filter-list">
                    <div className="card" onClick={e => setShow(!showFilter)}>
                        <i style={{fontSize:"x-large"}} className="button fas fa-caret-down">&nbsp; Lookup Vehicle </i>
                    </div>
                    {showFilter &&
                        <div className="card">
                            <div className="columns is-multiline">
                                <div className="column is-full">
                                    <div className="columns is-multiline">
                                        <div className="column is-4">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="location">
                                                            <b>Make</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            name="make"
                                                            value={make}
                                                            onChange={event => {
                                                                setMake(event.target.value);
                                                                //filterList(event);
                                                                setFilter(true);
                                                            }}>
                                                            <option value="All"> All </option>
                                                            {makes.map( (brand, index) => (
                                                                <option key={index} value={brand}>
                                                                    {brand}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="column is-8">
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
                                <div className="column is-full">
                                    <div className="columns is-multiline is-mobile">    
                                        <div className="column is-half-mobile is-2-desktop">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="location">
                                                            <b>Condition</b><br/>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            name="condition"
                                                            value={condition}
                                                            onChange={event => {
                                                                setCondition(event.target.value);
                                                                //filterList(event);
                                                                setFilter(true);
                                                            }}>
                                                            <option value="All"> All </option>
                                                            {conditions.map( (state, index) => (
                                                                <option key={index} value={state}>
                                                                    {state}
                                                                </option>
                                                            ))}
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
                                                            <b>Type</b><br/>
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
                                                            <option value="All"> All </option>
                                                            {types.map( (atype, index) => (
                                                                <option key={index} value={atype}>
                                                                {atype}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        
                                        <div className="column is-full-mobile is-4-desktop">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <div className="columns is-mobile">
                                                            <div className="column is-4">
                                                                <b>Fuel</b><br/>
                                                                <select
                                                                    className="select form-select"
                                                                    id="fuel"
                                                                    value={fuel}
                                                                    onChange={event => {
                                                                        setFuel(event.target.value)
                                                                        setFilter(true);
                                                                    }}
                                                                >
                                                                    <option value="Any"> Any </option>
                                                                    {fuels.map((val,index) => (
                                                                        <option key={index} value={val}>
                                                                            {val}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="column is-4">
                                                                <b>Color</b><br/>
                                                                <select
                                                                    className="select form-select"
                                                                    id="color"
                                                                    value={color}
                                                                    onChange={event => {
                                                                        setColor(event.target.value)
                                                                        setFilter(true);
                                                                    }}
                                                                >
                                                                    <option value="Any"> Any </option>
                                                                    {colors.map((val,index) => (
                                                                        <option key={index} value={val}>
                                                                            {val}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="column is-4">
                                                                <b>Seats</b><br/>
                                                                <select
                                                                    className="select form-select"
                                                                    id="seats"
                                                                    value={seats}
                                                                    onChange={event => {
                                                                        setSeats(event.target.value)
                                                                        setFilter(true);
                                                                    }}
                                                                    >
                                                                    <option value="Any"> Any </option>
                                                                    {Amounts.map( (val,index) => (
                                                                        <option key={index} value={val}>
                                                                            {val}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column is-half-mobile is-2-desktop">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="transmission">
                                                            <b>Transmission</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            id="transmission"
                                                            value={transmission}
                                                            onChange={event => {
                                                                setTransmission(event.target.value)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="All"> All </option>
                                                            {transmissions.map( (val, index) => (
                                                                <option key={index} value={val}>
                                                                    {val}
                                                                </option>
                                                            ))}</select>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    
                                        <div className="column is-half-mobile is-2-desktop">
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
                <div className="vehiclelistContainer box">
                    <div className="columns is-multiline is-mobile">
                    {slice && slice.length > 0 ? (
                        slice.map((vehicle, index) => (
                            <div key={index} className="column is-one-third-desktop is-half-tablet is-full-mobile has-text-centered">
                                <VehicleItem
                                    imageUrl={process.env.PUBLIC_URL + "/images/vehicles/vehicle" + vehicle.vehicle_id + "/0"}
                                    vehicle={vehicle}
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
                                        No Vehicles to match your search
                                    </span>
                                </div>
                            :
                                <div className="column has-text-centered">
                                    <span className="title has-text-grey-light">
                                        Loading Vehicles
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

export default withContext(WOVList);