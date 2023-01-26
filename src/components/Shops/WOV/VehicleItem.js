import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const VehicleItem = props => {
  const { vehicle } = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //let imageUrl = props.imageUrl === undefined ? ["default","https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //const url = imageUrl[1];
  return (
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
              <p style={{ fontStyle:"italic" }}>
                <b>{vehicle.year}{" "}{vehicle.make}{" "}{vehicle.model}</b>
                <br />
                <strong><span className="tag is-dark is-bold"> ${vehicle.price.toLocaleString()}{" "}{vehicle.currency}</span></strong>
              </p>
          </div>                 
        </Link>
      </div>
  );
};

export default withContext(VehicleItem);
