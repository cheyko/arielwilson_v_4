
import React from "react";
import withContext from "../../withContext";

const Categories = props => {

    const testArray = [1,2,3,4,5,6,7,8,9,10,11,12];

    return (
        <div className="hero">

            <hr className="info-seperator" />

            <div className="hero-contain">
                <div className="page-header">
                    <div className="content">
                        <div className="field">
                            <span className="control has-icons-left has-icons-right">
                                <input className="input" type="text" placeholder="Search" />
                                <span className="icon is-small is-left">
                                <i className="fas fa-search"></i>
                                </span>
                                
                            </span>
                        </div>
                    </div>
                </div>
                <div className="container">
                    <div className="categories-list">
                        <div className="columns is-multiline is-mobile">
                            {testArray.map((val,index) => (
                                <div className="column is-full-mobile is-half-tablet">    
                                    <div className="card">
                            
                                        <div className="card-image">
                                            <figure className="image is-4by3">
                                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                            </figure>
                                        </div>
                                        <div className="card-content">
                                            <h1 className="subtitle"><strong>Category Title</strong></h1>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
export default withContext(Categories);
