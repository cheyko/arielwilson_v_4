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

const ProductsAdd = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const categories = ["Art", "Applications & Software", "Automobiles",  "Baby", "Books", "Beauty & Cosmetics", "Electronics", "Fashion", "Food & Beverages", "Furniture" ,"Health", "Household", "Kitchen", "Industrial", "Outdoors", "Scientific", "Sports", "Tools", "Toys", "Travel"];
    const types = ["Devices", "Packages", "Containers", "Items", "Foods", "Consumables", "Wearables", "Disposables"]
    const consumerBrands = ["Alberta","Aunt Jemina","Grace","Kellog","Lasco","Walkerswood","Nestle","National","Holiday", "Pilsbury","Excelsior", "Hershey", "Uncle Ben", "Reeces", "M&M", "Planters", "Oreo", "Campbell's","Heinz", "Dove", "Fritto lay", "Nature Valley", "Starbust", "Haagen-Dadz","Ben and Jerry", "Hostess", "Canbury", "Ferero Rocher", "DiGiornio"];
    const beverageBrands = ["Coca-Cola","Pepsi","Red-bull","Smirnoff","Red Stripe", "Corona", "BudWeiser"]
    //const specialBrands = ["Tesla", ""];
    const techBrands = ["Apple", "Boosch","Google", "Samsung", "Microsoft ", "Huawei","Sony", "Lenovo", "Nokia", "LG", "Panasonic", "Dell", "Compaq", "Whirlpool"]
    const industrialBrands = ["Black and Decker","Stanley", "John Deere", "DeWalt", "Behr","Sherwin Williams", "Tractor Supply Company" , "Milwaukee", "Hilti"]
    const sportwearBrands = ["Adidas", "Nike", "Fila", "Puma", "Kappa", "Reebok", "Jordan", "Under Armour", "Sportwear", "" ]
    const clothingBrands = ["Lees", "Levi", "Fruit of the Loom", "Hanes", "American Polo"]
    const designerBrands = ["Tom Ford", "Gucci", "Louis Vitton", "Prada", "Alexander Macquain", "Balenciaga", "Ralph Lauren"]
    const familyBrands = ["Duracell", "Bounty", "Band-Aid", "Huggies" ,"Ziploc", "Energizer", "Dawn", "Lysol"]
    //const normalBrands = ["Malboro"];
    
    const conditions = ["new", "used", "pre-own"]
    const pigments = ["black", "blue", "brown", "gold", "green", "grey", "orange", "purple", "red", "silver", "tan", "white", "yellow"];

    const [brand, setBrand] = useState("");
    const [showOther, setShowOther] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [condition, setCondition] = useState("new");
    const [typeOf, setTypeOf] = useState("");
 
    const [location, setLocation] = useState("");
    const [stock, setStock] = useState(0);
    const [price, setPrice] = useState(0);
    const currencies = ["JMD","USD","GBP","EUR"];
    const [currency, setCurrency] = useState("JMD"); //get country's currency
    const [year, setYear] = useState("");
    const [colors, setColors] = useState([]);
    const [packageInfo, setPackage] = useState("");
    const [description, setDescription] = useState("");
    const [photos, setPhotos] = useState([]);

    let navigate = useNavigate();

    //add
    //Performance => Torque, Horsepower, Fuel Capacity
    //Measurements => Dimensions, Wheelbase, Tire Size, Driver Leg Room, Driver Head Room

    const clearFunc = () => {
        setBrand("");
        setName("");
        setCategory("");
        setCondition("new");
        setTypeOf("");
        setLocation("");
        setStock(0);
        setPrice(0);
        setCurrency("JMD");
        setYear("");
        setColors([]);
        setPackage("");
        setDescription("");
        setPhotos([]);
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'brand':
                if(e.target.value !== "other"){
                    setShowOther(false);
                    setBrand(e.target.value);
                }else{
                    document.getElementById("brand").value = "other";
                    setShowOther(true);
                }
                break;
            case 'other':
                setBrand(e.target.value);
                break;
            case 'name':
                setName(e.target.value);
                break;
            case 'category':
                setCategory(e.target.value);
                break;
            case 'condition':
                setCondition(e.target.value);
                break;
            case 'typeOf':
                setTypeOf(e.target.value);
                break;
            case 'location':
                setLocation(e.target.value);
                break;
            case 'stock':
                setStock(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'currency':
                setCurrency(e.target.value);
                break;
            case 'year':
                setYear(e.target.value);
                break;
            case 'packageInfo':
                setPackage(e.target.value);
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
        let newArray = colors.length > 0 ? [colors, event.target.value] : [event.target.value];
        if (colors.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setColors(newArray);
    };
    
    /*const handleCheckboxChange = event => {
        let newArray = parking.length > 0 ? [parking, event.target.value] : [event.target.value];
        if (parking.includes(event.target.value)) {
            newArray = newArray.filter(opt => opt !== event.target.value);
        } 
        setParking(newArray);
    };*/
    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const saveProduct = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        var theDateTime = getDateTime();
        if (name && category && price && stock){
            const formData = new FormData();
            formData.append('theDateTime',theDateTime);
            formData.append('user_id',user_id);
            formData.append('brand',brand);
            formData.append('name',name);
            formData.append('category',category);
            formData.append('condition',condition);
            formData.append('typeOf',typeOf);
            formData.append('location',location);
            formData.append('stock',stock);
            formData.append('price',price);
            formData.append('currency',currency);
            formData.append('year',year);
            formData.append('colors',colors);
            formData.append('packageInfo',packageInfo);
            formData.append('description',description);
            photos.forEach( (photo,index) => {
                formData.append('photos',photo);
            });

            await axios.post(`${process.env.REACT_APP_PROXY}/api/products`,formData, 
                {
                headers: {
                'Content-Type': 'multipart/form-data'
                },
            }).then(
                (result) => {
                    if (result.status === 200){
                        setResponseMsg("Product was saved.");
                        //const numOfPics = result.data.numOfPics;
                        const product_id = result.data.product_id;
                        navigate('/product-view/'+product_id);
                        //add listing to context 
                        /********* */
                        clearFunc();
                    }else{
                        setResponseMsg("Product was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            return true;
        }else{
            setResponseMsg("Product is missing some important details.");
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
            <button onClick={e => openModal(e)} className="button is-link is-large"> Add Product </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                <div className="hero">
                    <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    <p className="has-text-centered"> Enter details of the Product. </p>
                    <form onSubmit={e => saveProduct(e)}>
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
                        
                        <div className="field">
                            <label className="label"> Brand: </label>
                            <select
                                className="select form-select"
                                name="brand"
                                id="brand"
                                 
                                onChange={e => handleChange(e)}
                                required
                                >
                                <option value=""> Choose... </option>
                                <option value="other"> Other </option>
                                <hr></hr>
                                <optgroup label="Consumer Brands">
                                    {consumerBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>
                                <hr></hr>
                                <optgroup label="Beverages Brands">
                                    {beverageBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>
                                <hr></hr>
                                <optgroup label="Tech Brands">
                                    {techBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>
                                <hr></hr>
                                <optgroup label="Industrial Brands">
                                    {industrialBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>
                                <hr></hr>
                                <optgroup label="Sports Brands">
                                    {sportwearBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>
                                 
                                <hr></hr>
                                <optgroup label="Clothing Brands"> 
                                    {clothingBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>

                                <hr></hr>
                                <optgroup label="Designer Brands"> 
                                    {designerBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>

                                <hr></hr>
                                <optgroup label="Family Brands"> 
                                    {familyBrands.map(opt => (
                                        <option key={opt} value={opt}>
                                            {opt.toUpperCase()}
                                        </option>
                                    ))}
                                </optgroup>
                                
                            </select>
                            <br />
                            {showOther &&
                                <label>
                                    Other   
                                    <input 
                                        className="input"
                                        type="text"
                                        name="other"
                                        value={brand}
                                        onChange={e => handleChange(e)}
                                    /> 
                                </label> 
                            }
                        </div>                      
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
                            <label className="label"> Stock: </label>
                            <input
                            className="input"
                            type="number"
                            name="stock"
                            value={stock}
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
                            <label className="label"> Colors: </label>

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
                            <label className="label"> Package Info: </label>
                            <input
                            placeholder="packageInfo"
                            className="input"
                            type="text"
                            name="packageInfo"
                            value={packageInfo}
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
export default withContext(ProductsAdd);