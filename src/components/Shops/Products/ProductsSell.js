import React from "react";
import withContext from '../../../withContext';
import "./index.css";
import ProductsAdd from "./ProductsAdd";

const ProductsSell = props => {

    return (
        <div className="hero sub-container">
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Product Shop </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> Join this wonderful e-Commerce platform </p>
                    </div>
                    <div className="content has-text-centered">
                        <ProductsAdd />
                    </div>
                </div>
            </div>
            
            <hr/>
            
            <div className="hero-body">
                <div className="body">
                    <div className="content has-text-centered">
                        <h1> Pay as You Use ! </h1>
                    </div>
                    <div className="content">
                        <p className="subtitle"> List Products for Rentals </p>
                    </div>
                    <div className="content has-text-centered">
                        <button className="button is-large is-link"> Add Product Rental </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(ProductsSell);