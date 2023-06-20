import withContext from "../../../../withContext"
import { Link } from "react-router-dom";

const Volunteer = props => {

    const {activity} = props;
    const imgUrl = activity.numOfPics > 0 ? (`${process.env.PUBLIC_URL}/images/volunteers/volunteer${activity.volunteer_id}/0.jpg`) : (`${process.env.PUBLIC_URL}/images/defaults/volunteers/${activity.category}.jpg`);

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
        <Link className="service-item" to={`/volunteer-view/${activity.volunteer_id}`}>
            <div className="card">
                <div className="card-image">
                    <figure className="image is-4by3">
                        <img src={imgUrl} title="volunteer" alt="Placeholder"/>
                    </figure>
                </div>
                <div className="media p-3">
                    <div className="media-left">
                        <figure className="image is-96x96">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder"/>
                        </figure>
                    </div>
                    <div className="content">
                        <p className="title is-4">{activity.title}</p>
                        <p className="subtitle is-6">Entity </p>
                    </div>
                </div>
                <div className="panel">
                    <span className="panel-block">
                        <span className="is-medium tag" style={{textTransform:"capitalize"}}>{activity.metrics}</span>
                    </span>
                    <span className="panel-block is-active">
                        <span className="panel-icon">
                            <i className="fas fa-list" aria-hidden="true"></i>
                        </span>
                        {activity.category}
                    </span>
                    <span className="panel-block">
                        <span className="panel-icon">
                            <i className="fas fa-location" aria-hidden="true"></i>
                        </span>
                        <span>{activity.venue}</span>
                    </span>
                    <span className="panel-block">
                        <span className="panel-icon">
                            <i className="fas fa-map-location-dot" aria-hidden="true"></i>
                        </span>
                        <span>{activity.location}</span>
                    </span>
                    <span className="panel-block">
                        <span className="panel-icon">
                            <i className="fas fa-calendar" aria-hidden="true"></i>
                        </span>
                        <span>{activity.start_date === activity.end_date ? convertDate(activity.start_date) : convertDate(activity.start_date) + " - " + convertDate(activity.end_date)}</span>
                    </span>
                    <span className="panel-block">
                        <span className="panel-icon">
                            <i className="fas fa-clock" aria-hidden="true"></i>
                        </span>
                        <span>{convertTime(activity.start_time)} - {convertTime(activity.end_time)}</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
export default withContext(Volunteer);