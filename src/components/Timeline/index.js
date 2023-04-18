import React, { useCallback, useEffect, useState } from "react";
import withContext from "../../withContext";
import AddPree from "./AddPree";
import PreeItem from "./PreeItem";
import "./index.css";
import axios from "axios";
import TimelineExclusive from "./TimelineExclusive";
import MarketPree from "./MarketPree";
import ActivityPree from "./ActivityPree";
import EncourageModal from "../HelperComponents/EncourageModal";

const Timeline = props => {
    const [showDropDown, setShowDropDown] = useState(false);
    const [allPrees, renderPrees] = useState([]);
    const [filterText, setFilterText] = useState("all");
    const [loadNew, setLoadNew] = useState(true);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [wanted, setWanted] = useState("");

    const handleScroll = e => {
        // Get the make-pree btn
        let makePree = document.getElementById("make-pree");
        // Get the sort-pree btn
        let filterPrees = document.getElementById("filter-prees");
        
        if (makePree !== null && filterPrees !== null){

            // Get the offset position of the make-pree btn
            let mp_sticky = makePree.offsetTop;

            // Get the offset position of the sort-prees btn
            let sp_sticky = filterPrees.offsetTop;
        
            if (window.pageYOffset > mp_sticky) {
                makePree.classList.add("mp-sticky");
            } else {
                makePree.classList.remove("mp-sticky");
            }

            if (window.pageYOffset > sp_sticky) {
                filterPrees.classList.add("sp-sticky");
            } else {
                filterPrees.classList.remove("sp-sticky");
            }
        }
    }

    const filterPrees = useCallback((prees) => {
        const newDate = new Date();
        var lastday = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let val;
        switch(filterText){
            case 'all':
                renderPrees(prees.sort((a,b) => { return b.pree_id - a.pree_id; }));
                break;
            case 'today':
                const today = new Date().toISOString().split("T")[0];
                var test = prees.filter((aPree) => today === aPree.date_added.split(" ")[0]);
                renderPrees(test);
                break;
            case 'yesterday':
                if ((newDate.getDate() - 1) > 0) {
                    val = new Date(newDate.setDate(newDate.getDate() - 1));
                }else{
                    val = (new Date(newDate.setMonth(newDate.getMonth() - 1)));
                    val.setDate(lastday[newDate.getMonth()]);
                }
                const yesterday = val.toISOString().split("T")[0];
                renderPrees(prees.filter((aPree) => yesterday === aPree.date_added.split(" ")[0]));
                break;
            case 'week':
                if ((newDate.getDate() - 7) > 0) {
                    val = new Date(newDate.setDate(newDate.getDate() - 7));
                }else{
                    val = (new Date(newDate.setMonth(newDate.getMonth() - 1)));
                    val.setDate(lastday[newDate.getMonth()] - (7 - newDate.getDate()));
                }
                const lastweek = val.toISOString().split("T")[0];
                renderPrees(prees.filter((aPree) => lastweek < aPree.date_added.split(" ")[0]));
                break;
            case 'month':
                val = new Date(newDate.setMonth(newDate.getMonth() - 1));
                const lastmonth = val.toISOString().split("T")[0];
                renderPrees(prees.filter((aPree) => lastmonth < aPree.date_added.split(" ")[0]));
                break;
            default:
                break;
        }
        setShowDropDown(!showDropDown);
    },[filterText,showDropDown]);

    const gototop = () => {
        window.scrollTo(0, 0);
    }

    const doFilter = () => {
        if(!showDropDown){
            document.getElementById("filter-prees").classList.add("is-active");
        }else{
            document.getElementById("filter-prees").classList.remove("is-active");
        }
        setShowDropDown(!showDropDown);
    }

    useEffect( () => {
        window.addEventListener('scroll', e => handleScroll(e));
        const token = props.context.token ? props.context.token : 0;
        if(loadNew && props.context.prees){
            filterPrees(props.context.prees);
            setLoadNew(false);
        }else if(loadNew && props.context.prees === null){
            console.log("test here");
            axios.post(`${process.env.REACT_APP_PROXY}/api/see-the-pree`,{token}).then(
                result => {
                    //renderPrees(result.data);
                    filterPrees(result.data);
                    setLoadNew(false);
                }
            );
        }
        window.scrollTo(0,localStorage.getItem("offset"));

    },[filterPrees, props.context.prees, loadNew]);

    let timeline;
    if(allPrees.length > 0){
        timeline = allPrees.map((aPree,index) => {
            if(aPree.pree_type === 'exclusive'){
                return <TimelineExclusive aPree={aPree} key={index}  />
            }else if(aPree.pree_type === 'product' || aPree.pree_type === 'listing' || aPree.pree_type === 'service' || aPree.pree_type === 'vehicle' || aPree.pree_type === 'item'){
                return <MarketPree aPree={aPree} key={index} index={index}  />
            }else if(aPree.pree_type === 'poll' || aPree.pree_type === 'event' || aPree.pree_type === 'classified' || aPree.pree_type === 'volunteer'){
                return <ActivityPree aPree={aPree} key={index} index={index}  />
            }else{
                return <PreeItem aPree={aPree} key={index} showComments={false} clickable={"expand"} />
            }
        })
    }

    return (
        <div id="timeline-div" className="hero">  
            <EncourageModal wanted={wanted}  modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
            <div className="hero-container">
                <div className="box timeline-container live-prees">
                    <div className="columns is-mobile p-0 m-0">    
                        {[0,1,2,3,4,5,6,7,8,9,10,11].map( (item,index) => (
                            <div key={index} className="column px-0 py-1 mx-1 my-1">
                                <span className="image is-64x64">
                                    <img className="is-rounded" alt="display" src={process.env.PUBLIC_URL + "/images/default-dp.jpeg"} />
                                </span>
                            </div>
                        ))}                             
                    </div>
                </div>

                <br />
                
                <div className="timeline-container">
                    <AddPree setWanted={setWanted} setModalOpen={setModalOpen} setLoadNew={setLoadNew} renderPrees={renderPrees} preetype={"individual"}/>
                </div>

                <div id="make-pree" className="hero">
                    <button id="make-pree-btn" onClick={gototop} className="button is-pulled-right">
                        <span className="large-text"> Y Pree </span>
                        <span className="icon is-large">
                            <i className="fas fa-angle-up" aria-hidden="true"></i>
                        </span>
                    </button>
                </div>
            </div>
            
            <div className="timeline-box">
            
                <hr className="h-line" />

                <span onLoad={e => {console.log("load")}}> Checkboxes </span>
                
                <div id="filter-prees" className={`dropdown is-right is-pulled-right`} >
                    <div className="dropdown-trigger">
                        <button id="filter-pree-btn"  onClick={ e => doFilter()} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span className="large-text"> Filter </span>
                            <span className="icon is-large">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            <span className="large-text"><small style={{color:"blue"}}>{filterText}</small></span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <span onClick={e => {setFilterText('all');setLoadNew(true);}} className="dropdown-item large-text">
                                All Prees
                            </span>
                            <span onClick={e => {setFilterText('today');setLoadNew(true)}} className="dropdown-item large-text">
                                Today Prees (Most)
                            </span>
                            <span onClick={e => {setFilterText('yesterday');setLoadNew(true);}} className="dropdown-item large-text">
                                Yesterday Prees (Most)
                            </span>
                            <span onClick={e => {setFilterText('week');setLoadNew(true)}} className="dropdown-item large-text">
                                This Week Prees (Top)
                            </span>
                            <span onClick={e => {setFilterText('month');setLoadNew(true)}} className="dropdown-item large-text">
                                This Month Prees (Top)
                            </span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div>
                {allPrees && (allPrees.length > 0) ? (    
                    timeline.map((element, index) => (
                        <div key={index} onClick={ e => localStorage.setItem("offset", window.pageYOffset)}>
                            {element}
                        </div>
                    )) 
                    
                ) : (
                    <>
                        {loadNew ?
                            <div className="container" style={{ padding:"3rem"}}>
                                <div className="loading"></div>
                            </div>:
                            <div className="container" style={{ padding:"3rem"}}>
                                <span className="is-size-3" style={{color:"blue"}}>
                                    Follow Figures, Make Prees and see 'WAH REALLY A GWAAN' for 
                                    {" "}{filterText === 'week' || filterText === 'month' ? 'Last' + filterText : filterText}.
                                </span>
                            </div>
                        }
                    </>
                )}
            </div>
            
        </div>
    )
}

export default withContext(Timeline);