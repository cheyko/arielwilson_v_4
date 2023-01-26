import React from "react";
import withContext from "../../withContext";

const Cities = props => {
    const city = props.filterCity;

    return (
        <div>
            {city}
            <hr />
            <button className="button" onClick={e => props.setCityValue("Prague")}> Test</button>
        </div>
    )
}
export default withContext(Cities);
