import React from "react";
import withContext from "../../withContext";

const Countries = props => {
    const country = props.filterCountry;

    const testArray = [1,2,3,4,5,6,7,8,9,10,11,12];

    return (
        <div className="hero">
            {country}
            <hr />
            <button className="button" onClick={e => props.setCountryValue("Angola")}> Test</button>

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
                    <div className="countries-list">
                        <div className="columns is-multiline is-mobile">
                            {testArray.map((val,index) => (
                                <div className="column is-full-mobile is-half-tablet">    
                                    <div className="box">
                                        <div className="media">
                                            <div className="media-left">
                                                <figure className="image is-64x64">
                                                    <img
                                                        src="https://bulma.io/images/placeholders/128x128.png"  
                                                        alt="PlaceHolder"
                                                    />
                                                </figure>
                                            </div>
                                            <div className="media-content">
                                                <div className="country-name">
                                                    <b style={{ textTransform: "capitalize" }}>
                                                        Algeria
                                                    </b>
                                                </div>
                                                <div className="country-headline">
                                                    <small>Main Headline for respective country with respects to Section. </small>
                                                </div>
                                            </div>
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
export default withContext(Countries);
