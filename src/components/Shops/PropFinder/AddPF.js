import React, {useState, useEffect} from "react";
import { useNavigate } from "react-router-dom";
import withContext from "../../../withContext";
import axios from "axios";
import $ from "jquery";

const AddPF = props => {

    const token = props.context.token ? props.context.token : 0;
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
    const [responseMsg, setResponseMsg] = useState("");
    const [viewUpload, setViewUpload] = useState("");
    const [interior, setInterior] = useState("");
    const [interiorList, setInteriorList] = useState([]);
    const [exterior, setExterior] = useState("");
    const [exteriorList, setExteriorList] = useState([]);
    const [selected, setSelected] = useState(null);

    const picked = (index) => {
        if(selected === index){
            setSelected(null);
        }else{
            setSelected(index);
        }
    }

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
        document.getElementById("photos").value = "";
        setInterior("");
        setInteriorList([]);
        setExterior("");
        setExteriorList([]);
    }

    const saveProp = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        if (typeOf !== "" && category !== "" && address !== "" && price > 0){
            //const user_id = props.context.user.id;
            const formData = new FormData();
            formData.append('token',token);
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
            formData.append('description',description);
            parking.forEach((val) => {
                formData.append('parking', val);
            });
            interiorList.forEach((val) => {
                val !== "" && formData.append('interior', val);
            });
            exteriorList.forEach((val) => {
                val !== "" && formData.append('exterior', val);
            });
            photos.forEach( (photo) => {
                formData.append('photos',photo);
            });

            await axios.post(`${process.env.REACT_APP_PROXY}/api/listings`,formData, 
                {
                headers: {
                'Content-Type': 'multipart/form-data'
                },
            }).then(
                (result) => {
                    if (result.status === 200){
                        setResponseMsg("Property was saved.");
                        const listing_id = result.data.listing_id;
                        setViewUpload('/listing-view/'+listing_id);
                        clearFunc();
                    }else{
                        setResponseMsg("Property was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            return true;
        }else{
            setResponseMsg("Listing is missing some important details.");
            return false;
        }
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

    const addChoice = (e,adding) => {
        if(adding === 'interior'){
            let tempInteriorList = interiorList;
            if (interiorList.length > 0){
                tempInteriorList[interiorList.length-1] = e.target.value;
            }else{
                tempInteriorList[interiorList.length] = e.target.value;
            }
            setInteriorList([...tempInteriorList]);
        }else if(adding === 'exterior'){
            let tempExteriorList = exteriorList;
            if (exteriorList.length > 0){
                tempExteriorList[exteriorList.length-1] = e.target.value;
            }else{
                tempExteriorList[exteriorList.length] = e.target.value;
            }
            setExteriorList([...tempExteriorList]);
        }
    }

    const newInput = (adding) => {
        if(adding === 'interior'){
            if(interior !== ""){
                setInteriorList([...interiorList, ""]);
                setInterior("");
            }else{
                document.querySelector("#interior").style.borderColor = "red";
            }
        }else if(adding === 'exterior'){
            if(exterior !== ""){
                setExteriorList([...exteriorList, ""]);
                setExterior("");
            }else{
                document.querySelector("#exterior").style.borderColor = "red";
            }
        }
    }

    const editChoice = (e,index,editing) => {
        if(editing === 'interior'){
            let tempInteriorList = interiorList;
            tempInteriorList[index] = e.target.value;
            setInteriorList([...tempInteriorList]);
        }else if(editing === 'exterior'){
            let tempExteriorList = exteriorList;
            tempExteriorList[index] = e.target.value;
            setExteriorList([...tempExteriorList]);
        }
    }

    const moveUp = () => {
        if(selected > 0){
            let templist = photos;
            let x = photos[selected];
            let y = photos[selected - 1];
            templist[selected - 1] = x;
            templist[selected] = y;
            setPhotos([...templist]);
            setSelected(selected - 1);
        }
    }

    const moveDown = () => {
        if(selected < (photos.length - 1)){
            let templist = photos;
            let x = photos[selected];
            let y = photos[selected + 1];
            templist[selected + 1] = x;
            templist[selected] = y;
            setPhotos([...templist]);
            setSelected(selected + 1);
        }
    }

    /* Prevent scrolling for number input types*/
    $('form').on('focus', 'input[type=number]', function (e) {
        $(this).on('wheel.disableScroll', function (e) {
            e.preventDefault()
        })
    });
    $('form').on('blur', 'input[type=number]', function (e) {
        $(this).off('wheel.disableScroll')
    });

    return(
        <div className="hero">
            <div className="hero-container">
                <div className="box">
                    <div className="add-title has-text-centered">
                        <h1>Add Property to W@H GW@@N</h1>
                    </div>
                    <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                    <br />
                    <form>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label"> Photos: </label>
                            </div>
                            <div className="field-body">
                                <div className="file has-name is-boxed">
                                    <label className="file-label">
                                        <input 
                                        className="file-input"
                                            id="photos"
                                            name="photos"
                                            type="file"
                                            multiple
                                            onChange={e => handlePhotos(e)}
                                        />
                                        <span className="file-cta">
                                        <span className="file-icon">
                                            <i className="fas fa-upload"></i>
                                        </span>
                                        <span className="file-label">
                                            Choose file(s)…
                                        </span>
                                        </span>
                                        <span className="file-name">
                                            {photos.length} picture(s) selected
                                        </span>
                                    </label>
                                </div>
                                <button type="button" onClick={e => {setPhotos([]);document.getElementById("photos").value = "";}} className=" give-space button is-warning"><i className="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <div className="columns is-multiline">
                                    {photos.map((photo,index) => 
                                        <div className="column" key={index}>
                                            <span> {index + 1} </span>
                                            <br />
                                            <img onClick={e => picked(index)} style={selected === index ? {border:"solid 3px blue"}:{border:"none"}} alt={`${index} of Event Uploads`} className="is-256x256" src={URL.createObjectURL(photo)} />
                                            {selected === index &&
                                                <div className="controls">
                                                    <button onClick={e => moveUp()} type="button" className="mx-1 button is-info"><i className="fas fa-arrow-up"></i></button>
                                                    <button onClick={e => moveDown()} type="button" className="mx-1 button is-info"><i className="fas fa-arrow-down"></i></button>
                                                </div>
                                            }
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
                                    onChange={e => {setTitle(e.target.value); setResponseMsg("");}}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Market</label>
                            </div>
                            <div className="field-body">
                                <div className="select">
                                    <select
                                        id="category"
                                        name="category"
                                        value={category}
                                        onChange={e => setCategory(e.target.value)}>
                                            <option value=""> Choose... </option>
                                            <option value="Sale"> Sell </option>
                                            <option value="Rent"> Rent </option>
                                        </select>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Listing Type</label>

                            </div>
                            <div className="field-body">
                                <div className="select">
                                    <select
                                        id="typeOf"
                                        name="typeOf"
                                        value={typeOf}
                                        onChange={e => setTypeOf(e.target.value)}>
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
                                <label className="label">Address </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div className="control has-icons-left">
                                        <input
                                            className="input"
                                            type="text"
                                            name="address"
                                            value={address}
                                            onChange={e => {setAddress(e.target.value);setResponseMsg("");}}
                                            placeholder="Enter location"
                                            />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-globe"></i>
                                        </span>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="field is-horizontal">
                            <div className="field-label">
                                <div className="label"><b>Price </b></div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <span className="control has-icons-left">
                                        <input 
                                            className="input"
                                            type="number"
                                            name="price"
                                            min={0}
                                            value={price.toLocaleString()}
                                            onChange={e => {setPrice(e.target.value); setResponseMsg("")}}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-dollar-sign"></i>
                                        </span>
                                    </span>
                                </div>
                                <div className="field">
                                    <div className="select">
                                        <select
                                            name="currency"
                                            value={currency}
                                            onChange={e => {setCurrency(e.target.value);setResponseMsg("");}}>
                                                {currencies.map(cur => (
                                                <option key={cur} value={cur}>
                                                    {cur}
                                                </option>
                                                ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">
                                <div className="label"><b>Available Bedrooms </b></div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <span className="control has-icons-left">
                                        <input 
                                            className="input"
                                            type="number"
                                            name="beds"
                                            min={0}
                                            value={beds}
                                            onChange={e => {setBeds(e.target.value); setResponseMsg("")}}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-bed"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">
                                <div className="label"><b>Available Bathrooms </b></div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <span className="control has-icons-left">
                                        <input 
                                            className="input"
                                            type="number"
                                            name="baths"
                                            min={0}
                                            value={baths}
                                            onChange={e => {setBaths(e.target.value); setResponseMsg("")}}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-shower"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">
                                <div className="label"><b>Size of Property (Sqft) </b></div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <span className="control has-icons-left">
                                        <input 
                                            className="input"
                                            type="number"
                                            name="insideSqft"
                                            min={0}
                                            value={insideSqft}
                                            onChange={e => {setISqft(e.target.value); setResponseMsg("")}}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-compass-drafting"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">
                                <div className="label"><b>Size of Property lot (Sqft) </b></div>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <span className="control has-icons-left">
                                        <input 
                                            className="input"
                                            type="number"
                                            name="lotSqft"
                                            min={0}
                                            value={lotSqft}
                                            onChange={e => {setLSqft(e.target.value); setResponseMsg("")}}
                                        />
                                        <span className="icon is-small is-left">
                                            <i className="fas fa-compass-drafting"></i>
                                        </span>
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="field is-horizontal">
                            <div className="field-label">
                                <label className="label"> Parking </label>
                            </div>
                            <div className="field-body">
                                <div className="field is-narrow">
                                    <div className="control">
                                        {parkOptions.map((val,index) => 
                                            <label key={index} className="checkbox">
                                                <input type="checkbox" name="parking-checkbox" onChange={e => handleCheckboxChange(e)} value={val} />
                                                {val}
                                            </label>
                                        )}
                                    </div>        
                                </div>
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
                                    rows="8"
                                    style={{ resize: "none" }}
                                    name="description"
                                    value={description}
                                    onChange={e => setDescription(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Interior Features </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div>
                                        {interiorList.map((val,index) =>
                                            {if(index !== (interiorList.length-1)){ 
                                                return (<input key={index} id={`interior${index}`} name={`interior${index}`} className="input" value={val} onChange={e => editChoice(e,index,'interior')}/>)
                                            }}
                                        )}
                                    </div>
                                    <p className="control my-1">
                                        <input 
                                            className="input"
                                            type="text"
                                            name="interior"
                                            id="interior"
                                            value={interior}
                                            onChange={e => {setInterior(e.target.value);addChoice(e,'interior');setResponseMsg("");document.querySelector("#interior").style.borderColor = "lightgray";}}
                                        />
                                    </p>
                                    <button type="button" onClick={e => {newInput('interior')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal">
                                <label className="label">Exterior Features </label>
                            </div>
                            <div className="field-body">
                                <div className="field">
                                    <div>
                                        {exteriorList.map((val,index) =>
                                            {if(index !== (exteriorList.length-1)){ 
                                                return (<input key={index} id={`exterior${index}`} name={`exterior${index}`} className="input" value={val} onChange={e => editChoice(e,index,'exterior')}/>)
                                            }}
                                        )}
                                    </div>
                                    <p className="control my-1">
                                        <input 
                                            className="input"
                                            id="exterior"
                                            type="text"
                                            name="exterior"
                                            value={exterior}
                                            onChange={e => {setExterior(e.target.value);addChoice(e,'exterior');setResponseMsg(""); document.querySelector("#exterior").style.borderColor = "lightgray";}}
                                        />
                                    </p>
                                    <button type="button" onClick={e => {newInput('exterior')}} className="button is-info"><i className="fas fa-plus"></i></button>
                                </div>
                            </div>
                        </div>
                        <div className="field is-horizontal">
                            <div className="field-label is-normal"></div>
                            <div className="field-body">
                                <span>{responseMsg}</span>
                                {viewUpload !== "" &&
                                    <p className="mx-3">
                                        <button className="button is-link" onClick={() => navigate(viewUpload)}>View Upload</button>
                                    </p>
                                }
                            </div>
                        </div>
                        <div className="field is-clearfix">
                        
                            <button type="button" onClick={e => clearFunc()} className="button is-warning is-pulled-right give-space">
                                Cancel
                            </button>
                            
                            <button onClick={e => saveProp(e)} className="button is-primary is-pulled-right give-space" type="submit">
                                Submit
                            </button>
                           
                        </div>

                    </form>

                </div>
            </div>
        </div>
    )

}
export default withContext(AddPF);