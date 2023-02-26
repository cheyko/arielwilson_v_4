import { useState } from "react";

const PartyItem = props => {
    return(
        <div className="card">
                            
            <div className="card-image">
                <figure className="image is-4by3">
                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                </figure>
            </div>
            <div className="card-content">
                <h1 className="subtitle"><strong>This is the Title of the Party</strong></h1>
            </div>
        </div>
    )
}

export default PartyItem;