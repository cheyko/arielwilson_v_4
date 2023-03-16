import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const VehicleItem = props => {
  const { vehicle } = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  const {page} = props;
  //let imageUrl = props.imageUrl === undefined ? ["default","https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //const url = imageUrl[1];

  const formatName = (val) => {
    if (page === 'timeline'){
      return val.length > 60 ? val.substring(0,60) + "..." : val;
    }else if ((page === 'home') && (window.screen.width > 1200)){
      return val.length > 50 ? val.substring(0,50) + "..." : val;
    }else if ((page === 'home') && (window.screen.width < 1200) && (window.screen.width > 1000 )){
      return val.length > 30 ? val.substring(0,30) + "..." : val;
    }else if ((page === 'home') && (window.screen.width < 1000) && (window.screen.width > 600) ){
      return val.length > 40 ? val.substring(0,40) + "..." : val;
    }else if ((page === 'home') && (window.screen.width < 600 )){
      return val.length > 50 ? val.substring(0,50) + "..." : val;
    }
    else if ((page === 'list') && (window.screen.width > 1200)){
      return val.length > 60 ? val.substring(0,60) + "..." : val;
    }else if ((page === 'list') && (window.screen.width < 1200) && (window.screen.width >= 1000 )){
      return val.length > 30 ? val.substring(0,30) + "..." : val;
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
      <div className="card vehicle-card">
        <Link onClick={localStorage.setItem("vehicle", JSON.stringify(vehicle))} className="vehicle-item" to={`/vehicle-view/${vehicle.vehicle_id}`}>
          <div className="card-image">
              <figure className="image is-5by3">
                <img
                  src={url}
                  alt={vehicle.make +" "+vehicle.model}
                />
              </figure>
          </div>
          <div className="card-content">
              <b>{formatName(vehicle.year + " " + vehicle.make + " " + vehicle.model)}</b>
              <br />
              <strong><span className="tag is-dark is-bold"> ${vehicle.price.toLocaleString()}{" "}{vehicle.currency}</span></strong>
              <p className="market-title" style={{ fontStyle:"italic" }}>
                <b>{formatName(vehicle.location)}</b>
              </p>
          </div>                 
        </Link>
      </div>
    </div>
  );
};

export default withContext(VehicleItem);
