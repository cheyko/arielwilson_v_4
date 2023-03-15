import withContext from "../../../../withContext"
import { Link } from "react-router-dom";


const ClassifiedItem = props => {
    
    const {job} = props;

    const convertDate = (val) => {
        var result;
        if (new Date().getDate() == new Date(val).getDate() + 1){
             result = "Today at";
        }else{
            result = new Date(new Date(val).setDate(new Date(val).getDate() + 1)).toDateString();
        }
        return result;
    }

    return(
        <Link className="service-item" to={`/classified-view/${job.classified_id}`}>
            <div className="card" style={{fontSize:"large"}}>
                <div className="media py-1 px-3">
                    <div className="media-left">
                        <figure className="image is-96x96">
                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder"/>
                        </figure>
                    </div>
                    <div className="media-content">
                        <b><em>{job.title} </em> </b> 
                        <p> {job.company} </p>
                        {/*<p>
                            <span className="is-medium tag">{job.typeOf}</span>
                            &nbsp;<span className="is-medium tag" style={{textTransform:"capitalize"}}>{job.metrics}</span>
                        </p>*/}
                    </div>
                </div>
                {/*<div className="card-content py-1 px-3">
                    <b><em>{job.title} </em> </b> 
                    <p> {job.company} </p>
                </div>*/}

                <div className="panel">
                    <span className="panel-block">
                        <span className="is-medium tag">{job.typeOf}</span>
                        &nbsp;<span className="is-medium tag" style={{textTransform:"capitalize"}}>{job.metrics}</span>
                    </span>
                    <span className="panel-block is-active">
                        <span className="panel-icon">
                            <i className="fas fa-list" aria-hidden="true"></i>
                        </span>
                        {job.category}
                    </span>
                    <span className="panel-block">
                        <span className="panel-icon">
                            <i className="fas fa-map-location-dot" aria-hidden="true"></i>
                        </span>
                        <span>{job.location}</span>
                    </span>
                    <span className="panel-block">
                        <span className="panel-icon">
                            <i className="fas fa-money-bill" aria-hidden="true"></i>
                        </span>
                        <span>{job.salary}</span>
                    </span>
                    <span className="panel-block">
                        <span className="panel-icon">
                            <i className="fas fa-calendar" aria-hidden="true"></i>
                        </span>
                        <span>{convertDate(job.end_date)}</span>
                    </span>
                </div>
            </div>
        </Link>
    )
}
export default withContext(ClassifiedItem);