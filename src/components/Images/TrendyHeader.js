import React, {useState, useEffect} from "react";
import withContext from "../../withContext";
import axios from "axios";


const TrendyHeader = props => {

    const {details} = props;
    const  {commentscount} = props;

    const [reaction, setReaction] = useState(null);
    const [likedcount, setLikes] = useState(details.approvals);
    const [dislikedcount, setDislikes] = useState(details.disapprovals);
    const [viewcount, setViewcount] = useState(details.views);

    useEffect( () => {
        const user_id = props.context.user ? props.context.user.id : 0;
        const pree_id = details.pree_id;
        
        //PreeReaction onload
        const getReaction = axios.post("/api/get-reaction",{user_id,pree_id}).then(
            (getReaction) => {
                if (getReaction.status === 200){
                    setReaction(getReaction.data.is_approved);
                }else if(getReaction.status === 201){
                    setReaction(null);
                }else{
                    throw new Error("Error while Reacting to Pree");
                }
            }
        )
    },[reaction, likedcount, dislikedcount, commentscount ]);

        //PreeReactions Functions
        const likePree = (e, pree_id) => {
            const user_id = props.context.user.id;
            if (reaction !== true){
                const addlike = axios.post("/api/like-pree",{user_id,pree_id}).then(
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
                const unlike = axios.put("/api/like-pree",{user_id,pree_id}).then(
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
                const dislike = axios.post("/api/dislike-pree",{user_id,pree_id}).then(
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
                const undislike = axios.put("/api/dislike-pree",{user_id,pree_id}).then(
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
    console.log(details);

    return (
        <div className="special-header is-fullwidth">
            <div className="columns has-text-centered is-multiline is-mobile">
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
                        <span className="tag" style={{textTransform:"capitalize"}}>{details.genre}</span>
                        {props.operation === "upload" && <span>{" "}{props.addGenre && <i className="fas fa-edit reaction-btn" onClick={e => {props.setAddGenre(false);props.checkRadio();}}></i>}</span>}
                    </span>
                </div>
                <span className="column">
                    <span className="tag">
                        <i className="fas fa-cog reaction-btn"></i>
                    </span>
                </span>
            </div>
            <div className="columns has-text-centered is-multiline is-mobile">
                <div className="column">
                    <span>
                        <span className="tag reaction-btn" onClick={e => {props.operation === "view" || props.operation === "timeline" ? likePree(e,details.pree_id) :  console.log(props.operation) }}>
                        {props.operation === "upload" ? ("Likes") : (likedcount)} 
                        &nbsp;<i className="fas fa-thumbs-up reaction-btn" style={reaction === true ? {color:"blue"}:{color:"black"}} ></i>
                        </span>
                    </span>
                </div>
                <div className="column">
                    <span>
                        <span className="tag reaction-btn" onClick={(e) => {props.operation === "view" || props.operation === "timeline" ? dislikePree(e,details.pree_id) : console.log("down") }}>
                        {props.operation === "upload" ? ("Dislikes") : (dislikedcount)}  
                        &nbsp;<i className="fas fa-thumbs-down reaction-btn" style={reaction === false ? {color:"blue"}:{color:"black"}} ></i>
                        </span>
                    </span>
                </div>
                <div className="column">
                    <span>
                        <span className="tag"> 
                        {props.operation === "upload" ? ("Comments") : (commentscount)} 
                        &nbsp; <i className="fas fa-comments reaction-btn" onClick={e => console.log("up")}></i>
                        </span>
                    </span>
                </div>
                <div className="column">
                    <span>
                        <span className="tag "> 
                        {props.operation === "upload" ? ("Views") : (viewcount)} 
                        &nbsp;<i className="fas fa-eye reaction-btn" onClick={e => console.log("views")}></i>
                        </span>
                    </span>
                </div>
            </div> 
        </div>           

    )
}
export default withContext(TrendyHeader);