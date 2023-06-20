import Map from "../../../HelperComponents/Map";
import MapModal from '../../../HelperComponents/MapModal';

const PropertyDetails = props => {

    const {property} = props;

    const icons = {"Unlimited Drinks":"fas fa-martini-glass","Unlimited Food":"fas fa-burger", "Beach": "fas fa-umbrella-beach", "Pool":"fas fa-water-ladder",
                "Free WiFi":"fas fa-wifi", "Connecting Rooms":"fas fa-door-open", "Restaurant":"fas fa-utensils", "Air Conditioning":"fas fa-fan", 
                "Parking Available":"fas fa-parking","Gym":"fas fa-dumbbell","Spa":"fas fa-spa"};

    return(
        <div className="box">
            <strong style={{textDecoration:"underline"}}>
                <h4><b style={{ textTransform: "capitalize" }}>{property.title}</b></h4>
            </strong>
            <span className="tag is-large is-info">{property.typeOf}</span>
            <div className="columns listing-detail is-multiline" style={{textAlign:"left",marginTop:'0.5rem'}}>
                <div className="column">
                    <div className="address">
                        <h4 className="subtitle">{property.address}</h4>               
                    </div> 
                    <div className="detail">
                        <p>
                            <small>{property.description} </small>
                        </p>  
                    </div>
                </div>
                <div className="column">
                    <div className="container listing-map">
                        <Map height={"250rem"} fullAddr={property.address}/>
                        <MapModal fullAddr={property.address} />
                    </div>
                </div>
            </div>
            <div className="content">
                <strong className="is-size-5">Main Ammenities</strong>
                <div className="rows featuresList">
                    <div className="row">
                        <ul style={{textAlign:"left", listStyleType:"none"}}>
                            {property.amenities.map(detail => (
                                <li key={detail}>
                                    <span className="field has-addons"><i className={icons[detail]}></i><small className="mx-1">{detail}</small></span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default PropertyDetails;