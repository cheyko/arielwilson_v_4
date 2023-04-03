import { useState } from "react";
import withContext from "../../../../withContext";
import axios from "axios";
import { useEffect } from "react";
import ViewUserCard from "../../../HelperComponents/ViewUserCard";
import { Link } from "react-router-dom";

const RequestItem = props => {
    
    const {request} = props;
    const token = props.context.token;
    const [showRequest, setShowRequest] = useState(false);
    const [belong, setBelong] = useState(false);

    const answerRequest = async(index) => {
        const request_id = request.request_id;
        const answer = index;
        await axios.put(`${process.env.REACT_APP_PROXY}/api/answer-request`,{token, request_id, answer});
    }

    useEffect(() => {
        if (!request.lister.is_user){
            setBelong(true);
        }
    },[request.lister.is_user])

    return(
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {request.lister.is_user ? "Sent" : "Received"}
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
            <Link className="user-item" to={`/user/${request.lister.is_user ? request.is_for.username : request.lister.username}`}>
                <ViewUserCard user={request.lister.is_user ? request.is_for : request.lister} />
            </Link>
        </div>
    )
}
export default withContext(RequestItem);