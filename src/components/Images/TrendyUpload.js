import React, { useState, useEffect } from "react";
import withContext from "../../withContext";
import axios from "axios";
import {Redirect} from "react-router-dom";
import TrendyControls from "./TrendyControls";
import TrendyHeader from "./TrendyHeader";
import TrendyImage from "./TrendyImage";
import TrendyQuote from "./TrendyQuote";

const TrendyUpload = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [trend, setTrend] = useState(null);
    const [mainmedia, setMainMedia] = useState(null);
    const [addMainMedia, setAddMainMedia] = useState(false);
    const [temp_url, setUrl] = useState(null);
    const [captionlist, setCaptionList] = useState(["testing","testing","testing"]);
    const [category, setCategory] = useState(null);
    const [addCategory, setAddCategory] = useState(false);    
    const [genre, setGenre] = useState("");
    const [addGenre, setAddGenre] = useState(false);
    const [description, setDescription] = useState("");
    const [addDescription, setAddDescription] = useState(false);
    const [playback, setPlayBack] = useState("");
    const [theDate, setDate] = useState(new Date().toISOString().split("T"));
    const [contingency, setContingency] = useState([]);
    const [downloadable, setDownloadable] = useState(false); 
    
    const [title, setTitle] = useState("");
    const [addTitle, setAddTitle] = useState(false);
    const [artistname, setArtistName] = useState("");
    const [addArtist, setAddArtist] = useState(false);
    const [unlockfee, setCost] = useState(0.00);
    const [settings, setSettings] = useState({});
    const [addSettings, setAddSettings] = useState(false);
    const currencies = ["JMD","USD","GBP","EUR"];
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [mediatypes , setMediaTypes] = useState([]);

    const options = ["Purchase","Stream","Contingency","Follower", "Frat", "Rank"];
    const contingencies = [["supporterA","supporterB", "supporterC", "group", "all"],["anytime","daytime","nighttime"],["rankings"]]; //etc
    const image_categories = ["Personal", "Design"];
    const quote_categories = ["Poem", "Piece", "Saying"];
    const personal_genres = ["Selfie", "Scenery", "Throwback", "Display"];
    const design_genres = ["Wallpaper", "Cartoon", "3D"];
    const all_genres = ["Inspirational", "Historical", "Romance", "Comical", "Slang"];
    const [ready, setReady] = useState(false);
 
    useEffect( () => {
        if(!ready){
            if (trend === "image" && (mainmedia) && category && genre && playback){
                setResponseMsg("Exclusive Eligible");
                setReady(true);
            }
            else if (trend === "quote" && (description !== "") && category && genre && playback){
                setResponseMsg("Exclusive Eligible");
                setReady(true);
            }else{
                setResponseMsg("");
            }
        }
    },[ready, trend, mainmedia,description, category , genre ,playback]);

    const checkRadio = () => {
        var radios = document.getElementsByName("genre");
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].value === genre) {   
                radios[j].checked = true;
                break;
            }
        }
    }
    const checkCategory = () => {
        var radios = document.getElementsByName("category");
        for (var j = 0; j < radios.length; j++) {
            if (radios[j].value === category) {   
                radios[j].checked = true;
                break;
            }
        }
    }

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

    const saveMedia = async(e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        const formData = new FormData();
        var theDateTime = getDateTime();
        //var isLocked = playback === "Free" ? false : true;
        var isLocked = true;
        if (mainmedia){ 
            formData.append('theDateTime',theDateTime);
            formData.append('user_id',user_id);
            formData.append('pree_type', "exclusive");
            formData.append('title', title);
            formData.append('artistname', artistname);
            formData.append('category', category);
            formData.append('genre', genre);
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
            formData.set('influence',trend === "quote" ? true : false);
            formData.set('md',false);
            formData.set('magazine',trend === "image" ? true : false);
            formData.set('stereo',false);
                        
            const result = await axios.post('/api/exclusive',formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                maxContentLength: 100000000,
                maxBodyLength: 1000000000
            }).then(
                (result) => {
                    if (result.status === 200){
                        setResponseMsg("Exclusive Uploaded");
                        const pree_id = result.data.pree_id;
                        return <Redirect to={`/view-exclusive/${pree_id}`} />
                    }else{
                        setResponseMsg("Media was not uploaded, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
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
        Array.from(e.target.files).map( (file) => {
            temp = [...temp, file.type.split('/')[0]]
        });
        setMediaTypes(temp);
        setAddGenre(false);
        setCategory("");
        setGenre("");
        clearCategory();
        clearRadio();
    }

    const handleToggleChange = (e) => {
        var isChecked = document.getElementById("response_value").checked;
        console.log(isChecked);
        setDownloadable(isChecked);
    }

    const handleCheckboxChange = event => {
        let newArray = contingency.length > 0 ? [contingency, event.target.value] : [event.target.value];
        if (contingency.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setContingency(newArray);
    }; 
    console.log(temp_url);
    return (
        <div className="hero">
           <div className="hero-body">
                <div className="create-page">
                    <div className="heading has-text-centered">
                        <h1>Upload to Trendy</h1>
                    </div>
                    <div className="body trendy-upload">
                        <article className="message is-link">
                            <div className="message-header">
                                <TrendyHeader operation="upload" details={{"theDate":theDate, "genre":genre, "playback":playback}} addGenre={addGenre} setAddGenre={setAddGenre} checkRadio={checkRadio}/>
                            </div>
                            <div className="message-body no-padding">
                                <div className="content">
                                    <div className="columns is-multiline is-mobile no-margin">
                                        <div className="column no-padding">
                                            <div className="card" style={{background:"none"}}>
                                                {addTitle && <i className="fas fa-edit reaction-btn" onClick={e => { setAddTitle(false);e.preventDefault();}}>edit title</i> }
                                                <div className="mainmedia">
                                                {trend === "image" &&                                                            
                                                    <>
                                                        {mainmedia ? 
                                                            (
                                                                <TrendyImage temp_url={temp_url} mediatype={mainmedia.type} 
                                                                                details={{"title":title,"artist":artistname}}
                                                                />
                                                            ):(
                                                                <div className="trendy-content trendy-quote">
                                                                    <section className="section">
                                                                        <h3>Upload Image</h3>
                                                                    </section>
                                                                </div>
                                                            )
                                                        }
                                                    </>                 
                                                } 
                                                {trend === "quote" &&
                                                    <>
                                                        
                                                        <TrendyQuote 
                                                            details={{"title":title,"artist":artistname, "description":description}}
                                                        />
                                                    </> 
                                                }        
                                                {addMainMedia && <div style={{padding:"0.5rem 1rem"}}><i className="fas fa-image reaction-btn" onClick={e => { setAddMainMedia(false);e.preventDefault();}}> Change Media</i> </div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="column no-padding">
                                            <div className="card">
                                                <div className="trendy-controls">
                                                    <div>
                                                        <TrendyControls operation="upload" settings={settings} setSettings={setSettings}/>
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
                            <span style={ready ? {color:"green"}:{color:"blue"}}>{responseMsg}</span>
                            <br />                          
                            <div className="field">
                                <div className="control">
                                    <div className="card">
                                        <div className="card-content">
                                            <label className="label"> Trend </label>
                                            <label key="0" className="radio">
                                                <input type="radio" value="image" name="trend" onClick={e => {setTrend(e.target.value);setReady(false);}} />{" "}
                                                Image  
                                            </label>
                                            <label key="1" className="radio">
                                                <input type="radio" value="quote" name="trend" onClick={e => {setTrend(e.target.value);setReady(false);}}/>{" "}
                                                Quote  
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            {addMainMedia === false && trend === "image" && 
                                <div className="field">
                                    <div className="card">
                                        <div className="card-content image-upload">
                                            <button className="button is-small is-success custom-margin" onClick={e => {e.preventDefault();setAddMainMedia(true);}}>Add Main Media</button>
                                            <br/>
                                            <label className="media-select" htmlFor="mainmedia">
                                                <i style={{fontSize:"xx-large"}} className="fas fa-photo-video"></i> 
                                                <small>Select Main Media</small> {mainmedia ? (<i style={{color:"green"}} className="fas fa-check-circle"></i>) : ("")}
                                                <br /> { !mainmedia && <small> No files selected </small>}
                                            </label>
                                            <input onChange={e => handleMainMedia(e)} name="mainmedia" single="true" id="mainmedia" type="file" />
                                        </div>
                                    </div>
                                </div>
                            }
                            
                            {addTitle === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddTitle(true);}}>Add Title</button>
                                                <label className="label"> Title </label>
                                                <input
                                                placeholder="Enter title of Exclusive"
                                                className="input"
                                                type="text"
                                                name="title"
                                                value={title}
                                                onChange={e => handleChange(e)}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {addArtist === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddArtist(true);}}>Add Artist</button>
                                                <label className="label"> Artist </label>
                                                <input
                                                placeholder="Enter Artist of Media"
                                                className="input"
                                                type="text"
                                                name="artistname"
                                                value={artistname}
                                                onChange={e => handleChange(e)}

                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {addDescription === false && trend === "quote" && 
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddDescription(true);}}>Add Quote</button>
                                                
                                                <label className="label"> Make Quote: </label>
                                                <textarea
                                                    className="textarea"
                                                    type="text"
                                                    rows="10"
                                                    style={{ resize: "none" }}
                                                    name="description"
                                                    value={description}
                                                    onChange={e => handleChange(e)}
                                                    />

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {addCategory === false &&
                                <div className="field">
                                    <div className="control">
                                        <div className="card">
                                            <div className="card-content">
                                                <label className="label"> Category </label>
                                                {trend === "image" ? (
                                                    <>
                                                        {image_categories.map((val,index) => {
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
                                                        {quote_categories.map((val,index) => {
                                                            return(
                                                                <label key={index} className="radio">
                                                                    <input type="radio" value={val} name="category" onClick={e => {setCategory(e.target.value);setAddGenre(false);}} />{" "}
                                                                    {val}  
                                                                </label>
                                                            )
                                                        })}
                                                    </>
                                                )}

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
                                                {trend === "image" ? (
                                                    <>
                                                        {category === "Personal" &&
                                                            <>
                                                                {personal_genres.map((val,index) => {
                                                                    return(
                                                                        <label key={index} className="radio">
                                                                            <input type="radio" value={val} name="genre" onClick={e => {setGenre(e.target.value); setAddGenre(true); checkRadio();}} />{" "}
                                                                            {val}  
                                                                        </label>
                                                                    )
                                                                })}
                                                            </>
                                                        }
                                                        {category === "Design" &&
                                                            <>
                                                                {design_genres.map((val,index) => {
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
                                                        {all_genres.map((val,index) => {
                                                            return(
                                                                <label key={index} className="radio">
                                                                    <input type="radio" value={val} name="genre" onClick={e => {setGenre(e.target.value); setAddGenre(true); checkRadio();}} />{" "}
                                                                    {val}  
                                                                </label>
                                                            )
                                                        })}
                                                    </>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            {addSettings === false &&
                                <div className="box">
                                    <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddSettings(true);}}>Add Playback Settings</button>
                                                    
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
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    {trend === "image" && 
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
                                    }
                                </div>
                            }
                       
                       </form>
                    </div>
                </div>   
            </div>
        
        </div>
    )
}
export default withContext(TrendyUpload);