import React, {useState} from "react";
import withContext from "../../withContext";
//import PreeItem from "../Timeline/PreeItem";
import TilePreeItem from "../HelperComponents/TilePreeItem";
import ProductItem from "../Shops/Products/ProductItem";

const Religion = props => {

    const loadVideo = props.context.prees ? props.context.prees.filter(pree => pree.is_media === true && pree.attachment.has_video === true) : [];
    const products = props.context.products ? props.context.products.filter(product => product.typeOf === 'Items') : [];

    const [isChecked, setVal] = useState(false);

    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        //isChecked ? console.log(isChecked) : console.log("test") ;
    }

    return (
        <div className="hero">
            <div className="religion-page">
                <div className="columns">
                    <div className="column"> 
                        <div className="card">
                            {loadVideo.slice(0,1).map((item, index) => 
                                (
                                    <TilePreeItem
                                                        aPree={item}
                                                        key={index}
                                                    />
                                )) 
                            }
                            
                        </div>   
                    </div>
                    <div className="column is-one-third">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3" style={{height:"100%"}}>
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="media">
                                    <div className="media-left">
                                        <figure className="image is-48x48">
                                            <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                                        </figure>
                                    </div>
                                    <div className="media-content">
                                        <p className="title is-4">John Smith</p>
                                        <p className="subtitle is-6">@johnsmith</p>
                                    </div>
                                </div>

                                <div className="content">
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <span>@bulmaio</span>.
                                    <span>#css</span> <span>#responsive</span>
                                    <br />
                                    <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                                </div>
                            </div>
                            
                        </div> 
                    </div>
                    <div className="column is-one-third">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3" style={{height:"100%"}}>
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                </figure>
                            </div>
                            
                        </div> 
                    </div>
                </div>

                <div className="columns">
                    <div className="column"> 
                        <div class="box">
                            <div className="columns">
                                <div class="column">
                                    <figure class="image is-4by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                    </figure>
                                     
                                    <h1 className="subtitle"><strong>This is the Title of the Concert</strong></h1>
                            
                                </div>
                                <div class="column">
                                    <div class="content">
                                        <div className="rows">
                                            <div className="row">
                                                <b>Theme : </b> <small>90'S</small>
                                            </div>
                                            <hr className="info-seperator" />
                                            <div className="row">
                                                <b>Venue : </b> <small>UWI BOWL</small> <br/>
                                                <b>Address : </b> <small>10 New Street, Kingston 6.</small>
                                            </div>
                                            <hr className="info-seperator" />
                                            <div className="row">
                                                <b>Date : </b><time datetime="2016-1-1">1 Jan 2016, 10:00PM - 2 Jan 2016, 4:00AM</time>
                                            </div>
                                            <hr className="info-seperator" />
                                            <div className="row">
                                                <b>Entry : </b> <small>Purchase E-Ticket </small> {" "} <span className="tag is-warning"><strong>$1000</strong></span> <br /><br />
                                                <button className={`button ${isChecked === true ? "is-success" : "is-info"}`}> {isChecked === true ? "Trade Ticket" : "Buy Ticket"}</button>
                                                {" "}
                                                <label className="switch">
                                                    <input onChange={ e => handleToggleChange(e) } id="response_value" type="checkbox" />
                                                    <div className="slider round" >
                                                        <span className="on">Aquired</span>
                                                        <span className="off">Not - Aquired</span>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-half">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3" style={{height:"100%"}}>
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                </figure>
                            </div>
                            
                        </div> 
                    </div>
                </div>

                <div className="columns">
                    <div className="column is-one-third">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3" style={{height:"100%"}}>
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                </figure>
                            </div>
                            
                        </div> 
                    </div>
                    <div className="column is-one-third">
                        <div className="card">
                            <div className="card-image">
                                <figure className="image is-4by3" style={{height:"100%"}}>
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                </figure>
                            </div>
                            
                        </div> 
                    </div>
                    <div className="column">
                        <div className="card">
                            {products.slice(0,1).map((product, index) => 
                                (
                                    <ProductItem
                                        imageUrl={process.env.PUBLIC_URL + "/products/product" + product.product_id + "/0"}
                                        product={product}
                                        key={index}
                                    />
                                )) 
                            }
                            
                        </div> 
                    </div>
                </div>

                <div className="hero-body">
                    <div className="box">

                    </div>

                </div>
            </div>
        </div>
    )
}

export default withContext(Religion);