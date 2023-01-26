import React from "react";
import withContext from "../../withContext";

const Local = props => {

    return (
        <div className="hero">
            <div className="local-page">
                
                <div className="hero-contain">
                    <div className="hero page-header" >
                        <div className="page-header-body container">
                            <h4 className="title" style={{textTransform:"capitalize"}}> Local {props.section} </h4>
                        </div>
                    </div>
                    <div class="box">                      
                        <div className="columns">
                            <div class="column">
                                <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="PlaceHolder" />
                                </figure>
                                    
                                <h1 className="subtitle"><strong>Heading of Article</strong></h1>
                        
                            </div>
                            <div class="column">
                                <div class="content">
                                    <h1 className="subtitle"><strong>View Latest</strong></h1>
                                    <div className="rows">
                                        <div className="row">
                                            <div className="box">
                                                <b>Article Heading |</b> 
                                                <span> Small sentences giving main point.</span>
                                                <br />
                                                <div className="columns">
                                                    <small className="column">Category</small>
                                                    <small className="column">Author</small>
                                                    <small className="column is-half"><time  datetime="2016-1-1">2 Jan 2016, 4:00AM</time></small>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="info-seperator" />
                                        <div className="row">
                                            <div className="box">
                                                <b>Article Heading |</b> 
                                                <span> Small sentences giving main point.</span>
                                                <br />
                                                <div className="columns">
                                                    <small className="column">Category</small>
                                                    <small className="column">Author</small>
                                                    <small className="column is-half"><time  datetime="2016-1-1">2 Jan 2016, 4:00AM</time></small>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="info-seperator" />
                                        <div className="row">
                                            <div className="box">
                                                <b> Article Heading |</b> 
                                                <span> Small sentences giving main point.</span>
                                                <br />
                                                <div className="columns">
                                                    <small className="column"> Category</small>
                                                    <small className="column"> Author</small>
                                                    <small className="column is-half"><time  datetime="2016-1-1">2 Jan 2016, 4:00AM</time></small>
                                                </div>
                                            </div>
                                        </div>
                                        <hr className="info-seperator" />
                                        <div className="row">
                                            <div className="box">
                                                <b>Article Heading |</b> 
                                                <span> Small sentences giving main point.</span>
                                                <br />
                                                <div className="columns">
                                                    <small className="column">Category</small>
                                                    <small className="column">Author</small>
                                                    <small className="column is-half"><time  datetime="2016-1-1">2 Jan 2016, 4:00AM</time></small>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="columns">
                        <div className="column">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="PlaceHolder" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="PlaceHolder" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="column">
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="PlaceHolder" />
                                    </figure>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="article-list">
                        <h1 className="subtitle"><strong>Explore More</strong></h1>
                        <div className="columns">
                            <div class="column">
                                <figure className="image is-2by1">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="PlaceHolder" />
                                </figure>
                            </div>
                            <div class="column">
                                <div class="content">
                                    <div className="rows">
                                        <div className="row">
                                            <div className="box"> 
                                                <b>Article Heading |</b> 
                                                <span> Small sentences giving main point.</span>
                                                <br />
                                                <div className="columns">
                                                    <small className="column">Category</small>
                                                    <small className="column">Author</small>
                                                    <small className="column is-half"><time  datetime="2016-1-1">2 Jan 2016, 4:00AM</time></small>
                                                </div>
                                            </div>
                                        </div>
                                         
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="info-seperator" />
                        <br />
                        <div className="columns">
                            <div class="column">
                                <figure className="image is-2by1">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="PlaceHolder" />
                                </figure>
                            </div>
                            <div class="column">
                                <div class="content">
                                    <div className="rows">
                                        <div className="row">
                                            <div className="box"> 
                                                <b>Article Heading |</b> 
                                                <span> Small sentences giving main point.</span>
                                                <br />
                                                <div className="columns">
                                                    <small className="column">Category</small>
                                                    <small className="column">Author</small>
                                                    <small className="column is-half"><time  datetime="2016-1-1">2 Jan 2016, 4:00AM</time></small>
                                                </div>
                                            </div>
                                        </div>
                                        <br />
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="info-seperator" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withContext(Local);