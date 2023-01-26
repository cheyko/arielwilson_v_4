import React, {useState} from "react";
import withContext from "../../../withContext";
import axios from "axios";
import Modal from "react-modal";

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

const WOVAdd = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const makes = ["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge", "Fiat","Ford", "Genesis", "GMC", "Honda", "Hyundai", "Infiniti", "Jaguar","Jeep", "Kia", "Land Rover", "Lexus", "Lincoln", "Mazda","Mercedes-Benz", "Mini", "Mitsubishi", "Nissan", "Porshe", "Ram", "Scion","Subaru", "Tesla", "Toyota", "Volkswagen", "Volvo", "Other"];
    const types = ["Bus", "Convertible", "Coupe", "Hybrid", "Luxury","Minivan", "Pick-Up", "Sedan", "Sport", "SUV", "Truck", "Van", "Wagon"];
    const fuels = ["gas","diesel","electric","lpg"];
    const transmissions = ["automatic","manual","tiptronic"];
    const conditions = ["new", "used", "pre-own"]
    const colors = ["black", "blue", "brown", "gold", "green", "grey", "orange", "purple", "red", "silver", "tan", "white", "yellow"];

    const [make, setMake] = useState("");
    const [showOther, setShowOther] = useState(false);
    const [model, setModel] = useState("");
    const [condition, setCondition] = useState("new");
    const [typeOf, setTypeOf] = useState("");
    const [fuel, setFuel] = useState("");
    const [transmission, setTransmission] = useState("automatic");
    const [mileage, setMileage] = useState(0);
    const [location, setLocation] = useState("");
    const [price, setPrice] = useState(0);

    const currencies = ["JMD","USD","GBP","EUR"];
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [engine, setEngine] = useState(0);
    const [year, setYear] = useState("");
    const [steering, setSteering] = useState("");
    const [color, setColor] = useState("");

    const [ignition, setIgnition] = useState("");
    const [seats, setSeats] = useState(0);
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);

    //add
    //Performance => Torque, Horsepower, Fuel Capacity
    //Measurements => Dimensions, Wheelbase, Tire Size, Driver Leg Room, Driver Head Room

    const clearFunc = () => {
        setMake("");
        setModel("");
        setCondition("");
        setTypeOf("");
        setFuel("");
        setTransmission("");
        setMileage(0);
        setLocation("");
        setPrice(0);
        setCurrency("");
        setEngine(0);
        setYear("");
        setSteering("");
        setColor("");
        setIgnition("");
        setSeats(0);
        setDescription("");
        setPhotos([]);
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'make':
                if(e.target.value !== "Other"){
                    setShowOther(false);
                    setMake(e.target.value);
                }else{
                    setShowOther(true);
                }
                break;
            case 'other':
                setMake(e.target.value);
                break;
            case 'model':
                setModel(e.target.value);
                break;
            case 'condition':
                setCondition(e.target.value);
                break;
            case 'typeOf':
                setTypeOf(e.target.value);
                break;
            case 'fuel':
                setFuel(e.target.value);
                break;
            case 'transmission':
                setTransmission(e.target.value);
                break;
            case 'mileage':
                setMileage(e.target.value);
                break;
            case 'location':
                setLocation(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'currency':
                setCurrency(e.target.value);
                break;
            case 'engine':
                setEngine(e.target.value);
                break;
            case 'year':
                setYear(e.target.value);
                break;
            case 'steering':
                setSteering(e.target.value);
                break;
            case 'color':
                setColor(e.target.value);
                break;
            case 'ignition':
                setIgnition(e.target.value);
                break;
            case 'seats':
                setSeats(e.target.value);
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

    /*const handleCheckboxChange = event => {
        let newArray = parking.length > 0 ? [parking, event.target.value] : [event.target.value];
        if (parking.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setParking(newArray);
    };*/

    const saveVehicle = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        
        const formData = new FormData();
        formData.append('user_id',user_id);
        formData.append('make',make);
        formData.append('model',model);
        formData.append('condition',condition);
        formData.append('typeOf',typeOf);
        formData.append('fuel',fuel);
        formData.append('transmission',transmission);
        formData.append('mileage',mileage);
        formData.append('location',location);
        formData.append('price',price);
        formData.append('currency',currency);
        formData.append('engine',engine);
        formData.append('year',year);
        formData.append('color',color);
        formData.append('steering',steering);
        formData.append('ignition',ignition);
        formData.append('seats',seats);
        formData.append('description',description);
        photos.forEach( (photo,index) => {
            formData.append('photos',photo);
        });

        const result = await axios.post('/api/vehicles',formData, 
            {
              headers: {
              'Content-Type': 'multipart/form-data'
            },
        }).then(
            (result) => {
                if (result.status === 200){
                    setResponseMsg("Vehicle was saved.");
                    //const numOfPics = result.data.numOfPics;
                    //const vehicle_id = result.data.vehicle_id;
                    //add listing to context 
                    clearFunc();
                }else{
                    setResponseMsg("Vehicle was not saved, please try again. Contact us for suppport if problem persist.");
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
            <button onClick={e => openModal(e)} className="button is-link is-large"> Add Vehicle </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                <div className="hero">
                    <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    <p className="has-text-centered"> Enter details of the Vehicle. </p>
                    <form onSubmit={e => saveVehicle(e)}>
                        <div className="field">
                            <label className="label"> Make: </label>
                            <select
                                className="select form-select"
                                name="make"
                                id="make"
                                value={make}
                                onChange={e => handleChange(e)}
                                required
                                >
                                <option value=""> Choose... </option>
                                {makes.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
                            </select>
                            <br />
                            {showOther &&
                                <label>
                                    Other   
                                    <input 
                                        className="input"
                                        type="text"
                                        name="other"
                                        value={make}
                                        onChange={e => handleChange(e)}
                                    /> 
                                </label> 
                            }
                        </div>                      
                        <div className="field">
                            <label className="label"> Model: </label>
                            <input 
                                className="input"
                                type="text"
                                name="model"
                                value={model}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Condition: </label>
                            <select
                                className="select form-select"
                                name="condition"
                                id="condition"
                                value={condition}
                                onChange={e => handleChange(e)}
                                required
                                >
                                {conditions.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
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
                            <label className="label"> Fuel: </label>
                            <select
                                className="select form-select"
                                name="fuel"
                                id="fuel"
                                value={fuel}
                                onChange={e => handleChange(e)}
                                required
                                >
                                {fuels.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
                            </select>
                        
                        </div>
                        <div className="field">
                            <label className="label"> Transmission: </label>
                            <select
                                className="select form-select"
                                name="transmission"
                                id="transmission"
                                value={transmission}
                                onChange={e => handleChange(e)}
                                required
                                >
                                {transmissions.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
                            </select>
                        
                        </div>
                        <div className="field">
                            <label className="label"> Mileage: </label>
                            <input
                            className="input"
                            type="number"
                            name="mileage"
                            value={mileage}
                            placeholder="kilometers"
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Location: </label>
                            <input
                            placeholder="location"
                            className="input"
                            type="text"
                            name="location"
                            value={location}
                            onChange={e => handleChange(e)}

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
                            <label className="label"> Engine Size: </label>
                            <input
                            className="input"
                            type="number"
                            name="engine"
                            step="0.1"
                            placeholder="Litres"
                            value={engine}
                            onChange={e => handleChange(e)}
                            required
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Year: </label>
                            <input
                            className="input"
                            type="text"
                            name="year"
                            value={year}
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Color: </label>
                            <select
                                className="select form-select"
                                name="color"
                                id="color"
                                value={color}
                                onChange={e => handleChange(e)}
                                required
                                >
                                {colors.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
                            </select>
                        </div>
                        <div className="field">
                            <label className="label"> Steering Wheel: </label>
                            <select
                                className="select form-select"
                                name="steering"
                                id="steering"
                                value={steering}
                                onChange={e => handleChange(e)}
                                required
                                >
                                <option value=""> Choose... </option>
                                <option value="left"> Light Hand Drive </option>
                                <option value="right"> Right Hand Drive </option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label"> Ignition: </label>
                            <select
                                className="select form-select"
                                name="ignition"
                                id="ignition"
                                value={ignition}
                                onChange={e => handleChange(e)}
                                required
                                >
                                <option value=""> Choose... </option>
                                <option value="key"> Key </option>
                                <option value="button"> Button </option>
                            </select>
                        </div>
                        <div className="field">
                            <label className="label"> Number of Seats: </label>
                            <input
                            className="input"
                            type="number"
                            name="seats"
                            value={seats}
                            onChange={e => handleChange(e)}
                            />
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
export default withContext(WOVAdd);