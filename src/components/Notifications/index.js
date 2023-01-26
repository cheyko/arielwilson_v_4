import React from "react";

const Notifications = props => {
    return(
        <div className="hero">
                <div className="wgr-box">
                    <div className="tabs-header wgr-tabs">
                        
                        <div className="card box-bg header-container">
                            <div className="has-text-centered">
                                <h1 className="custom-heading subtitle"><b>NOTIFICATIONS</b></h1>
                            </div>
                            <div className="tabs-bg custom-tabs tabs is-centered card">
                                <ul style={{margin:"0 auto"}}>
                                    <li className="button tabs-btn is-active">
                                
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-clipboard-list" aria-hidden="true"></i></span>
                                        <span> HAPPENINGS </span> 
                                    </span>
                                
                                    </li>
                                    <li className="button is-not-active">
                                
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-tag" aria-hidden="true"></i></span>
                                        <span> MENTIONS </span>  
                                    </span>
                                    
                                    </li>
                                    <li className="button is-not-active">
                                    
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-hand-holding-heart" aria-hidden="true"></i></span>
                                        <span> RECOMMENDATIONS </span> 
                                    </span>
                                    
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="header-space">
                        <div className="hero">
                            <div className="hero-body">

                            </div>
                        </div>
                    </div>
                </div>
            
                <div className="wgr-content">
                    <div className="box activities-div">
                        <article className="media">
                            <figure className="media-left">
                                <p className="image is-64x64">
                                    <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                </p>
                            </figure>
                            <div className="media-content">
                                <div class="content">
                                    <p>
                                        <span className="image is-32x32">
                                            <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                                        </span>
                                        <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                                        <br />
                                            Lorem ipsum dolor sit amet, 
                                            consectetur adipiscing elit. Proin ornare magna eros, 
                                            eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                            Etiam finibus odio quis feugiat facilisis.
                                    </p>
                                </div>
                            </div>
                        </article>
                    </div>
                </div>
            
        </div>
    )
}
export default Notifications;