import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const Item = props => {
  const { item } = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //let imageUrl = props.imageUrl === undefined ? ["default","https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //const url = imageUrl[1];
  return (
      <div className="card item-card">
        <Link onClick={localStorage.setItem("item", JSON.stringify(item))} className="service-item" to={`/item-view/${item.item_id}`}>
          <div className="card-content">
              
              <div className="content">
                <b style={{ fontStyle:"italic" }}>
                  {item.name}
                </b>
                <br />
                <strong><span className="tag is-danger is-bold"> ${item.price.toLocaleString()}{" "}{item.currency}</span></strong>
              </div>
          </div>  
          
          <div className="card-image">
              <figure className="image is-1by1">
                <img
                  src={url}
                  alt={item.name}
                />
              </figure>
          </div>
          <footer className="card-footer">
              <span className="card-footer-item">
                <button className="button is-info"
                  onClick={() => 
                      props.addToCart({
                          id: item.id,
                          item,
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

export default withContext(Item);
