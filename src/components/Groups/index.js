import React from "react";
import withContext from "../../withContext";
import CreateGroup from "./CreateGroup";
import GroupsList from "./GroupsList";

const Groups = props => {

    const user_id = props.match.params.id;
    const option = props.match.params.action;

    return (
        <div className="hero">
            <div className="hero-body">
                <div className="group-controls">
                    <div className="container">
                        <div className="media">
                            <div className="media-content">
                                <div className="content">
                                    <div className="is-pulled-right">
                                        <CreateGroup />&nbsp;
                                    </div>{" "}
                                    <div className="is-pulled-right">
                                        <button className="button is-outlined">
                                            Administer Group
                                        </button>&nbsp;
                                    </div>{" "}
                                    <div className="is-pulled-right">
                                        <button className="button is-outlined">
                                            Make Group Request
                                        </button>&nbsp;
                                    </div>{" "}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="groups-list">
                    <GroupsList option={option} user_id={user_id}/>
                </div>
            </div>
        </div>
    )
}
export default withContext(Groups);