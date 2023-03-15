
const VolunteerDetails = props => {
    const {activity} = props;

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
        <div className="box">
            <div className="activity-heading subtitle">
                <span className="tag is-large is-info">{activity.category}</span>
                <strong style={{textDecoration:"underline"}}>
                        <h3><b style={{ textTransform: "capitalize" }}>{activity.title}</b></h3>
                </strong>
                <p> Entity</p>
                <div>
                    <span className="tag">{activity.metrics}</span>
                </div>
                <div className="columns is-mobile has-text-centered p-3">
                    <span className="column"><button className="button is-fullwidth is-link"> Sign Up </button></span>
                    <span className="column"><button className="button is-fullwidth is-primary"> Save Activity</button></span>
                </div>
            </div>
            
            <div id="first-content" className="content">
                <h5>
                    <i className="fas fa-globe" aria-hidden="true"></i>
                    {" "}{activity.location}
                </h5>   
                 
                <h5>
                    <i className="fas fa-calendar" aria-hidden="true"></i>
                    {" "}{activity.start_date === activity.end_date ? convertDate(activity.start_date) : convertDate(activity.start_date) + " - " + convertDate(activity.end_date)}
                </h5>  
                <h5>
                    <i className="fas fa-clock" aria-hidden="true"></i>
                    {" "}{convertTime(activity.start_time)} - {convertTime(activity.end_time)}
                </h5>         
            </div>
            <div className="content">
                <div className="descript">
                    <div className="has-text-centered"><b><h3 className="title">DESCRIPTION</h3></b></div>
                    <p>
                        {activity.description}
                    </p>
                </div>
                <br />
                <div className="contributions">
                    <div className="has-text-centered"><b><h3 className="title">CONTRIBUTIONS</h3></b></div>
                    <ul>
                        {activity.contributions.map((val,idx) =>
                            <li key={idx}>{val}</li>
                        )}
                    </ul>
                </div>
                <br />
            </div>
        </div>
    )

}
export default VolunteerDetails;