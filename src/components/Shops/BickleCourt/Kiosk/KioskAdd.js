import React, {useState} from "react";
import withContext from "../../../../withContext";
import axios from "axios";
import Modal from "react-modal";
import $ from "jquery";
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

const KioskAdd = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const categories = ["Combo","Meal", "Beverage", "Dessert"];
    const mealsTypes = ["Dish","Side","Sandwich","Soup"];
    const beverageTypes = ["Alcohol","Juice","Mix", "Diary"];
    const dessertTypes = ["ice-cream","cake","candy","Diary"];
    const pigments = ["black", "blue", "brown", "gold", "green", "grey", "orange", "purple", "red", "silver", "tan", "white", "yellow"];

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [typeOf, setTypeOf] = useState("");
    const [types, setTypes] = useState([]);

    const [calories, setCalories] = useState(0);
    const [price, setPrice] = useState(0);
    const currencies = ["JMD","USD","GBP","EUR"];
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [ingredients, setIngredients] = useState([]);
    const [description, setDescription] = useState("");
    const [media, setMedia] = useState([]);
    const [mediatypes , setMediaTypes] = useState([]);

    let navigate = useNavigate();
    //add
    //Performance => Torque, Horsepower, Fuel Capacity
    //Measurements => Dimensions, Wheelbase, Tire Size, Driver Leg Room, Driver Head Room

    const clearFunc = () => {
        setName("");
        setCategory("");
        setTypeOf("");
        setCalories(0);
        setPrice(0);
        setCurrency("JMD");
        setIngredients([]);
        setDescription("");
        setMedia([]);
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'name':
                setName(e.target.value);
                break;
            case 'category':
                setCategory(e.target.value);
                if(e.target.value === "Meal"){
                    setTypes(mealsTypes);
                }else if(e.target.value === "Beverage"){
                    setTypes(beverageTypes);
                }else if(e.target.value === "Dessert"){
                    setTypes(dessertTypes);
                }else{
                    setTypes([]);
                }
                break;
            case 'typeOf':
                setTypeOf(e.target.value);
                break;
            case 'calories':
                setCalories(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'currency':
                setCurrency(e.target.value);
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
        setMedia(Array.from(e.target.files));
        let temp = [];
        Array.from(e.target.files).map( (file) => {
            temp = [...temp, file.type.split('/')[0]]
            return true;
        });
        setMediaTypes(temp);
    }

    const handleCheckboxChange = event => {
        let newArray = ingredients.length > 0 ? [ingredients, event.target.value] : [event.target.value];
        if (ingredients.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setIngredients(newArray);
    };

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const saveItem = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        var theDateTime = getDateTime();

        if (name && category && price){
            const formData = new FormData();
            formData.append('theDateTime',theDateTime);
            formData.append('user_id',user_id);
            formData.append('name',name);
            formData.append('category',category);
            formData.append('typeOf',typeOf);
            formData.append('calories',calories);
            formData.append('price',price);
            formData.append('currency',currency);
            formData.append('ingredients',ingredients);
            formData.append('description',description);
            formData.append('mediatypes',mediatypes);
            media.forEach( (file) => {
                formData.append('media',file);
            });

            await axios.post(`${process.env.REACT_APP_PROXY}/api/items`,formData, 
                {
                headers: {
                'Content-Type': 'multipart/form-data'
                },
            }).then(
                (result) => {
                    if (result.status === 200){
                        setResponseMsg("Item was saved.");
                        clearFunc();
                        const item_id = result.data.item_id;
                        navigate('/item-view/' + item_id);
                    }else{
                        setResponseMsg("Product was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            return true;
        }else{
            setResponseMsg("Item is missing some important details.");
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
    
    /* Prevent scrolling for number input types*/
    $('form').on('focus', 'input[type=number]', function (e) {
        $(this).on('wheel.disableScroll', function (e) {
          e.preventDefault()
        })
      })
      $('form').on('blur', 'input[type=number]', function (e) {
        $(this).off('wheel.disableScroll')
      })

    return (
        <div>
            <button onClick={e => openModal(e)} className="button is-link is-large"> Add Item </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                <div className="hero">
                    <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    <p className="has-text-centered"> Enter details of the Item. </p>
                    <form onSubmit={e => saveItem(e)}>
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
                                <option> Choose... </option>
                                {categories.map(opt => (
                                <option key={opt} value={opt}>
                                    {opt.toUpperCase()}
                                </option>
                                ))}
                            </select>
                        </div>
                        
                        {category !== "Combo" &&
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
                        }
                                             
                        <div className="field">
                            <label className="label"> Name: </label>
                            <input 
                                className="input"
                                type="text"
                                name="name"
                                value={name}
                                onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Calories: </label>
                            <input
                            className="input"
                            type="number"
                            name="calories"
                            value={calories}
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
                            <label className="label"> Ingredients: </label>

                            {pigments.map((option,index) => (
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
                            onChange={e => handleChange(e)}
                            />
                        </div>
                        <div className="field">
                            <label className="label"> Media: </label>
                            <input 
                            name="media"
                            type="file"
                            multiple
                            onChange={e => handlePhotos(e)}
                            />
                        </div>
                        <hr />
                        <div className="columns is-multiline">
                            {media.map((photo,index) => 
                                <div className="column is-half has-text-centered" key={index}>
                                    <span> {index + 1} </span>
                                    <br />
                                    <img alt={`${index} of Uploads`} className="is-256x256" src={URL.createObjectURL(photo)} />
                                </div>
                            )}
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
export default withContext(KioskAdd);