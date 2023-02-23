import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const ServiceItem = props => {
  const { service } = props;
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
      <div className="card service-card">
        <Link onClick={localStorage.setItem("item", JSON.stringify(service))} className="service-item" to={`/service-view/${service.service_id}`}>
          <div className="card-content">
              
              <div className="content">
                <div className="market-title" style={{color:"yellow"}}>
                  <b style={{ fontStyle:"italic" }}>
                    {formatName(service.title)}
                  </b>
                  <br />
                  <strong><span className="tag is-danger is-bold"> ${service.price.toLocaleString()}{" "}{service.currency}</span></strong>
                  <br />
                  <b style={{ fontStyle:"italic" }}>
                    {formatName(service.address)}
                  </b>
                </div>
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
            <span className="card-footer-item">
              <button className="button is-info"
                onClick={() => 
                    props.addToCart({
                        id: service.id,
                        service,
                        amount:1
                    })}>
                <span> <i className="fas fa-file" aria-hidden="true"></i> Request Quote </span>
              </button>
            </span>
            </footer>
            {/*<footer className="card-footer">
            <span className="card-footer-item">
              <button className="button is-info"
                onClick={() => 
                    props.addToCart({
                        id: service.id,
                        service,
                        amount:1
                    })}>
                <span> <i className="fas fa-receipt" aria-hidden="true"></i> Request Service </span>
              </button>
            </span>
                  </footer>*/}
        </Link>
      </div>
  );
};

export default withContext(ServiceItem);
