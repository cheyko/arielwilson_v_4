import { useEffect } from "react";
import { useState } from "react";
import withContext from "../../../../withContext";
import $ from "jquery";
import ViewUserCard from "../../../HelperComponents/ViewUserCard";
import { Link } from "react-router-dom";
import axios from "axios";

const PollItem = props => {

    const {poll, page} = props;
    const user_id = props.context.user.id;
    const [showPoll, setShowPoll] = useState(true);
    const [voted, setVoted] = useState(poll.did_vote);
    const [theWidth, setWidth] = useState(0);
    const [votes, setVotes] = useState(poll.votes);
    const [results, setResults] = useState(poll.results);
    //let val = poll.status === 'Open' ? true : false;
    const [isOpen, setOpen] = useState(null);
    //let boxwidth = $('#result0');
    const [windowSize, setSize] = useState(0);

    const vote = async(index) => {
        const poll_id = poll.poll_id;
        const choice = index;
        await axios.post('/api/vote-poll',{user_id, poll_id, choice}).then(
            (result1) => {
                if (result1.status === 200){
                    //setResponseMsg("Task status was changed.");
                    setVoted(true);
                    setVotes(parseInt(result1.data.votes));
                    setResults(result1.data.results);
                    if (page !== "timeline"){
                        props.setGotPolls(false);
                    }
                }else{
                    //setResponseMsg("There was an issue, Task status was not changed.");
                }
            }
        );
    }

    const runWindow = () => {
        setSize(window.innerWidth);
    }

    useEffect(() => {
        if(theWidth === 0){
            window.addEventListener("resize", runWindow);
        }
        if($('#result0')){
            if ($('#result0').width() > 0){
                setWidth($('#result0').width());  
            }           
        }
        if(isOpen === null){
            setOpen(checkPoll());
        }
    },[voted, results, theWidth, windowSize, isOpen]);


    const calWidth = (result) => {
        const total = votes;
        var response = (votes === 0 || result === 0) ? 0 : (result/total) * theWidth;
        return response;
    }

    const calPercentage = (result) => {
        const total = votes; 
        var response = (votes === 0 || result === 0) ? 0 : ((result/total) * 100).toFixed(1);
        return response;
    }


    const convertDate = (val) => {
        var result;
        if (new Date().getDate() == new Date(val).getDate() + 1){
             result = "Today at";
        }else{
            result = new Date(new Date(val).setDate(new Date(val).getDate() + 1)).toDateString();
        }
        return result;
    }

    const convertTime = (aTime) => {
        var meridian = parseInt(aTime.split(":")[0]) >= 12 ? 'pm' : 'am';
        var hour = parseInt(aTime.split(":")[0]) % 12 || 12;
        var minutes = aTime.split(":")[1];
        return hour + ":" + minutes + meridian;
    }

    const checkPoll = () => {
        let poll_end = new Date();
        poll_end.setDate(new Date(poll.end_date).getDate() + 1);
        var time_vals = poll.end_time.split(":");
        poll_end.setHours(time_vals[0],time_vals[1],time_vals[2]);
        var now = new Date();
        return (poll_end.getTime() > now.getTime());
    }

    return(
        <div className="card">
            <header className="card-header">
                <p className="card-header-title">
                    {poll.category} Poll
                </p>
            </header>
            <header className="card-header">
                <p className="card-header-title">
                    {poll.question}
                </p>
                <button onClick={e => setShowPoll(!showPoll)} className="card-header-icon" aria-label="more options">
                <span className="icon">
                    <i className="fas fa-angle-down" aria-hidden="true"></i>
                </span>
                </button>
            </header>
            
            {showPoll && 
                <>      
                    <div className="panel">
                        {poll.choices && poll.choices.length > 0 &&
                            <>
                                {voted || (poll.lister.user_id === user_id) || isOpen === false ?
                                <>
                                    {poll.choices.map((choice,index) => 
                                        <div key={index} className="panel-block p-0">
                                            <span id={"result"+index} className="results-box">
                                                <span style={{width:calWidth(results[index])}} className="progress-span"></span> 
                                                <small className="poll-text"><strong>{choice}</strong></small> 
                                                <span style={{zIndex:"3", position:"relative"}} className="is-pulled-right">{calPercentage(results[index]) + "%"}</span>
                                             </span>   
                                        </div>
                                    )}
                                    <div className="panel-block">
                                        <span><b> {votes} </b>  {votes === 1 ? "vote" : "votes"} </span> &nbsp; - &nbsp; 
                                        <span><b> {isOpen === true ? "Ends" : "Ended"} : </b>{convertDate(poll.end_date)}, {convertTime(poll.end_time)}  </span>
                                    </div>
                                </>
                                :
                                <>
                                    {poll.choices.map((choice,index) => 
                                        <div key={index} className="panel-block">
                                            <button onClick={e => vote(index)} className={`button is-fullwidth is-link is-outlined`}>
                                                {choice}
                                            </button>
                                        </div>
                                    )}
                                </>}
                            </>
                        }
                    </div>
                </>
            }
            <Link className="user-item" to={`/view-user-profile/${poll.lister.user_id}`}>
                <ViewUserCard user={poll.lister} />
            </Link>
        </div>
    )
    
    /*return(
        <div className="box">
            <b>Category : <em>Sample</em></b> 
            <div className="media">
                <div className="media-content">
                    
                    <em>This is the Question ? </em> 
                    {voted ?
                    <div className="">
                        {pollText.map((vals, index) => (
                            <div key={index} className="">
                                <span id={"result"+index} className="box results-box"><span style={{width:calWidth(pollResults[index])}} className="progress-span"></span> <small className="poll-text"><strong>{vals}</strong></small> <span style={{zIndex:"3"}} className="is-pulled-right">{calPercentage(pollResults[index]) + "%"}</span> </span>   
                            </div> 
                        ))} 
                    </div>
                    :
                    <div className="">
                        <div className="">
                            <button className="button is-fullwidth poll-btn"> <b>Option A</b> </button>   
                        </div>
                        <div className="">
                            <button className="button is-fullwidth poll-btn"> <b>Option B </b></button>  
                        </div>   
                    </div>
                    }
                </div>
            </div>
            <div className="media">
                <div className="media-left">
                    <figure className="image is-48x48">
                        <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                    </figure>
                </div>
                <div className="media-content">
                    <p className="title is-4">John Smith</p>
                    <p className="subtitle is-6">@johnsmith</p>
                </div>
            </div>
        </div>
    )*/

}

export default withContext(PollItem);