import {Link} from "react-router-dom";
import withContext from "../../../../withContext";

const PropertyItem = props => {
    const {property} = props;
    const url = props.imageUrl === undefined ? ["https://bulma.io/images/placeholders/128x128.png"] : props.imageUrl;

    return (

        <div className="card property-card">
            <Link className="property-item" to={`/accomadation/${property.accomadate_id}`}>
                <div className="card-image">
                    <figure className="image is-1by1">
                        <img
                        src={url}
                        alt={property.title}
                        />
                    </figure>
                </div>
                <div className="card-content">
                    <span style={{ fontStyle:"italic" }}>

                    </span>
                    <br />
                    <div className="market-title">
                        <br/>
                        <b style={{ textTransform: "capitalize" }}>
                        </b>
                    </div>
                    <div className="media">
                        <div className="media-content">
                        
                        </div>
                    </div>
                </div>    
            </Link>
        </div>
    )
}
export default withContext(PropertyItem);