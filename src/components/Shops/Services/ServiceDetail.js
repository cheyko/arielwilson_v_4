import React from 'react';
import ContactModal from "./ContactModal";
import withContext from "../../../withContext";

const ServiceDetail = props =>{

        const { service } = props;

        return (
            <>
                <div id="vehicle-overview" className="container">
                    <strong className="is-size-4" style={{textDecoration:"underline"}}>
                        {service.provider} 
                    </strong>
                    <div className="columns" style={{textAlign:"left",marginTop:'0.5rem'}}>
                        <div className="column">
                            <div className="content">
                                <h1 className="title">{service.title}</h1>    
                                <h3 className="subtitle">{service.category}</h3>
                            </div> 
                            <div className="detail content">
                                <div className="columns">
                                    <div className="column">
                                        <p><small>Price: </small><strong className="is-size-4">${service.price.toLocaleString()}</strong> <small>{service.currency}</small></p>   
                                        <span className="tag"><strong>{service.timetaken}</strong>{" "}</span><small> {service.timeunit} </small>          
                                    </div>
                                    <div className="column">
                                        <p>
                                            <small>Deliverable: </small> <br /> <strong>{service.deliverable}</strong> 
                                            {/*<strong>{product.additional.quantity}</strong>{" "}<small>{product.additional.unit}</small>*/}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div>
                        <p className="has-text-centered">
                            <span> <ContactModal /> </span>
                        </p>
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
                    <div className="procedures">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Procedures </b></p>
                        <p style={{fontWeight:"bold"}}> 
                            <ul>
                                {service.procedures.map((procedure, index) => {
                                    <li key={index}> {procedure} </li>
                                })} 
                            </ul>
                        
                        </p>
                    </div>
                    <div className="descript">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Description</b></p>
                        <p style={{fontStyle:"italic"}}> {service.description} </p>
                    </div>
                </div>
            </> 
        );
}

export default withContext(ServiceDetail);