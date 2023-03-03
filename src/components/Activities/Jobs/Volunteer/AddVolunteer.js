import { useState } from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../../withContext"

const AddVolunteer = props => {

    let navigate = useNavigate();

    const [title, setTitle] = useState("");
    const categories = ["Animals","Community","Health and Social Care", "Political", "Sports","Environmental"];
    const [category, setCategory] = useState("");
    const [venue, setVenue] = useState("");
    const [location, setLocation] = useState("");
    const [start, setStartDate] = useState(new Date().toISOString().split("T")[0]);
    const [description, setDescription] = useState("");
    const [startTime, setStartTime] = useState("00:00");
    const [status, setStatus] = useState("On-Schedule");
    const [endTime, setEndTime] = useState("00:00");
    const [end, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [contributions, setContributions] = useState([]);
    const [contribution, setContribution] = useState("");
    const [editContribution, setEditContribution] = useState(null);
    const [isEditContribution, setIsEditContribution] = useState(false);
    const [viewCon, setViewCon] = useState(false);
    const [responseMsg, setResponseMsg] = useState("");   

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        return result;
    }

    const clearFunc = () => {

        setTitle("");
        setCategory("");
        setVenue("");
        setLocation("");
        setStartDate(new Date().toISOString().split("T")[0]);
        setDescription("");
        setStartTime("00:00");
        setStatus("On-Schedule");
        setEndTime("00:00");
        setEndDate(new Date().toISOString().split("T")[0]);
        setContributions([]);
        setContribution("");
        setEditContribution(null);
        setIsEditContribution(false);
        setViewCon(false);
        setResponseMsg("");
    }

    const saveVolunteer = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
    }

    const loadVolunteer = async(e) => {

    }

    //const []
    const addChoice = () => {
        setContributions([...contributions, contribution]);
        setContribution("");
    }

    const editChoice = (index) => {
        setContribution(contributions[index]);
        setEditContribution(index);
        setIsEditContribution(true);
    }

    const reAddChoice = () => {
        let tempContributions = contributions;
        tempContributions[editContribution] = contribution;
        setContributions(tempContributions);
        setContribution("");
        setEditContribution(null);
        setIsEditContribution(false);
    }

    const cancelEdit = () => {
        setContribution("");
        setEditContribution(null);
        setIsEditContribution(false);
    }

    const deleteContribution = (index) => {
        setContributions(contributions.filter((val,idx) => index !== idx));
    }

    return(
        <div className="hero">
            <div className="hero-container">
                <div className="box">
                    <div className="add-title has-text-centered">
                        <h1>Add Volunteering Activity to W@H GW@@N</h1>
                    </div>
                    <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                    <br />
                    <form>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body"></div>
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
                                <label className="label"> Category </label>

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
                                                <option value={val} key={index}>{val}</option>
                                            )}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Venue</label>
                            </div>
                            <div className="field-body">
                                <input
                                    className="input"
                                    type="text"
                                    name="venue"
                                    value={venue}
                                    onChange={e => setVenue(e.target.value)} />
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Location</label>

                            </div>
                            <div className="field-body">
                                <input
                                    className="input"
                                    type="text"
                                    name="location"
                                    value={location}
                                    onChange={e => setLocation(e.target.value)} />
                            </div>
                        </div>

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
                            <div className="field-label is-normal">
                                <label className="label"> Start Date </label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input" 
                                    type="date" 
                                    name="start"
                                    value={start}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={e => setStartDate(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> End Date </label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input" 
                                    type="date" 
                                    name="end"
                                    value={end}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Start Time </label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input" 
                                    type="time" 
                                    name="startTime"
                                    value={startTime}
                                    onChange={e => setStartTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> End Time </label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input" 
                                    type="time" 
                                    name="endTime"
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Contributions</label>
                            </div>
                            <div className="field-body">
                                <input 
                                    className="input"
                                    type="text"
                                    name="contribution"
                                    value={contribution}
                                    onChange={e => setContribution(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                {isEditContribution ?
                                    <div>
                                        <span onClick={e => reAddChoice()} className="button is-small is-link is-underlined">Re-Add Contribution</span> {" "}
                                        <span onClick={e => cancelEdit()} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                    </div>:
                                    <button type="button" onClick={e => addChoice()} className="button is-primary"> Add Contribution </button>
                                }&nbsp;<button onClick={e => setViewCon(!viewCon)} type="button" className="button is-link">View Contributions</button>
                            </div>
                        </div>
                        {viewCon &&
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                {contributions.length > 0 ?
                                    <ul className="give-space list">
                                        {contributions.map((val, index) =>
                                            <li key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index)}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => deleteContribution(index)}><i className="fas fa-trash"></i></span>{" "}
                                                <span className={`${editContribution === index ? 'background-warning' : ''}`}>{val}</span>
                                            </li>
                                        )}
                                    </ul>:
                                    <span> No Contributions Added thus far.</span>
                                }
                                <hr />
                            </div>
                        </div>
                        }
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <span>{responseMsg}</span>
                            </div>
                        </div>
                        
                        <div className="field is-clearfix">
                            <button onClick={e => {clearFunc(e);}} className="button is-warning is-pulled-right give-space">
                                Clear Form
                            </button>
                            <button onClick={e => saveVolunteer(e)} className="button is-primary is-pulled-right give-space" type="submit">
                                Submit
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default withContext(AddVolunteer);