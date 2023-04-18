import React, {useEffect, useState} from "react";
import withContext from "../../../../withContext";
import { useParams } from "react-router-dom";
import $ from 'jquery';
import ImagesView from "../../../HelperComponents/ImagesView";
import axios from "axios";
import VolunteerDetails from "./VolunteerDetails";
import SimilarVolunteers from "./SimilarVolunteers";


const ViewVolunteer = props => {

    let {id} = useParams();

    const [activity, setActivity] = useState(null);
    const [thePics, setPics] = useState(null);

    const getTargetPhotos = (activity) => {
        const targetPhotos = [];
        if(activity.numOfPics > 0){
            for (var i=0; i<parseInt(activity.numOfPics); i++){
                let url = process.env.PUBLIC_URL + "/images/volunteers/volunteer" + activity.volunteer_id + "/" + i + ".jpeg";
                targetPhotos.push(url);
            }
        }else{
            targetPhotos.push(process.env.PUBLIC_URL + "/images/defaults/volunteers/" + activity.category + ".jpg");
        }
        return targetPhotos;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (activity === null){
            const volunteer_id = id;
            axios.post("/api/get-volunteer",{volunteer_id}).then(res => {
                if (res.status === 200){
                    setActivity(res.data);
                    setPics(getTargetPhotos(res.data));
                }else{
                    setActivity(false);
                }
            });
        }
        if (document.documentElement.classList.contains("hide-scroll") === false){
            document.documentElement.classList.add("hide-scroll");
        }

    }, [activity, id]);

    return (
        <div className="hero">
            {activity ?
            <div className="hero-container">
                <div className="job-content">
                    <div className="columns no-padding no-margin">
                        <div className="leftContent column no-padding no-margin">
                            <ImagesView thePics={thePics} />
                        </div>
                        <div className="rightContent column">
                            <VolunteerDetails activity={activity} />
                            <hr />
                            <SimilarVolunteers activity={activity} />
                        </div>
                    </div>
                </div>
            </div>:
            <div className="hero-container">
                <div className="hero-body">
                    {activity === false ?
                        <span className="is-size-3" style={{color:"gray"}}>
                            Activity is not found !
                        </span>
                        :
                        <span className="is-size-3" style={{color:"gray"}}>
                            Loading .....
                        </span>
                    }
                </div>
            </div>
            }
        </div>
    )
}
export default withContext(ViewVolunteer);
