import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const PFLItem = props => {
  const { listing } = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //let imageUrl = props.imageUrl === undefined ? ["default","https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //const url = imageUrl[1];
  return (
      <div className="card listing-card">
        <Link onClick={localStorage.setItem("listing", JSON.stringify(listing))} className="listing-item" to={`/listing-view/${listing.listing_id}`}>
          <div className="card-image">
              <figure className="image is-1by1">
                <img
                  src={url}
                  alt={listing.title}
                />
              </figure>
          </div>
          <div className="card-content">
              <span style={{ fontStyle:"italic" }}>
                {listing.typeOf}{" "} for {listing.category}{" "} 
              </span>
              <br />
              <strong><span className="tag is-dark is-bold"> ${listing.price.toLocaleString()}{" "}{listing.currency}</span></strong>
              <br/>
              <b style={{ textTransform: "capitalize" }}>
                {listing.title === "" ? listing.address : listing.title + " - " + listing.address }
              </b>
              <div className="media">
                <div className="media-content">
                  <small>{listing.beds + " Bed"} | {listing.baths + " Bath"} </small>
                  <br/>
                  <small>{listing.insideSqft + " building Sqft"} | {listing.lotSqft + " lot Sqft"} </small>
                </div>
              </div>
          </div>    
        </Link>
      </div>
  );
};

export default withContext(PFLItem);
