import { Link } from "react-router-dom";

const MeetingItem = props => {

    const {meeting} = props;

    /*const handleToggleChange = (e) => {
        var isChecked = document.getElementById("response_value").checked;
        console.log(isChecked);
    }*/

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

    return(
        <div>
            <Link onClick={localStorage.setItem("event", JSON.stringify(meeting))} className="service-item" to={`/event-view/${meeting.event_id}`}>
                <div class="card">
                    <div class="card-image">
                        <figure class="image is-4by3">
                            <img src={process.env.PUBLIC_URL + "/images/events/event" + meeting.event_id + "/0"} alt="Event image" />
                        </figure>
                    </div>
                    <header class="card-header">
                        <p class="card-header-title">
                            {meeting.title}
                        </p>
                    </header>
                    <div class="panel">
                        <a class="panel-block is-active">
                            <span class="panel-icon">
                                <i class="fas fa-users" aria-hidden="true"></i>
                            </span>
                            {meeting.host}
                        </a>
                        <a class="panel-block">
                            <span class="panel-icon">
                            {meeting.metrics === "virtual" ? <i class="fas fa-network-wired" aria-hidden="true"></i> : <i class="fas fa-building" aria-hidden="true"></i>}
                            </span>
                            {meeting.venue}
                        </a>
                        <a class="panel-block">
                            <span class="panel-icon">
                                {meeting.metrics === "virtual" ? <i class="fas fa-link" aria-hidden="true"></i> : <i class="fas fa-globe" aria-hidden="true"></i>}
                            </span>
                            {meeting.where}
                        </a>
                        
                        <a class="panel-block">
                            <span class="panel-icon">
                            <i class="fas fa-calendar" aria-hidden="true"></i>
                            </span>
                            {meeting.dates.map((date,idx) => 
                                <span key={idx}>
                                    <span>{convertDate(date)} {convertTime(meeting.start_times[idx])} - {convertTime(meeting.end_times[idx])} </span>{idx > 0 ? ", ":""}
                                </span>
                            )}
                        </a>

                        <a class="panel-block">
                            <span class="panel-icon">
                            <i class="fas fa-money-bill" aria-hidden="true"></i>
                            </span>
                            
                            {meeting.tickets.map((ticket,idx) => 
                                <span key={idx}>
                                    {ticket === 'Free' || ticket === 'Invitation' ?
                                        <span>{ticket}</span>:
                                        <span>
                                            <span>{ticket} : {meeting.cost[idx]} {meeting.currencies[idx]} </span> {idx > 0 ? ", ":""}
                                        </span>
                                    }
                                </span> 
                            )}
                        </a>
                    </div>
                </div>
            </Link>
        </div>
    )
   
}
export default MeetingItem;