import React, { useEffect, useState } from "react";
import withContext from "../../../withContext";
import axios from "axios";
import {Navigate} from "react-router-dom";
import Slider from "react-slick";


const CreatePedia = props => {

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
    };

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

    useEffect( () => {
        checkRadio();
        checkNextRadio();
    },[pagetype,subtitles,addPT,addSection]);

    const radioClicked = (e) => {
        setPageType(e.target.value);
        setAddPT(true);
        checkRadio();
    }

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

    const addSubtitle = () => {
        if (aSubtitle !== ""){
            setSubTitles([...subtitles, aSubtitle]);
            setOneSubTitle("");
            setSubContent([...subContent,[]]);
            setMedialist([...medialist,[]]);
            setMediaUrls([...temp_MediaUrls,[]]);
            setPMCaptionList([...pmcaptionlist,[]]);
        }

    }

    const editSubtitle = (e,index) => {
        setOneSubTitle(subtitles[index]);
        setChosen(index);
        setShowSaveST(true);
        e.preventDefault();
    }

    const saveSubtitle = (index) => {
        let temp = subtitles;
        temp[index] = aSubtitle;
        setSubTitles(temp);
        setOneSubTitle("");
        setShowSaveST(false);
    }

    const removeSubtitle = (index) => {
        let temp = subtitles;
        let tempContent = subContent
        if (subContent[index].length === 0){
            tempContent = subContent.filter((aSub,i) => {return i !== index});
            temp = subtitles.filter((aSub,i) => {return i !== index});
        }else{
            console.log("test");
            temp[index] = "---";
        }
        setSubContent(tempContent);
        setSubTitles(temp.filter((a)=> {return a}));
    }

    const addParagraph = () => {
        console.log(temp1);
        console.log(temp2);
        let temp = subContent;
        let t1 = medialist;
        let t2 = temp_MediaUrls;
        let t3 = pmcaptionlist;

        if (subtitles.length === 0){
            setSubTitles([...subtitles, "---"]);
        }
        setParagraphs([...paragraphs, aParagraph]);
        console.log(subContent);
        if(subContent.length === 0 || medialist.length === 0){
            temp[0] = [...temp, aParagraph];
            t1[0] = [...t1, temp1]
            t2[0] = [...t2, temp2]
            t3[0] = [...t3,[]]
        }else{
            console.log(temp);
            console.log(t1);
            console.log(t2);
            console.log(medialist);
            temp[subContent.length - 1] = [...temp[subContent.length - 1], aParagraph];
            t1[medialist.length - 1] = [...t1[medialist.length - 1], temp1];
            t2[temp_MediaUrls.length - 1] = [...t2[temp_MediaUrls.length - 1], temp2];
            t3[pmcaptionlist.length - 1] = [...t3[pmcaptionlist.length - 1], []];
            
        }

        setSubContent(temp);
        setPMCaptionList(t3);
        setMediaUrls(t2);
        setMedialist(t1);
        setOneParagraph("");
        setPMedia(false);
        setTemp1([]);
        setTemp2([]);

    }

    const editParagraph = (e,x,y) => {
        setOneParagraph(subContent[x][y])
        setChosen([x,y]);
        setShowSaveP(true);
        e.preventDefault();
    }

    const saveParagraph = (chosen) => {
        var x = chosen[0];
        var y = chosen[1];
        setOneParagraph("");
        setShowSaveP(false);
    }

    const removeParagraph = (index,idx) => {
        let temp = subContent;
        let tempContent = subContent[index].filter((aSub,i) => {return i !== idx});
        temp[index] = tempContent;
        setSubContent(temp.filter((aSub,i)=> {return aSub}));
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'title':
                setTitle(e.target.value);
                break;
            case 'intro':
                setIntro(e.target.value);
                break;
            case 'aSubtitle':
                setOneSubTitle(e.target.value);
                break;
            case 'aParagraph':
                setOneParagraph(e.target.value);
                break;
            case 'bioname':
                setBioName(e.target.value);
                break;
            case 'dob':
                setDOB(e.target.value);
                break;
            /*case 'description':
                setDescription(e.target.value);
                break;*/
            default:
                break;
        }
        return true;
    }

    /*const testing = async(e) => {
        e.preventDefault();
        console.log(mainmedia);
        const formData = new FormData();
        //formData.set('medialist',medialist);
        formData.set('pmcaptionlist',pmcaptionlist);

        mainmedia.forEach( (aFile,index) => {
            console.log(aFile);
            formData.append('mainmedia',aFile);
        });
        
        medialist.forEach( (arr,index) => {
            //formData.append('medialist',arr);
            console.log(arr);
            arr.forEach((aFile,index) => {
                console.log(aFile[0]);
                if (aFile[0]){
                    formData.append('medialist',aFile[0]);
                }else{
                    formData.append('medialist',new File(["empty"], "empty", {type: "text/plain",} ) );
                }
            });
        });

        
        const result = await axios.post('/api/testing',formData, 
            {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                maxContentLength: 100000000,
                maxBodyLength: 1000000000
        }).then(
            (result) => {
                if (result.status === 200){
                    setResponseMsg("Page was saved.");
                }else{
                    setResponseMsg("Page was not saved, please try again. Contact us for suppport if problem persist.");
                }
            }
        );
        console.log(formData);
    }*/

    const savePage = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        console.log(mainmedia);
        console.log(captionlist);
        console.log(medialist);
        console.log(pmcaptionlist);
        console.log(mediatypes);
        console.log(subtitles);
        console.log(subContent);
        let temp = subContent.map( (arr) => (
            arr.map( (para, idx) => (
                idx === arr.length - 1 ? para + "*^&#*@#" : para + "*^&" 
            ))
        ))
        console.log(temp);
        const user_id = props.context.user.id;
        if(intro || subContent.length > 0){
            const formData = new FormData();
            formData.append('user_id',user_id);
            formData.append('pagetype',pagetype);
            formData.append('section',section);

            if (pagetype === "mini-biography"){
                formData.append('bioname',bioname);
                formData.append('dob',dob);
                formData.append('gender',gender);
            }else{
                formData.append('title',title);
            }
            formData.append('intro',intro);
            formData.append('subtitles', subtitles);
            formData.append('subContent', temp);
            
            formData.set('has_image',false);
            formData.set('has_audio',false);
            formData.set('has_video',false);

            if (mainmedia){ 
                formData.append('has_media',true);
                formData.append('captionlist',captionlist);
                formData.append('mediatypes',mediatypes);
                mainmedia.forEach( (aFile,index) => {
                    formData.append('mainmedia',aFile);

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
            }else{
                
                formData.append('has_media',false);
            }
            medialist.forEach( (arr) => {
                arr.forEach((aFile,index) => {
                    if (aFile[0]){
                        formData.append('medialist',aFile[0]);
                    }else{
                        formData.append('medialist',new File(["empty"], "empty", {type: "text/plain",} ) );
                    }
                });
            });
            formData.set('pmcaptionlist',pmcaptionlist);

            
            const result = await axios.post(`${process.env.REACT_APP_PROXY}/api/preepedia`,formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    maxContentLength: 100000000,
                    maxBodyLength: 1000000000
            }).then(
                (result) => {
                    if (result.status === 200){
                        setResponseMsg("Page was saved.");
                        const page_id = result.data.page_id;
                        //add listing to context 
                        //clearFunc();
                        return <Navigate to={`/view-page/${page_id}`} />
                    }else{
                        setResponseMsg("Page was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            return true;
                
        }else{
            setResponseMsg("Not enough information on this page.");
            return false;
        }
    }

    const handleMainMedia = e => {
        setUrls(Array.from(e.target.files).map(f => URL.createObjectURL(f) ));
        setMainMedia(Array.from(e.target.files));
        let temp = [];
        Array.from(e.target.files).map( (file) => {
            temp = [...temp, file.type.split('/')[0]]
        });
        setMediaTypes(temp);
    }

    const handleParagraphMedia = e => {
        let urls = Array.from(e.target.files).map(f => URL.createObjectURL(f));
        let files = Array.from(e.target.files);
        setTemp1(files);
        setTemp2(urls);
        setPMedia(true);

    }

    const handleCaption = (e,index) => {
        let temp = captionlist;
        temp[index] = e.target.value;
        setCaptionList(temp.filter(t => {return t }));
        console.log(captionlist);
    }

    const handlePMCaption = (e,index,idx) => {
        let temp = pmcaptionlist;
        temp[index][idx] = e.target.value;
        setPMCaptionList(temp.filter(t => {return t }));
    }

    return(
        <div className="box create-page">
            <div className="heading has-text-centered">
                <h1>Create PreePedia Page</h1>
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
                    <div className="message-body">
                        <div className="content">
                            <div className="heading has-text-centered">
                                {pagetype !== "mini-biography" && 
                                    <span>
                                        <b className="subtitle">{title}</b> {""}
                                        {addTitle && <i className="fas fa-edit reaction-btn" onClick={e => { setAddTitle(false);e.preventDefault();}}>title</i> }
                                    </span> 
                                }
                                {pagetype === "mini-biography" && 
                                    <span>
                                        <b className="subtitle">{bioname}</b>{""}
                                        <p className='columns'>
                                            <span className="column">Date of Birth : <small>{dob}</small></span> 
                                            <span className="column">Gender : <small>{gender}</small></span> 
                                        </p>
                                        {bioInfo && <i className="fas fa-edit reaction-btn" onClick={e => { setShowBioInfo(false);e.preventDefault();}}>bio-info</i> }
                                    </span>
                                }
                            </div>
                            <div className="mainmedia">
                                <div className="upload-wrapper has-text-centered">
                                    {mainmedia ? 
                                        (
                                        <>
                                            <Slider {...settings}>
                                                {mainmedia.map((aFile, index) => (
                                                    <div key={index} className="slick-slide slide--has-caption">
                                                        {aFile.type.split('/')[0] === "image" && 
                                                        (
                                                            <figure key={index} className="image">
                                                                <p> <img className="slick-slide-image" src={temp_urls[index]} alt="upload" /></p>
                                                                <figcaption className="figcaption">
                                                                    {captionlist[index]}
                                                                </figcaption>
                                                            </figure>
                                                            
                                                        )}
                                                        {aFile.type.split('/')[0] === "audio" && (
                                                            <audio key={index} controls>
                                                                <source src={temp_urls[index]} type={aFile.type}/>
                                                                <figcaption className="figcaption">
                                                                    {captionlist[index]}
                                                                </figcaption>
                                                            </audio>
                                                        )}
                                                        {aFile.type.split('/')[0] === "video" && (
                                                            <video key={index} width="320" height="240" controls>
                                                                <source src={temp_urls[index]} type={aFile.type}/>
                                                                <figcaption className="figcaption">
                                                                    {captionlist[index]}
                                                                </figcaption>
                                                            </video>
                                                        )}
                                                        {!addMainMedia &&
                                                            <div className="input-box">
                                                                <input onChange={e => handleCaption(e,index)} className="input" placeholder="Enter Caption for this media file" type="text" name="caption" />
                                                            </div>
                                                        }
                                                    </div>
                                                    
                                                ))}
                                            </Slider>

                                        </>
                                        ):(
                                            <span>{""}</span>
                                        )
                                    }
                                    {addMainMedia && <i className="fas fa-image reaction-btn" onClick={e => { setAddMainMedia(false);e.preventDefault();}}> Change Media and Caption</i> }
                                    
                                </div>
                            </div>
                            <div className="body">
                                {intro !== "" && <p>{intro}{" "} {addIntro &&<i className="fas fa-edit reaction-btn" onClick={e => setAddIntro(false)}>introduction</i> }</p> }
                                {(subtitles.length > 0 || subContent.length > 0 ) &&
                                    subtitles.map((aSub, index) => {
                                        console.log(medialist);
                                        return(
                                            <p key={index}>
                                                <p className="field has-addons">
                                                    <b className="article-subtitle">{aSub}</b>
                                                    {" "}&nbsp;&nbsp;<i className="fas fa-edit reaction-btn" onClick={e => { e.preventDefault();editSubtitle(e,index);}}> Edit {index+1}</i>
                                                    {" "}&nbsp;&nbsp;<i className="fas fa-times reaction-btn" onClick={e => {removeSubtitle(index);}}> Remove {index+1}</i>
                                                </p>
                                                <p className="article-subcontent">
                                                    {subContent.length > 0 ?
                                                    subContent[index].map((paragraph,idx) => (
                                                        <p key={idx} className="article-paragraph columns">
                                                            <span className="column">
                                                            {paragraph}{" "}
                                                            <i className="fas fa-edit reaction-btn" onClick={e => {e.preventDefault();editParagraph(e,index,idx);}}>Edit P {idx+1}</i>
                                                            <i className="fas fa-times reaction-btn" onClick={e => {e.preventDefault();removeParagraph(index,idx);}}> Remove {idx+1}</i>
                                                            </span>
                                                            <span className="column is-one-quarter">
                                                                {medialist[index] && medialist[index].length > 0 &&
                                                                <Slider {...settings}>
                                                                    {medialist[index][idx].map((aFile, i) => (
                                                                        <p key={i} className="slick-slide">
                                                                            {aFile.type.split('/')[0] === "image" && 
                                                                            (
                                                                                <figure key={i} className="image is-1by1">
                                                                                    <img src={temp_MediaUrls[index][idx]} alt="upload" />
                                                                                    <figcaption className="figcaption">
                                                                                    {pmcaptionlist[index][idx] ? <span> {pmcaptionlist[index][idx]}</span> : <span></span> }
                                                                                    </figcaption>
                                                                                </figure>
                                                                            )}
                                                                            {aFile.type.split('/')[0] === "audio" && (
                                                                                <audio key={index} controls>
                                                                                    <source src={temp_MediaUrls[index][idx]} type={aFile.type}/>
                                                                                    <figcaption className="figcaption">
                                                                                        {pmcaptionlist[index][idx]}
                                                                                    </figcaption>
                                                                                </audio>
                                                                            )}
                                                                            {aFile.type.split('/')[0] === "video" && (
                                                                                <video key={index} width="320" height="240" controls>
                                                                                    <source src={temp_MediaUrls[index][idx]} type={aFile.type}/>
                                                                                    <figcaption className="figcaption">
                                                                                        {pmcaptionlist[index][idx] ? <span> {pmcaptionlist[index][idx]}</span> : <span></span> }
                                                                                    </figcaption>
                                                                                </video>
                                                                            )}
                                                                            
                                                                            <span className="input-box">
                                                                                <input onChange={e => handlePMCaption(e,index,idx)} className="input" placeholder="Enter Caption for this media file" type="text" name="pmcaption" />
                                                                            </span>
                                                                            
                                                                        </p>
                                                                        
                                                                    ))}
                                                                </Slider>
                                                                }
                                                            </span>
                                                        </p>
                                                    )):(
                                                        <span></span>
                                                    )
                                                    }
                                                </p>
                                            </p> 
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </article>
                <form onSubmit={e => savePage(e)}>
                    <div className="field">
                        <div className="control">
                            <button type="submit" className="button is-primary is-fullwidth">Submit Page</button>
                        </div>
                    </div>
                    <span>{responseMsg}</span>
                    <br />
                    {addPT === false &&
                    <div className="field">
                        <div className="control">
                            <div className="card">
                                <div className="card-content">
                                    <label className="label"> Page Type </label>
                                    <label className="radio">
                                        <input type="radio" id="btn1" value="normal" name="pagetype" onClick={e => radioClicked(e)} />{" "}
                                        Normal
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="mini-biography" name="pagetype" onClick={e => radioClicked(e)}  />{" "}
                                        Mini-Biography
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="historical" name="pagetype" onClick={e => radioClicked(e)} />{" "}
                                        Historical
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="recent" name="pagetype" onClick={e => radioClicked(e)} />{" "}
                                        Recent
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="on-going" name="pagetype" onClick={e => radioClicked(e)} />{" "}
                                        On-Going
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {addSection === false &&
                    <div className="field">
                        <div className="control">
                            <div className="card">
                                <div className="card-content">
                                    <label className="label"> Section </label>
                                    <label className="radio">
                                        <input type="radio" value="people" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                        People  
                                    </label>
                                    {pagetype !== "mini-biography" && 
                                    <>
                                        <label className="radio">
                                            <input type="radio" value="places" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                            Place
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="event" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                            Event
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="thing" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                            Thing
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="animal" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                            Animal
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="plant" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                            Plant
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="topic" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                            Topic
                                        </label>
                                    </>
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {pagetype !== "mini-biography" &&
                        <div className="form">
                            <div className="columns">
                                <div className="column">
                                    {addTitle === false &&
                                    <div className="field">
                                        <div className="card">
                                            <div className="card-content">
                                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddTitle(true);}}>Add Title</button>
                                                <label className="label"> Page Title </label>
                                                <input
                                                placeholder="Enter title of Page"
                                                className="input"
                                                type="text"
                                                name="title"
                                                value={title}
                                                onChange={e => handleChange(e)}

                                                />
                                            </div>
                                        </div>    
                                    </div>
                                    }
                                </div>
                            
                                <div className="column is-one-third">
                                    {addMainMedia === false &&
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
                                                <input onChange={e => handleMainMedia(e)} name="mainmedia" multiple id="mainmedia" type="file" />
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                            </div>
                        </div>
                    }
                    {pagetype === "mini-biography" &&
                        <div className="form">
                            {bioInfo === false &&
                            <div className="box">
                                <button className="button is-small is-success" onClick={e => {e.preventDefault();setShowBioInfo(true);}}>Add Bio Info</button>
                                <div className="columns">
                                    <div className="column">
                                        <div className="field">
                                            <div className="card form-card">
                                                <div className="card-content">
                                                    <label className="label"> Name of Bio : </label>
                                                    <input
                                                    placeholder="Enter Full Name"
                                                    className="input"
                                                    type="text"
                                                    name="bioname"
                                                    value={bioname}
                                                    onChange={e => handleChange(e)}

                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-one-third">
                                        <div className="field">
                                            <div className="card form-card">
                                                <div className="card-content image-upload">
                                                    <label className="media-select" htmlFor="mainmedia">
                                                        <i style={{fontSize:"xx-large"}} className="fas fa-photo-video"></i> 
                                                        <small>Select Personal Media</small> {mainmedia ? (<i style={{color:"green"}} className="fas fa-check-circle"></i>) : ("")}
                                                    </label>
                                                    <input onChange={e => handleMainMedia(e)} name="mainmedia" multiple id="mainmedia" type="file" />
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                </div>
                                <div className="columns">
                                    <div className="column is-one-third">
                                        <div className="field">
                                            <div className="card form-card">
                                                <div className="card-content">
                                                    <label className="label"> Enter Date of Birth </label>
                                                    <input
                                                    className="input"
                                                    type="date"
                                                    name="dob"
                                                    value={dob}
                                                    max={new Date().toISOString().split("T")[0]}
                                                    onChange={e => handleChange(e)}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column is-one-third">
                                        <div className="field">
                                            <div className="card form-card" >
                                                <div className="card-content">
                                                    <label className="label"> Gender </label>
                                                    <label className="radio">
                                                        <span><input type="radio" value="male" name="gender" onClick={e => setGender(e.target.value)} />{" "}
                                                            Male</span>
                                                        &nbsp;&nbsp;&nbsp;
                                                        <span> <input type="radio" value="female" name="gender" onClick={e => setGender(e.target.value)} />{" "}
                                                            Female </span>
                                                    </label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            }
                        </div>
                    }   
                    <div className="form">
                        {addIntro === false &&
                        <div className="field">
                            <div className="card">
                                <div className="card-content">
                                    <button className="button is-small is-success" onClick={e => setAddIntro(true)}>Add Introduction</button>
                                    
                                    <label className="label"> Introduction </label>
                                        <textarea
                                        className="textarea"
                                        type="text"
                                        rows="6"
                                        style={{ resize: "none" }}
                                        name="intro"
                                        value={intro}
                                        onChange={e => handleChange(e)}
                                        />
                                </div>
                            </div>
                        </div>
                        }
                        <div className="field">
                            <div className="card">
                                <div className="card-content">
                                    {showSaveST ? <span> <i className="fas fa-check reaction-btn" onClick={e => saveSubtitle(chosen)}> Save {chosen}</i>{" "}<i className="fas fa-times reaction-btn" onClick={e => {setOneSubTitle("");setShowSaveST(false);}}> Cancel </i></span> : <span><button className="button is-small is-success" onClick={e => {e.preventDefault();addSubtitle();}}>Add Sub Title</button></span>}
                                    <label className="label"> Sub Title </label>
                                    <input
                                    placeholder="Enter title of Page"
                                    className="input"
                                    type="text"
                                    name="aSubtitle"
                                    value={aSubtitle}
                                    onChange={e => handleChange(e)}

                                    />
                                </div>
                                
                            </div>
                            
                        </div>
                        <div className="field">
                            <div className="card">
                                <div className="card-content">
                                    {showSaveP ? <span> <i className="fas fa-check reaction-btn" onClick={e => saveParagraph(chosen)}> Save {chosen[0]+1}{"-"}{chosen[1]+1}</i>{" "}<i className="fas fa-times reaction-btn" onClick={e => {setOneParagraph("");setShowSaveP(false);}}> Cancel </i></span> : <span><button className="button is-small is-success" onClick={e => {e.preventDefault();addParagraph();}}>Add Paragraph</button></span>}
                                    
                                    <label className="label"> Paragraph </label>
                                        <textarea
                                        className="textarea"
                                        type="text"
                                        rows="6"
                                        style={{ resize: "none" }}
                                        name="aParagraph"
                                        value={aParagraph}
                                        onChange={e => handleChange(e)}
                                        />

                                    <br/>
                                    <div className="image-upload">
                                        <label className="media-select" htmlFor="temp1">
                                            <i style={{fontSize:"xx-large"}} className="fas fa-photo-video"></i> 
                                            <small>Select Paragraph Media</small> {pmedia ? (<i style={{color:"green"}} className="fas fa-check-circle"></i>) : ("")}
                                            <br /> { !pmedia && <small> No files selected </small>}
                                        </label>
                                        <input onChange={e => handleParagraphMedia(e)} name="temp1" single id="temp1" type="file" />           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>            
                </form>

            </div>
        </div>
    )
}
export default withContext(CreatePedia);