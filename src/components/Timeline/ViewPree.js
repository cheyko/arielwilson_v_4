import React from "react";
import withContext from "../../withContext";
import PreeItem from "./PreeItem";
import { useHistory } from "react-router-dom";

const ViewPree = props => {

    window.scrollTo(0,0);
    
    let history = useHistory();

    //const user_id = props.context.user ? props.context.user.id : 0;
    const param_id = props.match.params.id;
    const aPree = props.context.getPree(param_id);
    
    return (
        <div className="hero">
            <div className="hero-contain">
                <div className="rows">
                    <div className="row">
                        <button className="button is-fixed" onClick={() => history.goBack()}> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                    </div>
                    <br/><br/>
                    <div className="row prees-container">
                        <PreeItem aPree={aPree} showComments={true} clickable={"view"}/>
                    </div>
                </div>
            </div>
        </div>
    );
    
}
export default withContext(ViewPree);