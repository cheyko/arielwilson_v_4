import React, {useState} from "react";
import withContext from "../../../withContext";
import axios from "axios";
import Modal from "react-modal";
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
        zIndex:4
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

const PFAdd = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const types = ["house","apartment","townhouse","residential","commercial","office","building","villa"];
    const [title, setTitle] = useState("");
    const [category, setCategory] = useState("");
    const [typeOf, setTypeOf] = useState("");
    const [address, setAddress] = useState("");
    const [price, setPrice] = useState(0);

    const currencies = ["JMD","USD","GBP","EUR"];
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [beds, setBeds] = useState(0);
    const [baths, setBaths] = useState(0);
    const [insideSqft, setISqft] = useState(0);
    const [lotSqft, setLSqft] = useState(0);

    const parkOptions = ["Single", "Double", "Open", "Visitor"];
    const [parking, setParking] = useState([]);
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);

    let navigate = useNavigate();

    const clearFunc = () => {
        setTitle("");
        setCategory("");
        setTypeOf("");
        setAddress("");
        setPrice(0);
        setCurrency("");
        setBeds(0);
        setBaths(0);
        setISqft(0);
        setLSqft(0);
        setParking([]);
        setDescription("");
        setPhotos([]);
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'title':
                setTitle(e.target.value);
                break;
            case 'category':
                setCategory(e.target.value);
                break;
            case 'typeOf':
                setTypeOf(e.target.value);
                break;
            case 'address':
                setAddress(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'currency':
                setCurrency(e.target.value);
                break;
            case 'beds':
                setBeds(e.target.value);
                break;
            case 'baths':
                setBaths(e.target.value);
                break;
            case 'insideSqft':
                setISqft(e.target.value);
                break;
            case 'lotSqft':
                setLSqft(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            default:
                break;
        }
        return true;
    }

    const handlePhotos = e => {
        setPhotos(Array.from(e.target.files));
    }

    const handleCheckboxChange = event => {
        let newArray = parking.length > 0 ? [parking, event.target.value] : [event.target.value];
        if (parking.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setParking(newArray);
    };

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const saveProp = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        var theDateTime = getDateTime();
        const formData = new FormData();
        formData.append('theDateTime',theDateTime);
        formData.append('user_id',user_id);
        formData.append('title',title);
        formData.append('category',category);
        formData.append('typeOf',typeOf);
        formData.append('address',address);
        formData.append('price',price);
        formData.append('currency',currency);
        formData.append('beds',beds);
        formData.append('baths',baths);
        formData.append('insideSqft',insideSqft);
        formData.append('lotSqft',lotSqft);
        formData.append('parking',parking);
        formData.append('description',description);
        photos.forEach( (photo,index) => {
            formData.append('photos',photo);
        });

        const result = await axios.post('/api/listings',formData, 
            {
              headers: {
              'Content-Type': 'multipart/form-data'
            },
        }).then(
            (result) => {
                if (result.status === 200){
                    setResponseMsg("Property was saved.");
                    //const numOfPics = result.data.numOfPics;
                    const listing_id = result.data.listing_id;
                    navigate('/listing-view/'+listing_id);
                    //********* */
                    //add listing to context 
                    
                    clearFunc();
                }else{
                    setResponseMsg("Property was not saved, please try again. Contact us for suppport if problem persist.");
                }
            }
        );
        return true;
    }

    const openModal = e => {
        e.preventDefault();
        setModalOpen(!modalIsOpen)
    }

    const closeModal = e => {
        e.preventDefault();
        setModalOpen(false);
    }
    
    return (
        <div>
            <button onClick={e => openModal(e)} className="button is-link is-large"> Add Real Estate </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                <div className="hero">
                    <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    <p className="has-text-centered"> Enter details of the New Real Estate. </p>
                    <form onSubmit={e => saveProp(e)}>
                        <div className="field">
                            <label className="label"> Title of Property: </label>
                            <input 
                                className="input"
                                type="text"
                                name="title"
                                value={title}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Category: </label>
                            <select
                                className="select form-select"
                                name="category"
                                id="category"
                                value={category}
                                onChange={e => handleChange(e)}
                                required
                                >
                                <option value=""> Choose... </option>
                                <option value="Sale"> Sell </option>
                                <option value="Rent"> Rent </option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label"> Type: </label>
                            <select
                                className="select form-select"
                                name="typeOf"
                                id="typeOf"
                                value={typeOf}
                                onChange={e => handleChange(e)}
                                required
                                >
                                <option> Choose... </option>
                                {types.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label className="label"> Address of Property: </label>
                            <input
                            placeholder="address"
                            className="input"
                            type="text"
                            name="address"
                            value={address}
                            onChange={e => handleChange(e)}
                            required
                            />
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
                            <label className="label"> Available Bedrooms: </label>
                            <input
                            className="input"
                            type="number"
                            name="beds"
                            value={beds}
                            onChange={e => handleChange(e)}
                            required
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Available Bathrooms: </label>
                            <input
                            className="input"
                            type="number"
                            name="baths"
                            value={baths}
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Size of Property (Sqft): </label>
                            <input
                            className="input"
                            type="number"
                            name="insideSqft"
                            value={insideSqft}
                            onChange={e => handleChange(e)}
                            required
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Size of Property lot (Sqft): </label>
                            <input
                            className="input"
                            type="number"
                            name="lotSqft"
                            value={lotSqft}
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Parking: </label>

                            {parkOptions.map((option,index) => (
                                <label className="checkbox-options" key={index}>
                                    {option}  
                                    <input
                                    value={option}
                                    className="checkbox"
                                    onChange={e => handleCheckboxChange(e)}
                                    type="checkbox"
                                    />  
                                     
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
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Photos: </label>
                            <input 
                            name="photos"
                            type="file"
                            multiple
                            onChange={e => handlePhotos(e)}
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
export default withContext(PFAdd);