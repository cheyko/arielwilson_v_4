import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const ProductItem = props => {
  const { product } = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //let imageUrl = props.imageUrl === undefined ? ["default","https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;
  //const url = imageUrl[1];

  /*return(
    <div className="market-pree">
      <div className="box no-margin no-padding">
        <div className="media">
          <div className="media-left no-margin">
            <figure className="image market-image">
                  <img
                    src={url}
                    alt={product.name}
                  />
            </figure>
          </div>
          <div className="media-content">
              <div className="card market-card">
                <div className="card-content">
                
                  <div className="content">
                      <span className="market-title">
                        <b style={{ fontStyle:"italic" }}>
                          {product.name}
                        </b>
                      </span>
                      <br/>
                      <span className="market-price">
                        <strong><span className="tag is-danger is-bold"> ${product.price.toLocaleString()}{" "}{product.currency}</span></strong>
                        </span>
                      </div>

                      <span className="">
                        <strong><span className="tag"> Review</span></strong>
                        
                      </span>
                      <span className="">
                        <strong><span className="tag"> In-Stock</span></strong>
                        
                      </span>
                  </div>
                  <footer className="card-footer">
                      <span className="card-footer-item">
                        <button className="button is-info is-small"
                          onClick={() => 
                              props.addToCart({
                                  id: product.id,
                                  product,
                                  amount:1
                              })}>
                              <span> <i className="fas fa-receipt" aria-hidden="true"></i> Add to Order </span>
                          </button>
                        </span>
                    </footer>
              </div>
                
          </div>

        </div>
      </div>
    </div>
  )*/
  return (
      <div className="card product-card">
        <Link onClick={localStorage.setItem("product", JSON.stringify(product))} className="product-item" to={`/product-view/${product.product_id}`}>
          <div className="card-content">
              
              <div className="content">
                <b className="market-title" style={{ fontStyle:"italic" }}>
                  {product.name}
                </b>
                <br />
                <strong><span className="tag is-danger is-bold"> ${product.price.toLocaleString()}{" "}{product.currency}</span></strong>
                {/*<br/>
                <div>{product.description}</div>*/}
              </div>
          </div>  
          
          <div className="card-image">
              <figure className="image is-square">
                <img
                  src={url}
                  alt={product.name}
                />
              </figure>
          </div>
          <footer className="card-footer">
              <span className="card-footer-item">
                <strong><span className="tag"> Review</span></strong>
                
              </span>
              <span className="card-footer-item">
                <strong><span className="tag"> In-Stock</span></strong>
                
              </span>
            </footer>
          <footer className="card-footer">
              <span className="card-footer-item">
                <button className="button is-info is-small"
                  onClick={() => 
                      props.addToCart({
                          id: product.id,
                          product,
                          amount:1
                      })}>
                      <span> <i className="fas fa-receipt" aria-hidden="true"></i> Add to Order </span>
                  </button>
                </span>
            </footer>
        </Link>
      </div>
  );
};

export default withContext(ProductItem);
