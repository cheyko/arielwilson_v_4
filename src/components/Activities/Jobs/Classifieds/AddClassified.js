import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext"

const AddClassified = props => {

    let navigate = useNavigate();

    const [title, setTitle] = useState("");
    const categories = ["Agriculture, Food, and Natural Resources", "Architecture and Construction", "Arts, Audio/Video Technology, and Communication",
                        "Business and Finance", "Government and Public Administration", "Health Science", "Information Technology", "Law, Public Safety, Corrections, and Security",
                        "Marketing","Science, Technology, Engineering, and Math"];
    const [category, setCategory] = useState("");
    const [location, setLocation] = useState("");
    const [metrics, setMetrics] = useState("");
    const types = ["Full-Time", "Part-Time", "Day-Job", "Contract", "Consultant"];
    const [typeOf, setType] = useState("");
    const [company, setCompany] = useState("");
    const [description, setDescription] = useState("");
    const [viewDesc, setViewDesc] = useState(false);
    const [paragraphs, setParagraphs] = useState([]);
    const [moreinfo, setMore] = useState(false);
    const [editParagraph, setEditParagraph] = useState(null);
    const [isEditParagraph,setIsEditParagraph] = useState(false);
    const [subtopic, setSubtopic] = useState("");
    const [subtopics, setSubtopics] = useState([]);
    const [content, setContent] = useState("fulltext");
    const [contents, setContents] = useState([]);
    const [topicInfo, setTopicInfo] = useState("");
    const [topicPoints, setTopicPoints] = useState([]);
    const [topicInfos, setTopicInfos] = useState([]);
    const [editSubContent, setEditSubcontent] = useState(null);
    const [isEditSubContent,setIsEditSubContent] = useState(false);
    const [editPoints, setEditPoints] = useState(null);
    const [isEditPoints,setIsEditPoints] = useState(false);
    const [qualification, setQualification] = useState("");
    const [qualifications, setQualifications] = useState([]);
    const [viewQuals, setViewQuals] = useState(false);
    const [editQualification, setEditQualification] = useState(null);
    const [isEditQualification,setIsEditQualification] = useState(false);
    const [benefit, setBenefit] = useState("");
    const [benefits, setBenefits] = useState([]);
    const [viewBenefits, setViewBenefits] = useState(false);
    const [editBenefit, setEditBenefit] = useState(null);
    const [isEditBenefit,setIsEditBenefit] = useState(false);
    const [skill, setSkill] = useState("");
    const [skills, setSkills] = useState([]);
    const [viewSkills, setViewSkills] = useState(false);
    const [editSkill, setEditSkill] = useState(null);
    const [isEditSkill,setIsEditSkill] = useState(false);
    const [question, setQuestion] = useState("");
    const [questions, setQuestions] = useState([]);
    const [responsesList, setResponsesList] = useState([]);
    const [viewQues, setViewQues] = useState(false);
    const [response, setResponse] = useState("");
    const [responses, setResponses] = useState([]);
    const [editQuestion, setEditQuestion] = useState(null);
    const [isEditQuestion,setIsEditQuestion] = useState(false);
    const [editResponse, setEditResponse] = useState(null);
    const [isEditResponse,setIsEditResponse] = useState(false);
    const [end, setEndDate] = useState(new Date().toISOString().split("T")[0]);

    const [responseMsg, setResponseMsg] = useState("");   

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        return result;
    }

    const clearFunc = e => {
        e.preventDefault();
        setTitle(""); setCategory(""); setLocation("");
        setMetrics(""); setType(""); setCompany("");
        setDescription(""); setViewDesc(false); setParagraphs([]);
        setMore(false); setEditParagraph(null); setIsEditParagraph(false);
        setSubtopic(""); setSubtopics([]); setContent("fulltext");
        setContents([]); setTopicInfo(""); setTopicPoints([]);
        setTopicInfos([]); setEditSubcontent(null); setIsEditSubContent(false);
        setEditPoints(null); setIsEditPoints(false); setQualification("");
        setQualifications([]); setViewQuals(false); setEditQualification(null);
        setIsEditQualification(false);  setBenefit(""); setBenefits([]);
        setViewBenefits(false); setEditBenefit(null); setIsEditBenefit(false);
        setSkill("");   setSkills([]);  setViewSkills(false);
        setEditSkill(null); setIsEditSkill(false);  setQuestion("");
        setQuestions([]);   setResponsesList([]);   setViewQues(false);
        setResponse("");    setResponses([]); setEditQuestion(null);  
        setIsEditQuestion(false); setEditResponse(null);    setIsEditResponse(false);
        setEndDate(new Date().toISOString().split("T")[0]); setResponseMsg("");   
    }

    const saveClassified = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
    }

    const loadClassified = async(e) => {

    }

    //const []
    const addChoice = (adding) => {
        if(adding === 'paragraph'){
            setParagraphs([...paragraphs, description]);
            setDescription("");
        }else if(adding === 'subcontent'){
            setSubtopics([...subtopics, subtopic]);
            setContents([...contents, content]);
            if(content === 'fulltext'){
                setTopicInfos([...topicInfos, topicInfo]);
            }else{
                setTopicInfos([...topicInfos, topicPoints]);
            }
            setSubtopic("");
            //setContent("fulltext");
            setTopicPoints([]);
            setTopicInfo("");
        }else if(adding === 'points'){
            setTopicPoints([...topicPoints, topicInfo]);
            setTopicInfo("");
        }else if(adding === 'qualifications'){
            setQualifications([...qualifications, qualification]);
            setQualification("");
        }else if(adding === 'benefits'){
            setBenefits([...benefits, benefit]);
            setBenefit("");
        }else if(adding === 'skills'){
            setSkills([...skills, skill]);
            setSkill("");
        }else if(adding === 'questions'){
            setQuestions([...questions, question]);
            setResponsesList([...responsesList, responses]);
            setQuestion("");
            setResponses([]);
            setResponse("");
        }else if(adding === 'responses'){
            setResponses([...responses, response]);
            setResponse("");
        }
    }

    const editChoice = (index,editing) => {
        if(editing === 'paragraph'){
            setDescription(paragraphs[index]);
            setEditParagraph(index);
            setIsEditParagraph(true);
        }else if(editing === 'subcontent'){
            setSubtopic(subtopics[index]);
            setContent(contents[index]);
            if(contents[index] === 'fulltext'){
                document.getElementById("points").checked = false;
                document.getElementById("fulltext").checked = true;
                setTopicInfo(topicInfos[index]);
            }else{
                document.getElementById("fulltext").checked = false;
                document.getElementById("points").checked = true;
                setTopicPoints(topicInfos[index]);
            }
            setEditSubcontent(index);
            setIsEditSubContent(true);

        }else if(editing === 'points'){
            setTopicInfo(topicPoints[index]);
            setEditPoints(index);
            setIsEditPoints(true);
        }else if(editing === 'qualifications'){
            setQualification(qualifications[index]);
            setEditQualification(index);
            setIsEditQualification(true);
        }else if(editing === 'benefits'){
            setBenefit(benefits[index]);
            setEditBenefit(index);
            setIsEditBenefit(true);
        }else if(editing === 'skills'){
            setSkill(skills[index]);
            setEditSkill(index);
            setIsEditSkill(true);
        }else if(editing === 'questions'){
            setQuestion(questions[index]);
            setResponses(responsesList[index]);
            setEditQuestion(index);
            setIsEditQuestion(true);
        }else if(editing === 'responses'){
            setResponse(responses[index]);
            setEditResponse(index);
            setIsEditResponse(true);
        }
    }

    const reAddChoice = (adding) => {
        if(adding === 'paragraph'){
            let tempParagraphs = paragraphs;
            tempParagraphs[editParagraph] = description;
            setParagraphs(tempParagraphs);
            setDescription("");
            setEditParagraph(null);
            setIsEditParagraph(false);
        }else if(adding === 'subcontent'){
            let tempSubTopics = subtopics;
            tempSubTopics[editSubContent] = subtopic;
            setSubtopics(tempSubTopics);
            let tempContents = contents;
            tempContents[editSubContent] = content;
            setContents(tempContents);
            let tempTopicInfos = topicInfos;
            if(content === 'fulltext'){
                tempTopicInfos[editSubContent] = topicInfo;
                setTopicInfos(tempTopicInfos);
            }else{
                tempTopicInfos[editSubContent] = topicPoints;
                setTopicInfos(tempTopicInfos);
            }
            setSubtopic("");
            setContent("");
            setTopicInfo("");
            setTopicPoints([]);
            setEditSubcontent(null);
            setIsEditSubContent(false);

        }else if(adding === 'points'){
            let tempPoints = topicPoints;
            tempPoints[editPoints] = topicInfo;
            setTopicPoints(tempPoints);
            setTopicInfo("");
            setEditPoints(null);
            setIsEditPoints(false);
        }else if(adding === 'qualifications'){
            let tempQualifications = qualifications;
            tempQualifications[editQualification] = qualification;
            setQualifications(tempQualifications);
            setQualification("");
            setEditQualification(null);
            setIsEditQualification(false);
        }else if(adding === 'benefits'){
            let tempBenefits = benefits;
            tempBenefits[editBenefit] = benefit;
            setBenefits(tempBenefits);
            setBenefit("");
            setEditBenefit(null);
            setIsEditBenefit(false);
        }else if(adding === 'skills'){
            let tempSkills = skills;
            tempSkills[editSkill] = skill;
            setSkills(tempSkills);
            setSkill("");
            setEditSkill(null);
            setIsEditSkill(false);
        }else if(adding === 'questions'){
            let tempQuestions = questions;
            tempQuestions[editQuestion] = question;
            setQuestions(tempQuestions);
            let tempResponsesList = responsesList;
            tempResponsesList[editQuestion] = responses;
            setResponsesList(tempResponsesList);
            setQuestion("");
            setResponses([]);
            setResponse("");
            setEditQuestion(null);
            setIsEditQuestion(false);
        }else if(adding === 'responses'){
            let tempResponses = responses;
            tempResponses[editResponse] = response;
            setResponses(tempResponses);
            setResponse("");
            setEditResponse(null);
            setIsEditResponse(false);
        }
    }

    const cancelEdit = (cancelling) => {
        if(cancelling === 'paragraph'){
            setDescription("");
            setEditParagraph(null);
            setIsEditParagraph(false);
        }else if(cancelling === 'points'){
            setTopicInfo("");
            setEditPoints(null);
            setIsEditPoints(false);
        }else if(cancelling === 'subcontent'){
            setSubtopic("");
            setContent("");
            setTopicInfo("");
            setTopicPoints([]);
            setEditSubcontent(null);
            setIsEditSubContent(false);
        }else if(cancelling === 'qualifications'){
            setQualification("");
            setEditQualification(null);
            setIsEditQualification(false);
        }else if(cancelling === 'benefits'){
            setBenefit("");
            setEditBenefit(null);
            setIsEditBenefit(false);
        }else if(cancelling === 'skills'){
            setSkill("");
            setEditSkill(null);
            setIsEditSkill(false);
        }else if(cancelling === 'questions'){
            setQuestion("");
            setResponses([]);
            setEditQuestion(null);
            setIsEditQuestion(false);
        }else if(cancelling === 'responses'){
            setResponse("");
            setEditResponse(null);
            setIsEditResponse(false);
        }
    }

    const deleteParagraph = (index) => {
        setParagraphs(paragraphs.filter((val,idx) => index !== idx));
    }

    const deleteContent = (index) => {
        setSubtopics(subtopics.filter((val,idx) => index !== idx));
        setContents(contents.filter((val,idx) => index !== idx));
        setTopicInfos(topicInfos.filter((val,idx) => index !== idx));
    }

    const deleteQuestion = (index) => {
        setQuestions(questions.filter((val,idx) => index !== idx));
        setResponsesList(responsesList.filter((val,idx) => index !== idx));
    }

    useEffect( () => {
        console.log(content);
        var content_checkbox_1 = document.getElementById("fulltext");
        var content_checkbox_2 = document.getElementById("points");
        if (content === "paragraph" && content_checkbox_1){
            content_checkbox_1.checked = true;
            content_checkbox_2.checked = false;
        }

        //console.log(paragraphs[3].length)
    },[moreinfo, content]);

    return(
        <div className="hero">
            <div className="hero-container">
                <div className="box">
                    <div className="add-title has-text-centered">
                        <h1>Add Job to W@H GW@@N</h1>
                    </div>
                    <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                    <br />
                    <form>
                        <div className="field">
                            <label className="label"> Job Title: </label>
                            <input 
                                className="input"
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="label">Job Category:</label>
                            <div className="select">
                                <select
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}>
                                        <option value="">Choose...</option>
                                        {categories.map((val,index) => 
                                            <option value={val} key={index}>{val}</option>
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Location:</label>
                            <input
                                className="input"
                                type="text"
                                name="location"
                                value={location}
                                onChange={e => setLocation(e.target.value)} />

                        </div>
                        <div className="field">
                            <label className="label"> Metrics: </label>
                            <label className="checkbox-options">
                                Remote {" "}{" "}
                                <input type="radio" name="metrics-checkbox" onChange={e => setMetrics(e.target.value)} value="remote" />
                            </label>
                            <label className="checkbox-options">
                                On-Site {" "}
                                <input type="radio" name="metrics-checkbox" onChange={e => setMetrics(e.target.value)} value="on-site" />
                            </label>
                        </div>
                        <div className="field">
                            <label className="label">Job Type:</label>
                            <div className="select">
                                <select
                                    id="typeOf"
                                    name="typeOf"
                                    value={typeOf}
                                    onChange={e => setType(e.target.value)}>
                                        <option value="">Choose...</option>
                                        {types.map((val,index) => 
                                            <option value={val} key={index}>{val}</option>
                                        )}
                                </select>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Company:</label>
                            <input
                                className="input"
                                type="text"
                                name="company"
                                value={company}
                                onChange={e => setCompany(e.target.value)} />
                        </div>
                        <div className="field">
                            <label className="label"> Description: </label>
                            <button type="button" onClick={e => setViewDesc(!viewDesc)} className="button is-link">View Description</button>
                            {viewDesc &&
                            <div>
                                {paragraphs.length > 0 || topicInfos.length > 0 || subtopics.length > 0 ?
                                <div>
                                    {paragraphs.map((val,index) => 
                                        <p className="para" key={index}>
                                            <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'paragraph')}><i className="fas fa-edit"></i></span>{" "}
                                            <span style={{cursor:"pointer"}} onClick={e => deleteParagraph(index)}><i className="fas fa-trash"></i></span>{" "}
                                            <span className={`give-space ${editParagraph === index ? 'background-warning' : ''}`}>{val}</span>
                                        </p>
                                    )}
                                    
                                    {topicInfos.map((val, index) => 
                                        <div key={index}>
                                            <br/>
                                            <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'subcontent')}><i className="fas fa-edit"></i></span>{" "}
                                            <span style={{cursor:"pointer"}} onClick={e => deleteContent(index)}><i className="fas fa-trash"></i></span>{" "}
                                            <div>
                                                <h3 className="is-underlined subtitle">{subtopics[index]}</h3>
                                                {contents[index] === 'fulltext' ?
                                                    <p className="para">
                                                        {val}
                                                    </p>:
                                                    <ul className="give-space list">
                                                        {val.map((point, idx) =>
                                                            <li key={idx}>{point}</li>
                                                        )}
                                                    </ul>
                                                }
                                            </div>
                                        </div>
                                    )}
                                </div>:
                                <span>No Description added thus far.</span>
                                }
                                <hr />
                            </div>
                            }
                            <textarea
                                className="textarea"
                                type="text"
                                rows="8"
                                style={{ resize: "none" }}
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                            {isEditParagraph ?
                                <div>
                                    <span onClick={e => reAddChoice('paragraph')} className="button is-small is-link is-underlined">Re-Add Paragraph</span> {" "}
                                    <span onClick={e => cancelEdit('paragraph')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                </div>:
                                <button type="button" onClick={e => addChoice('paragraph')} className="button is-primary"> Add Paragraph </button>
                            }
                            <label className="checkbox-options">
                                add more info {" "}{" "}
                                <input type="checkbox" name="info-checkbox" onChange={e => setMore(!moreinfo)} value={true} />
                            </label>
                        </div> 
                        {moreinfo &&
                            <div className="field">
                                <div className="field">
                                    <label className="label"> Additional Info: </label>
                                
                                    <hr/>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Sub-Topic: </label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <p className="control">
                                                <input 
                                                    className="input"
                                                    type="text"
                                                    name="subtopic"
                                                    value={subtopic}
                                                    onChange={e => setSubtopic(e.target.value)}
                                                />
                                                </p>
                                            </div>
                                            
                                        </div>
                                    </div>
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Content: </label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <p className="control">
                                                    <label className="checkbox-options">
                                                        Full Text {" "}{" "}
                                                        <input type="radio" id="fulltext" name="content-checkbox" onChange={e => setContent(e.target.value)} value="fulltext" />
                                                    </label>
                                                    <label className="checkbox-options">
                                                        Bullet Points {" "}
                                                        <input type="radio" id="points" name="content-checkbox" onChange={e => setContent(e.target.value)} value="points" />
                                                    </label>
                                                
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                               {content === "points" ? 
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Sub-Topic Info: </label>
                                            <label className="label">(points) </label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <p>
                                                    <ul className="give-space list">
                                                        {topicPoints.map((val, index) =>
                                                            <li key={index}>
                                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'points')}><i className="fas fa-edit"></i></span>{" "}
                                                                <span style={{cursor:"pointer"}} onClick={e => setTopicPoints(topicPoints.filter((val,idx) => index !== idx))}><i className="fas fa-trash"></i></span>{" "}
                                                                <span className={`${editPoints === index ? 'background-warning' : ''}`}>{val}</span>
                                                            </li>
                                                        )}
                                                    </ul>
                                                </p>
                                                <p className="control">
                                                <input 
                                                    className="input"
                                                    type="text"
                                                    name="topicInfo"
                                                    value={topicInfo}
                                                    onChange={e => setTopicInfo(e.target.value)}
                                                />
                                                {isEditPoints ?
                                                    <div>
                                                        <button type="button" onClick={e => {reAddChoice('points')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                                        <button type="button" onClick={e => {cancelEdit('points')}} className="button is-info"><i className="fas fa-times"></i></button>
                                                    </div>
                                                    :
                                                    <button type="button" onClick={e => {addChoice('points')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                                }
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                :
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Sub-Topic Info: </label>
                                            <label className="label">(paragraph) </label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <p className="control">
                                                    <textarea
                                                        className="textarea"
                                                        type="text"
                                                        rows="8"
                                                        style={{ resize: "none" }}
                                                        name="topicInfo"
                                                        value={topicInfo}
                                                        onChange={e => setTopicInfo(e.target.value)}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                }
                                {isEditSubContent ?
                                    <div>
                                        <span onClick={e => reAddChoice('subcontent')} className="button is-small is-link is-underlined">Re-Add Info</span> {" "}
                                        <span onClick={e => cancelEdit('subcontent')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                    </div>:
                                    <button type="button" onClick={e => addChoice('subcontent')} className="button is-primary"> Add Additional Info </button>
                                }
                            </div>
                        }
                        <div className="field">
                            <label className="label">Qualifications:</label>
                            <button onClick={e => setViewQuals(!viewQuals)} type="button" className="button is-link">View Qualifications</button>
                            {viewQuals &&
                                <div>
                                    {qualifications.length > 0 ?
                                    <ul className="give-space list">
                                        {qualifications.map((val, index) =>
                                            <li key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'qualifications')}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => setQualifications(qualifications.filter((val,idx) => index !== idx))}><i className="fas fa-trash"></i></span>{" "}
                                                <span className={`${editQualification === index ? 'background-warning' : ''}`}>{val}</span>
                                            </li>
                                        )}
                                    </ul>:
                                    <span>No Qualifications added thus far.</span>
                                    }
                                    <hr />
                                </div>
                            }
                            <div>
                                <br />
                                <input 
                                    className="input"
                                    type="text"
                                    name="qualification"
                                    value={qualification}
                                    onChange={e => setQualification(e.target.value)}
                                />
                            </div>
                            {isEditQualification ?
                                <div>
                                    <span onClick={e => reAddChoice('qualifications')} className="button is-small is-link is-underlined">Re-Add Qualification</span> {" "}
                                    <span onClick={e => cancelEdit('qualifications')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                </div>:
                                <button type="button" onClick={e => addChoice('qualifications')} className="button is-primary"> Add Qualification </button>
                            }
                            
                        </div>
                        <div className="field">
                            <label className="label">Benefits:</label>
                            <button onClick={e => setViewBenefits(!viewBenefits)} type="button" className="button is-link">View Benefits</button>
                            {viewBenefits &&
                                <div>
                                    {benefits.length > 0 ?
                                    <ul className="give-space list">
                                        {benefits.map((val, index) =>
                                            <li key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'benefits')}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => setBenefits(benefits.filter((val,idx) => index !== idx))}><i className="fas fa-trash"></i></span>{" "}
                                                <span className={`${editBenefit === index ? 'background-warning' : ''}`}>{val}</span>
                                                
                                            </li>
                                        )}
                                    </ul>:
                                    <span>No Benefits added thus far</span>
                                    }
                                    <hr />
                                </div>
                            }
                            <div>
                                <br />
                                <input 
                                    className="input"
                                    type="text"
                                    name="benefit"
                                    value={benefit}
                                    onChange={e => setBenefit(e.target.value)}
                                />
                            </div>
                            {isEditBenefit ?
                                <div>
                                    <span onClick={e => reAddChoice('benefits')} className="button is-small is-link is-underlined">Re-Add Benefits</span> {" "}
                                    <span onClick={e => cancelEdit('benefits')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                </div>:
                                <button type="button" onClick={e => addChoice('benefits')} className="button is-primary"> Add Benefits </button>
                            }
                            
                        </div>
                        <div className="field">
                            <label className="label">Skills:</label>
                            <button onClick={e => setViewSkills(!viewSkills)} type="button" className="button is-link">View Skills</button>
                            {viewSkills &&
                                <div>
                                    {skills.length > 0 ?
                                    <ul className="give-space list">
                                        {skills.map((val, index) =>
                                            <li key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'skills')}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => setSkills(skills.filter((val,idx) => index !== idx))}><i className="fas fa-trash"></i></span>{" "}
                                                <span className={`${editSkill === index ? 'background-warning' : ''}`}>{val}</span>
                                            </li>
                                        )}
                                    </ul>:
                                    <span> No SKills Added thus far.</span>
                                    }
                                    <hr />
                                </div>
                            }
                            <div>
                                <br />
                                <input 
                                    className="input"
                                    type="text"
                                    name="skill"
                                    value={skill}
                                    onChange={e => setSkill(e.target.value)}
                                />
                            </div>
                            {isEditSkill ?
                                <div>
                                    <span onClick={e => reAddChoice('skills')} className="button is-small is-link is-underlined">Re-Add Skill</span> {" "}
                                    <span onClick={e => cancelEdit('skills')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                </div>:
                                <button type="button" onClick={e => addChoice('skills')} className="button is-primary"> Add Skill </button>
                            }
                            
                        </div>
                        <div className="field">
                            <label className="label">Applicant Questions:</label>
                            <button onClick={e => setViewQues(!viewQues)} type="button" className="button is-link">View Questions</button>
                            {viewQues &&
                                <div>
                                    {questions.length > 0 ?
                                        <div>
                                            {questions.map((val,index) =>
                                                <div key={index}>
                                                    <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'questions')}><i className="fas fa-edit"></i></span>{" "}
                                                    <span style={{cursor:"pointer"}} onClick={e => deleteQuestion(index)}><i className="fas fa-trash"></i></span>{" "}
                                                    <div className={`${editQuestion === index ? 'background-warning' : ''}`}>
                                                        <span>{val} <b>?</b></span>
                                                        <div className="field is-horizontal">
                                                            <div className="field-label is-normal">
                                                                <label className="label">Responses: </label>
                                                            </div>
                                                            <div className="field-body">
                                                                <div className="field">
                                                                    <p>
                                                                        <ul className="give-space list">
                                                                            {responsesList[index].map((val, index) =>
                                                                                <li key={index}>
                                                                                    {val}
                                                                                </li>
                                                                            )}
                                                                        </ul>
                                                                    </p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                        :
                                    <   span> No Questions Added thus far.</span>
                                    }
                                    <hr />
                                </div>
                            }
                            <div>
                                <br />
                                <input 
                                    className="input"
                                    type="text"
                                    name="question"
                                    value={question}
                                    onChange={e => setQuestion(e.target.value)}
                                />
                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Responses: </label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <p>
                                                <ul className="give-space list">
                                                    {responses.map((val, index) =>
                                                        <li key={index}>
                                                            <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'responses')}><i className="fas fa-edit"></i></span>{" "}
                                                            <span style={{cursor:"pointer"}} onClick={e => setResponses(responses.filter((val,idx) => index !== idx))}><i className="fas fa-trash"></i></span>{" "}
                                                            <span className={`${editResponse === index ? 'background-warning' : ''}`}>{val}</span>
                                                        </li>
                                                    )}
                                                </ul>
                                            </p>
                                            <p className="control">
                                            <input 
                                                className="input"
                                                type="text"
                                                name="response"
                                                value={response}
                                                onChange={e => setResponse(e.target.value)}
                                            />
                                            </p>
                                            {isEditResponse ?
                                                <div>
                                                    <button type="button" onClick={e => {reAddChoice('responses')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                                    <button type="button" onClick={e => {cancelEdit('responses')}} className="button is-info"><i className="fas fa-times"></i></button>
                                                </div>
                                                :
                                                <button type="button" onClick={e => {addChoice('responses')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {isEditQuestion ?
                                <div>
                                    <span onClick={e => reAddChoice('questions')} className="button is-small is-link is-underlined">Re-Add Question</span> {" "}
                                    <span onClick={e => cancelEdit('questions')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                </div>:
                                <button type="button" onClick={e => addChoice('questions')} className="button is-primary"> Add Question </button>
                            }   
                        </div>
                        <div className="field">
                            <label className="label"> End Date:</label>
                            <input 
                                className="input" 
                                type="date" 
                                name="end"
                                value={end}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={e => setEndDate(e.target.value)}
                            />
                        </div>
                        <br />
                        <span>{responseMsg}</span>
                        <br />
                        <div className="field is-clearfix">
                        
                            <button onClick={e => {clearFunc(e);}} className="button is-warning is-pulled-right give-space">
                                Clear Form
                            </button>
                            
                            <button onClick={e => saveClassified(e)} className="button is-primary is-pulled-right give-space" type="submit">
                                Submit
                            </button>
                           
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default withContext(AddClassified);