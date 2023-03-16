import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const PFLItem = props => {
  const { listing } = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  const {page} = props;
  //let imageUrl = props.imageUrl === undefined ? ["default","https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //const url = imageUrl[1];

  const formatName = (val) => {
    if (page === 'timeline'){
      return val.length > 60 ? val.substring(0,60) + "..." : val;
    }else if ((page === 'home') && (window.screen.width >= 1200)){
      return val.length > 50 ? val.substring(0,50) + "..." : val;
    }else if ((page === 'home') && (window.screen.width < 1200) && (window.screen.width >= 1000 )){
      return val.length > 40 ? val.substring(0,40) + "..." : val;
    }else if ((page === 'home') && (window.screen.width < 1000) && (window.screen.width >= 600) ){
      return val.length > 50 ? val.substring(0,50) + "..." : val;
    }else if ((page === 'home') && (window.screen.width < 600 )){
      return val.length > 50 ? val.substring(0,50) + "..." : val;
    }
    else if ((page === 'list') && (window.screen.width > 1200)){
      return val.length > 60 ? val.substring(0,60) + "..." : val;
    }else if ((page === 'list') && (window.screen.width < 1200) && (window.screen.width >= 1000 )){
      return val.length > 40 ? val.substring(0,40) + "..." : val;
    }else if ((page === 'list') && (window.screen.width < 1000) && (window.screen.width >= 600) ){
      return val.length > 60 ? val.substring(0,60) + "..." : val;
    }else if ((page === 'list') && (window.screen.width < 600 ) && (window.screen.width >= 425)){
      return val.length > 30 ? val.substring(0,30) + "..." : val;
    }else if ((page === 'list') && (window.screen.width < 425)){
      return val.length > 60 ? val.substring(0,60) + "..." : val;
    }
  }

  return (
    <div className="market-card">
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
              <div className="market-title">
                <strong><span className="tag is-dark is-bold"> ${listing.price.toLocaleString()}{" "}{listing.currency}</span></strong>
                <br/>
                <b style={{ textTransform: "capitalize" }}>
                  {listing.title === "" ? formatName(listing.address) : formatName(listing.title + " - " + listing.address)}
                </b>
              </div>
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
    </div>
  );
};

export default withContext(PFLItem);
