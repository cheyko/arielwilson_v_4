import React, {useEffect, useState} from "react";
import withContext from "../../../withContext";
import { useParams } from "react-router-dom";
import $ from 'jquery';
import ImagesView from "../../HelperComponents/ImagesView";
import axios from "axios";
import EventDetails from "./EventDetails";
import SimilarEvents from "./SimilarEvents";


const ViewEvent = props => {

    let {id} = useParams();

    const [event, setEvent] = useState(null);
    const [thePics, setPics] = useState(null);

    const getTargetPhotos = (event) => {
        const targetPhotos = [];
        for (var i=0; i<parseInt(event.numOfPics); i++){
            let url = process.env.PUBLIC_URL + "/images/events/event" + event.event_id + "/" + i + ".jpeg";
            targetPhotos.push(url);
        }
        return targetPhotos;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (event === null){
            const event_id = id;
            axios.post(`${process.env.REACT_APP_PROXY}/api/get-event`,{event_id}).then(res => {
                if (res.status === 200){
                    setEvent(res.data);
                    setPics(getTargetPhotos(res.data));
                }else{
                    setEvent(false);
                }
            });
        }

    }, [event, id]);

    return (
        <div className="hero">
            {event ?
            <div className="hero-container">
                <div className="event-content">
                    <div className="columns no-padding no-margin">
                        <div className="leftContent column no-padding no-margin">
                            <ImagesView thePics={thePics} />
                        </div>
                        <div className="rightContent column content">
                            <EventDetails event={event} />
                            <hr />
                            <SimilarEvents event={event} />
                        </div>
                    </div>
                </div>
            </div>:
            <div className="hero-container">
                <div className="hero-body">
                    {event === false ?
                        <span className="is-size-3" style={{color:"gray"}}>
                            Event is not found !
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
export default withContext(ViewEvent);