import React from 'react';

const ProductFeatures = props =>{
        //if (listing) {
        //const { vehicle } = props;
        const { interior } = props;
        const { exterior } = props;
        const { entertainment } = props;
        const { technology } = props;
        const { comfort } = props;

        return(
            <>
                <div className="container">
                    <div className="content">
                        <p className="has-text-centered"><strong className="is-size-4" style={{textDecoration:"underline"}}>Features</strong> </p>
                        <div className="rows featuresList">
                            <div className="row">
                                <b style={{textDecoration:"underline"}}>Interior</b>
                                <ul style={{textAlign:"left"}}>
                                    {interior.map(detail => (
                                        <li key={detail}>
                                        <small>{detail}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <div className="row">
                                <b style={{textDecoration:"underline"}}>Exterior</b>
                                <ul style={{textAlign:"left"}}>
                                    {exterior.map(detail => (
                                        <li key={detail}>
                                        <small>{detail}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <div className="row">
                                <b style={{textDecoration:"underline"}}>Entertainment</b>
                                <ul style={{textAlign:"left"}}>
                                    {entertainment.map(detail => (
                                        <li key={detail}>
                                        <small>{detail}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <div className="row">
                                <b style={{textDecoration:"underline"}}>Technology</b>
                                <ul style={{textAlign:"left"}}>
                                    {technology.map(detail => (
                                        <li key={detail}>
                                        <small>{detail}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <br />
                            <div className="row">
                                <b style={{textDecoration:"underline"}}>Comfort</b>
                                <ul style={{textAlign:"left"}}>
                                    {comfort.map(detail => (
                                        <li key={detail}>
                                        <small>{detail}</small>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <br />
                        <div className="featuresContent">
                            <div className="rows">
                                <strong className="is-size-5" style={{textDecoration:"underline"}}>Performance</strong>
                                <div className="row">
                                    <b> Performance 1 : </b> <span> 10</span>
                                </div>
                                <div className="row">
                                    <b> Performance 2 : </b> <span> 9 </span>
                                </div>
                            </div>
                            <hr />
                            <div className="rows">
                                <strong className="is-size-5" style={{textDecoration:"underline"}}>Dynamics</strong>
                                <div className="row">
                                    <b> Dynamics 1 : </b> <span> 10 </span>
                                </div>
                                <div className="row">
                                    <b> Dynamics 2 : </b> <span> 19 </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </>
        );
}

export default ProductFeatures;