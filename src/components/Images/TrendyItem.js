import React, {useEffect, useState} from "react";
import './index.css'
//import axios from 'axios';
import withContext from '../../withContext';
import {Link} from "react-router-dom";

const TrendyItem = props => {
 //// design this differently
    const {aPree} = props;
    const pree_id = aPree.pree_id
    //const exclusive_id = aPree.attachment.exclusive_id;

    //const user_id = props.context.user ? props.context.user.id : 0;
    
    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);

    useEffect( () => {
        // call function is-follower
        if (!gotMedia){
            if (aPree.attachment.mediatypes[0] === "audio"){
                setImgView(process.env.PUBLIC_URL + "/images/exclusives/exclusive" + aPree.attachment.exclusive_id + "/cover");
            }
            else if (aPree.attachment.mediatypes[0] === "video"){
                setImgView(process.env.PUBLIC_URL + "/logo192.png");
            }
            setGetMedia(true);
        }
    },[gotMedia, aPree.attachment]); 

    return (
        <>
            <div className="card view-user-card">
                <div className="card-content" style={{padding:"0.5rem"}}>
                    <Link className="preepedia-item" to={`/view-trendy/${pree_id}`}>
                        <div className="media">
                            <div className="media-left">
                                <figure className="display-pic-small image is-64x64">
                                    <img src={imgView} alt="display" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{aPree.attachment.title} </p>
                                <p className="subtitle is-6">{aPree.attachment.artistname}</p>
                            </div>
                        </div>
                        <div className="content">
                            <small>{aPree.attachment.description.split(".")[0]}</small>
                            <div className="columns">
                                <div className="column"> <span> {aPree.attachment.genre} </span> </div>
                                <div className="column"> <span> {aPree.attachment.playback} </span> </div>
                                <div className="column"> <span> {aPree.attachment.unlock_fee} </span> </div>
                            </div>
                        </div>
                        
                    </Link>
                </div>
            </div>
        </>
    )

}

export default withContext(TrendyItem);