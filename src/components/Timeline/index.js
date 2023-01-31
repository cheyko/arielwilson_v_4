import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import AddPree from "./AddPree";
import PreeItem from "./PreeItem";
import "./index.css";
import axios, { all } from "axios";
import TimelineExclusive from "./TimelineExclusive";

const Timeline = props => {

    /*const allPrees = props.context.prees.sort((a,b) => {
        return a.pree_id - b.pree_id;
    });*/

    const loadPrees = props.context.prees ? props.context.prees : [];
    //console.log(loadPrees);
    const [showDropDown, setShowDropDown] = useState(false);
    const [allPrees, renderPrees] = useState(loadPrees);
    const [filterText, setFilterText] = useState("all");

    const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);

    //console.log(loadPrees);
    
    useEffect( () => {
        window.addEventListener('scroll', e => handleScroll(e));
        if (!gotMedia){
            loadMainMedia();
        } 
        
        if(allPrees.length === 0){
            document.getElementById("app-container").style.height = "100vh";
        }else{
            document.getElementById("app-container").style.height = "auto";
        }

        //sortPrees();
        //get reactions to prees --> getlist of prees ids from from allPrees = (param) ?
    },[allPrees]);

    const loadMainMedia = async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
        /************* */
        ///use the loadmainmedia from navbar
        const user_id = props.context.user ? props.context.user.id : 0;
        if(user_id > 0){
            const response = await axios.post('/api/get-main-media',{user_id}).then(
                (response) => {
                    if (response.status === 200){
                        if (response.data.has_dp === true){
                            setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + user_id);
                        }else{
                            setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
                        }
                    }
                }
            )
        }
        return true;
    }

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

    const filterPrees = (e,order) => {
        const newDate = new Date();
        var lastday = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        let val;
        switch(order){
            case 'all':
                setFilterText("all");
                renderPrees(loadPrees.sort((a,b) => { return b.pree_id - a.pree_id; }));
                break;
            case 'today':
                const today = new Date().toISOString().split("T")[0];
                setFilterText("today");
                renderPrees(loadPrees.filter((aPree) => today === aPree.date_added.split(" ")[0]));
                break;
            case 'yesterday':
                val = (newDate.getDate() - 1) > 0 ? new Date(newDate.setDate(newDate.getDate() - 1)) : new Date(newDate.setMonth(newDate.getMonth() - 1)).setDate(lastday[newDate.getMonth() - 1])
                const yesterday = val.toISOString().split("T")[0];
                setFilterText("yesterday");
                renderPrees(loadPrees.filter((aPree) => yesterday === aPree.date_added.split(" ")[0]));
                break;
            case 'week':
                val = (newDate.getDate() - 7) > 0 ? new Date(newDate.setDate(newDate.getDate() - 7)) : new Date(newDate.setMonth(newDate.getMonth() - 1)).setDate((lastday[newDate.getMonth() - 1]) + (newDate.getDate() - 7))
                const lastweek = val.toISOString().split("T")[0];
                setFilterText("lastweek");
                renderPrees(loadPrees.filter((aPree) => lastweek < aPree.date_added.split(" ")[0]));
                break;
            case 'month':
                val = new Date(newDate.setMonth(newDate.getMonth() - 1));
                const lastmonth = val.toISOString().split("T")[0];
                setFilterText("lastmonth");
                renderPrees(loadPrees.filter((aPree) => lastmonth < aPree.date_added.split(" ")[0]));
                break;
            default:
                break;
        }
        setShowDropDown(!showDropDown);
    }

    const gototop = () => {
        window.scrollTo(0, 0);
    }

    return (
        <div id="timeline-div" className="hero">
            <div className="hero-container">
                <div className="box timeline-container">
                    <div className="columns live-dps is-mobile">    
                        {[0,1,2,3,4,5,6,7,8,9,10,11].map( (item,index) => (
                            <div key={index} className="a-live">
                                <figure className="display-pic image is-128x128">
                                    <img className="is-rounded" alt="display" src={process.env.PUBLIC_URL + "/images/default-dp.jpeg"} />
                                </figure>
                            </div>
                        ))}                             
                    </div>
                </div>

                <br />
                
                <div className="timeline-container">
                    <AddPree imgView={imgView} renderPrees={renderPrees} preetype={"individual"}/>
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

                <span> Checkboxes </span>
                
                <div id="filter-prees" className={`dropdown is-right is-pulled-right ${showDropDown ? "is-active" : ""}`} >
                    <div className="dropdown-trigger">
                        <button id="filter-pree-btn"  onClick={ e => setShowDropDown(!showDropDown)} className="button" aria-haspopup="true" aria-controls="dropdown-menu">
                            <span className="large-text"> Filter </span>
                            <span className="icon is-large">
                                <i className="fas fa-angle-down" aria-hidden="true"></i>
                            </span>
                            <span className="large-text"><small style={{color:"blue"}}>{filterText}</small></span>
                        </button>
                    </div>
                    <div className="dropdown-menu" id="dropdown-menu" role="menu">
                        <div className="dropdown-content">
                            <span onClick={e => filterPrees(e,'all')} className="dropdown-item large-text">
                                All Prees
                            </span>
                            <span onClick={e => filterPrees(e,'today')} className="dropdown-item large-text">
                                Today Prees (Most)
                            </span>
                            <span onClick={e => filterPrees(e,'yesterday')} className="dropdown-item large-text">
                                Yesterday Prees (Most)
                            </span>
                            <span onClick={e => filterPrees(e,'week')} className="dropdown-item large-text">
                                This Week Prees (Top)
                            </span>
                            <span onClick={e => filterPrees(e,'month')} className="dropdown-item large-text">
                                This Month Prees (Top)
                            </span>
                        </div>
                    </div>
                </div>
                
            </div>
            <div>
                {allPrees && allPrees.length > 0 ? (
                    allPrees.map((aPree, index) => (
                        <div key={index}>
                            {aPree.pree_type !== 'exclusive' ? (
                                <PreeItem
                                    aPree={aPree}
                                    key={index}
                                    showComments={false}
                                    clickable={"expand"}
                                />
                            ):(
                                <TimelineExclusive aPree={aPree} key={index}  />
                            )}
                        </div>
                    )) 
                ) : (
                    <div className="container">
                        <span className="is-size-3" style={{color:"blue"}}>
                            Follow Figures, Make Prees and see 'WAH REALLY A GWAAN'
                        </span>
                    </div>
                )}
            </div>
            
        </div>
    )
}

export default withContext(Timeline);