import React, { useState, useEffect,useCallback } from "react";
import withContext from "../../withContext";
import MediaControls from "./MediaControls";
import MediaInfo from "./MediaInfo";
import MusicPlayer from "./MusicPlayer";
import axios from "axios";
//import {Redirect} from "react-router-dom";
import MediaFooter from "./MediaFooter";
import VideoPlayer from "./VideoPlayer";
import { useNavigate } from "react-router-dom";

const MediaPlayerUpload = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [mainmedia, setMainMedia] = useState(null);
    const [addMainMedia, setAddMainMedia] = useState(false);
    const [temp_url, setUrl] = useState(null);
    const [display_art, setDisplay] = useState(null);
    const [display_url, setDisplayUrl] = useState("");
    const [addDisplay, setAddDisplay] = useState(false);
    const [title, setTitle] = useState("");
    const [addTitle, setAddTitle] = useState(false);
    const [artistname, setArtistName] = useState("");
    const [addArtist, setAddArtist] = useState(false);
    const theDate = new Date().toISOString().split("T");
    const [category, setCategory] = useState(null);
    const [addCategory, setAddCategory] = useState(false);
    const audio_categories = ["Recording", "Music","Podcast","Audiobook","Speech","Interview"];
    const music_genres = ["Afro-Beats","Alternative","Country", "Dancehall", "Hip-Hop", "Rap", "R&B", "Reggae", "Rock", "World"];
    const [genre, setGenre] = useState("");
    const [addGenre, setAddGenre] = useState(false);
    const [description, setDescription] = useState("");
    const [addDescription, setAddDescription] = useState(false);
    const [playback, setPlayBack] = useState("");
    //const [addPlayBack, setAddPlayBack] = useState(false);
    const options = ["Purchase","Stream","Free","Contingency","Follower", "Frat", "Rank"];
    const contingencies = [["supporterA","supporterB", "supporterC", "group", "all"],["anytime","daytime","nighttime"],["rankings"]]; //etc
    const [contingency, setContingency] = useState([]);
    const [downloadable, setDownloadable] = useState(false); 
    const [unlockfee, setCost] = useState(0.00);
    const [settings, setSettings] = useState({});
    const [addSettings, setAddSettings] = useState(false);
    const currencies = ["JMD","USD","GBP","EUR"];
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [mediatypes , setMediaTypes] = useState([]);
    const [captionlist, setCaptionList] = useState([]);

    const video_categories = ["Recording", "Music Video", "Film", "Short Film"];
    const film_genres = ["Action", "Comedy", "Horror", "Romance", "Thriller", "Western"];
    const recording_genres = ["Normal", " Highlight", "Historical", "Information", "Review"];

    const [ready, setReady] = useState(false);

    let navigate = useNavigate();
    const checkRadio = useCallback(() => {
        var radios = document.getElementsByName("genre");
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].value === genre) {   
                radios[j].checked = true;
                break;
            }
        }
    }, [genre]);

    const checkCategory = useCallback(() => {
        var radios = document.getElementsByName("category");
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].value === category) {   
                radios[j].checked = true;
                break;
            }
        }
    }, [category]);

    const clearRadio = () => {
        var radios = document.getElementsByName("genre");
        for (var j = 0; j < radios.length; j++) {
            radios[j].checked = false;
        }
    }
    const clearCategory = () => {
        var radios = document.getElementsByName("category");
        for (var j = 0; j < radios.length; j++) {
            radios[j].checked = false;
        }
    }

    const checkPlaybackRadio = () => {
        var radios = document.getElementsByName("playback");
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].value === playback) {   
                radios[j].checked = true;
                break;
            }
        }
    }

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    useEffect( () => {
        if(!ready){
            if (mainmedia && mainmedia.type.split("/")[0] === "audio" && title && artistname && display_art && (description !== "") && category && genre && playback){
                setResponseMsg("Exclusive Eligible");
                setReady(true);

            }
            else if (mainmedia && mainmedia.type.split("/")[0] === "video" && title && artistname && (description !== "") && category && genre && playback){
                setResponseMsg("Exclusive Eligible");
                setReady(true);
            }else{
                setResponseMsg("");
            }
        }
        checkRadio();
        checkCategory();
        setCaptionList(["testing","testing","testing"]);

    },[display_art, ready, title, artistname, description, genre, mainmedia, category, playback, checkCategory,checkRadio]);

    const saveMedia = async(e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        const formData = new FormData();
        var theDateTime = getDateTime();
        var isLocked = playback === "Free" ? false : true;
        if (mainmedia){ 
            formData.append('theDateTime',theDateTime);
            formData.append('user_id',user_id);
            formData.append('pree_type', "exclusive");
            formData.append('title', title);
            formData.append('artistname', artistname);
            formData.append('genre', genre);
            formData.append('category', category);
            formData.append('description',description);
            formData.append('playback',playback);
            formData.append('contingency', contingency);
            formData.append('is_locked', isLocked);
            formData.append('is_downloadable', downloadable);
            formData.append('unlock_fee', unlockfee);
            formData.append('currency',currency);
            formData.append('mediatypes', mediatypes);      
            formData.append('captionlist',captionlist);
            formData.append('mainmedia',mainmedia);
            formData.append('display_art',display_art);
            formData.set('influence',false);
            formData.set('md',mainmedia.type.split("/")[0] === "video" ? true : false);
            formData.set('magazine',false);
            formData.set('stereo',mainmedia.type.split("/")[0] === "audio" ? true : false);
                        
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/api/exclusive`,formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                maxContentLength: 100000000,
                maxBodyLength: 1000000000
            }).then(
                (result) => {
                    if (result.status !== 200){
                        setResponseMsg("Media was not uploaded, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            if (result.status === 200){
                setResponseMsg("Exclusive Uploaded");
                const pree_id = result.data.pree_id;
                navigate('/view-blueberry/'+pree_id);
                //return true; //<Redirect to={`/view-exclusive/${pree_id}`} />
            }
            return true;
                
        }else{
            setResponseMsg("Not enough information on this page.");
            return false;
        }


    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'title':
                setTitle(e.target.value);
                break;
            case 'unlockfee':
                setCost(e.target.value);
                break;
            case 'currency':
                setCurrency(e.target.value);
                break;
            case 'artistname':
                setArtistName(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            default:
                break;
        }
        return true;
    }

    const handleMainMedia = e => {
        setUrl(URL.createObjectURL(Array.from(e.target.files)[0]));
        setMainMedia(Array.from(e.target.files)[0]);
        
        let temp = [];
        Array.from(e.target.files).map( (file) => temp = [...temp, file.type.split('/')[0]]);
        setMediaTypes(temp);
        setAddGenre(false);
        setCategory("");
        setGenre("");
        clearCategory();
        clearRadio();
    }

    const handleDisplayArt = e => {
        setDisplayUrl(URL.createObjectURL(Array.from(e.target.files)[0]));
        setDisplay(Array.from(e.target.files)[0]);
    }

    const handleToggleChange = (e) => {
        var isChecked = document.getElementById("response_value").checked;
        setDownloadable(isChecked);
    }

    const handleCheckboxChange = event => {
        let newArray = contingency.length > 0 ? [contingency, event.target.value] : [event.target.value];
        if (contingency.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setContingency(newArray);
    };

    return (
        <div className="hero">
            <div className="container">
                <div className="create-page">
                    <div className="heading has-text-centered">
                        <h1>Upload to MD-STEREO</h1>
                    </div>
                    <div className="body mpu">
                        <div className="columns is-mobile no-margin">
                            <div className="column no-padding">
                                <span className="special-header">
                                    <span>{" "}{addGenre && <i className="fas fa-edit reaction-btn" onClick={e => {setAddGenre(false);checkRadio();}}></i>}</span>
                                    <span className="tag" style={{textTransform:"capitalize"}}><i className="fas fa-certificate reaction-btn"></i>&nbsp; {genre}</span>
                                    
                                </span>
                            </div>
                            <div className="column no-padding has-text-right">
                                <span className="special-header">
                                    <span className="tag"><i className="fas fa-cog reaction-btn"></i></span>
                                </span>
                            </div>
                        </div>
                        <article className="message is-link">
                            <div className="message-header">
                            </div>
                            <div className="message-body no-padding">
                                <div className="content">
                                    <div className="columns is-multiline no-margin">
                                        <div className="column no-padding">
                                            <div className="card" style={{background:"none"}}>
                                                <div className="mainmedia">
                                                    {mainmedia ? 
                                                        (
                                                            <>
                                                                {addTitle && <i className="fas fa-edit reaction-btn" onClick={e => { setAddTitle(false);setAddArtist(false);e.preventDefault();}}>edit details</i> }
                                                                {mainmedia.type.split('/')[0] === "audio" ?
                                                                    (<MusicPlayer 
                                                                        temp_url={temp_url} display_url={display_url} mediatype={mainmedia.type} 
                                                                        details={{"title":title,"artist":artistname}}
                                                                    />)
                                                                    :
                                                                    (<VideoPlayer  
                                                                        temp_url={temp_url} mediatype={mainmedia.type} 
                                                                        details={{"title":title,"artist":artistname}}
                                                                    />)
                                                                }
                                                                <div className="exclusive-footer">
                                                                    <MediaFooter operation="upload" details={{"theDate":theDate, "genre":genre, "playback":playback}} checkRadio={checkRadio}/>
                                                                </div>
                                                                <MediaInfo operation="upload" details={{"description":description}} />
                                                            </>
                                                        ):(
                                                            <span>{""}</span>
                                                        )
                                                    }
                                                    {addMainMedia && <div style={{padding:"0.5rem 1rem"}}><i className="fas fa-image reaction-btn" onClick={e => { setAddMainMedia(false);e.preventDefault();}}> Change Media</i> </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column no-padding">
                                            <div className="card">
                                                <div className="media-controls">
                                                    <div>
                                                        <MediaControls operation="upload" settings={settings} setSettings={setSettings}/>
                                                        {addSettings && <div style={{padding:"0.5rem 1rem"}}><i className="fas fa-cog reaction-btn" onClick={e => { setAddSettings(false);e.preventDefault();}}> Change Playback Options</i> </div>}
                                                
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </article>
                        <form className="form" onSubmit={ e => saveMedia(e)}>
                            <div className="field">
                                <div className="control">
                                    <button type="submit" className="button is-primary is-fullwidth">Submit Page</button>
                                </div>
                            </div>
                            <span>{responseMsg}</span>
                            <br />
                            {addMainMedia === false &&
                                <div className="field">
                                    <div className="card">
                                        <div className="card-content image-upload">
                                            
                                            <label className="media-select" htmlFor="mainmedia">
                                                <i style={{fontSize:"xx-large"}} className="fas fa-photo-video"></i> 
                                                <small>Select Main Media</small> {mainmedia ? (<i style={{color:"green"}} className="fas fa-check-circle"></i>) : ("")}
                                                <br /> { !mainmedia && <small> No files selected </small>}
                                            </label>
                                            <input onChange={e => handleMainMedia(e)} name="mainmedia" single="true" id="mainmedia" type="file" />
                                            <br />
                                            <button className="button is-small is-success custom-margin" onClick={e => {e.preventDefault();setAddMainMedia(true);}}>Add Main Media</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            }
                            {mainmedia && addTitle === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> Title </label>
                                                <input
                                                placeholder="Enter title of Media"
                                                className="input"
                                                type="text"
                                                name="title"
                                                value={title}
                                                onChange={e => handleChange(e)}

                                                />
                                                <br /><br />
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddTitle(true);}}>Add Title</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {mainmedia && addArtist === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> Artist </label>
                                                <input
                                                placeholder="Enter Artist of Media"
                                                className="input"
                                                type="text"
                                                name="artistname"
                                                value={artistname}
                                                onChange={e => handleChange(e)}

                                                />
                                                <br/><br />
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddArtist(true);}}>Add Artist</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {mainmedia && mainmedia.type.split("/")[0] === "audio" && addDisplay === false &&
                                <div className="field">
                                    <div className="card">
                                        <div className="card-content image-upload">
                                            
                                            <label className="media-select" htmlFor="display_art">
                                                <i style={{fontSize:"xx-large"}} className="fas fa-photo-video"></i> 
                                                <small>Select Cover Art</small> {display_art ? (<i style={{color:"green"}} className="fas fa-check-circle"></i>) : ("")}
                                                <br /> { !display_art && <small> No files selected </small>}
                                            </label>
                                            <input onChange={e => handleDisplayArt(e)} name="display_art" single="true" id="display_art" type="file" />
                                            <br/>
                                            <button className="button is-small is-success custom-margin" onClick={e => {e.preventDefault();setAddDisplay(true);}}>Add Cover Art</button>
                                            
                                        </div>
                                    </div>
                                </div>
                            }
                            {mainmedia && addCategory === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> Category </label>
                                                {mainmedia.type.split("/")[0] === "audio" ? (
                                                    <>
                                                        {audio_categories.map((val,index) => {
                                                            return(
                                                                <label key={index} className="radio">
                                                                    <input type="radio" value={val} name="category" onClick={e => {setCategory(e.target.value);setAddGenre(false);}} />{" "}
                                                                    {val}  
                                                                </label>
                                                            )
                                                        })}
                                                    </>
                                                ):(
                                                    <>
                                                        {video_categories.map((val,index) => {
                                                            return(
                                                                <label key={index} className="radio">
                                                                    <input type="radio" value={val} name="category" onClick={e => {setCategory(e.target.value);setAddGenre(false);}} />{" "}
                                                                    {val}  
                                                                </label>
                                                            )
                                                        })}
                                                    </>
                                                )}
                                                <br /><br />
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddCategory(true);}}>Add Category</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {category && addGenre === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> Genre </label>
                                                {mainmedia.type.split("/")[0] === "audio" ? (
                                                    <>
                                                        {category === "Music" &&
                                                            <>
                                                                {music_genres.map((val,index) => {
                                                                    return(
                                                                        <label key={index} className="radio">
                                                                            <input type="radio" value={val} name="genre" onClick={e => {setGenre(e.target.value); setAddGenre(true); checkRadio();checkCategory();}} />{" "}
                                                                            {val}  
                                                                        </label>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                        {category !== "Music" &&
                                                            <>
                                                                {recording_genres.map((val,index) => {
                                                                    return(
                                                                        <label key={index} className="radio">
                                                                            <input type="radio" value={val} name="genre" onClick={e => {setGenre(e.target.value); setAddGenre(true); checkRadio();}} />{" "}
                                                                            {val}  
                                                                        </label>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                    </>
                                                ):(
                                                    <>
                                                        {category === "Music Video" &&
                                                            <>
                                                                {music_genres.map((val,index) => {
                                                                    return(
                                                                        <label key={index} className="radio">
                                                                            <input type="radio" value={val} name="genre" onClick={e => {setGenre(e.target.value); setAddGenre(true); checkRadio();}} />{" "}
                                                                            {val}  
                                                                        </label>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                        {(category === "Film" || category === "Short Film") &&
                                                            <>
                                                                {film_genres.map((val,index) => {
                                                                    return(
                                                                        <label key={index} className="radio">
                                                                            <input type="radio" value={val} name="genre" onClick={e => {setGenre(e.target.value); setAddGenre(true); checkRadio();}} />{" "}
                                                                            {val}  
                                                                        </label>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                        {category === "Recording" &&
                                                            <>
                                                                {recording_genres.map((val,index) => {
                                                                    return(
                                                                        <label key={index} className="radio">
                                                                            <input type="radio" value={val} name="genre" onClick={e => {setGenre(e.target.value); setAddGenre(true); checkRadio();}} />{" "}
                                                                            {val}  
                                                                        </label>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {addDescription === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> Description: </label>
                                                <textarea
                                                    className="textarea"
                                                    type="text"
                                                    rows="10"
                                                    style={{ resize: "none" }}
                                                    name="description"
                                                    value={description}
                                                    onChange={e => handleChange(e)}
                                                    />
                                                <br />
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddDescription(true);}}>Add Description</button>
                                                
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {addSettings === false &&
                            <div className="box">                
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> PlayBack </label>
                                                {options.map((val,index) => {
                                                    return(
                                                        <label key={index} className="radio">
                                                            <input type="radio" value={val} name="playback" onClick={e => {setPlayBack(e.target.value);}} />{" "}
                                                            {val}  
                                                        </label>
                                                    )
                                                })}
                                                {playback === "Stream" &&
                                                <div className="field" >
                                                
                                                    <label className="label"><br /> Stream options </label>
                                                    {contingencies[1].map((contingency,index) => (
                                                    <label className="checkbox" key={index}>
                                                        {contingency} {" "}
                                                        <input
                                                        value={contingency}
                                                        onChange={e => handleCheckboxChange(e)}
                                                        type="checkbox"
                                                        /> {" "}
                                                        </label>
                                                    
                                                    ))}
                                                </div>}
                                                {playback === "Contingency" &&
                                                <div className="field" >
                                                
                                                    <label className="label"><br /> Contingency Options </label>
                                                    {contingencies[0].map((contingency,index) => (
                                                    <label className="checkbox" key={index}>
                                                        {contingency} {" "}
                                                        <input
                                                        value={contingency}
                                                        onChange={e => handleCheckboxChange(e)}
                                                        type="checkbox"
                                                        /> {" "}
                                                        </label>
                                                    
                                                    ))}
                                                </div>}
                                                {playback === "Purchase" &&
                                                <div className="field columns">
                                                    
                                                    <div className="column"><label className="label is-pulled-right"><br /> Cost</label></div>
                                                    <div className="column">
                                                        <br />
                                                        <input 
                                                            className="input control"
                                                            name="unlockfee"
                                                            type="number"
                                                            step="0.01"
                                                            onChange={e=> handleChange(e)}
                                                            value={unlockfee}
                                                            placeholder="$"
                                                        />
                                                    </div>
                                                    <div className="column">
                                                        <br />
                                                        <select
                                                            className="select form-select"
                                                            id="currency"
                                                            name="currency"
                                                            value={currency}
                                                            onChange={e => handleChange(e)}
                                                            required
                                                            >
                                                            {currencies.map(cur => (
                                                            <option key={cur} value={cur}>
                                                                {cur}
                                                            </option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                </div>}
                                                <br /><br />
                                                
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddSettings(true);checkPlaybackRadio();}}>Add Playback Settings</button>
                                
                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                           
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> Downloadable: </label>
                                                <label className="switch">
                                                    <input onChange={ e => handleToggleChange(e) } id="response_value" type="checkbox" />
                                                    <div className="slider round" >
                                                        <span className="on">Yes</span>
                                                        <span className="off">No</span>
                                                    </div>
                                                </label>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>}
                       </form>
                    </div>
                </div>   
            </div>
        </div>
    )
}
export default withContext(MediaPlayerUpload);