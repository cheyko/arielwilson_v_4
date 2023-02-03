import React, { useEffect, useState } from "react";
import axios from "axios";
import withContext from "../../withContext";

const Bio = props => {

    let new_id = localStorage.getItem("user_id");
    const getUname = props.context.user ? props.context.user.username : "";
    const [uname, setUname] = useState("");
    const [dob, setDOB] = useState("");
    const [tagline, setTagline] = useState("");
    const [description, setDesc] = useState("");
    const [location, setLocs] = useState("");

    useEffect( () => {
        if (props.func === 'edit' && (dob === "" && tagline === "" && description === "" && location === "")){
            loadBio();
        } 
    },[]);

    const handleChange = (e) => {
        switch(e.target.name){
            case 'uname':
                setUname(e.target.value);
                break;
            case 'dob':
                setDOB(e.target.value);
                break;
            case 'tagline':
                setTagline(e.target.value);
                break;
            case 'description':
                setDesc(e.target.value);
                break;
            case 'location':
                setLocs(e.target.value);
                break;
            default:
                break;
        }
        return true;
    }

    const clearFunc = () => {
        setUname("");
        setDOB("");
        setTagline("");
        setDesc("");
        setLocs("");
    }

    const loadBio = async () => {
        props.setResponseMsg("");
        const user_id = props.context.user_id ? props.context.user_id : new_id;
        await axios.post('/api/get-bio',{user_id}).then(
            (result) => {
                if (result.status !== 200){
                    props.setResponseMsg("Bio information was not loaded, please refresh page and try again. Contact us for suppport if problem persist.");
                }else{
                    
                    setUname(result.data.uname);
                    setDOB(new Date(result.data.dob).toISOString().substr(0, 10));
                    setTagline(result.data.tagline);
                    setDesc(result.data.description);
                    setLocs(result.data.location);
                }
            }
        );
        return true;
    }


    const saveBio = async (e) => {
        e.preventDefault();
        props.setResponseMsg("");
        const user_id = props.context.user_id ? props.context.user_id : new_id;
        console.log(user_id);
        
        if (props.func === 'create'){
            await axios.post('/api/bio',{user_id,dob,tagline,description,location}).then(
                (result1) => {
                    if (result1.status === 200){
                        //change some bool to true to display the next button
                        //props.setBtnShow(true);
                        //console.log(result);
                        props.setResponseMsg("Bio information was saved, click next to continue.");
                        props.setTagline(tagline);
                        clearFunc();
                        document.getElementById("next-btn").style.display = "block";
                    }else{
                        props.setResponseMsg("Bio information was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
        }else if (props.func === 'edit'){
            await axios.put('/api/bio',{user_id,uname,dob,tagline,description,location}).then(
                (result2) => {
                    if (result2.status === 200){                    
                        props.setResponseMsg("Bio information was updated.");
                        clearFunc();
                    }else{                        
                        props.setResponseMsg(result2.data.msg);
                    }
                }
            ).catch(response => {
                console.log(response);
            });
        }
        return true;
    }

    return(
        <div className="hero">
            <div className="hero-body">
                <div className="bio-form is-centered">
                    <form onSubmit={e => saveBio(e)}>
                        {props.func === 'edit' &&
                            <div className="field">
                                <label className="label"> Edit your username </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="uname"
                                    value={uname}
                                    onChange={e => handleChange(e)}
                                />
                            </div>
                        }
                        <div className="field">
                            <label className="label"> Enter your Date of Birth </label>
                            <input
                            className="input"
                            type="date"
                            name="dob"
                            value={dob}
                            max={new Date().toISOString().split("T")[0]}
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Set your tagline (#) </label>
                            <input 
                                className="input"
                                type="text"
                                name="tagline"
                                value={tagline}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Drop your Description </label>
                            <textarea
                                className="textarea"
                                type="text"
                                rows="4"
                                style={{ resize: "none" }}
                                name="description"
                                value={description}
                                onChange={e => handleChange(e)}
                                />
                        </div>
                        <div className="field">
                            <label className="label"> Set your Location </label>
                            <input 
                                className="input"
                                type="text"
                                name="location"
                                value={location}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <br />
                        <span>{props.responseMsg}</span>
                        <br />
                        <div className="field is-clearfix">
                            <button className="button is-primary is-outlined is-pulled-right" type="submit">
                                {props.func === 'edit' ? "Update" : "Submit" } 
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default withContext(Bio);