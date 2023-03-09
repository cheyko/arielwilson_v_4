import React, { useCallback, useEffect, useState} from "react";
import withContext from '../../withContext';

const ViewUserCard = props => {

    const {user} = props;
    const {key} = props;
    const [imgView, setImgView] = useState(null);
    const loadMainMedia = useCallback(() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        //const user_id = userview_id;

        if (user.has_dp === true){
            setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + user.user_id);
        }else{
            setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
        }
        return true;
    },[user]);

    useEffect( () => {
        // call function is-follower
        //if (!gotMedia){
        loadMainMedia();
        //}
    }, [user, loadMainMedia]); 

    //console.log(isFollower);
    // have onclick functions for add-follower and unfollow

    return (
        <>
            <div key={key} className="card">
                <div className="card-content" style={{padding:"0.5rem"}}>
                    <div className="media">
                        <div className="media-left">
                            <figure className="image is-64x64">
                                <img style={{height:"100%"}} className="is-rounded" src={imgView} alt="display" />
                            </figure>
                        </div>
                        <div className="media-content">
                            <span className="subtitle is-6"> {user.firstname + " " + user.lastname} </span> <br />
                            <span className="subtitle is-6">@{user.username}</span><br />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )

}

export default withContext(ViewUserCard);