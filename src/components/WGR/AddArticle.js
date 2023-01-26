import React, { useEffect, useState } from "react";
import withContext from "../../../withContext";

const AddArticle = props => {

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
        console.log(subContent);
        console.log(paragraphs);
        if (subtitles.length === 0){
            setSubTitles([...subtitles, "---"]);
        }
        setParagraphs([...paragraphs, aParagraph]);
        let temp = subContent;
        if(subContent.length === 0){
            temp[0] = [...temp, aParagraph];
        }else{
            temp[subContent.length - 1] = [...temp[subContent.length - 1], aParagraph];
        }
        setSubContent(temp);
        setOneParagraph("");
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
            /*case 'description':
                setDescription(e.target.value);
                break;*/
            default:
                break;
        }
        return true;
    }
    return(
        <div className="box">
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
                                {addTitle && <span><b className="subtitle">{title}</b>{""}<i className="fas fa-edit reaction-btn" onClick={e => { setAddTitle(false);e.preventDefault();}}>title</i></span> }
                            </div>
                            <div className="body">
                                {addIntro && <p>{intro}{" "}<i className="fas fa-edit reaction-btn" onClick={e => setAddIntro(false)}>introduction</i></p> }
                                {(subtitles.length > 0 || subContent.length > 0 ) &&
                                    subtitles.map((aSub, index) => {
                                        console.log(subContent[index]);
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
                                                        <p key={idx} className="article-paragraph">
                                                            {paragraph}{" "}
                                                            <i className="fas fa-edit reaction-btn" onClick={e => {e.preventDefault();editParagraph(e,index,idx);}}>Edit P {idx+1}</i>
                                                            <i className="fas fa-times reaction-btn" onClick={e => {e.preventDefault();removeParagraph(index,idx);}}> Remove {idx+1}</i>
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
                <form>
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
                                        <input type="radio" value="historical" name="pagetype" />{" "}
                                        Historical
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="recent" name="pagetype" />{" "}
                                        Recent
                                    </label>
                                    <label className="radio">
                                        <input type="radio" value="on-going" name="pagetype" />{" "}
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
                                            <input type="radio" value="place" name="section" onClick={e => {setSection(e.target.value); setAddSection(true);}} />{" "}
                                            Place
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="event" name="section" />{" "}
                                            Event
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="thing" name="section" />{" "}
                                            Thing
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="animal" name="section" />{" "}
                                            Animal
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="plants" name="section" />{" "}
                                            Plants
                                        </label>
                                        <label className="radio">
                                            <input type="radio" value="topic" name="section" />{" "}
                                            Topic
                                        </label>
                                    </>}
                                </div>
                            </div>
                        </div>
                    </div>
                    }
                    {pagetype === "normal" &&
                        <div className="form">
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
                    }
                    {pagetype === "mini-biography" &&
                        <div className="form">
                            <div className="field">
                                <div className="card">
                                    <div className="card-content">
                                        <button className="button is-small is-success" onClick={e => {e.preventDefault();setAddInfo(true);}}>Add Bio Info</button>
                                        
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
                                </div>
                            </div>
                        </div>
                    </div>            
                </form>

            </div>
        </div>
    )
}
export default withContext(AddArticle);