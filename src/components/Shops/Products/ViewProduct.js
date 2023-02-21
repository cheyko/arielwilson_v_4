import React, {useEffect} from "react";
import withContext from "../../../withContext";

import ProductImageView from "./ProductImageView";
import ProductDetail from "./ProductDetail";
import ProductFeatures from "./ProductFeatures";
import SimilarProduct from "./SimilarProduct";

import { useParams } from "react-router-dom";
import $ from 'jquery';
import { useState } from "react";


const ViewProduct = props => {

    let {id} = useParams();

    const [product, setProduct] = useState(null);
    const [thePics, setPics] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (product === null){
            props.context.getProduct(id).then((promise) => {
                if(promise){
                    setProduct(promise);
                    setPics(props.context.getTargetPhotos(promise, "product"));
                }else{
                    setProduct(promise);
                }
            });
        }

    }, [product]);

    /*let product = localStorage.getItem("vehicle");
    let thePics = localStorage.getItem("thePics");
    
    const result = props.context.getProduct(id);
    
    product = (result === null) ? JSON.parse(product) : result;
    thePics =  (result === null) ? JSON.parse(thePics) : props.context.getTargetPhotos(product.product_id, "product");
    
    localStorage.setItem("product", JSON.stringify(product));
    localStorage.setItem("thePics", JSON.stringify(thePics));*/

    //implement input where items are added in a list ///
    const interior = ['Overhead Airbags','Power Locks','Power Mirrors','Power Windows','Side Airbags'];

    const exterior = ["ABS Brakes","Alloy Wheels","Bed Liner","Running Boards","Tow Hitch","Traction Control"];

    const entertainment = ["AM/FM Stereo", "Auxiliary Audio Input", "CD Audio", "Entune", "Satellite Radio Ready"];

    const technology = ["Bluetooth Technology","Cruise Control","Navigation System","Rear View Camera","Smart Key"];
    
    const comfort = ["Air Conditioning","Cloth Seats"];
    //////////

    console.log(product);
    //console.log(thePics);
    return (
        <div className="hero">
            {product ?
                <div className="hero-container market-content">
                    <div className="product-content">
                        <div className="columns is-multiline">
                            <div className="leftContent column">
                                <ProductImageView product={product} thePics={thePics}/>
                            </div>
                            <div className="rightContent column">
                                <div className="content box">
                                    <ProductDetail product={product} />
                                </div>
                                <hr />
                                <div className="content box">
                                    <ProductFeatures product={product} interior={interior} exterior={exterior} entertainment={entertainment} technology={technology} comfort={comfort}/>
                                </div>
                                <hr />
                                <div className="content box">
                                    <SimilarProduct product={product}/> 
                                </div>
                            </div>
                        </div>
                    </div>
                </div>:
                <div className="hero-container has-text-centered">
                    <div className="hero-body">
                        {product === false ? 
                            <span className="is-size-3" style={{color:"gray"}}>
                                Product is not found !
                            </span>
                            :    
                            <span className="is-size-3" style={{color:"gray"}}>
                                Loading ......
                            </span>
                        }
                    </div>
                </div>
            }
        </div>
    )
}
export default withContext(ViewProduct);