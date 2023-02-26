import { useEffect } from "react";
import { useState } from "react";
import $ from "jquery";

const PollItem = props => {

    const [voted, setVoted] = useState(false);
    const [theWidth, setWidth] = useState(0);
    const pollText = ["Raiders","Cheifs","Broncos","Chargers"];
    const pollResults = [10, 35, 6, 17];

    useEffect(() => {
        if($('#result0') && theWidth === 0){
            setWidth($('#result0').width());            
        }
    });
    const calWidth = (result) => {
        const total = pollResults.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        return (result/total) * theWidth ;
    }

    const calPercentage = (result) => {
        const total = pollResults.reduce((accumulator, currentValue) => accumulator + currentValue, 0);
        var response = ((result/total) * 100).toFixed(2);
        return response;
    }

    return(
        <div className="box">
            <b>Category : <em>Sample</em></b> 
            <div className="media">
                <div className="media-content">
                    
                    <em>This is the Question ? </em> 
                    {voted ?
                    <div className="">
                        {pollText.map((vals, index) => (
                            <div key={index} className="">
                                <span id={"result"+index} className="box results-box"><span style={{width:calWidth(pollResults[index])}} className="progress-span"></span> <small className="poll-text"><strong>{vals}</strong></small> <span style={{zIndex:"3"}} className="is-pulled-right">{calPercentage(pollResults[index]) + "%"}</span> </span>   
                            </div> 
                        ))} 
                    </div>
                    :
                    <div className="">
                        <div className="">
                            <button className="button is-fullwidth poll-btn"> <b>Option A</b> </button>   
                        </div>
                        <div className="">
                            <button className="button is-fullwidth poll-btn"> <b>Option B </b></button>  
                        </div>   
                    </div>
                    }
                </div>
            </div>
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-4">John Smith</p>
                    <p className="subtitle is-6">@johnsmith</p>
                </div>
            </div>
        </div>
    )

}

export default PollItem;