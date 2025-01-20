import React, { useEffect, useState } from "react";
import withContext from "../../../withContext";
import axios from "axios";
import { useParams } from "react-router-dom";

const EditPage = props => {

    let {id} = useParams();
    
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const [pageview, setPageView] = useState(null);
    const [loaded, setLoaded] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");
    const [pagetype, setPageType] = useState("normal");
    const [addPT, setAddPT] = useState(false);
    const [section, setSection] = useState("");
    const [addSection, setAddSection] = useState(false);
    const [title, setTitle] = useState("");
    const [addTitle, setAddTitle] = useState(false);
    const [intro, setIntro] = useState("");
    const [addIntro, setAddIntro] = useState(false);
    const [aSubtitle, setOneSubTitle] = useState("");
    const [aParagraph, setOneParagraph] = useState("");
    const [subtitles, setSubTitles] = useState([]);
    const [paragraphs, setParagraphs] = useState([]);
    const [subContent, setSubContent] = useState([]);
    const [chosen, setChosen] = useState(null)
    const [showSaveST, setShowSaveST] = useState(false);
    const [showSaveP, setShowSaveP] = useState(false);
    const [bioname, setBioName] = useState("");
    const [dob, setDOB] = useState("");
    const [gender, setGender] = useState("");
    const [bioInfo, setShowBioInfo] = useState(false);
    const [mainmedia, setMainMedia] = useState(null);
    const [addMainMedia, setAddMainMedia] = useState(false);
    const [captionlist, setCaptionList] = useState([]);
    const [pmcaptionlist, setPMCaptionList] = useState([]);
    const [temp_urls, setUrls] = useState([]);
    const [pmedia, setPMedia] = useState(false);
    const [temp1, setTemp1] = useState([]);
    const [temp2, setTemp2] = useState([]);
    const [medialist, setMedialist] = useState([]);
    const [temp_MediaUrls, setMediaUrls] = useState([]);
    const [mediatypes , setMediaTypes] = useState([]);
    const [page_id, setPageID] = useState(null);

    const checkRadio = () => {
        var radios = document.getElementsByName("pagetype");
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].value === pagetype) {   
                radios[j].checked = true;
                break;
            }
        }
    }

    const checkNextRadio = () => {
        var radios = document.getElementsByName("section");
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].value === section) {   
                radios[j].checked = true;
                break;
            }
        }
    }

    useEffect (() => {

        const page_id = id;
        if (!pageview){
            const result = axios.post(`${process.env.REACT_APP_PROXY}/api/get-page`, {page_id}).then(
                (result) => {
                    if (!result){
                        console.log("there was an error when search for group details");
                    }else{
                        setPageView(result.data.page);
                    }
                }
            );
        }else{
            //setMainmedia([...Array(pageview.no_of_media).keys()]);
            //setCaptionlist(pageview.captionlist);
            //setMediaTypes(pageview.mediatypes);
        }
    },[pageview]);

    console.log(pageview);

    if(pageview && !loaded){
        setSection(pageview.section)
        setLoaded(true);
    }

    return (
        <div>
            <h1 className="has-text-centered"> {id} </h1>
            <div className="box create-page">
                <div className="heading has-text-centered">
                    <h1>Edit Glossa Page</h1>
                </div>
                <div className="body">
                    <article className="message">
                        <div className="message-header">
                            <div className="columns is-fullwidth">
                                <div className="column">
                                    <span><span className="tag" style={{textTransform:"capitalize"}}>{pagetype}</span>{" "}<i className="fas fa-edit reaction-btn" onClick={e => {setAddPT(false);checkRadio();}}></i></span>
                                </div>
                                <div className="column">
                                    <span className="is-pulled-right"><span className="tag">{section}</span>{" "}<i className="fas fa-edit reaction-btn" onClick={e => setAddSection(false)}></i></span>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}
export default withContext(EditPage);