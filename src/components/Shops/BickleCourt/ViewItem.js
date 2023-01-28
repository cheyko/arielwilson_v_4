import React, {useEffect} from "react";
import withContext from "../../../withContext";

import ItemImageView from "./ItemImageView";
import ItemDetail from "./ItemDetail";
import ItemFeatures from "./ItemFeatures";
import SimilarItem from "./SimilarItem";

import { useNavigate } from "react-router-dom";
import $ from 'jquery';


const ViewItem = props => {

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
    }, []);

    let item = localStorage.getItem("item");
    let thePics = localStorage.getItem("thePics");
    const theID = props.match.params.id;
    const result = props.context.getItem(theID);
    
    item = (result === null) ? JSON.parse(item) : result;
    thePics = (result === null) ? JSON.parse(thePics) : props.context.getTargetPhotos(item.item_id, "item");
    
    localStorage.setItem("item", JSON.stringify(item));
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
    
    let navigate = useNavigate();
    
    return (
        <div className="hero">
            <div className="listing-view">
                <div className="vehicle-content">
                    <div className="columns">
                        <div className="leftContent column is-half">
                            <div className="hero-body viewing-controls">
                                <button className="button is-fixed" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                            </div>
                            <br />
                            <ItemImageView item={item} thePics={thePics}/>
                        </div>
                        <div className="productlistContainer rightContent column is-half">
                            <div className="content box">
                                <ItemDetail item={item} />
                            </div>
                            <hr />
                            <div className="content box">
                                <ItemFeatures item={item} interior={interior} exterior={exterior} entertainment={entertainment} technology={technology} comfort={comfort}/>
                            </div>
                            <hr />
                            <div className="item-box content box">
                                <SimilarItem item={item}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(ViewItem);