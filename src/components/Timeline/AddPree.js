import React, {useState} from "react";
import withContext from "../../withContext";
import Slider from "react-slick";
import axios from "axios";

const AddPree = props => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

    const [a_quote, setQuote] = useState(null);
    const [media, setMedia] = useState(null);
    const [caption, setCaption] = useState("");
    const [temp_urls, setUrls] = useState([]);
    const [error, setError] = useState("");
    const [confirmMsg,setConfirmMsg] = useState("");

    const handleChange = e => {
        setQuote(e.target.value);
    }
    
    const handleMedia = e => {
        setUrls(Array.from(e.target.files).map(f => URL.createObjectURL(f) ));
        setMedia(Array.from(e.target.files));
    }

    const handleCaption = e => {
        setCaption(e.target.value);
    }

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const makePost = async (e) => {
        let type_of;
        let setType = false;
        e.preventDefault();
        setError("");
        const formData = new FormData();
        var theDateTime = getDateTime();
        
        formData.append('theDateTime',theDateTime);
        formData.append('user_id',props.context.user.id);
        formData.append('pree_type', props.preetype)
        if (props.preetype === "group") {formData.append('group_id', props.group_id)}
        while(setType === false){   
            if (media){ 
                type_of = "media";
                formData.append('type_of',type_of);
                formData.append('caption',caption);
                media.forEach( (aFile,index) => {
                    formData.append('media',aFile);
                    formData.set('has_image',false);
                    formData.set('has_audio',false);
                    formData.set('has_video',false);
                    switch(aFile.type.split('/')[0]){
                        case 'image':
                            formData.set('has_image',true);
                            break;
                        case 'audio':
                            formData.set('has_audio',true);
                            break;
                        case 'video':
                            formData.set('has_video',true)
                            break;
                        default:
                            break;
                    }
                });
                setConfirmMsg("Media Posted")
                console.log(formData);
                console.log("Media Posted");
                setType = true;
                //window.location.reload();
            }else if(a_quote){
                type_of = "quote";
                formData.append('type_of',type_of);
                formData.append('a_quote', a_quote);
                setConfirmMsg("Quote made.");
                document.getElementById("ypree").value = "";
                setType = true;
                //window.location.reload();
            }else if (!media && !a_quote){
                setError("Nothing to Post")
            }
        }

        if(type_of !== ""){
            const result = await axios.post('/api/ypree', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                maxContentLength: 100000000,
                maxBodyLength: 1000000000
            }).catch( (result => {
                if (result.status !== 200) { return { status: result.status, message: 'Not successful' } }
            }))

            if (result.status === 200){
                //reset all values
                
                setCaption("");
                setError("");
                setMedia(null);
                setQuote(null);
                const latestprees = await axios.get("/api/ypree");
                props.renderPrees(latestprees.data);
                //add pree to list inside context using ypree func in App.js
                return true;
            }
        }
        
        return false;
    }

    return (
        <div className="hero-contain">
            <div className="card">
                <div className="container" style={{padding:"1rem"}}>  
                    <div className="columns is-mobile">                                 
                        {/*<div className="column is-one-fifth">
                            <figure className="display-pic-large image is-256x256">
                                <img alt="display" className="is-rounded" src={props.imgView} />                                
                            </figure>
                        </div>*/}
                        <form className="column" onSubmit={e => makePost(e)}>
                            <div className="columns">
                                {!media ? 
                                (
                                    <div className="column is-two-thirds input-box">
                                        <input onChange={e => handleChange(e)} className="input is-medium" id="ypree" placeholder="Y Pree ?" type="text" name="ypree" />
                                    </div>
                                ):("")
                                }
                                <div className="column image-upload">
                                    <button type="submit" className="button is-rounded post-btn is-primary is-pulled-right"> <b> Post </b>  </button>
                                    <label className="media-select" htmlFor="media">
                                        <i style={{fontSize:"xx-large"}} className="fas fa-photo-video"></i> 
                                        <small>Add <br /> Multimedia</small> {media ? (<i style={{color:"green"}} className="fas fa-check-circle"></i>) : ("")}
                                    </label>
                                    <input onChange={e => handleMedia(e)} name="media" multiple id="media" type="file" />
                                </div>
                            </div>
                            <div>
                                <div className="input-options">
                                    <div className="upload-wrapper has-text-centered">
                                        {media ? 
                                            (
                                            <>
                                                <Slider {...settings}>
                                                    {media.map((aFile, index) => (
                                                        <div key={index} className="slick-slide">
                                                            {aFile.type.split('/')[0] === "image" && 
                                                            (
                                                                <figure key={index} className="image is-1by1">
                                                                    <img src={temp_urls[index]} alt="upload" />
                                                                </figure>
                                                            )}
                                                            {aFile.type.split('/')[0] === "audio" && (
                                                                <audio key={index} controls>
                                                                    <source src={temp_urls[index]} type={aFile.type}/>
                                                                </audio>
                                                            )}
                                                            {aFile.type.split('/')[0] === "video" && (
                                                                <video key={index} width="320" height="240" controls>
                                                                    <source src={temp_urls[index]} type={aFile.type}/>
                                                                </video>
                                                            )}
                                                        </div>
                                                    ))}
                                                </Slider>
                                                <div className="input-box">
                                                    <textarea onChange={e => handleCaption(e)} className="textarea" placeholder="Caption" rows="3" type="text" name="caption" />
                                                </div>
                                            </>
                                            ):(
                                                <span>{""}</span>
                                            )
                                        }
                                    </div>
                                    {error && (
                                        <div className="has-text-danger">{error}</div>
                                    )}
                                    {confirmMsg && (
                                        <div className="has-text-success">{confirmMsg}</div>
                                    )}
                                </div> 
                            </div>     
                        </form>
                    </div> 
                </div>
            </div>
        </div>
    )
}

export default withContext(AddPree);