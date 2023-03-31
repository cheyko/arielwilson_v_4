import React, {useEffect, useState} from "react";
import withContext from "../../../withContext";

import ListingImageView from "./ListingImageView";
import ListingDetail from "./ListingDetail";
import ListingFeatures from "./ListingFeatures";
import SimilarListing from "./SimilarListing";

import { useParams } from "react-router-dom";
import $ from 'jquery';

const ViewListing = props => {

    let {id} = useParams();

    const [listing, setListing] = useState(null);
    const [thePics, setPics] = useState(null);

    useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
        if (listing === null){
            props.context.getListing(id).then((promise) => {
                if(promise){
                    setListing(promise);
                    setPics(props.context.getTargetPhotos(promise, "listing"));
                }else{
                    setListing(promise)
                }
            });
        }

    }, [listing, id, props.context]);

    /*useEffect(() => {
        window.scrollTo(0, 0);
        $('#rightContent').scrollTop(0); //did not work as expected
    }, []);

    let listing = localStorage.getItem("listing");
    let thePics = localStorage.getItem("thePics");
    let {id} = useParams();
    const result = props.context.getListing(id);
    
    listing = (result === null) ? JSON.parse(listing) : result;
    thePics =  (result === null) ? JSON.parse(thePics) : props.context.getTargetPhotos(listing.listing_id, "listing");
    
    localStorage.setItem("listing", JSON.stringify(listing));
    localStorage.setItem("thePics", JSON.stringify(thePics));*/

    const interior = [ 'Garden Area','Water Tank','Ceiling Fans','Grilled'
    ,'Swimming Pool','Fully Fenced','Cable','Hurricane Shutters','Flooring: Wall to Wall Carpet,Porcelain'];

    const exterior = ['Hillside','Private Setting','Quiet Area',
    'Road - Paved','Road - Gravel','Pets Allowed'];

    return (
        <div className="hero">
            {listing ? 
            <div className="hero-container market-content">
                
                <div className="listing-content">
                    <div className="columns is-multiline no-padding no-margin">
                        <div className="leftContent column no-padding no-margin">
                            <ListingImageView listing={listing} thePics={thePics}/>
                        </div>
                        <div className="rightContent column">
                            <div className="content box">
                                <ListingDetail listing={listing}/>
                            </div>
                            <hr />
                            <div className="content box">
                                <ListingFeatures listing={listing} interior={interior} exterior={exterior}/>
                            </div>
                            <hr />
                            <div className="content box">
                                <SimilarListing listing={listing}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>:
            <div className="hero-container has-text-centered">
                <div className="hero-body">
                    {listing === false ? 
                        <span className="is-size-3" style={{color:"gray"}}>
                            Listing is not found !
                        </span>:
                        <span className="is-size-3" style={{color:"gray"}}>
                            Loading .....
                        </span>

                    }
                </div>
            </div>
            }
        </div>
    )
}
export default withContext(ViewListing);