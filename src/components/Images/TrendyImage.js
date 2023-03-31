import React, { useState } from "react";
import withContext from "../../withContext";
import Lightbox from 'react-image-lightbox';

const TrendyImage = props =>{
    const {details} = props;
    const {temp_url} = props;
    const [openImage, setOpen] = useState(false);

    /*useEffect(() => {
        let image = document.getElementById("img");
        let figure = document.getElementById("figure");
        console.log(image.naturalWidth);
        console.log(image.naturalHeight);

        if(image.naturalWidth/image.naturalHeight < 0.8){
            figure.classList.add("portrait");
        }else if(image.naturalWidth/image.naturalHeight >= 0.8 && image.naturalWidth/image.naturalHeight < 1.2){
            figure.classList.add("square");
        }else{
            figure.classList.add("landscape");
        }
    })*/
    
    return (
        <div className="hero">
        <div className="trendy-body">
            <div className="trendy-container">
                
                <div className="trendy-box">
                    <div className="trendy-title">
                        <span>{details.title} &nbsp;by:&nbsp; {details.artist}</span>
                    </div>
                    <br />
                    
                    <div className="trendy-image">
                        <figure id="figure" className="image">
                            <img id="img" src={temp_url} alt="upload" onClick={e => setOpen(true)} />
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