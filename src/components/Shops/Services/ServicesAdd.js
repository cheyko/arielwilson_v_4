import React, {useEffect, useState} from "react";
import withContext from "../../../withContext";
import Modal from "react-modal";
import axios from "axios";
import { useNavigate } from "react-router-dom";

Modal.setAppElement('#root');

const customStyles = {
    overlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(255, 255, 255, 0.75)',
        zIndex:6
    },
    content : {
      width                 : '45rem',
      height                : '30rem',
      top                   : '55%',
      left                  : '50%',
      right                 : 'auto',
      bottom                : 'auto',
      marginRight           : '-50%',
      transform             : 'translate(-50%, -50%)',
      border: '1px solid #ccc',
      background:'white',
      overflow: 'auto',
      WebkitOverflowScrolling: 'touch',
      borderRadius: '1rem',
      outline: 'none',
      padding: '40px'
    }
};

const ProductsAdd = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const categories = ["Beauty & Grooming", "Clothing","Construction","Creative", "Electronics","Entertainment","Food & Beverages", "General", "Heath & Wellness", "Household", "Industrial", "I.T", "Landscaping", "Legal", "Medical",  "Religious", "Sports" ];
    const deliverables = ["Appointment", "Application", "Booking", "Content", "Consultation", "Design", "Evaluation","File","Product", "Repair", "Representation"];
    const testings = ["testing1","testing2", "testing3"];
    const [category, setCategory] = useState("");
    const [deliverable, setDeliverable] = useState("");
    const [title, setTitle] = useState("");
    const [provider, setProvider] = useState(null);//useState(props.context.user.id);
    const [addProvider, setAddProvider] = useState(false);
    const [contact, setContact] = useState(null);//useState(props.context.user.phonenumber); give option to set another
    const [addContact, setAddContact] = useState(false);
    const [email, setEmail] = useState(null);//useState(props.context.user.phonenumber); give option to set another
    const [addEmail, setAddEmail] = useState(false);
    const [timetaken, setTimeTaken] = useState(0);
    const [timeunit, setTimeUnit] = useState("");
    const units = ["Minutes", "Hours", "Days", "Weeks", "Months", "Years"];

    //const [reqDateTime, setDateTime] = useState(""); add to request service modal where necessary
    //num_of_clients or num_of_jobs or num_of_devices or no_of_products == > no_of_deliverables add to request service modal where necessary
    //service status , add to request service modal where necessary
    //user has to have station to be able to accept booking

    const [procedures, setProcedures] = useState([]);
    const [price, setPrice] = useState(0);
    const currencies = ["JMD","USD","GBP","EUR"]; //add all currencies
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState([]);
    const [mediatypes , setMediaTypes] = useState([]);

    let navigate = useNavigate();

    const clearFunc = () => {
        setTitle("");
        setCategory("");
        setDeliverable("");

        setPrice(0);
        setCurrency("JMD");

        setDescription("");
        setMedia([]);
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
                    setProvider(e.target.value);
                }else{
                    setAddProvider(true);
                }
                break;
            case 'provider':
                setProvider(e.target.value);
                break;
            case 'contact-checkbox':
                if(e.target.value === "self"){
                    setAddContact(false);
                    setContact(123456789);
                }else{
                    setAddProvider(true);
                }
                break;
            case 'contact':
                setContact(e.target.value);
                break;
            case 'email-checkbox':
                if(e.target.value === "self"){
                    setAddEmail(false);
                    setEmail(e.target.value);
                }else{
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
            formData.append('price',price);
            formData.append('currency',currency);
            formData.append('timetaken',timetaken);
            formData.append('timeunit', timeunit);
            formData.append('procedures',procedures);
            formData.append('description',description);
            media.forEach( (file,index) => {
                formData.append('media',file);
            });

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

    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setResponseMsg("");
        setModalOpen(false);
    }
    
    return (
        <div>
            <button onClick={e => openModal(e)} className="button is-link is-large"> Add Service </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                <div className="hero">
                    <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    <p className="has-text-centered"> Enter details of the Service. </p>
                    <form onSubmit={e => saveService(e)}>
                        <div className="field">
                            <label className="label"> Category: </label>
                            <select
                                className="select form-select"
                                name="category"
                                id="category"
                                value={category}
                                onChange={e => setCategory(e.target.value)}
                                required
                                >
                                <option> Choose... </option>
                                {categories.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
                            </select>
                        </div>
                        
                        <div className="field">
                            <label className="label"> Deliverable: </label>
                            <select
                                className="select form-select"
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
                                <input type="checkbox" name="provider-checkbox" onChange={e => handleChange(e)} value="self" />
                            </label>
                            <label className="checkbox-options">
                                Name Provider {" "}
                                <input type="checkbox" name="provider-checkbox" onChange={e => handleChange(e)} value="another" />
                            </label>
                            <hr />
                            {false &&
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
                                <input type="checkbox" name="contact-checkbox" onChange={e => handleChange(e)} value="self" />
                            </label>
                            <label className="checkbox-options">
                                Enter New Contact {" "}
                                <input type="checkbox" name="contact-checkbox" onChange={e => handleChange(e)} value="another" />
                            </label>
                            <hr />
                            {false &&
                            <input 
                                className="input"
                                type="tele"
                                name="contact"
                                value={contact}
                                onChange={e => handleChange(e)}
                            />}
                        </div>
                        <div className="field">
                            <label className="label"> Email: </label>
                            <label className="checkbox-options">
                                Use Registered Email {" "}
                                <input type="checkbox" name="email-checkbox" onChange={e => handleChange(e)} value="self" />
                            </label>
                            <label className="checkbox-options">
                                Enter New Email {" "}
                                <input type="checkbox" name="email-checkbox" onChange={e => handleChange(e)} value="another" />
                            </label>
                            <hr />
                            {false &&
                            <input 
                                className="input"
                                type="email"
                                name="email"
                                value={email}
                                onChange={e => handleChange(e)}
                            />}
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
                            <label className="label"> Media: </label>
                            <input 
                            name="media"
                            type="file"
                            multiple
                            onChange={e => handleMedia(e)}
                            />
                        </div>
                        <br />
                        <span>{responseMsg}</span>
                        <br />
                        <div className="field is-clearfix is-pulled-right">
                            &nbsp;
                            <button onClick={e => closeModal(e)} className="button is-warning">
                                 Cancel
                            </button>
                            &nbsp;&nbsp;
                            <button className="button is-primary " type="submit">
                                Submit
                            </button>
                            &nbsp;
                        </div>
                    </form>
                </div>
            </Modal>
        </div>
    )
}
export default withContext(ProductsAdd);