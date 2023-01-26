import React, { useState } from "react";
import withContext from "../../withContext";
import Lightbox from 'react-image-lightbox';

const TrendyImage = props =>{
    const {details} = props;
    const {temp_url} = props;
    const [openImage, setOpen] = useState(false);
    
    return (
        <div className="hero">
        <div className="hero-body trendy-body">
            <div className="trendy-container">
                
                <div className="trendy-box">
                    <div className="trendy-title">
                        <span>{details.title}</span>
                    </div>
                    
                    <div className="trendy-image">
                        <figure className="image">
                            <img src={temp_url} alt="upload" onClick={e => setOpen(true)} />
                            {openImage && (
                                <Lightbox
                                    imageTitle={details.title}
                                    mainSrc={temp_url}
                                    onCloseRequest={() => setOpen(false)}
                                />
                            )}
                        </figure>
                    </div> 
                </div>
            </div>
        </div>
    </div>
    )
}
export default withContext(TrendyImage);