import React from 'react';
import ContactModal from "./ContactModal";
import withContext from "../../../withContext";

const ItemDetail = props =>{

        const { item } = props;

        return (
            <>
                <div id="vehicle-overview" className="container">
                    <strong className="is-size-4" style={{textDecoration:"underline"}}>
                        {/*item.brand*/} SPOT
                    </strong>
                    <div className="columns" style={{textAlign:"left",marginTop:'0.5rem'}}>
                        <div className="column">
                            <div className="content">
                                <h1 className="title">{item.name}</h1>    
                                <b className="subtitle">{item.category}</b> {" "} 
                                <span className="tag"><strong>{item.typeOf}</strong>{" "}</span> 
                            </div> 
                            <div className="detail content">
                                <div className="columns">
                                    <div className="column">
                                        <p><small>Price: </small><strong className="is-size-4">${item.price.toLocaleString()}</strong> <small className="tag">{item.currency}</small></p>           
                                    </div>
                                    <div className="column">
                                        <p>
                                            <small>Calories: </small> <span className="tag"><strong>{item.calories}</strong>{" "}</span> 
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
                    {/*<div className="rows">
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
                    </div>*/}
                    <div className="ingredients">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Ingredients</b></p>
                        <div style={{fontWeight:"bold"}}> 
                            <ul>
                                {item.ingredients.map((ingredient, index) => {
                                    <li key={index}> {ingredient}</li>
                                })} 
                            </ul>
                        
                        </div>
                    </div>
                    <div className="descript">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Description</b></p>
                        <p style={{fontStyle:"italic"}}> {item.description} </p>
                    </div>
                </div>
            </> 
        );
}

export default withContext(ItemDetail);