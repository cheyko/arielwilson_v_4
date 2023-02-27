import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../withContext";

const HostEvent = props => {
    const [title, setTitle] = useState("");
    const [typeOf, setType] = useState("");
    const types = ["Concert", "Conference" ,"Function", "Meeting", "Party"];
    const [category, setCategory] = useState("");
    const categories = ["Sports","School", "Work", "Religious", "Political", "Other"]; //get from database
    const [audience, setAudience] = useState("");
    const audiences = ["Public","Private", "Group"];
    const [where, setWhere] = useState("");
    const [link, setLink] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [status, setStatus] = useState("On-Schedule");
    const [endTime, setEndTime] = useState("00:00");
    const [end, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [attendees, setAttendes] = useState(0);
    const entryTypes = ["Free","Invitation","Ticket"];
    const [entry, setEntry] = useState("");
    const [tickets, setTickets] = useState([]);
    const [aTicket, setATicket] = useState("");
    const [costs, setCosts] = useState([]);
    const [aCost, setACost] = useState(0);
    const [personnel, setPersonnel] = useState([]);
    const [searchval, setSearchVal] = useState("");
    const [userlist, setUserList] = useState([]);
    const [attractions, setAttractions] = useState([]);
    const [attraction, setAttraction] = useState("");
    const [responseMsg, setResponseMsg] = useState("");   
    const [isEditTicket, setIsEditTicket] = useState(false);
    const [editTicket, setEditTicket] = useState(null);
    const [isEditAttraction, setIsEditAttraction] = useState(false);
    const [editAtraction, setEditAttraction] = useState(null);

    let navigate = useNavigate();
    
    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        return result;
    }

    const clearFunc = e => {
        e.preventDefault();
        setTitle("");
        setType("");
        setCategory("");
        setAudience("");
        setWhere("");
        setLink("");
        setStartDate(new Date().toISOString().split("T")[0]);
        setEndDate(new Date().toISOString().split("T")[0]);
        setStartTime("00:00");
        setEndTime("00:00");
        setLocation("");
        setAttendes(0);
        setDescription("");
        setEntry("");
        setTickets([]);
        setATicket("");
        setCosts([]);
        setACost(0);
        setPersonnel([]);
        setSearchVal("");
        setAttractions([]);
        setAttraction("");
        setResponseMsg("");
    }

    const saveEvent = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
    }

    const loadEvent = async(e) => {

    }

    useEffect( () => {

    });

    const addChoice = (adding) => {
        if(adding === 'ticket'){
            if(aTicket !== ""){
                setTickets([...tickets, aTicket]);
                setCosts([...costs, aCost]);
                setATicket("");
                setACost(0);
            }
        }else{
            if(attraction !== ""){
                setAttractions([...attractions, attraction]);
                setAttraction("");
            }
        }
    }

    const editChoice = (index,editing) => {
        if(editing === 'ticket'){
            setATicket(tickets[index]);
            setACost(costs[index]);
            setEditTicket(index);
            setIsEditTicket(true);
        }else{
            setAttraction(attractions[index]);
            setEditAttraction(index);
            setIsEditAttraction(true);
        }

    }

    const reAddChoice = (adding) => {
        if(adding === 'ticket'){
            if(aTicket !== ""){
                let tempTickets = tickets;
                let tempCosts = costs;
                tempTickets[editTicket] = aTicket;
                tempCosts[editTicket] = aCost;
                setTickets(tempTickets);
                setCosts(tempCosts);
                setATicket("");
                setACost(0);
                setIsEditTicket(false);
                setEditTicket(null);
            }
        }else{
            if(attraction !== ""){
                let tempAtr = attractions;
                tempAtr[editAtraction] = attraction;
                setAttractions(tempAtr);
                setAttraction("");
                setIsEditAttraction(false);
                setEditAttraction(null);
            }
        }
        
    }

    const cancelEdit = (cancelling) => {
        if(cancelling === 'ticket'){
            setATicket("");
            setACost(0);
            setIsEditTicket(false);
            setEditTicket(null);
        }else{
            setAttraction("");
            setIsEditAttraction(false);
            setEditAttraction(null);
        }
    }

    const deleteTicket = (index) => {
        setTickets(tickets.filter((val,idx) => index !== idx));
        setCosts(costs.filter((val,idx) => index !== idx));
    }

    const deleteAttraction = (index) => {
        setAttractions(attractions.filter((val,idx) => index !== idx));
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'audience-checkbox':
                setAudience(e.target.value);
                break;
            default:
                break;     
        } 
    }

    return(
        <div className="hero">
            <div className="hero-container">
                <div className="box">
                    <div className="add-title has-text-centered">
                        <h1>Add Event to W@H GW@@N</h1>
                    </div>
                    <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                    <br />
                    <form>
                        <div className="field">
                            <label className="label"> Title: </label>
                            <input 
                                className="input"
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="label">Event Type:</label>
                            <div className="select">
                                <select
                                    id="typeOf"
                                    name="typeOf"
                                    value={typeOf}
                                    onChange={e => setType(e.target.value)}>
                                        <option value="">Choose...</option>
                                        {types.map((val,index) => 
                                            <option key={index} value={val}>{val}</option>
                                        )}
                                    </select>

                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Category:</label>
                            <div className="select">
                                <select
                                    id="category"
                                    name="category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}>
                                        <option value="">Choose...</option>
                                        {categories.map((val,index) => 
                                            <option key={index} value={val}>{val}</option>
                                        )}
                                    </select>

                            </div>
                        </div>
                        <div className="field">
                            <label className="label"> Audience: </label>
                            {audiences.map((val,index) => 
                                <label key={index} className="checkbox-options">
                                    {val}{" "}
                                    <input type="radio" name="audience-checkbox" onChange={e => handleChange(e)} value={val} />
                                </label>
                            )}
                        </div>
                        <div className="field">
                            <label className="label"> Place: </label>
                            <label className="checkbox-options">
                                Virtual {" "}{" "}
                                <input type="radio" name="place-checkbox" onChange={e => setWhere(e.target.value)} value="virtual" />
                            </label>
                            <label className="checkbox-options">
                                Physical {" "}
                                <input type="radio" name="place-checkbox" onChange={e => setWhere(e.target.value)} value="physical" />
                            </label>
                            {where === 'virtual' &&
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        name="link"
                                        value={link}
                                        onChange={e => setLink(e.target.value)}
                                        placeholder="Enter Link"
                                        />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-link"></i>
                                    </span>
                                </div>
                            }
                            {where === 'physical' &&
                                <div className="control has-icons-left">
                                    <input
                                        className="input"
                                        type="text"
                                        name="location"
                                        value={location}
                                        onChange={e => setLocation(e.target.value)}
                                        placeholder="Enter location"
                                        />
                                    <span className="icon is-small is-left">
                                        <i className="fas fa-globe"></i>
                                    </span>
                                    {/*<span className="icon is-small is-right">
                                        <i className="fas fa-search"></i>
                                    </span>*/}
                                </div>
                            }
                        </div>
                        <div className="field">
                            <label className="label"> Description: </label>
                            <textarea
                                className="textarea"
                                type="text"
                                rows="4"
                                style={{ resize: "none" }}
                                name="description"
                                value={description}
                                onChange={e => setDescription(e.target.value)}
                            />
                        </div>  
                        <div className="field">
                            <label className="label"> Amount of Attendees (limit): </label>
                            <input 
                                className="input"
                                type="number"
                                name="attendees"
                                value={attendees}
                                onChange={e => setAttendes(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Start Date:</label>
                            <input 
                                className="input" 
                                type="date" 
                                name="start"
                                value={start}
                                min={new Date().toISOString().split("T")[0]}
                                onChange={e => setStartDate(e.target.value)}
                            />
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
                        <div className="field">
                            <label className="label"> Start Time:</label>
                            <input 
                                className="input" 
                                type="time" 
                                name="startTime"
                                value={startTime}
                                onChange={e => setStartTime(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> End Time:</label>
                            <input 
                                className="input" 
                                type="time" 
                                name="endTime"
                                value={endTime}
                                onChange={e => setEndTime(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Entry: </label>
                            {entryTypes.map((val,index) => 
                                <label key={index} style={{display:"inline-block"}} className="checkbox-options">
                                    {val}{" "}
                                    <input type="radio" name="entry-checkbox" onChange={e => setEntry(e.target.value)} value={val} />
                                </label>
                            )}
                        </div>
                        { entry === "Ticket" &&
                            <div className="field">
                                <span>Enter the different Ticket Prices.</span>
                                <div className="choices">
                                    <div className=""><b>Tickets</b></div>
                                    <div>
                                        {tickets.map((val,index) => (
                                            <div key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'ticket')}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => deleteTicket(index)}><i className="fas fa-trash"></i></span>{" "}
                                                <span className={`give-space ${editTicket === index ? 'background-warning' : ''}`}><b>{val}</b> : {costs[index]} </span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <hr/>
                                <div className="columns is-multiline is-mobile">
                                    <div className="column">
                                        <div className="field is-horizontal">
                                            <div className="field-label is-normal">
                                                <label className="label">Ticket: </label>
                                            </div>
                                            <div className="field-body">
                                                <div className="field">
                                                    <p className="control">
                                                    <input 
                                                        className="input"
                                                        type="text"
                                                        name="aTicket"
                                                        value={aTicket}
                                                        onChange={e => setATicket(e.target.value)}
                                                    />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="column">
                                        <div className="field is-horizontal">
                                            <div className="field-label is-normal">
                                                <label className="label">Cost: </label>
                                            </div>
                                            <div className="field-body">
                                                <div className="field">
                                                    <p className="control">
                                                    <input 
                                                        className="input"
                                                        type="number"
                                                        name="aCost"
                                                        value={aCost}
                                                        onChange={e => setACost(e.target.value)}
                                                    />
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {isEditTicket ?
                                    <div>
                                        <span onClick={e => reAddChoice('ticket')} className="button is-small is-link is-underlined">Re-Add Ticket</span> {" "}
                                        <span onClick={e => cancelEdit('ticket')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                    </div>
                                   :<span onClick={e => addChoice('ticket')} className="button is-small is-link is-underlined">Add Ticket</span>
                                }
                            </div>
                        }
                        <div className="field">
                            <label className="label"> Personel: </label>
                            <div className="control has-icons-left has-icons-right">
                                <input
                                    className="input"
                                    type="text"
                                    name="searchval"
                                    value={searchval}
                                    onChange={e => handleChange(e)}
                                    placeholder="Search for new recipient"
                                    />
                                <span className="icon is-small is-left">
                                    <i className="fas fa-user"></i>
                                </span>
                                <span className="icon is-small is-right">
                                    <i className="fas fa-search"></i>
                                </span>
                                <div className="card">
                                    Users(integrate profile..bb)
                                </div>
                            </div>
                        </div>
                        <div className="field">
                                <span>Enter the different attractions that will be present at event.</span>
                                <div className="choices">
                                    <div className=""><b>Attractions</b></div>
                                    <div>
                                        {attractions.map((val,index) => (
                                            <div key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'attraction')}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => deleteAttraction(index)}><i className="fas fa-trash"></i></span>{" "}
                                                <span>{index + 1}:</span>{" "}
                                                <span className={`${editAtraction === index ? 'background-warning' : ''}`}>{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <br />
                                <label className="label"> Enter Attraction: </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="attraction"
                                    value={attraction}
                                    onChange={e => setAttraction(e.target.value)}
                                />
                                <br />
                                <br />
                                {isEditAttraction ?
                                    <div>
                                        <span onClick={e => reAddChoice('attraction')} className="button is-small is-link is-underlined">Re-Add Attraction</span> {" "}
                                        <span onClick={e => cancelEdit('attraction')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                    </div>
                                   :<span onClick={e => addChoice('attraction')} className="button is-small is-link is-underlined">Add Attraction</span>
                                }
                            </div>
                        <br />
                        <span>{responseMsg}</span>
                        <br />
                        <div className="field is-clearfix">
                        
                            <button type="button" onClick={e => {clearFunc(e);}} className="button is-warning is-pulled-right give-space">
                                Cancel
                            </button>
                            
                            <button onClick={e => saveEvent(e)} className="button is-primary is-pulled-right give-space" type="submit">
                                Submit
                            </button>
                           
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )

}
export default withContext(HostEvent);