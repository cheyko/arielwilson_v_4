import React, {useEffect, useState} from "react";
import withContext from "../../../../withContext";
import { useParams } from "react-router-dom";
import $ from 'jquery';
import ImagesView from "../../../HelperComponents/ImagesView";
import axios from "axios";
import PropertyDetails from "./PropertyDetails";
import SimilarProperties from "./SimilarProperties";

const ViewAccomadation = props => {
    let {id} = useParams();

    const [property, setProperty] = useState(null);
    const [thePics, setPics] = useState(null);

    const getTargetPhotos = (property) => {
        const targetPhotos = [];
        for (var i=0; i<parseInt(property.numOfPics); i++){
            let url = process.env.PUBLIC_URL + "/images/accomadations/accomadation" + property.accomadate_id + "/" + i + ".jpg";
            targetPhotos.push(url);
        }
        return targetPhotos;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (property === null){
            const accomadate_id = id;
            axios.post(`${process.env.REACT_APP_PROXY}/api/get-property`,{accomadate_id}).then(res => {
                if (res.status === 200){
                    setProperty(res.data);
                    setPics(getTargetPhotos(res.data));
                }else{
                    setProperty(false);
                }
            });
        }

    }, [property, id]);

    return (
        <div className="hero">
            {property ?
            <div className="hero-container">
                <div className="event-content">
                    <div className="columns no-padding no-margin">
                        <div className="leftContent column no-padding no-margin">
                            <ImagesView thePics={thePics} />
                        </div>
                        <div className="rightContent column content">
                            <PropertyDetails property={property} />
                            <hr />
                            <SimilarProperties property={property} />
                        </div>
                    </div>
                </div>
            </div>:
            <div className="hero-container">
                <div className="hero-body">
                    {property === false ?
                        <span className="is-size-3" style={{color:"gray"}}>
                            Property is not found !
                        </span>
                        :
                        <span className="is-size-3" style={{color:"gray"}}>
                            <div className="loading"></div>
                        </span>
                    }
                </div>
            </div>
            }
        </div>
    )
}
export default withContext(ViewAccomadation);