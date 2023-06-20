import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ShopCategories = props => {
    let {subsection} = useParams();
    const [selected, setSelected] = useState([]);
    let navigate = useNavigate();

    const viewcategory = (category) => {
        switch(subsection){
            case "realestate":
                localStorage.setItem("shopView","propfinder");
                localStorage.setItem("subview","PFAll");
                localStorage.setItem("PFType", category);
                navigate("/shops");
                break;
            default:
                break;
        }
    }

    useEffect(() => {
        switch(subsection){
            case "realestate":
                let REtypes = ["house","apartment","townhouse","residential","commercial","office","building","villa"];
                setSelected(REtypes);
                break;
            default:
                break;
        }
    },[subsection])

    return(

        <div className="hero">
            <div className="hero-container">
                <div className="has-text-centered">
                    <h1 className="title"> Categories </h1>
                </div>
                <br/>
                <div className="columns is-multiline is-mobile">
                    {selected.map((category, index) => 
                        <div key={index} className="column is-half-desktop is-half-tablet is-full-mobile">
                            <div className="card mx-1" onClick={e => viewcategory(category)}>
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src={`${process.env.PUBLIC_URL}/images/defaults/prop-finder/${category}.jpg`} alt="Placeholder" />
                                        <h1 className="tag caption-tag"> 
                                            <span className="tag is-large is-capitalized date-caption">{category}</span> 
                                        </h1>
                                    </figure>
                                </div>
                            </div>
                        </div>

                    )}    
                </div>
            </div>
        </div>
    )
    
}
export default ShopCategories;