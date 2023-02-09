import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import PreeItem from "./PreeItem";
import { useNavigate, useParams } from "react-router-dom";

const ViewPree = props => {

    window.scrollTo(0,0);
    
    let navigate = useNavigate();

    //const user_id = props.context.user ? props.context.user.id : 0;
    let {id} = useParams();
    const [aPree, setAPree] = useState(null);

    useEffect (() => {
        if (aPree === null){
            props.context.getPree(id).then((promise) => {
                setAPree(promise);
            });
        }
    },[aPree])
    
    //console.log(aPree);
    return (
        <div className="hero">
            {aPree ? 
                <div className="hero-container">
                    <div className="rows">
                        <div className="row">
                            <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i> </button>
                        </div>
                        <div className="row prees-container">
                            <PreeItem aPree={aPree} showComments={true} clickable={"view"}/>
                        </div>
                    </div>
                </div>
                :
                <div className="hero-container">
                    <div className="hero-body">
                        <span className="is-size-3" style={{color:"gray"}}>
                            Pree is not found !
                        </span>
                    </div>
                </div>
            }
        </div>
    );
    
}
export default withContext(ViewPree);