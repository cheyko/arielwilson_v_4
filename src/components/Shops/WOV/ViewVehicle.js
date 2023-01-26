import React, {useEffect} from "react";
//import {Link} from "react-router-dom";
import withContext from "../../../withContext";

import VehicleImageView from "./VehicleImageView";
import VehicleDetail from "./VehicleDetail";
import VehicleFeatures from "./VehicleFeatures";
import SimilarVehicle from "./SimilarVehicle";

import { useHistory } from "react-router-dom";
import $ from 'jquery';

const ViewVehicle = props => {

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
    }, []);

    let vehicle = localStorage.getItem("vehicle");
    let thePics = localStorage.getItem("thePics");
    const theID = props.match.params.id;
    const result = props.context.getVehicle(theID);
    
    vehicle = (result === null) ? JSON.parse(vehicle) : result;
    thePics =  (result === null) ? JSON.parse(thePics) : props.context.getTargetPhotos(vehicle.vehicle_id, "vehicle");
    
    localStorage.setItem("vehicle", JSON.stringify(vehicle));
    localStorage.setItem("thePics", JSON.stringify(thePics));

    //implement input where items are added in a list ///
    const interior = ['Overhead Airbags','Power Locks','Power Mirrors','Power Windows','Side Airbags'];

    const exterior = ["ABS Brakes","Alloy Wheels","Bed Liner","Running Boards","Tow Hitch","Traction Control"];

    const entertainment = ["AM/FM Stereo", "Auxiliary Audio Input", "CD Audio", "Entune", "Satellite Radio Ready"];

    const technology = ["Bluetooth Technology","Cruise Control","Navigation System","Rear View Camera","Smart Key"];
    
    const comfort = ["Air Conditioning","Cloth Seats"];
    //////////

    //console.log(Vehicle);
    //console.log(thePics);
    
    let history = useHistory();
    
    return (
        <div className="hero">
            <div className="listing-view">
                <div className="vehicle-content">
                    <div className="columns">
                        <div className="leftContent column is-half">
                            <div className="hero-body viewing-controls">
                                <button className="button is-fixed" onClick={() => history.goBack()}> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                            </div>
                            <br />
                            <VehicleImageView vehicle={vehicle} thePics={thePics}/>
                        </div>
                        <div className="rightContent column is-half">
                            <div className="content box">
                                <VehicleDetail vehicle={vehicle} />
                            </div>
                            <hr />
                            <div className="content box">
                                <VehicleFeatures vehicle={vehicle} interior={interior} exterior={exterior} entertainment={entertainment} technology={technology} comfort={comfort}/>
                            </div>
                            <hr />
                            <div className="content box">
                                <SimilarVehicle vehicle={vehicle}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(ViewVehicle);