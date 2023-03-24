import React, {useState, useEffect} from "react";
import withContext from "../../../withContext";
import "./index.css";
import ProductsHome from "./ProductsHome";
import ProductsList from "./ProductsList";
import ProductsSell from "./ProductsSell";
import ProductsRental from "./ProductsRental";
import Categories from "./Categories";

const Products = props => {
   // const [showDropDown, setShowDropDown] = useState(false);
    const {subview} = props;
    const [productsView, setProductsView] = useState(subview);

    useEffect(() => {
        setProductsView(subview);
    },[subview]);

    return(
        <div className="shops-container">
            <div className="products">
                <div className="sub-content"> {/*onClick={e => setShowDropDown(false)}*/}
                    {productsView === "ProductsHome" && 
                        <div className="content">
                            <ProductsHome setProductsView={setProductsView}/>
                        </div>
                    }
                    {productsView === "ProductStalls" && 
                        <div className="content">
                            <div className="box">
                                <h1> Stalls List</h1>
                            </div>
                        </div>
                    }
                    {productsView === "ProductsCategories" && 
                        <div className="content">
                            <Categories />
                        </div>
                    }
                    {productsView === "ProductsBuy" && 
                        <div className="content">
                            <ProductsList productsView={productsView} setProductsView={setProductsView} />
                        </div>
                    }
                    {productsView === "ProductsRental" && 
                        <div className="content">
                            <ProductsRental />
                        </div>
                    }
                    {productsView === "ProductsSell" && 
                        <div className="content">
                            <ProductsSell />
                        </div>
                    
                    }
                    {productsView === "ProductsWH" && 
                        <div className="content">
                            <div className="box">
                                <h1>Products-WH</h1>
                            </div>
                            
                        </div>
                    }
                    {productsView === "ProductsInfo" && 
                        <div className="content">
                            <div className="box">
                                <h1>Products-Partnerships</h1>
                            </div>
                        </div>
                    }
                    {productsView === "ProductsPS" && 
                        <div className="content">
                            <div className="box">
                                <h1>Products-I</h1>
                            </div>
                        </div>
                    }
                </div>
            
            </div>
        </div>
    )
}
export default withContext(Products);