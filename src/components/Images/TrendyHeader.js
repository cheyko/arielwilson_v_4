import React, {useState, useEffect} from "react";
import withContext from "../../withContext";
import axios from "axios";


const TrendyHeader = props => {

    const {details} = props;
    let {operation} = props;

    const [reaction, setReaction] = useState(details.is_approved);
    const [likedcount, setLikes] = useState(details.approvals);
    const [dislikedcount, setDislikes] = useState(details.disapprovals);
    const [commentscount, setCommentsCount] = useState(props.commentscount);
    const viewcount = details.views;
    const [gotReaction, setGetReaction] = useState(null);

    useEffect( () => {
        const user_id = props.context.user ? props.context.user.id : 0;
        const pree_id = details.pree_id;
        
        //PreeReaction onload
        if((operation !== "upload" && gotReaction === null) || commentscount !== props.commentscount){
            axios.post("/api/get-reaction",{user_id,pree_id}).then(
                (getReaction) => {
                    if (getReaction.status === 200){
                        setReaction(getReaction.data.is_approved);
                        setLikes(getReaction.data.likedcount);
                        setDislikes(getReaction.data.dislikedcount);
                        setCommentsCount(getReaction.data.commentscount);
                        setGetReaction(true);
                    }else if(getReaction.status === 201){
                        setReaction(null);
                        setLikes(getReaction.data.likedcount);
                        setDislikes(getReaction.data.dislikedcount);
                        setCommentsCount(getReaction.data.commentscount);
                        setGetReaction(true);
                    }else{
                        throw new Error("Error while Reacting to Pree");
                    }
                }
            );
        }
        /*if(commentscount !== props.commentscount){
            setCommentsCount(props.commentscount);
        }*/
    },[reaction, gotReaction, props.commentscount]);

        //PreeReactions Functions
        const likePree = (e, pree_id) => {
            const user_id = props.context.user.id;
            if (reaction !== true){
                axios.post("/api/like-pree",{user_id,pree_id}).then(
                    (addlike) => {
                        if (addlike.status === 200){
                            setReaction(true);
                            setLikes(addlike.data.likedcount);
                            setDislikes(addlike.data.dislikedcount);
                        }else{
                            throw new Error("Error while Reacting to Pree");
                        }
                    }
                )
            }else{
                axios.put("/api/like-pree",{user_id,pree_id}).then(
                    (unlike) => {
                        if (unlike.status === 200){
                            setLikes(unlike.data.likedcount);
                            setReaction(null);
                        }else{
                            throw new Error("Error while Reacting to Pree");
                        }
                    }
                )
            }
        }
    
        const dislikePree = (e, pree_id) => {
            const user_id = props.context.user.id;
            if (reaction !== false){
                axios.post("/api/dislike-pree",{user_id,pree_id}).then(
                    (dislike) => {
                        if (dislike.status === 200){
                            setLikes(dislike.data.likedcount);
                            setDislikes(dislike.data.dislikedcount);
                            setReaction(false);
                        }else{
                            throw new Error("Error while Reacting to Pree");
                        }
                    }
                )
            }else{
                axios.put("/api/dislike-pree",{user_id,pree_id}).then(
                    (undislike) => {
                        if (undislike.status === 200){
                            setReaction(null);
                            setDislikes(undislike.data.dislikedcount);
                        }else{
                            throw new Error("Error while Reacting to Pree");
                        }
                    }
                )
            }
        }

    return (
        <div className="special-header is-fullwidth">
            <div className="columns has-text-centered is-mobile">
                <span className="column">
                    <span className="tag">
                        {details.playback === "Free" ? (<i className="fas fa-lock-open reaction-btn" onClick={e => console.log("icon")}></i>):(<i style={{fontSize:"x-large"}} className="fas fa-lock reaction-btn" onClick={e => console.log("icon")}></i>)}
                    </span>
                </span>
            
                <div className="column">
                    <span>
                        <span className="tag">{details.theDate[0]}</span>
                    </span>
                </div>
                <div className="column">
                    <span>
                        <span className="tag "> 
                        {props.operation === "upload" ? ("") : (viewcount)} 
                        &nbsp;<i className="fas fa-eye reaction-btn" onClick={e => console.log("views")}></i>
                        </span>
                    </span>
                </div>
            </div>
            <div className="columns has-text-centered is-mobile">
                <div className="column">
                    <span>
                        <span className="tag reaction-btn" onClick={e => {props.operation === "view" || props.operation === "timeline" ? likePree(e,details.pree_id) :  console.log(props.operation) }}>
                        {props.operation === "upload" ? ("") : (likedcount)} 
                        &nbsp;<i className="fas fa-thumbs-up reaction-btn" style={reaction === true ? {color:"blue"}:{color:"black"}} ></i>
                        </span>
                    </span>
                </div>
                <div className="column">
                    <span>
                        <span className="tag reaction-btn" onClick={(e) => {props.operation === "view" || props.operation === "timeline" ? dislikePree(e,details.pree_id) : console.log("down") }}>
                        {props.operation === "upload" ? ("") : (dislikedcount)}  
                        &nbsp;<i className="fas fa-thumbs-down reaction-btn" style={reaction === false ? {color:"blue"}:{color:"black"}} ></i>
                        </span>
                    </span>
                </div>
                <div className="column">
                    <span>
                        <span key={commentscount} className="tag"> 
                        {props.operation === "upload" ? ("") : (commentscount)} 
                        &nbsp; <i className="fas fa-comments reaction-btn" onClick={e => console.log("up")}></i>
                        </span>
                    </span>
                </div>
            </div> 
        </div>           

    )
}
export default withContext(TrendyHeader);