import ProductItem from "../Shops/Products/ProductItem";

const MarketPree = props => {
    let {aPree} = props;
    let {index} = props;

    let template;

    if(aPree.pree_type === 'product'){
        template = <div className="has-text-centered"><ProductItem
                        imageUrl={process.env.PUBLIC_URL + "/images/products/product" + aPree.attachment.product_id + "/0"}
                        product={aPree.attachment}
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