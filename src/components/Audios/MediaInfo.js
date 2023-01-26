import React from "react";
import withContext from "../../withContext";

const MediaInfo = props => {

    const {details} = props;

    console.log(details.description);

    return (
        <div className="hero">
            <div id="media-info-container" className="hero-body media-info-container">
                <div className="media-info">
                    <span>{details.description.split('\n').map(str => <p>{str}</p>)}</span>
                </div>
            </div>
        </div>
    )
}
export default withContext(MediaInfo);