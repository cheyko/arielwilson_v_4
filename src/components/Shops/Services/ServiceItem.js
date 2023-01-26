import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const ServiceItem = props => {
  const { service } = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //let imageUrl = props.imageUrl === undefined ? ["default","https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //const url = imageUrl[1];
  return (
      <div className="card service-card">
        <Link onClick={localStorage.setItem("item", JSON.stringify(service))} className="service-item" to={`/service-view/${service.service_id}`}>
          <div className="card-content">
              
              <div className="content">
                <b style={{ fontStyle:"italic" }}>
                  {service.title}
                </b>
                <br />
                <strong><span className="tag is-danger is-bold"> ${service.price.toLocaleString()}{" "}{service.currency}</span></strong>
                <br/>
                <div>{service.description}</div>
              </div>
          </div>  
          
          <div className="card-image">
              <figure className="image is-1x1">
                <img
                  src={url}
                  alt={service.name}
                />
              </figure>
          </div>
          <footer className="card-footer">
              {/*<span className="card-footer-item">
                  <button className="button is-small">
                      <span> <i style={{fontSize:"x-large"}} className="fas fa-eye" aria-hidden="true"></i> View </span>
                  </button>
              </span>*/}
              <span className="card-footer-item">
                <button className="button is-info"
                  onClick={() => 
                      props.addToCart({
                          id: service.id,
                          service,
                          amount:1
                      })}>
                      <span> <i style={{fontSize:"x-large"}} className="fas fa-receipt" aria-hidden="true"></i> Add to Order </span>
                  </button>
                </span>
            </footer>
        </Link>
      </div>
  );
};

export default withContext(ServiceItem);
