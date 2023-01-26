import React, {useState} from "react";
import withContext from "../../withContext";
import axios from "axios";
import Modal from "react-modal";
//import {Redirect} from "react-router-dom";

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

const CreateGroup = props => {

    const [responseMsg, setResponseMsg] = useState("");
    const [modalIsOpen, setModalOpen] = useState(false);

    const categories = ["Art", "Applications & Software", "Automobiles",  "Baby", "Books", "Beauty & Cosmetics", "Electronics", "Fashion", "Financial","Food & Beverages", "Furniture", "General" ,"Health", "Household", "Kitchen", "Industrial", "Movies", "Outdoors", "Religion","Scientific", "Space" ,"Sports", "Tools", "Toys", "Travel"];
    const [name, setName] = useState("");
    const [tagline, setTagline] = useState("");
    const [location, setLocation] = useState("");
    const [category, setCategory] = useState("");
    const [status, setStatus] = useState("");
    const [description, setDescription] = useState("");
    const [display, setDisplay] = useState(null);

    //add
    //Performance => Torque, Horsepower, Fuel Capacity
    //Measurements => Dimensions, Wheelbase, Tire Size, Driver Leg Room, Driver Head Room

    const clearFunc = () => {
        setName("");
        setTagline("");
        setCategory("");
        setDescription("");
        setDisplay(null);
    }

    const handleChange = (e) => {
        switch(e.target.name){
            case 'name':
                setName(e.target.value);
                break;
            case 'category':
                setCategory(e.target.value);
                break;
            case 'tagline':
                setTagline(e.target.value);
                break;
            case 'location':
                setLocation(e.target.value);
                break;
            case 'status':
                setStatus(e.target.value);
                break;
            case 'description':
                setDescription(e.target.value);
                break;
            default:
                break;
        }
        return true;
    }

    const handlePhoto = e => {
        e.preventDefault();
        const upload = e.target.files;
        setDisplay(upload[0]);
        return true;
    }


    const saveGroup = async (e) => {
        e.preventDefault();
        setResponseMsg("");
        const user_id = props.context.user.id;
        
        if (name && category && tagline){
            const formData = new FormData();
            formData.append('user_id',user_id);
            formData.append('name',name);
            formData.append('tagline',tagline);
            formData.append('category',category);
            formData.append('location',location);
            formData.append('status',status);
            formData.append('description',description);
            if (display !== null){
                formData.append('has_dp',true);
                console.log(display);
                formData.set('photo',display);
            }else{
                formData.append('has_dp',false);
            }


            const result = await axios.post('/api/groups',formData, 
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    },
                    maxContentLength: 100000000,
                    maxBodyLength: 1000000000
            }).then(
                (result) => {
                    if (result.status !== 200){
                        setResponseMsg("Group was not saved, please try again. Contact us for suppport if problem persist.");
                    }
                }
            );
            if (result.status === 200){
                setResponseMsg("Group was saved.");
                //add listing to context 
                clearFunc();
                //const group_id = result.data.group_id;
                // set some boolean for Redirecting <Redirect to={`/view-group/${group_id}`} />
            }
            return true;
        }else{
            setResponseMsg("Group is missing some important details.");
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
            <button onClick={e => openModal(e)} className="button is-link"> Create Group </button>
            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                <div className="hero">
                    <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                    <p className="has-text-centered"> Enter details of the Group. </p>
                    <form onSubmit={e => saveGroup(e)}>
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
                            <label className="label"> Name: </label>
                            <input
                            placeholder="location"
                            className="input"
                            type="text"
                            name="name"
                            value={name}
                            onChange={e => handleChange(e)}

                            />
                        </div>
                        <div className="field">
                            <label className="label"> Tagline: </label>
                            <input
                            placeholder="location"
                            className="input"
                            type="text"
                            name="tagline"
                            value={tagline}
                            onChange={e => handleChange(e)}

                            />
                        </div>
                        <div className="field">
                            <label className="label"> HQ: </label>
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
                            <label className="label"> State: </label>
                            <select
                                className="select form-select"
                                name="status"
                                id="status"
                                value={status}
                                onChange={e => handleChange(e)}
                                required
                                >
                                <option value="public"> Public  </option>
                                <option value="private"> Private </option>
                                
                            </select>
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
                            <label className="label"> Photo: </label>
                            <input 
                                id="display"
                                name="display"
                                single
                                type="file"
                                onChange={e => handlePhoto(e)}
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
export default withContext(CreateGroup);