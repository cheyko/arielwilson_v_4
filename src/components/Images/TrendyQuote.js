import React from "react";
import withContext from "../../withContext";
import "./index";

const TrendyQuote = props =>{
    const {details} = props;
    return (
        <div className="hero">
            <div className="hero-body trendy-body">
                <div className="trendy-container">
                    
                    <div className="trendy-box">
                        <div className="trendy-title">
                            <span>{details.title}</span>
                        </div>
                        
                        <div className="trendy-quote">
                            <i style={{fontSize:"large"}} className="fas fa-quote-left" aria-hidden="true"></i>
                                <span className="description">{details.description}</span>
                            <i style={{fontSize:"large"}} className="fas fa-quote-right" aria-hidden="true"></i>
                        </div> 
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(TrendyQuote);