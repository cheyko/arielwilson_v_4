import {useState, useEffect} from "react";
import Modal from "react-modal";
import withContext from "../../../../withContext"

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

const AddPoll = props => {

    const {operation} = props;

    const getDateTime = () => {
        const original = new Date();
        const isoVal = original.toString();
        const result = isoVal.split("GMT")[0];
        //console.log(result);
        return result;
    }

    const [poll, setPoll] = useState("");
    const [status, setStatus] = useState("Open");
    const [responseMsg, setResponseMsg] = useState("");
    const [endDate, setEndDate] = useState(new Date().toISOString().split("T")[0]);
    const [endTime, setEndTime] = useState("00:00");
    const [modalIsOpen, setModalOpen] = useState(false);
    const [aChoice, setAChoice] = useState("");
    const [choices, setChoices] = useState([]);
    const [isEdit, setEdit] = useState(false);
    const [editVal, setEditVal] = useState(null);

    const clearFunc = () => {
        setPoll("");
        setResponseMsg("");
        setAChoice("");
        setChoices([]);
        setEdit(false);
        setEditVal(null);
    }

    const saveRequest = async(e) => {
        e.preventDefault();
        var theDateTime = getDateTime();
        console.log(choices);
    }

    const loadRequest = async(e) => {

    }

    const addChoice = () => {
        if(aChoice !== ""){
            setChoices([...choices, aChoice]);
            setAChoice("");
        }
    }

    const editChoice = (index) => {
        setAChoice(choices[index]);
        setEditVal(index);
        setEdit(true);

    }

    const reAddChoice = () => {
        if(aChoice !== ""){
            let temp = choices;
            temp[editVal] = aChoice;
            setChoices(temp);
            setAChoice("");
            setEdit(false);
            setEditVal(null);
        }
    }

    const cancelEdit = () => {
        setAChoice("");
        setEdit(false);
        setEditVal(null);
    }

    const deleteChoice = (index) => {
        setChoices(choices.filter((val,idx) => index !== idx));
    }

    useEffect( () => {
        if((parseInt(endDate.split("-")[0]) === (new Date()).getFullYear()) && (parseInt(endDate.split("-")[1]) === (new Date()).getMonth() + 1) && (parseInt(endDate.split("-")[2]) === (new Date()).getDate()) ){
            console.log("today");
            if ((parseInt(endTime.split(':')[0]) == (new Date()).getHours())){
                if ((parseInt(endTime.split(':')[1]) > (new Date()).getMinutes())){
                    console.log("enough time");
                    setResponseMsg("");

                }else{
                    console.log("time already passed");
                    setResponseMsg("time already passed");
                }
            }else if ((parseInt(endTime.split(':')[0]) < (new Date()).getHours())) {
                console.log("time already passed");
                setResponseMsg("time already passed");
            }else{
                console.log("enough time");
                setResponseMsg("");
            }
        }else{
            console.log("not-today")
        }
    },[endTime, endDate]);

    const handleChange = (e) => {
        switch(e.target.name){
            case 'projectSelect':
                break;
            default:
                break;     
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

    return(
        <>
            {/*<button onClick={e => openModal(e)} className={`button ${operation === "create" ? 'is-outlined':'is-primary'}`}> {operation === "create" ? "Create" : "Update"} </button>*/}
            <button onClick={e => openModal(e)} className='button is-outlined'> Create </button>

            <Modal 
                isOpen={modalIsOpen}
                onRequestClose={ e => closeModal(e)}
                style={customStyles}>
                    <div className="hero">
                        <button onClick={e => closeModal(e)} style={{backgroundColor:"red"}} className="button modal-close is-large" aria-label="close"></button>
                        <p className="has-text-centered"> Request Details </p>
                        <form>
                            <div className="field">
                                <label className="label"> Poll: </label>
                                <textarea
                                    className="textarea"
                                    type="text"
                                    rows="3"
                                    style={{ resize: "none" }}
                                    name="poll"
                                    value={poll}
                                    onChange={e => setPoll(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <span>Enter the different responses that you would like the recipient to choose from.</span>
                                <div className="choices">
                                    <div className=""><b>Choices</b></div>
                                    <div>
                                        {choices.map((val,index) => (
                                            <div key={index}>
                                                <span style={{cursor:"pointer"}} onClick={e => editChoice(index)}><i className="fas fa-edit"></i></span>{" "}
                                                <span style={{cursor:"pointer"}} onClick={e => deleteChoice(index)}><i className="fas fa-trash"></i></span>{" "}
                                                <span>{index + 1}:</span>{" "}
                                                <span className={`${editVal === index ? 'background-warning' : ''}`}>{val}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                                <br />
                                <label className="label"> Enter Choice: </label>
                                <input 
                                    className="input"
                                    type="text"
                                    name="aChoice"
                                    value={aChoice}
                                    onChange={e => setAChoice(e.target.value)}
                                />
                                {isEdit ?
                                    <div>
                                        <span onClick={e => reAddChoice()} className="button is-small is-link is-underlined">Re-Add Choice</span> {" "}
                                        <span onClick={e => cancelEdit()} className="button is-small is-warning is-underlined">Cancel Edit</span> 
                                    </div>
                                   :<span onClick={e => addChoice()} className="button is-small is-link is-underlined">Add Choice</span>
                                }
                            </div>
                            <div className="field">
                                <label className="label"> End Date:</label>
                                <input 
                                    className="input" 
                                    type="date" 
                                    name="endDate"
                                    value={endDate}
                                    min={new Date().toISOString().split("T")[0]}
                                    onChange={e => setEndDate(e.target.value)}
                                />
                            </div>
                            <div className="field">
                                <label className="label"> End Time:</label>
                                <input 
                                    className="input" 
                                    type="time" 
                                    name="endTime"
                                    value={endTime}
                                    onChange={e => setEndTime(e.target.value)}
                                />
                            </div>
                            <br />
                            <span>{responseMsg}</span>
                            <br />
                            <div className="field is-clearfix is-pulled-right">
                                &nbsp;
                                <button onClick={e => {clearFunc();closeModal(e);}} className="button is-warning">
                                    Cancel
                                </button>
                                &nbsp;&nbsp;
                                <button onClick={e => saveRequest(e)} className="button is-primary " type="submit">
                                    Submit
                                </button>
                                &nbsp;
                            </div>

                        </form>
                    </div>

            </Modal>

        </>
    );
}

export default withContext(AddPoll);