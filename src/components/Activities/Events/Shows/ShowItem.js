import { useState } from "react";

const ShowItem = props => {

    const [isChecked, setVal] = useState(false);
    
    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        //isChecked ? console.log(isChecked) : console.log("test") ;
    }

    return (
        <div class="content">
            <div className="rows">
                <div className="row">
                    <b>Theme : </b> <small>90'S</small>
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
                    <b>Entry : </b> <small>Purchase E-Ticket </small> {" "} <span className="tag is-warning"><strong>$1000</strong></span> <br /><br />
                    <button className={`button ${isChecked === true ? "is-success" : "is-info"}`}> {isChecked === true ? "Trade Ticket" : "Buy Ticket"}</button>
                    {" "}
                    <label className="switch">
                        <input onChange={ e => handleToggleChange(e) } id="response_value" type="checkbox" />
                        <div className="slider round" >
                            <span className="on">Aquired</span>
                            <span className="off">Not - Aquired</span>
                        </div>
                    </label>
                </div>
            </div>
        </div>
    )
}
export default ShowItem;