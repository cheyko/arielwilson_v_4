import React, { useEffect, useState } from "react";
import withContext from "../../../withContext";
import axios from "axios";
import { useParams } from "react-router-dom";
import Slider from "react-slick";

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
    const [addPT, setAddPT] = useState(true);
    const [section, setSection] = useState("");
    const [addSection, setAddSection] = useState(true);
    const [title, setTitle] = useState("");
    const [addTitle, setAddTitle] = useState(true);
    const [intro, setIntro] = useState("");
    const [addIntro, setAddIntro] = useState(true);
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
    const [addMainMedia, setAddMainMedia] = useState(true);
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
    const [has_main, setMain] = useState(false);
    

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
                        console.log(pageview);
                    }
                }
            );

        }else{
            setMainMedia([...Array(pageview.no_of_media).keys()]);
            setCaptionList(pageview.captionlist);
            setMediaTypes(pageview.mediatypes);
            loadData();
        }
    },[pageview]);

    //console.log(pageview);

    const loadData = () => {
        if (pageview !== "") {
            setTitle(pageview.title);setIntro(pageview.intro); setSection(pageview.section);
            setLoaded(true);setIntro(pageview.intro);setSubTitles(pageview.subtitles); setSubContent(pageview.subcontent);
            setMain(pageview.has_mainmedia)
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

    const saveSubtitle = (index) => {
        let temp = subtitles;
        temp[index] = aSubtitle;
        setSubTitles(temp);
        setOneSubTitle("");
        setShowSaveST(false);
    }

    
    const editSubtitle = (e,index) => {
        setOneSubTitle(subtitles[index]);
        setChosen(index);
        setShowSaveST(true);
        e.preventDefault();
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
        let temp = subContent;
        let t1 = medialist;
        let t2 = temp_MediaUrls;
        let t3 = pmcaptionlist;

        if (subtitles.length === 0){
            setSubTitles([...subtitles, "---"]);
        }
        setParagraphs([...paragraphs, aParagraph]);
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

    
    const saveParagraph = (chosen) => {
        var x = chosen[0];
        var y = chosen[1];
        let z = subContent;
        z[x][y] = aParagraph;
        setOneParagraph("");
        setShowSaveP(false);
        setSubContent(z);
    }

    const editParagraph = (e,x,y) => {
        setOneParagraph(subContent[x][y])
        setChosen([x,y]);
        setShowSaveP(true);
        e.preventDefault();
    }

    const removeParagraph = (index,idx) => {
        let temp = subContent;
        let tempContent = subContent[index].filter((aSub,i) => {return i !== idx});
        temp[index] = tempContent;
        setSubContent(temp.filter((aSub,i)=> {return aSub}));
    }
    
    const handlePMCaption = (e,index,idx) => {
        let temp = pmcaptionlist;
        temp[index][idx] = e.target.value;
        setPMCaptionList(temp.filter(t => {return t }));
    }

    const savePage = async (e, state) => {
        e.preventDefault();
        setResponseMsg("");
        let temp = subContent.map( (arr) => (
            arr.map( (para, idx) => (
                idx === arr.length - 1 ? para + "*^&#*@#" : para + "*^&" 
            ))
        ))
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
            formData.set('state',state);

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

            
            const result = await axios.put(`${process.env.REACT_APP_PROXY}/api/glossa`,formData, 
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
                        setPageID(result.data.page_id);
                        //add listing to context 
                        //clearFunc();
                        //return <Navigate to={`/view-page/${page_id}`} />
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

    /*if(pageview && !loaded){
        setSection(pageview.section)
        setLoaded(true);
    }*/

    const handleParagraphMedia = e => {
        let urls = Array.from(e.target.files).map(f => URL.createObjectURL(f));
        let files = Array.from(e.target.files);
        setTemp1(files);
        setTemp2(urls);
        setPMedia(true);

    }
        
    const radioClicked = (e) => {
        setPageType(e.target.value);
        setAddPT(true);
        checkRadio();
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

    //console.log(pageview);
    
    return (
        <div className="glossa-edit">
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
                        <div className="message-body">
                            <div className="content">
                                <div className="heading has-text-centered">
                                    {pagetype !== "mini-biography" && 
                                        <span>
                                            <b className="subtitle">{title}</b> {""}
                                            {<i className="fas fa-edit reaction-btn" onClick={e => { setAddTitle(false);e.preventDefault();}}>edit title</i> }
                                        </span> 
                                    }
                                    {pagetype === "mini-biography" && 
                                        <span>
                                            <b className="subtitle">{bioname}</b>{""}
                                            <div className='columns'>
                                                <span className="column">Date of Birth : <small>{dob}</small></span> 
                                                <span className="column">Gender : <small>{gender}</small></span> 
                                            </div>
                                            {bioInfo && <i className="fas fa-edit reaction-btn" onClick={e => { setShowBioInfo(false);e.preventDefault();}}>bio-info</i> }
                                        </span>
                                    }
                                </div>
                                <div>
                                    {has_main ? 
                                        <div>
                                            
                                            <Slider {...settings}>
                                                {mainmedia.map((aFile, index) => (
                                                     <div key={index} className="slick-slide slide--has-caption">
                                                        {mediatypes[index] === "image" && 
                                                            (
                                                                <figure style={{margin: "0 auto"}} key={index} className="image is-256x256">
                                                                    <p> <img className="slick-slide-image" alt="media" src={`${process.env.PUBLIC_URL}/images/glossa/page${pageview.page_id}/main${index}`} /></p>
                                                                    <figcaption className="figcaption">
                                                                        {captionlist[index]}
                                                                    </figcaption>
                                                                </figure>
                                                                
                                                            )}
                                                            {mediatypes[index] === "audio" && (
                                                                <audio style={{margin: "0 auto"}} key={index} controls>
                                                                    <source src={`${process.env.PUBLIC_URL}/images/glossa/page${pageview.page_id}/main${index}`} type="audio/mp3"/>
                                                                    <figcaption className="figcaption">
                                                                        {captionlist[index]}
                                                                    </figcaption>
                                                                </audio>
                                                            )}
                                                            {mediatypes[index] === "video" && (
                                                                <video style={{margin: "0 auto"}} key={index} width="320" height="240" controls>
                                                                    <source src={`${process.env.PUBLIC_URL}/images/glossa/page${pageview.page_id}/main${index}`} type="video/mp4"/>
                                                                    <figcaption className="figcaption">
                                                                        {captionlist[index]}
                                                                    </figcaption>
                                                                </video>
                                                            )}

                                                     </div>
                                                ))}

                                            </Slider>
                                            <div style={{float:"right", cursor:"pointer"}}>
                                                <i className="fas fa-edit reaction-btn" onClick={e => { setAddMainMedia(false);e.preventDefault();}}>edit Main Media</i> 
                                            </div>
                                        </div>
                                        : 
                                        <h1>No Media</h1>
                                    }
                                    
                                </div>
                                <br/><br/>
                                <div className="body">
                                    {intro !== "" && <div>{intro}{" "} {<i className="fas fa-edit reaction-btn" onClick={e => setAddIntro(false)}>{" "}Edit introduction</i> }</div> }
                                    <br />
                                    {subtitles && subtitles.length >= subContent.length && subtitles.map((sub,idx) => {
                                        return(
                                            <div key={idx}>
                                                {sub} {<i className="fas fa-edit reaction-btn" onClick={e => editSubtitle(e, idx)}>{" "}Edit Subtitle</i> }
                                                <br />
                                                {subContent[idx].map((aPara, index) => {
                                                    return(
                                                        <div key={index}>
                                                            {aPara} {<i className="fas fa-edit reaction-btn" onClick={e => editParagraph(e, idx, index)}>{" "}Edit Paragraph</i>}
                                                        </div>
                                                    )
                                                })}
                                                <br />
                                            </div>
                                        )
                                    })}

                                    {subContent && subtitles.length < subContent.length && subContent.map((sub,idx) => {
                                        return(
                                            <div key={idx}>
                                                {subtitles[idx]} {<i className="fas fa-edit reaction-btn" onClick={e => editSubtitle(e, idx)}>{" "}Edit Subtitle</i> }
                                                <br />
                                                {sub.map((a_sub, index) => {
                                                    return(
                                                        <div>
                                                            {a_sub} {<i className="fas fa-edit reaction-btn" onClick={e => editParagraph(e,idx,index)}>{" "}Edit Paragraph</i> }
                                                        </div>
                                                    )
                                                })} 
                                                <br />
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </article>
                    <form onSubmit={e => savePage(e, "draft")}>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-link is-fullwidth">Save as Draft </button>
                            </div>
                        </div>
                    </form>
                    <form onSubmit={e => savePage(e, "save")}>
                        <div className="field">
                            <div className="control">
                                <button type="submit" className="button is-primary is-fullwidth">Submit Page</button>
                            </div>
                        </div>
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
                                    {showSaveST ? <span> <i className="fas fa-check reaction-btn" onClick={e => saveSubtitle(chosen)}> Save {chosen}</i>{" "}
                                        <i className="fas fa-times reaction-btn" onClick={e => {setOneSubTitle("");setShowSaveST(false);}}> Cancel </i></span> 
                                        : <span><button className="button is-small is-success" onClick={e => {e.preventDefault();addSubtitle();}}>Add Sub Title</button></span>}

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
                                    {showSaveP ? <span> <i className="fas fa-check reaction-btn" onClick={e => saveParagraph(chosen)}> Save section {chosen[0]+1}  {" - paragraph "}{chosen[1]+1}</i>{" "}<i className="fas fa-times reaction-btn" onClick={e => {setOneParagraph("");setShowSaveP(false);}}> Cancel </i></span> : <span><button className="button is-small is-success" onClick={e => {e.preventDefault();addParagraph();}}>Add Paragraph</button></span>}
                                    
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
                                        <input onChange={e => handleParagraphMedia(e)} name="temp1" single="true" id="temp1" type="file" />           
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>

                    <div className="Additional edits">
                        <h1>Testing</h1>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(EditPage);