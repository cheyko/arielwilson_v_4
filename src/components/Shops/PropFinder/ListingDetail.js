import React from 'react';
import Map from "../../HelperComponents/Map";
import MapModal from '../../HelperComponents/MapModal';
import ContactModal from "./ContactModal";
import TourModal from "./TourModal";

const ListingDetail = props =>{

        const { listing } = props;

        return (
            <>
                <div id="listing-overview" className="container">
                    <strong style={{textDecoration:"underline"}}>
                            <h4><b style={{ textTransform: "capitalize" }}>{listing.typeOf}</b> for <b>{listing.category}</b></h4>
                    </strong>
                    <div className="columns listing-detail is-multiline" style={{textAlign:"left",marginTop:'0.5rem'}}>
                        <div className="column">
                            <div className="address">
                                

                                <h4 className="title">{listing.title !== "" ? listing.title : ""} </h4>

                                <h4 className="subtitle">{listing.address}</h4>               
                            </div> 
                            <div className="detail">
                                <div className="column">
                                    <p><small>Price: </small><strong className="is-size-4">${listing.price.toLocaleString()}</strong> <small>{listing.currency}</small></p>  
                                    <strong>Est. payment:</strong>{" "}<strong>$4,075</strong><small>/mo</small> 
                                    <br /><br /> 
                                    <p>
                                        <strong>{listing.beds}</strong>{" "}<small>bedroom(s)</small>{" "}{"|"}{" "}
                                        <strong>{listing.baths}</strong>{" "}<small>bathroom(s)</small>
                                    </p>
                                    <p>
                                        <strong>{listing.insideSqft}</strong>{" "}<small>sqft</small>{" "}{"|"}{" "}
                                        <strong>{listing.lotSqft}</strong>{" "}<small>lot-sqft</small>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="container listing-map">
                                <Map height={"250rem"} fullAddr={listing.address}/>
                                <MapModal fullAddr={listing.address} />
                            </div>
                        </div>
                    </div>
                    <div className="columns is-mobile">
                        <div className="column has-text-centered">
                            <span>
                                <ContactModal /> 
                            </span>
                        </div>
                        <div className="column has-text-centered">
                            <span>
                                 
                                <TourModal />
                            </span>
                        </div>
                    </div>
                    <div className="descript">
                        <p className="has-text-centered"><b style={{textDecoration:"underline"}}> Description</b></p>
                        <p style={{fontStyle:"italic"}}> {listing.description}</p>
                    </div>
                </div>
            </> 
        );
}




export default ListingDetail;