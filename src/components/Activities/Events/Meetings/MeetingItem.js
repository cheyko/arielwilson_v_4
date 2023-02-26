import { useState } from "react";

const MeetingItem = props => {

    const handleToggleChange = (e) => {
        var isChecked = document.getElementById("response_value").checked;
        console.log(isChecked);
    }

    return (
        <div className="box">   
            <div className="columns">
                <div className="column">
                    <b>Status : </b> {" "} <span> On Schedule </span>
                </div>
                <div className="column">
                    <b>Response : </b> {" "} 
                
                    <label className="switch">
                        <input onChange={ e => handleToggleChange(e) } id="response_value" type="checkbox" />
                        <div className="slider round" >
                            <span className="on">Attending</span>
                            <span className="off">Not - Attending</span>
                        </div>
                    </label>
                        
                </div>
            </div>
            <div className="media">
                <div className="media-left">
                    <figure className="image is-64x64">
                        <img
                            src="https://bulma.io/images/placeholders/128x128.png"
                            alt="test"
                        />
                    </figure>
                </div>
                <div className="media-content">
                    <p><b><em>This is the Title </em> </b> </p>
                    <p><small> This is a small description of meeting. </small></p>
                    <div className="columns">
                        <div className="column">
                            <b> Category: </b> <span>Sample</span> <br />
                            <b> Place: </b> <span>Sample</span>    
                        </div>
                        <div className="column">
                            <b> Date: </b> <span>Sample</span>  <br />
                            <b> Attendees: </b> <span>Sample</span>    
                        </div>  
                    </div>
                </div>
            </div>
            {/*<div class="media">
                <b> Host : </b> &nbsp;
                <div class="media-left">
                    <figure class="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder image" />
                    </figure>
                </div>
                <div class="media-content">
                    <span class="title is-4">John Smith</span> {" "}
                    <span class="subtitle is-6">@johnsmith</span>
                </div>
            </div>*/}
        </div>
    )
}
export default MeetingItem;