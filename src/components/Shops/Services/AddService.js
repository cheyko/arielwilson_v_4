import React, {useEffect, useState} from "react";
import withContext from "../../../withContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AddService = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const categories = ["Beauty & Grooming", "Clothing","Construction","Creative", "Electronics","Entertainment","Food & Beverages", "General", "Heath & Wellness", "Household", "Industrial", "I.T", "Landscaping", "Legal", "Medical",  "Religious", "Sports" ];
    const deliverables = ["Appointment", "Application", "Booking", "Content", "Consultation", "Design", "Evaluation","File", "Job","Product", "Repair", "Representation"];
    const testings = ["testing1","testing2", "testing3"];
    const [category, setCategory] = useState("");
    const [deliverable, setDeliverable] = useState("");
    const [title, setTitle] = useState("");
    const [provider, setProvider] = useState(null);//useState(props.context.user.id);
    const [addProvider, setAddProvider] = useState(false);
    const [contact, setContact] = useState(null);//useState(props.context.user.phonenumber); give option to set another
    const [addContact, setAddContact] = useState(false);
    const [email, setEmail] = useState(null);//useState(props.context.user.email); give option to set another
    const [addEmail, setAddEmail] = useState(false);
    const [timetaken, setTimeTaken] = useState(0);
    const [timeunit, setTimeUnit] = useState("Minutes");
    const [hasTimeContingency, setHasTimeContingency] = useState(false);
    const [timeContingency, setTimeContingency] = useState("");
    const units = ["Minutes", "Hours", "Days", "Weeks", "Months", "Years"];

    //const [reqDateTime, setDateTime] = useState(""); add to request service modal where necessary
    //num_of_clients or num_of_jobs or num_of_devices or no_of_products == > no_of_deliverables add to request service modal where necessary
    //service status , add to request service modal where necessary
    //user has to have station to be able to accept booking

    const [procedures, setProcedures] = useState([]);
    const [price, setPrice] = useState(0);
    const currencies = ["JMD","USD","GBP","EUR"]; //add all currencies
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [hasPriceContingency, setHasPriceContingency] = useState(false);
    const [priceContingency, setPriceContingency] = useState("");
    const [description, setDescription] = useState("");
    const [requirements, setRequierments] = useState("");
    const [media, setMedia] = useState([]);
    const [mediatypes , setMediaTypes] = useState([]);
    const [address, setAddress] = useState("");

    let navigate = useNavigate();

    const clearFunc = () => {
        setTitle("");
        setCategory("");
        setDeliverable("");
        setProvider(null);
        setContact(null);
        setEmail(null);
        setAddress("");
        setPrice(0);
        setCurrency("JMD");
        setPriceContingency("");
        setTimeContingency("");
        setTimeTaken(0);
        setTimeUnit("Minutes");
        setDescription("");
        setRequierments("");
        setMedia([]);
        setProcedures([]);
    }

    useEffect(() => {
        
    },[addProvider]);

    const handleChange = (e) => {
        switch(e.target.name){
            case 'title':
                setTitle(e.target.value);
                break;
            case 'provider-checkbox':
                if(e.target.value === "self"){
                    setAddProvider(false);
                    setProvider(props.context.user.fullname);
                    setAddProvider(true);
                }else{
                    setProvider("");
                    setAddProvider(true);
                }
                break;
            case 'provider':
                setProvider(e.target.value);
                break;
            case 'contact-checkbox':
                if(e.target.value === "self"){
                    setAddContact(false);
                    setContact(props.context.user.phonenumber);
                    setAddContact(true);
                }else{
                    setContact("");
                    setAddContact(true);
                }
                break;
            case 'contact':
                setContact(e.target.value);
                break;
            case 'email-checkbox':
                if(e.target.value === "self"){
                    setAddEmail(false);
                    setEmail(props.context.user.email);
                    setAddEmail(true);
                }else{
                    setEmail("");
                    setAddEmail(true);
                }
                break;
            case 'email':
                setEmail(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'currency':
                setCurrency(e.target.value);
                break;
            case 'time-contingency':
                if(e.target.value === "yes"){
                    setHasTimeContingency(true);
                }else{
                    setTimeContingency("");
                    setHasTimeContingency(false);
                }
                break;
            case 'price-contingency':
                if(e.target.value === "yes"){
                    setHasPriceContingency(true);
                }else{
                    setPriceContingency("");
                    setHasPriceContingency(false);
                }
                break;
            default:
                break;
        }
        return true;
    }

    const handleMedia = e => {
        setMedia(Array.from(e.target.files));
        let temp = [];
        Array.from(e.target.files).map( (file) => {
            temp = [...temp, file.type.split('/')[0]]
        });
        setMediaTypes(temp);
    }

    const handleCheckboxChange = event => {
        let newArray = procedures.length > 0 ? [...procedures, event.target.value] : [event.target.value];
        if (procedures.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setProcedures(newArray);
    };

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const saveService = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        var theDateTime = getDateTime();
        //console.log(provider);
        if (title && category && price ){
            const formData = new FormData();
            formData.append('theDateTime',theDateTime);
            formData.append('user_id',user_id);
            formData.append('title',title);
            formData.append('category',category);
            formData.append('provider',provider);
            formData.append('deliverable',deliverable);
            formData.append('contact',contact);
            formData.append('email',email);
            formData.append('address',address);
            formData.append('price',price);
            formData.append('currency',currency);
            formData.append('price_contingency',priceContingency);
            formData.append('timetaken',timetaken);
            formData.append('timeunit', timeunit);
            formData.append('time_contingency', timeContingency);
            formData.append('procedures',procedures);
            formData.append('description',description);
            formData.append('requirements',requirements);
            media.forEach( (file,index) => {
                formData.append('media',file);
            });
            formData.append('mediatypes',mediatypes);

            const result = await axios.post('/api/services',formData, 
                {
                headers: {
                'Content-Type': 'multipart/form-data'
                },
            }).then(
                (result) => {
                    if (result.status === 200){
                        setResponseMsg("Service was saved.");
                        //const numOfPics = result.data.numOfPics;
                        const service_id = result.data.service_id;
                        navigate('/service-view/' + service_id);
                        
                        //add listing to context 
                        clearFunc();
                    }else{
                        setResponseMsg("Service was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            return true;
        }else{
            setResponseMsg("Service is missing some important details.");
            return false;
        }
        
    }
    
    useEffect( () => {

    },[provider,contact,email])
    return (
        <div className="hero-container">
            <div className="box">
                <div className="hero">
                    <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                    <br />
                    <p className="has-text-centered"> Enter details of the Service. </p>
                    <form onSubmit={e => saveService(e)}>
                        <div className="field">
                            <label className="label"> Category: </label>
                            <div className="select">
                                <select
                                    name="category"
                                    id="category"
                                    value={category}
                                    onChange={e => setCategory(e.target.value)}
                                    required
                                    >
                                    <option value=""> Choose... </option>
                                    {categories.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        
                        <div className="field">
                            <label className="label"> Deliverable: </label>
                            <div className="select">
                                <select
                                    name="deliverable"
                                    id="deliverable"
                                    value={deliverable}
                                    onChange={e => setDeliverable(e.target.value)}
                                    required
                                    >
                                    <option> Choose... </option>
                                    {deliverables.map(opt => (
                                    <option key={opt} value={opt}>
                                        {opt.toUpperCase()}
                                    </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="field">
                            <label className="label"> Title: </label>
                            <input 
                                className="input"
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Provider: </label>
                            <label className="checkbox-options">
                                Self {" "}{" "}
                                <input type="radio" name="provider-checkbox" onChange={e => handleChange(e)} value="self" />
                            </label>
                            <label className="checkbox-options">
                                Name Provider {" "}
                                <input type="radio" name="provider-checkbox" onChange={e => handleChange(e)} value="another" />
                            </label>
                            <hr />
                            {addProvider &&
                            <input 
                                className="input"
                                type="text"
                                name="provider"
                                value={provider}
                                onChange={e => handleChange(e)}
                            />}
                        </div>
                        <div className="field">
                            <label className="label"> Contact: </label>
                            <label className="checkbox-options">
                                Use Registered Number {" "}
                                <input type="radio" name="contact-checkbox" onChange={e => handleChange(e)} value="self" />
                            </label>
                            <label className="checkbox-options">
                                Enter New Contact {" "}
                                <input type="radio" name="contact-checkbox" onChange={e => handleChange(e)} value="another" />
                            </label>
                            <hr />
                            {addContact &&
                            <input 
                                className="input"
                                type="tel"
                                name="contact"
                                value={contact}
                                onChange={e => handleChange(e)}
                            />}
                        </div>
                        <div className="field">
                            <label className="label"> Email: </label>
                            <label className="checkbox-options">
                                Use Registered Email {" "}
                                <input type="radio" name="email-checkbox" onChange={e => handleChange(e)} value="self" />
                            </label>
                            <label className="checkbox-options">
                                Enter New Email {" "}
                                <input type="radio" name="email-checkbox" onChange={e => handleChange(e)} value="another" />
                            </label>
                            <hr />
                            {addEmail &&
                            <input 
                                className="input"
                                type="email"
                                name="email"
                                value={email}
                                onChange={e => handleChange(e)}
                            />}
                        </div>
                        <div className="field">
                            <label className="label"> Address of Service: </label>
                            <input
                            placeholder="address"
                            className="input"
                            type="text"
                            name="address"
                            value={address}
                            onChange={e => setAddress(e.target.value)}
                            required
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Time Taken: </label>
                            <input
                            className="input"
                            type="number"
                            name="timetaken"
                            value={timetaken}
                            onChange={e => setTimeTaken(e.target.value)}
                            required
                            />
                            <select
                                className="select form-select"
                                id="timeunit"
                                name="timeunit"
                                value={timeunit}
                                onChange={e => setTimeUnit(e.target.value)}
                                required
                                >
                                {units.map(unit => (
                                <option key={unit} value={unit}>
                                    {unit}
                                </option>
                                ))}
                            </select>
                            <div className="hero-body">
                                <label className="label"> Add Time Taken Contingency: </label>
                                <label className="checkbox-options">
                                    Yes {" "}
                                    <input type="radio" name="time-contingency" onChange={e => handleChange(e)} value="yes" />
                                </label>
                                <label className="checkbox-options">
                                    No {" "}
                                    <input type="radio" name="time-contingency" onChange={e => handleChange(e)} value="no" />
                                </label>
                                {hasTimeContingency &&
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Per : </label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <p className="control">
                                                    <input 
                                                        className="input"
                                                        type="text"
                                                        name="timeContingency"
                                                        value={timeContingency}
                                                        onChange={e => setTimeContingency(e.target.value)}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                
                        <div className="field">
                            <label className="label"> Price: </label>
                            <input
                            className="input"
                            type="number"
                            name="price"
                            value={price}
                            onChange={e => handleChange(e)}
                            required
                            />
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
                            <div className="hero-body">
                                <label className="label"> Add Price Contingency: </label>
                                <label className="checkbox-options">
                                    Yes {" "}
                                    <input type="radio" name="price-contingency" onChange={e => handleChange(e)} value="yes" />
                                </label>
                                <label className="checkbox-options">
                                    No {" "}
                                    <input type="radio" name="price-contingency" onChange={e => handleChange(e)} value="no" />
                                </label>
                                {hasPriceContingency &&
                                    <div className="field is-horizontal">
                                        <div className="field-label is-normal">
                                            <label className="label">Per : </label>
                                        </div>
                                        <div className="field-body">
                                            <div className="field">
                                                <p className="control">
                                                    <input 
                                                        className="input"
                                                        type="text"
                                                        name="priceContingency"
                                                        value={priceContingency}
                                                        onChange={e => setPriceContingency(e.target.value)}
                                                    />
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>
                        <div className="field">
                            <label className="label"> Procedures: </label>

                            {testings.map((option,index) => (
                                <label className="checkbox-options" key={index}>
                                    {option} {" "}
                                    <input
                                    value={option}
                                    onChange={e => handleCheckboxChange(e)}
                                    type="checkbox"
                                    /> {" "}
                                </label>
                            
                            ))}
                            
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
                            <label className="label"> Quotation Requirements: </label>
                            <textarea
                            className="textarea"
                            type="text"
                            rows="4"
                            style={{ resize: "none" }}
                            name="requirements"
                            value={requirements}
                            onChange={e => setRequierments(e.target.value)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Media: </label>
                            <input 
                            name="media"
                            type="file"
                            multiple
                            onChange={e => handleMedia(e)}
                            />
                        </div>
                        <hr />
                        <div className="columns is-multiline">
                            {media.map((photo,index) => 
                                <div className="column is-half has-text-centered" key={index}>
                                    <span> {index + 1} </span>
                                    <br />
                                    <img className="is-256x256" src={URL.createObjectURL(photo)} />
                                </div>
                            )}
                        </div>
                        <br />
                        <span>{responseMsg}</span>
                        <br />
                        <div className="field is-clearfix">
                            
                            <button onClick={e => clearFunc()} className="give-space is-pulled-right button is-warning">
                                    Clear Form
                            </button>
                            
                            <button className="give-space button is-primary is-pulled-right " type="submit">
                                Submit
                            </button>
                        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}
export default withContext(AddService);