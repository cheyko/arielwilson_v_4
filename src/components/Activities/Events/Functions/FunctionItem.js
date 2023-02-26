import { useState } from "react";

const FunctionItem = props => {
    const [isChecked, setVal] = useState(false);
    const isFree = true;

    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        //isChecked ? console.log(isChecked) : console.log("test") ;
    }

    return(
        <div class="card">
        <div class="card-content">
            <h1 className="subtitle"><strong>This is the Title of the Function</strong></h1>
        </div>
        <div class="card-image">
            <figure class="image is-4by3">
            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
            </figure>
        </div>
        <div class="card-content">
            <div class="content">
                <div className="rows">
                    <div className="row">
                        <b>Dress Code : </b> <small>Formal</small>
                    </div>
                    <hr className="info-seperator" />
                    <div className="row">
                        <b>Venue : </b> <small>UWI BOWL</small> <br/>
                        <b>Address : </b> <small>10 New Street, Kingston 6.</small>
                    </div>
                    <hr className="info-seperator" />
                    <div className="row">
                        <b>Date : </b><time datetime="2016-1-1">1 Jan 2016, 10:00PM - 2 Jan 2016, 4:00AM</time>
                    </div>
                    <hr className="info-seperator" />
                    <div className="row">
                        <b>Entry : </b> <small>Invitation</small> {" "} <span className="tag is-warning"><strong>free</strong></span> <br /><br />
                        {isFree ? <span></span> : <button className={`button ${isChecked === true ? "is-success" : "is-info"}`}> {isChecked === true ? "Trade Ticket" : "Buy Ticket"}</button>}
                        {" "}
                        <label className="switch">
                            <input onChange={ e => handleToggleChange(e) } id="response_value" type="checkbox" />
                            <div className="slider round" >
                                <span className="on">Invited</span>
                                <span className="off">No - Invitation</span>
                            </div>
                        </label>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}
export default FunctionItem;