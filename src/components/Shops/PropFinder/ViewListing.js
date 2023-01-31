import React, {useEffect} from "react";
import withContext from "../../../withContext";

import ListingImageView from "./ListingImageView";
import ListingDetail from "./ListingDetail";
import ListingFeatures from "./ListingFeatures";
import SimilarListing from "./SimilarListing";

import { useNavigate, useParams } from "react-router-dom";
import $ from 'jquery';

const ViewListing = props => {

    useEffect(() => {
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
    localStorage.setItem("thePics", JSON.stringify(thePics));

    const interior = [ 'Garden Area','Water Tank','Ceiling Fans','Grilled'
    ,'Swimming Pool','Fully Fenced','Cable','Hurricane Shutters','Flooring: Wall to Wall Carpet,Porcelain'];

    const exterior = ['Hillside','Private Setting','Quiet Area',
    'Road - Paved','Road - Gravel','Pets Allowed'];

    //console.log(listing);
    //console.log(thePics);
    
    let navigate = useNavigate();
    
    return (
        <div className="hero">
            <div className="listing-view">
                
                <div className="listing-content">
                    <div className="columns is-multiline">
                        <div className="leftContent column is-half-desktop is-full-mobile">
                            <div className="hero-body viewing-controls">
                                <button className="button is-fixed" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                            </div>
                            <br />
                            <ListingImageView listing={listing} thePics={thePics}/>
                        </div>
                        <div className="rightContent column is-half is-full-mobile has-text-centered">
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
            </div>
        </div>
    )
}
export default withContext(ViewListing);