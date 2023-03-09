import { useState } from "react";
import withContext from "../../../../withContext";
import axios from "axios";
import { useEffect } from "react";
import ViewUserCard from "../../../HelperComponents/ViewUserCard";
import { Link } from "react-router-dom";

const RequestItem = props => {
    
    const {request} = props;
    const user_id = props.context.user.id;
    const [showRequest, setShowRequest] = useState(false);
    const [belong, setBelong] = useState(false);

    const answerRequest = async(index) => {
        const request_id = request.request_id;
        const answer = index;
        await axios.put('/api/answer-request',{user_id, request_id, answer}).then(
            (result1) => {
                if (result1.status === 200){
                    //setResponseMsg("Task status was changed.");
                    props.setGotRequest(false);
                }else{
                    //setResponseMsg("There was an issue, Task status was not changed.");
                }
            }
        );
    }

    useEffect(() => {
        if (user_id === request.is_for.user_id){
            setBelong(true);
        }
    },[belong])

    return(
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {user_id === request.lister.user_id ? "Sent" : "Received"}
                </p>
            </header>
            <header className="card-header">
                <p className="card-header-title">
                    {request.question}
                </p>
                <button onClick={e => setShowRequest(!showRequest)} className="card-header-icon" aria-label="more options">
                <span className="icon">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </header>
            
            {showRequest && 
                <>      
                    <div className="panel">
                        {request.choices && request.choices.length > 0 &&
                            <>
                                {request.choices.map((choice,index) => 
                                    <div key={index} className="panel-block">
                                        <button disabled={!belong} onClick={e => answerRequest(index)} className={`button is-fullwidth is-link ${request.answer === index ? "" : "is-outlined"}`}>
                                            {choice}
                                        </button>
                                    </div>
                                )}
                            </>
                        }
                    </div>
                </>
            }
            <Link className="user-item" to={`/view-user-profile/${user_id === request.lister.user_id ? request.is_for.user_id : request.lister.user_id}`}>
                <ViewUserCard user={user_id === request.lister.user_id ? request.is_for : request.lister} />
            </Link>
        </div>
    )
}
export default withContext(RequestItem);