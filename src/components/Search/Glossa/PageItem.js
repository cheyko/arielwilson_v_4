import React, {useEffect, useState} from "react";
import './index.css'
import axios from 'axios';
import withContext from '../../../withContext';
import {Link} from "react-router-dom";

const PageItem = props => {

    const {page} = props;
    const page_id = page.page_id

    //const user_id = props.context.user ? props.context.user.id : 0;
    
    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);

    useEffect( () => {
        // call function is-follower
        if (!gotMedia){
            loadMainMedia();
        }
    }); 

    const loadMainMedia = async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video

        const response = await axios.post('/api/get-page-media',{page_id}).then(
            (response) => {
                if (response.status === 200){
                    if (response.data.has_mainmedia === true){
                        setImgView(process.env.PUBLIC_URL + "images/glossa/page" + page_id + "/main0");
                    }else{
                        setImgView(process.env.PUBLIC_URL + "/group/display/default.jpeg");
                    }
                    
                }
            }
        )
        return true;
    }

    //console.log(isFollower);
    // have onclick functions for add-follower and unfollow

    return (
        <>
            <div className="box">
                <div className="content" style={{padding:"0.5rem"}}>
                    <Link className="preepedia-item" to={`/glossa/view-page/${page.page_id}`}>
                        <div className="media">
                            <div className="media-left">
                                <figure className="display-pic-small image is-64x64">
                                    <img src={imgView} alt="display" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">{page.title} </p>
                                <p className="subtitle is-6">{page.intro.split(".")[0]}</p>
                            </div>
                        </div>
                        <div className="content">
                            <div className="columns">
                                <div className="column"> <span> {page.pagetype} </span> </div>
                                <div className="column"> <span> {page.section} </span> </div>
                            </div>
                        </div>
                        
                    </Link>
                </div>
            </div>
        </>
    )

}

export default withContext(PageItem);