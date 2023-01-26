import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import GroupFeed from "./GroupFeed";
import GroupMembers from "./GroupMembers";

const ViewGroup = props => {

    const [section, setSection] = useState('feed');

    const group_id = props.match.params.id;
    const [groupview, setGroupView] = useState(null);

    useEffect(() => {
        if (!groupview){
            const result = props.context.getGroupView(group_id).then(
                (result) => {
                    if (!result){
                        console.log("there was an error when search for group details");
                    }else{
                        setGroupView(result);
                    }
                }
            );
        }
    })
    
    return(
        <div className="hero">
            <div className="hero-body prees-container">
                <div className="page-header">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-3by1">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                    </div>
                    <div className="tabs-container box has-text-centered">
                        <h1 className="title">{groupview ? groupview.name : ""}</h1>
                        <div className="container">
                            <ul>
                                <li className={`button ${section === "feed" ? "is-active" : ""}`} onClick={e => setSection('feed')}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i className="fas fa-inbox" aria-hidden="true"></i></span>
                                        <span>Group Feed</span> &nbsp; &nbsp;
                                    </span>
                                    </li>
                                <li className={`button ${section === "members" ? "is-active" : ""}`} onClick={e => setSection('members')}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i className="fas fa-user" aria-hidden="true"></i></span>
                                        <span>Members</span> &nbsp; &nbsp;
                                    </span>
                                </li>
                                <li className={`button ${section === "info" ? "is-active" : ""}`} onClick={e => setSection('info')}>
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i className="fas fa-users" aria-hidden="true"></i></span>
                                        <span>Group Info</span> &nbsp; &nbsp;
                                    </span>
                                </li>
                                <li className="button">
                                    <span className="reaction-btn">
                                        <span className="icon is-small"><i className="fas fa-users" aria-hidden="true"></i></span>
                                        <span>Group Messages</span> &nbsp; &nbsp;
                                    </span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="page-content">
                    {section === "feed" &&
                        <div className="group-feed">
                            <GroupFeed  group_id={group_id}/>
                        </div>
                    }
                    {section === "members" &&
                        <div className="group-members">
                            <GroupMembers  group_id={group_id}/>
                        </div>
                    }

                    <article className="media">
                        <figure className="media-left">
                            <small>31m</small>
                            <p className="image is-64x64">
                                <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            </p>
                            <small>@johnsmith</small> 
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>John Smith</strong> <small>Tagline ....... </small> 
                                    <br />
                                    <strong>
                                        Last Sender : 
                                    </strong>
                                    {" "}
                                    <span>
                                    Lorem ipsum dolor sit amet, 
                                    consectetur adipiscing elit. Proin ornare magna eros, 
                                    eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                    Etiam finibus odio quis feugiat facilisis.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </article>
                    <article className="media">
                        <figure className="media-left">
                            <small>31m</small>
                            <p className="image is-64x64">
                                <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            </p>
                            <small>@Random</small> 
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>Random Group </strong> <small> Tagline ....... </small> 
                                    <br />
                                    <strong>
                                        Last Sender : 
                                    </strong>
                                    {" "}
                                    <span>
                                        Lorem ipsum dolor sit amet, 
                                        consectetur adipiscing elit. Proin ornare magna eros, 
                                        eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                        Etiam finibus odio quis feugiat facilisis.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </article>
                    <article className="media">
                        <figure className="media-left">
                            <small>31m</small>
                            <p className="image is-64x64">
                                <img alt="Display" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            </p>
                            <small>@johnsmith</small> 
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>John Smith</strong> <small>Tagline ....... </small> 
                                    <br />
                                    <strong>
                                        Last Sender : 
                                    </strong>
                                    {" "}
                                    <span>
                                    Lorem ipsum dolor sit amet, 
                                    consectetur adipiscing elit. Proin ornare magna eros, 
                                    eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                    Etiam finibus odio quis feugiat facilisis.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </article>
                    <article className="media">
                        <figure className="media-left">
                            <small>31m</small>
                            <p className="image is-64x64">
                                <img alt="Profile" className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                            </p>
                            <small>@Random</small> 
                        </figure>
                        <div className="media-content">
                            <div className="content">
                                <p>
                                    <strong>Random Group </strong> <small> Tagline ....... </small> 
                                    <br />
                                    <strong>
                                        Last Sender : 
                                    </strong>
                                    {" "}
                                    <span>
                                        Lorem ipsum dolor sit amet, 
                                        consectetur adipiscing elit. Proin ornare magna eros, 
                                        eu pellentesque tortor vestibulum ut. Maecenas non massa sem. 
                                        Etiam finibus odio quis feugiat facilisis.
                                    </span>
                                </p>
                            </div>
                        </div>
                    </article>
                </div>
            </div>
        </div>
    )
}
export default withContext(ViewGroup);