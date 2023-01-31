import React, {useEffect} from "react";
import withContext from "../../../withContext";

import ProductImageView from "./ProductImageView";
import ProductDetail from "./ProductDetail";
import ProductFeatures from "./ProductFeatures";
import SimilarProduct from "./SimilarProduct";

import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';


const ViewProduct = props => {

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
    }, []);

    let product = localStorage.getItem("vehicle");
    let thePics = localStorage.getItem("thePics");
    let {id} = useParams();
    const result = props.context.getProduct(id);
    
    product = (result === null) ? JSON.parse(product) : result;
    thePics =  (result === null) ? JSON.parse(thePics) : props.context.getTargetPhotos(product.product_id, "product");
    
    localStorage.setItem("product", JSON.stringify(product));
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
                            <ProductImageView product={product} thePics={thePics}/>
                        </div>
                        <div className="productlistContainer rightContent column is-half">
                            <div className="content box">
                                <ProductDetail product={product} />
                            </div>
                            <hr />
                            <div className="content box">
                                <ProductFeatures product={product} interior={interior} exterior={exterior} entertainment={entertainment} technology={technology} comfort={comfort}/>
                            </div>
                            <hr />
                            <div className="item-box content box">
                                <SimilarProduct product={product}/> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(ViewProduct);