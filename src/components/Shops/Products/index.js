import React, {useState, useEffect} from "react";
import withContext from "../../../withContext";
import "./index.css";
import ProductsHome from "./ProductsHome";
import ProductsList from "./ProductsList";
import ProductsSell from "./ProductsSell";
import ProductsRental from "./ProductsRental";
import Categories from "./Categories";

const Products = props => {
    const [showDropDown, setShowDropDown] = useState(false);

    const [ProductsView, setProductsView] = useState('ProductsHome');
    const [showProductsHome , setShowProductsHome] = useState(true);
    const [showCategories, setShowCategories] = useState(false);
    const [showProductsList, setShowProductsList] = useState(false);
    const [showProductsR, setShowProductsR] = useState(false);
    const [showProductsST, setShowProductsST] = useState(false);
    const [showProductsS, setShowProductsS] = useState(false);
    const [showProductsWH, setShowProductsWH] = useState(false);
    const [showProductsPS, setShowProductsPS] = useState(false);
    const [showProductsI, setShowProductsI] = useState(false);
    const [showVendors, setShowVendors] = useState(false);

    useEffect( () => {

        if (showProductsList){
            //filter based on the View

        }

        //set current to local storage. 
    
    },[showProductsList]);

    const deactivate = () => {
        switch(ProductsView){
            case 'ProductsST':
                setShowProductsST(false);
                break;
            case 'Categories':
                setShowCategories(false);
                break;
            case 'ProductsBuy':
                setShowProductsList(false);
                break;
            case 'ProductsRental':
                setShowProductsR(false);
                break;
            case 'ProductsSell':
                setShowProductsS(false);
                break;
            case 'ProductsWH':
                setShowProductsWH(false);
                break;
            case 'ProductsPS':
                setShowProductsPS(false);
                break;
            case 'ProductsI':
                setShowProductsI(false);
                break;              
            default:
                setShowProductsHome(false);
                break;
        }
    }

    return(
        <div className="shops-container">
            <div className="products">
                <div className="card fixed-card">
                    <div className="products-tabs tabs is-centered">
                        <ul>
                            <li className={`tabs-btn button ${showProductsHome ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setProductsView('ProductsHome');
                                    setShowProductsHome(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-shopping-cart" aria-hidden="true"></i></span> 
                                </span>
                            </li>
                            <li className={`tabs-btn button ${ProductsView === "ProductsBuy" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setProductsView('ProductsBuy');
                                    setShowProductsList(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-normal"><i style={{fontSize:"x-large"}} className="fas fa-shopping-basket" aria-hidden="true"></i></span>
                                    <span className="tabs-title">BUY</span>  
                                </span>
                            </li>
                            <li className={`tabs-btn button ${showProductsST? "is-active" : "is-not-active"}`}
                                onClick={ () => {
                                    deactivate();
                                    setProductsView('ProductsST');
                                    setShowProductsST(true);
                                    setShowDropDown(false);
                            }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-store-alt" aria-hidden="true"></i></span>
                                    <span className="tabs-title">STALLS</span>  
                                </span>
                            </li>

                            <li className={`tabs-btn button ${ProductsView === "ProductsRental" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setProductsView('ProductsRental');
                                    setShowProductsR(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-dolly" aria-hidden="true"></i></span>
                                    <span className="tabs-title">RENTALS</span>   
                                </span>
                            </li>

                            <li className={`tabs-btn button ${ProductsView === "ProductsSell" ? "is-active" : "is-not-active"}`}
                                onClick={e => {
                                    setShowDropDown(false);
                                    deactivate();
                                    setProductsView('ProductsSell');
                                    setShowProductsS(true);
                                }}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-money-check-alt" aria-hidden="true"></i></span>
                                    <span className="tabs-title">SELL</span>  
                                </span>
                            </li>

                            <li onClick={e => setShowDropDown(!showDropDown)} className={`tabs-btn button ${showProductsWH || showProductsI || showProductsPS || showCategories ? "is-active" : "is-not-active"}`}>
                                <span className="reaction-btn">
                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-plus" aria-hidden="true"></i></span>
                                </span>
                            </li>
                        </ul>
                    </div>  
                </div> 
                <div className="additional-tabs container" style={{height:"0rem"}}>
                    <div className="columns">              
                        <div className="column">

                        </div>
                        <div className="column is-4">
                            {showDropDown &&
                                <div className="plus-tabs">
                                    <br /> 
                                    <div className="box tabs-box">
                                        <ul>
                                            <li className={`tabs-btn button ${ProductsView === "Vendors" ? "is-active" : "is-not-active"}`}
                                                onClick={e => {
                                                    setShowDropDown(false);
                                                    deactivate();
                                                    setProductsView('Vendors');
                                                    setShowVendors(true);
                                                }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-balance-scale" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">VENDORS</span>  
                                                </span>
                                            </li>
                                            <li className={`tabs-btn button ${ProductsView === "Categories" ? "is-active" : "is-not-active"}`}
                                                onClick={e => {
                                                    setShowDropDown(false);
                                                    deactivate();
                                                    setProductsView('Categories');
                                                    setShowCategories(true);
                                                }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-pallet" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">CATEGORIES</span>  
                                                </span>
                                            </li>
                                             
                                            <li className={`tabs-btn button ${showProductsWH ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setProductsView('ProductsWH');
                                                setShowProductsWH(true);
                                                setShowDropDown(false);
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-garage" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">WH</span>  
                                                </span>
                                            </li> 
                                            

                                            <li className={`tabs-btn button ${showProductsI ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setProductsView('ProductsI');
                                                setShowProductsI(true);
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-info-circle" aria-hidden="true"></i></span>
                                                    <span className="tabs-title">JS-INFO</span>  
                                                </span>
                                            </li> 

                                            <li className={`tabs-btn button ${showProductsPS ? "is-active" : "is-not-active"}`}
                                            onClick={ () => {
                                                deactivate();
                                                setProductsView('ProductsPS');
                                                setShowProductsPS(true);
                                                setShowDropDown(false);
                                                
                                            }}>
                                                <span className="reaction-btn">
                                                    <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-handshake" aria-hidden="true"></i></span>
                                                    {" "}<span className="tabs-title">JS-Partnerships</span>  
                                                </span>
                                            </li> 
                                        </ul>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
                <div className="sub-content" onClick={e => setShowDropDown(false)}>
                    {showProductsHome && 
                        <div className="content">
                            <ProductsHome setShowProductsHome={setShowProductsHome} setShowProductsList={setShowProductsList} setProductsView={setProductsView}/>
                        </div>
                    }
                    {showProductsST && 
                        <div className="content">
                            <h1> Stalls List</h1>
                        </div>
                    }
                    {showCategories && 
                        <div className="content">
                            <Categories />
                        </div>
                    }
                    {showProductsList && 
                        <div className="content">
                            <ProductsList ProductsView={ProductsView} setProductsView={setProductsView} />
                        </div>
                    }
                    {showProductsR && 
                        <div className="content">
                            <ProductsRental />
                        </div>
                    }
                    {showProductsS && 
                        <div className="content">
                            <ProductsSell />
                        </div>
                    
                    }
                    {showVendors && 
                        <div className="content">
                            <h1>Show Vendors</h1>
                        </div>
                    }
                    {showProductsWH && 
                        <div className="content">
                            <h1>Products-WH</h1>
                        </div>
                    }
                    {showProductsPS && 
                        <div className="content">
                            <h1>Products-Partnerships</h1>
                        </div>
                    }
                    {showProductsI && 
                        <div className="content">
                            <h1>Products-I</h1>
                        </div>
                    }
                </div>
            
            </div>
        </div>
    )
}
export default withContext(Products);