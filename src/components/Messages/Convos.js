import React , {useState} from "react";
import withContext from "../../withContext";
import { Link } from "react-router-dom";
import NewConvo from "./NewConvo";

const Convos = props => {

    let {allmessages} = props;
    let {people} = props;
    let {user_id} = props;

    const [modalIsOpen, setModalOpen] = useState(false);
    
    const getLastMsg = (person) => {
        const result = allmessages.filter((msg) => msg.sender_id === person.user_id || msg.receiver_id === person.user_id);
        return result[result.length - 1];
    }

    const loadConvo = async(e, theID) => {
        const userview_id = theID;
        props.context.getUserView(userview_id).then(
            (result) => {
                if (!result){
                    throw new Error("there was an error when search for my details");
                }else{
                    props.setUserview(result);
                }
            }
        );
        props.context.getConvo(userview_id).then(
            (convoMsgs) => {
                if(!convoMsgs){
                    throw new Error('There was an error when getting convo');
                }else{
                    props.setConvo(convoMsgs);
                }
            }
        );
        //const heightVal = $('#convo-msgs')[0] ? $('#convo-msgs')[0].scrollHeight : 0;
        //$('#convo-msgs').scrollTop(heightVal);
        props.context.setRecent(userview_id); //get recent from database.
    }

    return (
        <div className="timeline-container">
            <div id="messages-view" className="columns is-mobile is-multiline">
                <div id="message-list" className="msg-section column">
                    <div className="message-tabs">
                        <div className="message-tabs-container">
                            <div className="sub-tabs tabs card is-centered">
                                <ul>
                                    <li className="is-active">
                                        <span className="button reaction-btn is-active">
                                            <span className="icon is-small"><i className="fas fa-inbox" aria-hidden="true"></i></span>
                                            <span>All</span> &nbsp; &nbsp;
                                        </span>
                                    </li>
                                    <li>
                                        <span className="button reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-user" aria-hidden="true"></i></span>
                                            <span>Tête-à-Tête</span> &nbsp; &nbsp;
                                        </span>
                                    </li>
                                    <li>
                                        <span className="button reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-users" aria-hidden="true"></i></span>
                                            <span>Group</span> &nbsp; &nbsp;
                                        </span>
                                    </li>
                                    <li>
                                        <NewConvo  modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} setTab={props.setTab} />
                                        <span onClick={e => setModalOpen(true)}  className="button reaction-btn">
                                            <span className="icon is-small"><i className="fas fa-plus" aria-hidden="true"></i></span>
                                            <span>New</span> &nbsp; &nbsp;
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="messages-div">
                        {people && people.length > 0 ? 
                        (
                            people.map((person, index) => (
                                <Link key={index} className="convo-link" onClick={(e) => { loadConvo(e,person.user_id);props.setTab("message"); }} to={`/messages/convo/direct/${person.user_id}`}>
                                    <article className="media">
                                        <figure className="media-left">
                                            <small>31m</small>
                                            <p className="image is-64x64">
                                                <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                            </p>
                                            
                                        </figure>
                                        <div className="media-content">
                                            <div className="content">
                                                <p>
                                                    <strong>{person.firstname} {" "} {person.lastname}</strong> <small>@{person.username}</small> 
                                                    <br />
                                                    <small style={{textDecoration:"underline"}}> #{person.tagline} </small> 
                                                    <br />
                                                    <strong>
                                                        {getLastMsg(person).sender_id === user_id ? "You : " : person.username + " : "}  
                                                    </strong>
                                                    {" "}
                                                    <span>
                                                        {getLastMsg(person).message_content}
                                                    </span>
                                                </p>
                                                
                                            </div>
                                            
                                        </div>
                                        
                                    </article> 
                                    <hr className="h-line"/> 
                                </Link>
                            ))
                        ):(
                            <article className="media">
                                <div className="media-content">
                                    <div className="content">
                                        <p>
                                            <span>
                                                You have no prior conversations, Click Start New Convo
                                                to communicate with your fellow W@H GW@@N Users.
                                            </span>
                                        </p>
                                    </div>
                                </div>
                            </article>
                        )}
                    </div>
                </div>
            </div>
        </div>
                                
    );
}

export default withContext(Convos);