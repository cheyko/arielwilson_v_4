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
                                <p> {service.address} </p>
                            </div> 
                            <div className="detail content">
                                <div className="columns is-mobile">
                                    <div className="column">    
                                        <p>
                                            <small>Price: </small><strong className="is-size-4">${service.price.toLocaleString()}</strong> <small>{service.currency}</small> &nbsp;
                                            {service.price_contingency !== "" && <span>per: <b className="is-size-6 tag">{" "}{service.price_contingency} </b></span>}   
                                        </p>
                                        <p>
                                            <span className="tag"><strong>{service.timetaken}</strong>{" "}</span><small> {service.timeunit} </small> &nbsp;
                                            {service.time_contingency !== "" && <span>per: <strong className="is-size-6 tag">{" "}{service.time_contingency} </strong></span>}   
                                        
                                        </p>  
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
                    <div className="procedures">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Procedures </b></p>
                        <div style={{fontWeight:"bold"}}> 
                            <ul>
                                {service.procedures.length === 1 && service.procedures[0] === '' ? 
                                    <li> No specifics </li>:
                                    <>
                                        {service.procedures.map((procedure, index) => 
                                            <li key={index}> {procedure} </li>
                                        )} 
                                    </>
                                    
                                }
                            </ul>
                        </div>
                    </div>
                    <div className="descript">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Description</b></p>
                        <p style={{fontStyle:"italic"}}> {service.description} </p>
                    </div>
                    <br />
                    <div className="requirements">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Requirements</b></p>
                        <p style={{fontStyle:"italic"}}> {service.requirements} </p>
                    </div>
                </div>
            </> 
        );
}

export default withContext(ServiceDetail);