import { Link } from "react-router-dom";

const EventItem = props => {

    const {event} = props;

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
            <Link className="service-item" to={`/event-view/${event.event_id}`}>
                <div className="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src={process.env.PUBLIC_URL + "/images/events/event" + event.event_id + "/0"} alt="Event image" />
                        </figure>
                    </div>
                    <header className="card-header">
                        <p className="card-header-title">
                            {event.title}
                        </p>
                    </header>
                    <div className="panel">
                        <span className="panel-block is-active">
                            <span className="panel-icon">
                                <i className="fas fa-users" aria-hidden="true"></i>
                            </span>
                            {event.host}
                        </span>
                        <span className="panel-block">
                            <span className="panel-icon">
                            {event.metrics === "virtual" ? <i className="fas fa-network-wired" aria-hidden="true"></i> : <i className="fas fa-location" aria-hidden="true"></i>}
                            </span>
                            {event.venue}
                        </span>
                        <span className="panel-block">
                            <span className="panel-icon">
                                {event.metrics === "virtual" ? <i className="fas fa-link" aria-hidden="true"></i> : <i className="fas fa-map-location-dot" aria-hidden="true"></i>}
                            </span>
                            {event.metrics === "virtual" ? <span href={event.where}>{event.where} </span> : <span>{event.where}</span>}
                        </span>
                        
                        <span className="panel-block">
                            <span className="panel-icon">
                            <i className="fas fa-calendar" aria-hidden="true"></i>
                            </span>
                            {event.dates.map((date,idx) => 
                                <span key={idx}>
                                    {idx > 0 ? <span>&nbsp;|&nbsp;</span>:""}<span>{convertDate(date)} {" "}<i className="fas fa-dot-circle" aria-hidden="true"></i>{" "} {convertTime(event.start_times[idx])} - {convertTime(event.end_times[idx])} </span>
                                </span>
                            )}
                        </span>

                        <span className="panel-block">
                            <span className="panel-icon">
                            <i className="fas fa-money-bill" aria-hidden="true"></i>
                            </span>
                            
                            {event.tickets.map((ticket,idx) => 
                                <span key={idx}>
                                    {ticket === 'Free' || ticket === 'Invitation' ?
                                        <span>{ticket}</span>:
                                        <span>
                                            {idx > 0 ? <span>&nbsp;|&nbsp;</span>:""}<span>{ticket}: {event.costs[idx]}{event.currencies[idx]} </span> 
                                        </span>
                                    }
                                </span> 
                            )}
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
   
}
export default EventItem;