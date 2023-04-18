import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import PreeItem from "./PreeItem";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const ViewPree = props => {

    window.scrollTo(0,0);
    
    let navigate = useNavigate();
    let {id} = useParams();
    const [aPree, setAPree] = useState(null);

    useEffect (() => {
        const token = props.context.token ? props.context.token : 0;
        const pree_id = id;
        axios.post(`${process.env.REACT_APP_PROXY}/api/get-pree`,{token,pree_id}).then(
            (pree) => {
                if (pree.status === 200){
                    setAPree(pree.data);
                }else{
                    setAPree(false);
                }
            }
        );
    },[id, props.context.token])
    
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
                <>
                {aPree === null ?
                    <div className="loading"></div>
                    :
                    <div className="hero-container">
                        <div className="hero-body">
                            <span className="is-size-3" style={{color:"gray"}}>
                                Pree is not found !
                            </span>
                        </div>
                    </div>
                }
                </>
            }
        </div>
    );
    
}
export default withContext(ViewPree);