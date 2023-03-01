import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../withContext";

const HostEvent = props => {
    const [title, setTitle] = useState("");
    const [host, setHost] = useState("");
    const [typeOf, setType] = useState("");
    const types = ["Concert", "Conference" ,"Function", "Meeting", "Party"];
    const [category, setCategory] = useState("");
    const categories = ["Sports","School", "Work", "Religious", "Political", "Other"]; //get from database
    const [audience, setAudience] = useState("");
    const audiences = ["Public","Private", "Group"];
    const [metrics, setMetrics] = useState("");
    const [link, setLink] = useState("");
    const [location, setLocation] = useState("");
    const [venue, setVenue] = useState("");

    const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
    const [dates, setDates] = useState([]);
    const [startTimes, setStartTimes] = useState([]);
    const [endTimes, setEndTimes] = useState([]);
    const [startTime, setStartTime] = useState("00:00");
    const [endTime, setEndTime] = useState("00:00");
    const [isEditDate, setIsEditDate] = useState(false);
    const [editDate, setEditDate] = useState(null);

    const [description, setDescription] = useState("");
    const [status, setStatus] = useState("On-Schedule");
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
    const [photos, setPhotos] = useState([]);

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
        setHost("");
        setType("");
        setCategory("");
        setAudience("");
        setMetrics("");
        setLink("");
        setVenue("");
        setDate(new Date().toISOString().split("T")[0]);
        setStartTime("00:00");
        setEndTime("00:00");
        setDates([]);
        setStartTimes([]);
        setEndTimes([]);
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
        setPhotos([]);
        setResponseMsg("");
    }

    const saveEvent = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
    }

    const loadEvent = async(e) => {

    }

    const convertTime = (aTime) => {
        var meridian = parseInt(aTime.split(":")[0]) >= 12 ? 'pm' : 'am';
        var hour = parseInt(aTime.split(":")[0]) % 12 || 12;
        var minutes = aTime.split(":")[1];
        return hour + ":" + minutes + meridian;
    }

    const handlePhotos = e => {
        setPhotos(Array.from(e.target.files));
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
        }else if(adding === 'date'){
            setDates([...dates,date]);
            setStartTimes([...startTimes, startTime]);
            setEndTimes([...endTimes, endTime]);
            setDate(new Date().toISOString().split("T")[0]);
            setStartTime("00:00");
            setEndTime("00:00");
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
        }else if(editing === 'date'){
            setDate(dates[index]);
            setStartTime(startTimes[index]);
            setEndTime(endTimes[index]);
            setEditDate(index);
            setIsEditDate(true);
        }
        else{
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
        }else if(adding === 'date'){
            let tempDates = dates;
            let tempStarts = startTimes;
            let tempEnds = endTimes;
            tempDates[editDate] = date;
            tempStarts[editDate] = startTime;
            tempEnds[editDate] = endTime;
            setDates(tempDates);
            setStartTimes(tempStarts);
            setEndTimes(tempEnds);
            setDate(new Date().toISOString().split("T")[0]);
            setStartTime("00:00");
            setEndTime("00:00");
            setEditDate(null);
            setIsEditDate(false);
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
        }else if(cancelling === 'date'){
            setDate(new Date().toISOString().split("T")[0]);
            setStartTime("00:00");
            setEndTime("00:00");
            setEditDate(null);
            setIsEditDate(false);
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

    const deleteDate = (index) => {
        setDates(dates.filter((val,idx) => index !== idx));
        setStartTimes(startTimes.filter((val,idx) => index !== idx));
        setEndTimes(endTimes.filter((val,idx) => index !== idx));
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
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Photos: </label>
                            </div>
                            <div className="field-body">
                                <input 
                                name="photos"
                                type="file"
                                multiple
                                onChange={e => handlePhotos(e)}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <div className="columns is-multiline">
                                    {photos.map((photo,index) => 
                                        <div className="column is-half" key={index}>
                                            <span> {index + 1} </span>
                                            <br />
                                            <img className="is-256x256" src={URL.createObjectURL(photo)} />
                                        </div>
                                    )}

                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Title </label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input"
                                    type="text"
                                    name="title"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Organiser(s) </label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input"
                                    type="text"
                                    name="host"
                                    value={host}
                                    onChange={e => setHost(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Event Type</label>

                            </div>
                            <div className="field-body">
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
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Category</label>
                            </div>
                            <div className="field-body">
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
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label"> Audience </label>
                            </div>
                            <div className="field-body">
                                <div class="field is-narrow">
                                    <div class="control">
                                        {audiences.map((val,index) => 
                                            <label key={index} className="radio">
                                                <input type="radio" name="audience-checkbox" onChange={e => handleChange(e)} value={val} />
                                                {val}
                                            </label>
                                        )}
                                    </div>        
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label"> Place </label>
                            </div>
                            <div className="field-body">
                                <div class="field is-narrow">
                                    <div class="control">
                                        <label className="radio">
                                            <input type="radio" name="place-checkbox" onChange={e => setMetrics(e.target.value)} value="virtual" />
                                            Virtual
                                        </label>
                                        <label className="radio">  
                                            <input type="radio" name="place-checkbox" onChange={e => setMetrics(e.target.value)} value="physical" />
                                            Physical
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                        {metrics === 'virtual' &&
                            <div className="field is-horizontal">
                                <div className="field-label is-normal">
                                    <label className="label">Link </label>
                                </div>
                                <div className="field-body">
                                    <div className="field">
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
                                    </div>
                                </div>
                            </div>
                            
                        }
                        {metrics === 'physical' &&
                            <div>
                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Venue </label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <div className="control has-icons-left">
                                                <input
                                                    className="input"
                                                    type="text"
                                                    name="venue"
                                                    value={venue}
                                                    onChange={e => setVenue(e.target.value)}
                                                    placeholder="Enter Venue"
                                                    />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-building"></i>
                                                </span>
                                                {/*<span className="icon is-small is-right">
                                                    <i className="fas fa-search"></i>
                                                </span>*/}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="field is-horizontal">
                                    <div className="field-label is-normal">
                                        <label className="label">Address </label>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
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
                                        </div>
                                    </div>
                                </div>
                                
                            </div>
                        }
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Description </label>
                            </div>
                            <div className="field-body">
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
                        </div>  
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label"> Amount of Attendees (limit) </label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input"
                                    type="number"
                                    name="attendees"
                                    value={attendees}
                                    onChange={e => setAttendes(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Schedule</label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control">
                                        <input 
                                            className="input" 
                                            type="date" 
                                            name="date"
                                            value={date}
                                            min={new Date().toISOString().split("T")[0]}
                                            onChange={e => setDate(e.target.value)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <div className="field">
                                    <b>Start Time</b>
                                    <p className="control is-expanded has-icons-left">
                                        
                                        <input 
                                            className="input"
                                            type="time"
                                            name="startTime"
                                            value={startTime}
                                            onChange={e => setStartTime(e.target.value)}
                                            placeholder="Start Date"
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-clock"></i>
                                        </span>
                                    </p>
                                </div>

                                <div className="field">
                                    <b>End Time</b>
                                    <p className="control is-expanded has-icons-left">
                                        <input 
                                            className="input"
                                            type="time"
                                            name="endTime"
                                            value={endTime}
                                            onChange={e => setEndTime(e.target.value)}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-clock"></i>
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <p className="field">
                                    {isEditDate ?
                                        <div>
                                            <span onClick={e => reAddChoice('date')} className="button is-small is-link is-underlined">Re-Add Date</span> {" "}
                                            <span onClick={e => cancelEdit('date')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                        </div>
                                        :<span onClick={e => addChoice('date')} className="button is-small is-link is-underlined">Add Date</span>
                                    }
                                </p>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <div className="field">
                                    {dates.map((val,index) => (
                                        <div key={index}>
                                            <span style={{cursor:"pointer"}} onClick={e => editChoice(index,'date')}><i className="fas fa-edit"></i></span>{" "}
                                            <span style={{cursor:"pointer"}} onClick={e => deleteDate(index)}><i className="fas fa-trash"></i></span>{" "}
                                            <span className={`give-space ${editDate === index ? 'background-warning' : ''}`}><b>{new Date(val).toDateString()}</b>, {convertTime(startTimes[index])} - {convertTime(endTimes[index])} </span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label"> Entry  </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="controls">
                                        {entryTypes.map((val,index) => 
                                            <label key={index} style={{display:"inline-block"}} className="radio">
                                                <input type="radio" name="entry-checkbox" onChange={e => setEntry(e.target.value)} value={val} />
                                                {val}
                                            </label>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        { entry === "Ticket" &&
                            <div> 
                                <div className="field is-horizontal">
                                    <div className="field-label">
                                        <div className="label"><b>Tickets </b></div>
                                    </div>
                                    <div className="field-body">
                                        <div className="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input 
                                                    className="input"
                                                    type="text"
                                                    name="aTicket"
                                                    value={aTicket}
                                                    onChange={e => setATicket(e.target.value)}
                                                    placeholder="Section"
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-users"></i>
                                                </span>
                                            </p>
                                        </div>
                                        <div className="field">
                                            <p className="control is-expanded has-icons-left">
                                                <input 
                                                    className="input"
                                                    type="number"
                                                    name="aCost"
                                                    value={aCost}
                                                    onChange={e => setACost(e.target.value)}
                                                />
                                                <span className="icon is-small is-left">
                                                    <i className="fas fa-dollar-sign"></i>
                                                </span>
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="field is-horizontal">
                                    <div className="field-label"></div>
                                    <div className="field-body">
                                        <p className="field">
                                            {isEditTicket ?
                                                <div>
                                                    <span onClick={e => reAddChoice('ticket')} className="button is-small is-link is-underlined">Re-Add Ticket</span> {" "}
                                                    <span onClick={e => cancelEdit('ticket')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                                </div>
                                            :<span onClick={e => addChoice('ticket')} className="button is-small is-link is-underlined">Add Ticket</span>
                                            }
                                        </p>
                                    </div>
                                </div>
                            </div>
                             
                        }
                        <div className="field is-horizontal">
                            <div className="field-label"></div>
                            <div className="field-body">
                                <div className="choices">
                                    
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
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label"> Personel </label>
                            </div>
                            <div className="field-body">
                                <div className="field is-expanded">
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
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <div className=""><b>Attractions</b></div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <p className="control is-expanded has-icons-left">
                                        <input 
                                            className="input"
                                            type="text"
                                            name="attraction"
                                            value={attraction}
                                            onChange={e => setAttraction(e.target.value)}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-plus"></i>
                                        </span>
                                    </p>
                                </div>

                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label"></div>
                            <div className="field-body">
                                {isEditAttraction ?
                                    <div>
                                        <span onClick={e => reAddChoice('attraction')} className="button is-small is-link is-underlined">Re-Add Attraction</span> {" "}
                                        <span onClick={e => cancelEdit('attraction')} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                    </div>
                                :<span onClick={e => addChoice('attraction')} className="button is-small is-link is-underlined">Add Attraction</span>
                                }
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label"></div>
                            <div className="field-body">
                                <div className="choices">
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
                            </div>
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