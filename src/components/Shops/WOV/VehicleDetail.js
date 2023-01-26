import React from 'react';
import ContactModal from "./ContactModal";
import withContext from "../../../withContext";

const VehicleDetail = props =>{

        const { vehicle } = props;

        return (
            <>
                <div id="vehicle-overview" className="container">
                    <strong style={{textDecoration:"underline"}}>
                        <h1 className="title">{vehicle.year} {" "} {vehicle.make} {" "} { vehicle.model} </h1>    
                    </strong>
                    <div className="columns" style={{textAlign:"left",marginTop:'0.5rem'}}>
                        <div className="column">
                            <div className="detail content">
                                <div className="columns">
                                    <div className="column">
                                        <p><small>Price: </small><strong className="is-size-4">${vehicle.price.toLocaleString()}</strong> <small>{vehicle.currency}</small></p>   
                                        <strong>Est. payment:</strong>{" "}<strong>$4,075</strong><small>/mo</small> 
                                    </div>
                                    <div className="column">
                                        <p>
                                            <small>Mileage: </small> <br /> <strong>{vehicle.mileage}</strong>{" "}<small>KM</small>
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="has-text-centered">
                            <span> <ContactModal /> </span>
                        </p>
                    </div>
                    <br />
                    <div className="rows">
                        <div className="row">
                            <b> Condition : </b> <span> {vehicle.condition} </span>
                        </div>
                        <hr />
                        <div className="row">
                            <b> Type : </b> <span>{vehicle.typeOf}</span>
                        </div>
                        <hr />
                        <div className="row">
                            <b> Fuel : </b> <span>{vehicle.fuel}</span>
                        </div>
                        <hr />
                        <div className="row">
                            <b> Transmission : </b> <span>{vehicle.transmission}</span>
                        </div>
                        <hr />
                        <div className="row">
                            <b> Engine Size : </b> <span> {Number(vehicle.engine).toFixed(1)} L</span>
                        </div>
                        <hr />
                        <div className="row">
                            <b> Steerling Wheel : </b> <span style={{ textTransform: "capitalize" }}>{vehicle.steering} Hand Drive</span>
                        </div>
                        <hr />
                        <div className="row">
                            <b> Seating Capacity : </b> <span>{vehicle.seats}</span>
                        </div>
                        <hr />
                    </div>
                    <div className="descript">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Description</b></p>
                        <p style={{fontStyle:"italic"}}> {vehicle.description} </p>
                    </div>
                </div>
            </> 
        );
}

export default withContext(VehicleDetail);