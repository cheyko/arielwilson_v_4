import React, {useState, useEffect} from 'react';
import withContext from '../../withContext';
//import Slider from "react-slick";
//import axios from "axios";

import PreeHeader from "./PreeHeader";
import PreeBody from "./PreeBody";
import PreeReaction from "./PreeReaction";
import { useCallback } from 'react';
import EncourageModal from "../HelperComponents/EncourageModal";

const PreeItem = props => {

    const {aPree} = props;
    
    const {showComments} = props;
    const {clickable} = props;
    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [wanted, setWanted] = useState("");

    const loadMainMedia = useCallback(async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        const user_id = aPree.user.user_id;
        if (aPree.user.has_dp === true){
            setImgView(`${process.env.PUBLIC_URL}/images/bio/display/${user_id}.jpg`);
        }else{
            setImgView(`${process.env.PUBLIC_URL}/images/bio/display/default.jpg`);
        }
        setGetMedia(true);
        return true;
    },[aPree]);

    useEffect( ()=> {
        if (!gotMedia){
            loadMainMedia();
        }
    },[gotMedia, loadMainMedia]);
    
    return (
        <div className="hero">
            <EncourageModal wanted={wanted}  modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
            <div className="pree-item">
                <div className='message'>
                    <div className="dropdown is-pulled-right is-right is-hoverable">
                        <div className="dropdown-trigger">
                            
                            <b> <i style={{fontSize:"1.5rem"}} className="fas fa-ellipsis-h"></i> </b>
                        </div>
                        <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                            <div className="dropdown-content">
                                <span className="dropdown-item">
                                    Edit Pree
                                </span>
                                <span className="dropdown-item">
                                    Delete Pree
                                </span>

                                <span className="dropdown-item">
                                    Hide Pree
                                </span>
                                <span className="dropdown-item">
                                    Report Pree
                                </span>
                                <span className="dropdown-item">
                                    Add to Favourites
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="pree-item card">
                <article>
                    
                    <div className="message">
                        <PreeHeader aPree={aPree} imgView={imgView}/>
                        <PreeBody aPree={aPree} clickable={clickable} />
                    </div>
                    
                </article>  
                <PreeReaction setWanted={setWanted} setModalOpen={setModalOpen} aPree={aPree} showComments={showComments} clickable={clickable}/>
            </div>
            <br/>
        </div>
    )
}
export default withContext(PreeItem);