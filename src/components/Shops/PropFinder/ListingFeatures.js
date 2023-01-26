import React from 'react';

const ListingFeatures = props =>{
        //if (listing) {
        const {listing} = props;
        const { interior } = props;
        const { exterior } = props;
        return(
            <>
                <div className="container">
                    <div className="content">
                        <strong className="is-size-4" style={{textDecoration:"underline"}}>Features</strong>  
                        <div className="featuresContent">
                            <ul>
                                <li>
                                    <span>Parking: {" "}<strong>{listing.parking.map((x,y)=> {
                                        return (listing.parking.length < 2 || y === (listing.parking.length - 1) ?
                                        <span key={y}>{x}</span>
                                    :
                                        <span key={y}>{x}{", "}</span>)
                                    })} </strong></span>
                                </li>
                            </ul>  
                        </div>
                        <br /><br />
                        <div className="columns">
                            <div className="column col-6 col-xs-12" style={{borderRight:"solid 1px black"}}>
                                <b style={{textDecoration:"underline"}}>Interior</b>
                                <ul style={{textAlign:"left"}}>
                                    {interior.map(detail => (
                                        <li key={detail}>
                                        <small>{detail}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="column col-6 col-xs-12" style={{borderRight:"solid 1px black"}}>
                                <b style={{textDecoration:"underline"}}>Exterior</b>
                                <ul style={{textAlign:"left"}}>
                                    {exterior.map(detail => (
                                        <li key={detail}>
                                        <small>{detail}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    </div>

                </div>

            </>
        );
    
}

export default ListingFeatures;