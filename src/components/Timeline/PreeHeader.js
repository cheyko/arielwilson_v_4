import React from "react";
import withContext from "../../withContext";
import {Link} from "react-router-dom";

const PreeHeader = props => {
    const {aPree} = props;

    //const user = props.user ? props.user : "";

    /*const getDateTime = () => {
        const orignal = new Date();
        const isoVal = orignal.toISOString();
        const result = isoVal.split('T')[0]+" "+(isoVal.split('T')[1]).split('Z')[0];
        return result;
    }*/

    function formatTime(param){
        var months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        var now = new Date();
        var before = new Date(param);
        var seconds = (now.getTime() - before.getTime())/1000;
        let answer;
        if (seconds <= 5){
            answer = "just now";
        }else if (seconds > 5 && seconds < 60){
            answer = Math.round(seconds) + " secs ago";
        }else if(seconds > 60 && seconds < 3600){
            answer = Math.round(seconds / 60) + (Math.round(seconds / 60) > 1 ? "mins" : "min");
        }else if(seconds > 3600 && seconds < 86400){
            answer = Math.round(seconds / 3600) + ( Math.round(seconds / 3600) > 1 ?  "hrs" : "hr" );
        }else{
            answer = months[before.getMonth()] + " " + before.getDate() + " at " + getFullTime(before); 
        }
        return answer;
    }
    
    function getFullTime(aTime){
        //console.log(aTime.getHours());
        if (aTime.getHours() < 12){
            return aTime.getHours() + ":" + (aTime.getMinutes() < 10 ? ("0" + aTime.getMinutes()) : aTime.getMinutes()) + "am";
        }else if (aTime.getHours() === 12){
            return aTime.getHours() + ":" + (aTime.getMinutes() < 10 ? ("0" + aTime.getMinutes()) : aTime.getMinutes()) + "pm"
        }else{
            return aTime.getHours() % 12 + ":" + (aTime.getMinutes() < 10 ? ("0" + aTime.getMinutes()) : aTime.getMinutes()) + "pm"
        }
    }
    
    return(
        <div className="message-header p-1">
            <div className="columns has-text-centered p-0 m-0 is-mobile is-fullwidth">
                <div className="column p-0 is-one-quarter">
                    <Link to={`/view-user-profile/${aPree.user.user_id}`}>
                        <span className="display-figure">
                            <img alt="display" className="display-image-small" src={props.imgView} />
                        </span>
                    </Link>
                </div>
                <div className="column p-0">
                    <Link to={`/view-user-profile/${aPree.user.user_id}`}>
                        <b> @{aPree.user.username} </b>
                        <b> Rank </b>
                    </Link>
                </div>
                <div className="column p-0 is-one-quarter">
                    <b> {formatTime(aPree.date_added)} </b>
                </div>
                
            </div>
        </div>
    )
}
export default withContext(PreeHeader);