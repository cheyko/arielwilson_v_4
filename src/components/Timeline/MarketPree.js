import Item from "../Shops/BickleCourt/Item";
import ProductItem from "../Shops/Products/ProductItem";
import PFLItem from "../Shops/PropFinder/PFLItem";
import ServiceItem from "../Shops/Services/ServiceItem";
import VehicleItem from "../Shops/WOV/VehicleItem";

const MarketPree = props => {
    let {aPree} = props;
    let {index} = props;

    let template;

    if(aPree.pree_type === 'product'){
        template = <div className="has-text-centered"><ProductItem
                        imageUrl={`${process.env.PUBLIC_URL}/images/products/product${aPree.attachment.product_id}/0.jpeg`}
                        product={aPree.attachment}
                        key={index}
                        page={"timeline"}
                    /><br/></div>
    }else if(aPree.pree_type === 'listing'){
        template = <div className="has-text-centered"><PFLItem
                        imageUrl={`${process.env.PUBLIC_URL}/images/listings/listing${aPree.attachment.listing_id}/0.jpeg`}
                        listing={aPree.attachment}
                        key={index}
                        page={"timeline"}
                    /><br/></div>
    }else if(aPree.pree_type === 'vehicle'){
        template = <div className="has-text-centered"><VehicleItem
                        imageUrl={`${process.env.PUBLIC_URL}/images/vehicles/vehicle${aPree.attachment.vehicle_id}/0.jpeg`}
                        vehicle={aPree.attachment}
                        key={index}
                        page={"timeline"}
                    /><br/></div>
    }else if(aPree.pree_type === 'service'){
        template = <div className="has-text-centered"><ServiceItem
                        imageUrl={`${process.env.PUBLIC_URL}/images/services/service${aPree.attachment.service_id}/0.jpeg`}
                        service={aPree.attachment}
                        key={index}
                        page={"timeline"}
                    /><br/></div>
    }else if(aPree.pree_type === 'item'){
        template = <div className="has-text-centered"><Item
                        imageUrl={`${process.env.PUBLIC_URL}/images/items/item${aPree.attachment.item_id}/0.jpeg`}
                        item={aPree.attachment}
                        key={index}
                        page={"timeline"}
                    /><br/></div>
    }

    return(
        <div className="pree-item">
            {template}
        </div>
    )
}
export default MarketPree;