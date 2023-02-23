import React, {useEffect, useState} from "react";
import withContext from "../../../withContext";

import ItemImageView from "./ItemImageView";
import ItemDetail from "./ItemDetail";
import ItemFeatures from "./ItemFeatures";
import SimilarItem from "./SimilarItem";

import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';


const ViewItem = props => {

    let {id} = useParams();

    const [item, setItem] = useState(null);
    const [thePics, setPics] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (item === null){
            props.context.getItem(id).then((promise) => {
                if(promise){
                    setItem(promise);
                    setPics(props.context.getTargetPhotos(promise, "item"));
                }else{
                    setItem(promise);
                }
            });
        }

    }, [item]);

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
            {item ? 
            <div className="hero-container market-content">
                <div className="item-content">
                    <div className="columns is-multiline">
                        <div className="leftContent column">
                            <ItemImageView item={item} thePics={thePics}/>
                        </div>
                        <div className="rightContent column">
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
            </div>:
            <div className="hero-container has-text-centered">
                <div className="hero-body">
                    {item === false ? 
                        <span className="is-size-3" style={{color:"gray"}}>
                            Item is not found !
                        </span>
                        :    
                        <span className="is-size-3" style={{color:"gray"}}>
                            Loading ......
                        </span>
                    }
                </div>
            </div>}

        </div>
    )
}
export default withContext(ViewItem);