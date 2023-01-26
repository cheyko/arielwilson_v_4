import React from "react";
import withContext from "../../../withContext";

const Classifieds = props => {

    /*const [isChecked, setVal] = useState(false);
    const isFree = true;

    const handleToggleChange = (e) => {
        setVal(document.getElementById("response_value").checked);
        //isChecked ? console.log(isChecked) : console.log("test") ;
    }*/

    return (
        <div className="hero">
            <div className="container">
                <div className="is-pulled-right">
                    <button className="button is-outlined">
                        Create
                    </button>{" "}
                    <button className="button is-outlined">
                        Updates
                    </button>{" "}
                    <button className="button is-outlined">
                        Filter
                    </button>
                </div>
            </div>
            <div className="hero">
                <div className="rows">
                    <div className="row">
                        <div className="box">
                            <div className="columns">
                                <div className="column is-5">
                                    <div className="card-image">
                                        <figure className="image is-4by3">
                                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                                        </figure>
                                    </div>
                                    <hr className="info-seperator" />
                                    <div className="columns">
                                        <div className="column">
                                            <button className="button is-outlined"> Apply !</button>
                                        </div>
                                        <div className="column">
                                            <button className="button is-outlined"> View Company </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="column"> 
                                    <div className="content">
                                        <b><em>Techinical Support Agent </em> </b> 
                                        <p><small> Ibex</small></p>
                                    </div>
                                    
                                    <div class="content">
                                        <div className="rows">
                                            <div className="row">
                                                <div className="columns">
                                                    <b className="column">Full-time </b> 
                                                    <small className="column"> Entry Level </small>
                                                    <span className="column"> <span className="tag is-success"> $300,000 </span></span>
                                                </div>
                                            </div>
                                            <hr className="info-seperator" />
                                            <div className="row">
                                                <b>Address : </b> <small>10 New Street, Kingston 6.</small>
                                            </div>
                                            <hr className="info-seperator" />
                                            <div className="row">
                                                <b>TimeSpan: </b><time datetime="2016-1-1">19 Dec 2021 - 10 Jan 2022 </time>
                                            </div>
                                            <hr className="info-seperator" />
                                            <div className="row">
                                                <b>Applicants : </b> <small> 1 </small>
                                            </div>
                                            <hr className="info-seperator" />
                                            <div className="row">
                                                <b>Connections : </b> <small> .... </small>
                                            </div>
                                        </div>
                                    </div>
                                </div> 
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Classifieds);