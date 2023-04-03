import Map from "../../HelperComponents/Map";
import MapModal from '../../HelperComponents/MapModal';
import ViewUserCard from "../../HelperComponents/ViewUserCard";
import {Link } from "react-router-dom";

const EventDetails = props => {
    const {event} = props;

    const convertDate = (val) => {
        var result;
        if (new Date().getDate() === new Date(val).getDate() + 1){
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
        <div className="box">
            <div>
                <span className="tag is-large is-info">{event.category}</span>{" "}
                <span className="tag is-large is-dark">{event.typeOf}</span>
            </div>
            <div className="subtitle">
                <strong style={{textDecoration:"underline"}}>
                        <h4><b style={{ textTransform: "capitalize" }}>{event.title}</b></h4>
                </strong>
            </div>
            <div className="">
                <h4>
                    <i className="fas fa-users" aria-hidden="true"></i>
                    {" "}{event.host}
                </h4>               
            </div>
            <div className="subtitle">
                <b>
                    {event.metrics === "virtual" ? <i className="fas fa-network-wired" aria-hidden="true"></i> : <i className="fas fa-building" aria-hidden="true"></i>}
                    {" "}{event.venue}
                </b>               
            </div>
            <div>
                <b>
                    {event.metrics === "virtual" ? <i className="fas fa-link" aria-hidden="true"></i> : <i className="fas fa-globe" aria-hidden="true"></i>}
                    {" "}{event.metrics === "virtual" ? <a href={event.where}>{event.where} </a> : <span>{event.where}</span>}
                </b> 
                {event.metrics === "physical" && 
                    <div className="container listing-map">
                        <Map height={"250rem"} fullAddr={event.where}/>
                        <MapModal fullAddr={event.where} />
                    </div>
                }              
            </div>
            <br />
            <div>
                <i className="fas fa-calendar" aria-hidden="true"></i>{" "}
                {event.dates.map((date,idx) => 
                    <span key={idx}>
                        {idx > 0 ? <span>&nbsp;|&nbsp;</span>:""}<span>{convertDate(date)} {" "}<i className="fas fa-dot-circle" aria-hidden="true"></i>{" "} {convertTime(event.start_times[idx])} - {convertTime(event.end_times[idx])} </span> 
                    </span>
                )}
            </div>
            <br />
            <div>
                <i className="fas fa-money-bill" aria-hidden="true"></i>{" "}
                {event.tickets.map((ticket,idx) => 
                    <span key={idx}>
                        {ticket === 'Free' || ticket === 'Invitation' ?
                            <span>{ticket}</span>:
                            <span>
                                {idx > 0 ? <span>&nbsp;|&nbsp;</span>:""}<span>{ticket} : {event.costs[idx]}{event.currencies[idx]} </span>
                            </span>
                        }
                    </span> 
                )}
            </div>
            <br />
            <div className="descript">
                <div className="has-text-centered"><b><h3 className="title">DESCRIPTION</h3></b></div>
                <p style={{fontStyle:"italic"}}> {event.description}</p>
            </div>
            <br />
            <div className="personnel">
                <div className="hosts">
                    {event.personnel_type.filter((atype) => atype === "Host").length > 0 &&
                        <div className="has-text-centered"><b><h3 className="title">HOSTS</h3></b></div>
                    }
                    {event.personnel_type.map((aType,idx) => {
                        if (aType === "Host"){
                            return(
                                <div key={idx}>
                                    <Link className="user-item" to={`/user/${event.personnel[idx].username}`}>
                                        <ViewUserCard user={event.personnel[idx]} />
                                    </Link>
                                    <br />
                                </div>
                            )
                        }
                        return false;
                    })}
                </div>
                <div className="speakers">
                    {event.personnel_type.filter((atype) => atype === "Speaker").length > 0 &&
                        <div className="has-text-centered"><br /><b><h3 className="title">SPEAKERS</h3></b></div>
                    }
                    {event.personnel_type.map((aType,idx) => {
                        if (aType === "Speaker"){
                            return(
                                <div key={idx}>
                                    <Link className="user-item" to={`/user/${event.personnel[idx].username}`}>
                                        <ViewUserCard user={event.personnel[idx]} />
                                    </Link>
                                    <br />
                                </div>
                            )
                        }
                        return false;
                    })}
                </div>
                <div className="performers">
                    {event.personnel_type.filter((atype) => atype === "Performer").length > 0 &&
                        <div className="has-text-centered"><br /><b><h3 className="title">PERFORMERS</h3></b></div>
                    }
                    {event.personnel_type.map((aType,idx) => {
                        if (aType === "Performer"){
                            return(
                                <div key={idx}>
                                    <Link className="user-item" to={`/user/${event.personnel[idx].username}`}>
                                        <ViewUserCard user={event.personnel[idx]} />
                                    </Link>
                                    <br />
                                </div>
                            )
                        }
                        return false;
                    })}
                </div>
                <div className="presenters">
                    {event.personnel_type.filter((atype) => atype === "Presenters").length > 0 &&
                        <div className="has-text-centered"><br/><b><h3 className="title">PRESENTERS</h3></b></div>
                    }
                    {event.personnel_type.map((aType,idx) => {
                        if (aType === "Presenter"){
                            return(
                                <div key={idx}>
                                    <Link className="user-item" to={`/user/${event.personnel[idx].username}`}>
                                        <ViewUserCard user={event.personnel[idx]} />
                                    </Link>
                                    <br />
                                </div>
                            )
                        }
                        return false;
                    })}
                </div>
                <div className="general">
                    {event.personnel_type.filter((atype) => atype === "General").length > 0 &&
                        <div className="has-text-centered"><br/><b><h3 className="title">PERSONNEL</h3></b></div>
                    }
                    {event.personnel_type.map((aType,idx) => {
                        if (aType === "General") {
                            return( 
                                <div key={idx}>
                                    <Link className="user-item" to={`/user/${event.personnel[idx].username}`}>
                                        <ViewUserCard user={event.personnel[idx]} />
                                    </Link>
                                    <br />
                                </div>
                            )
                        }
                        return false;
                    })}
                </div>
            </div>
            <br />
            {event.attractions.length > 0 &&
            <div className="attractions">
                <div className="has-text-centered"><b><h3 className="title">ATTRACTIONS</h3></b></div>
                <ul>
                    {event.attractions.map((attr,idx) =>
                        <li key={idx}>{attr}</li>
                    )}
                </ul>
            </div>
            }
        </div>
    )

}
export default EventDetails;