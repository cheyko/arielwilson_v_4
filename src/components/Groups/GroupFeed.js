import React, {useState, useEffect} from "react";
import withContext from "../../withContext";
import AddPree from "../Timeline/AddPree";
import PreeItem from "../Timeline/PreeItem";

import axios from "axios";

const GroupFeed = props => {

    const loadPrees = props.context.prees ? props.context.prees : [];
    const [groupPrees, renderPrees] = useState(loadPrees);

    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);

    useEffect( () => {
        if (!gotMedia){
            loadMainMedia();
        }
    });

    const loadMainMedia = async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        const user_id = props.context.user.id;
        console.log(user_id);
        const response = await axios.post('/api/get-main-media',{user_id}).then(
            (response) => {
                if (response.status === 200){
                    if (response.data.has_dp === true){
                        setImgView(process.env.PUBLIC_URL + "/bio/display/" + user_id);
                    }else{
                        setImgView(process.env.PUBLIC_URL + "/bio/display/default.jpeg");
                    }
                    setGetMedia(true);
                }
            }
        )
        return true;
    }


    return (
        <div className="hero">
            <div className="hero-body">
                <AddPree imgView={imgView} renderPrees={renderPrees} preetype={"group"} group_id={props.group_id}/>
                <hr className="h-line" />
                <h1>Group Feed</h1>
                <div className="matching-prees">
                    {groupPrees && groupPrees.length > 0 ? (
                        groupPrees.map((aPree, index) => (
                          <PreeItem
                            aPree={aPree}
                            key={index}
                            showComments={false}
                            clickable={"view"}
                          />
                        )) 
                      ) : (
                        <div className="column">
                          <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                            No Prees a Gwaan right now.
                          </span>
                        </div>
                    )}
                </div>

            </div>
        </div>
    )
}
export default withContext(GroupFeed);