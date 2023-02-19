import React, {useEffect, useState} from "react";
//import {Link} from "react-router-dom";
import withContext from "../../../withContext";

import VehicleImageView from "./VehicleImageView";
import VehicleDetail from "./VehicleDetail";
import VehicleFeatures from "./VehicleFeatures";
import SimilarVehicle from "./SimilarVehicle";

import {useParams } from "react-router-dom";
import $ from 'jquery';

const ViewVehicle = props => {

    let {id} = useParams();

    const [vehicle, setVehicle] = useState(null);
    const [thePics, setPics] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (vehicle === null){
            props.context.getVehicle(id).then((promise) => {
                if(promise){
                    setVehicle(promise);
                    setPics(props.context.getTargetPhotos(promise, "vehicle"));
                }
            });
        }

    }, [vehicle]);

    /*useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
    }, []);

    let vehicle = localStorage.getItem("vehicle");
    let thePics = localStorage.getItem("thePics");
    let {id} = useParams();
    const result = props.context.getVehicle(id);
    
    vehicle = (result === null) ? JSON.parse(vehicle) : result;
    thePics =  (result === null) ? JSON.parse(thePics) : props.context.getTargetPhotos(vehicle.vehicle_id, "vehicle");
    
    localStorage.setItem("vehicle", JSON.stringify(vehicle));
    localStorage.setItem("thePics", JSON.stringify(thePics));*/

    //implement input where items are added in a list ///
    const interior = ['Overhead Airbags','Power Locks','Power Mirrors','Power Windows','Side Airbags'];

    const exterior = ["ABS Brakes","Alloy Wheels","Bed Liner","Running Boards","Tow Hitch","Traction Control"];

    const entertainment = ["AM/FM Stereo", "Auxiliary Audio Input", "CD Audio", "Entune", "Satellite Radio Ready"];

    const technology = ["Bluetooth Technology","Cruise Control","Navigation System","Rear View Camera","Smart Key"];
    
    const comfort = ["Air Conditioning","Cloth Seats"];
    //////////
    
    return (
        <div className="hero">
            {vehicle ? 
            <div className="hero-container market-content">
                <div className="vehicle-content">
                    <div className="columns">
                        <div className="leftContent column ">

                            <VehicleImageView vehicle={vehicle} thePics={thePics}/>
                        </div>
                        <div className="rightContent column">
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
            </div>:
            <div className="hero-container">
                <div className="hero-body">
                    <span className="is-size-3" style={{color:"gray"}}>
                        Vehicle is not found !
                    </span>
                </div>
            </div>
            }
        </div>
    )
}
export default withContext(ViewVehicle);