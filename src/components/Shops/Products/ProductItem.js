import React from "react";
import {Link} from "react-router-dom";
import withContext from "../../../withContext";

const ProductItem = props => {
  const { product } = props;
  const {page} = props;
  const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;

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
                <div className="market-title">
                  <b style={{ fontStyle:"italic" }}>
                    {formatName(product.name)}
                  </b>
                  <br />
                  <strong><span className="tag is-danger is-bold"> ${product.price.toLocaleString()}{" "}{product.currency}</span></strong>
                
                </div>
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
                <strong><span className="tag">5 left in stock</span></strong>
                
              </span>
            </footer>
          <footer className="card-footer">
              <span className="card-footer-item">
                <button className="button is-info"
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
