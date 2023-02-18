import React from 'react';
import ContactModal from "./ContactModal";
import withContext from "../../../withContext";

const ProductDetail = props =>{

        const { product } = props;

        return (
            <>
                <div id="vehicle-overview" className="container">
                    <strong className="is-size-4" style={{textDecoration:"underline"}}>
                        {product.brand}
                    </strong>
                    <div className="columns" style={{textAlign:"left",marginTop:'0.5rem'}}>
                        <div className="column">
                            <div className="content">
                                <h1 className="title">{product.name}</h1>    
                                <h3 className="subtitle">{product.category}</h3>
                            </div> 
                            <div className="detail content">
                                <div className="columns">
                                    <div className="column">
                                        <p><small>Price: </small><strong className="is-size-4">${product.price.toLocaleString()}</strong> <small>{product.currency}</small></p>   
                                        <span className="tag"><strong>{product.condition}</strong>{" "}</span><small> {product.typeOf} </small>          
                                    </div>
                                    <div className="column">
                                        <p>
                                            <small>Quantity: </small> <br /> <strong>10</strong>{" "}<small>lbs</small>
                                            {/*<strong>{product.additional.quantity}</strong>{" "}<small>{product.additional.unit}</small>*/}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div className="has-text-centered">
                            <span> <ContactModal /> </span>
                        </div>
                    </div>
                    <br />
                    <div className="rows">
                        <div className="row">
                           {product.color && <> <b> Color : </b> <span> {product.color}  </span> </>}
                        </div>
                        <hr />
                        <div className="row">
                            {product.location && <> <b> Location : </b> <span> {product.location}  </span> </>}
                        </div>
                        <hr />
                        <div className="row">
                            {product.year && <> <b> Year : </b> <span> {product.year}  </span> </>}
                        </div>
                        <hr />
                    </div>
                    <div className="descript">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Description</b></p>
                        <p style={{fontStyle:"italic"}}> {product.description} </p>
                    </div>
                </div>
            </> 
        );
}

export default withContext(ProductDetail);