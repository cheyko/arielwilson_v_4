import React, {useEffect, useState} from "react";
import withContext from "../../../withContext";

import ServiceImageView from "./ServiceImageView";
import ServiceDetail from "./ServiceDetail";
import ServiceFeatures from "./ServiceFeatures";
import SimilarService from "./SimilarService";

import { useParams } from "react-router-dom";
import $ from 'jquery';


const ViewService = props => {

    let {id} = useParams();

    const [service, setService] = useState(null);
    const [thePics, setPics] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (service === null){
            props.context.getService(id).then((promise) => {
                if(promise){
                    setService(promise);
                    setPics(props.context.getTargetPhotos(promise, "service"));
                }else{
                    setService(promise);
                }
            });
        }

    }, [service]);

    /*useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
    }, []);

    let service = localStorage.getItem("service");
    let thePics = localStorage.getItem("thePics");
    let {id} = useParams();
    const result = props.context.getService(id);
    
    service = (result === null) ? JSON.parse(service) : result;
    thePics =  (result === null) ? JSON.parse(thePics) : props.context.getTargetPhotos(service.service_id, "service");
    
    localStorage.setItem("service", JSON.stringify(service));
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
            {service ?
            <div className="hero-container market-content">
                <div className="vehicle-content">
                    <div className="columns">
                        <div className="leftContent column">
                            <ServiceImageView service={service} thePics={thePics} />
                        </div>
                        <div className="rightContent column">
                            <div className="content box">
                                <ServiceDetail service={service} />
                            </div>
                            <hr />
                            <div className="content box">
                                <ServiceFeatures service={service} interior={interior} exterior={exterior} entertainment={entertainment} technology={technology} comfort={comfort}/>
                            </div>
                            <hr />
                            <div className="item-box content box">
                                <SimilarService service={service}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>:
            <div className="hero-container">
                <div className="hero-body">
                    {service === false ?
                        <span className="is-size-3" style={{color:"gray"}}>
                            Service is not found !
                        </span>
                        :
                        <span className="is-size-3" style={{color:"gray"}}>
                            Loading .....
                        </span>
                    }
                </div>
            </div>
            }
        </div>
    )
}
export default withContext(ViewService);