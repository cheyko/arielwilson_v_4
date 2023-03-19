import React, { useEffect, useState } from "react";
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

    /*const allPrees = props.context.prees.sort((a,b) => {
        return a.pree_id - b.pree_id;
    });*/
    //console.log(props.context.user);
    const [user, setUser] = useState(props.context.user);
    //const loadPrees = props.context.prees ? props.context.prees : [];
    //console.log(loadPrees);
    //const loadPrees = axios.post("/api/see-the-pree",{user_id})
    const [showDropDown, setShowDropDown] = useState(false);
    const [allPrees, renderPrees] = useState([]);
    const [filterText, setFilterText] = useState("all");
    const [loadNew, setLoadNew] = useState(true);
    const [modalIsOpen, setModalOpen] = useState(false);
    const [wanted, setWanted] = useState("");
    
    /*const [gotMedia, setGetMedia] = useState(false);
    const [imgView, setImgView] = useState(null);*/

    //console.log(loadPrees);
    
    /*const loadMainMedia = useCallback( async() => {
        //check if cv and dp is available (database check):
        //if true => set imgView and vidView to files that are in bio folder
        //if false load a placeholder image and placeholder video
    
        ///use the loadmainmedia from navbar
        const user_id = props.context.user ? props.context.user.id : 0;
        if(user_id > 0){
            await axios.post('/api/get-main-media',{user_id}).then(
                (response) => {
                    if (response.status === 200){
                        if (response.data.has_dp === true){
                            setImgView(process.env.PUBLIC_URL + "/images/bio/display/" + user_id);
                        }else{
                            setImgView(process.env.PUBLIC_URL + "/images/bio/display/default.jpeg");
                        }
                        setGetMedia(true);
                    }
                }
            )
        }
        return true;
    },[props.context.user]);*/

    const handleScroll = e => {
        //let page = document.getElementById("app-container");
        // Get the make-pree btn
        let makePree = document.getElementById("make-pree");
        // Get the sort-pree btn
        let filterPrees = document.getElementById("filter-prees");
        
        //console.log(page.pageYOffset);
        //console.log(makePree.offsetTop);
        //console.log(window.pageYOffset);
        
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
                renderPrees(allPrees.sort((a,b) => { return b.pree_id - a.pree_id; }));
                break;
            case 'today':
                const today = new Date().toISOString().split("T")[0];
                setFilterText("today");
                renderPrees(allPrees.filter((aPree) => today === aPree.date_added.split(" ")[0]));
                break;
            case 'yesterday':
                val = (newDate.getDate() - 1) > 0 ? new Date(newDate.setDate(newDate.getDate() - 1)) : new Date(newDate.setMonth(newDate.getMonth() - 1)).setDate(lastday[newDate.getMonth() - 1])
                const yesterday = val.toISOString().split("T")[0];
                setFilterText("yesterday");
                renderPrees(allPrees.filter((aPree) => yesterday === aPree.date_added.split(" ")[0]));
                break;
            case 'week':
                val = (newDate.getDate() - 7) > 0 ? new Date(newDate.setDate(newDate.getDate() - 7)) : new Date(newDate.setMonth(newDate.getMonth() - 1)).setDate((lastday[newDate.getMonth() - 1]) + (newDate.getDate() - 7));
                const lastweek = val.toISOString().split("T")[0];
                setFilterText("lastweek");
                renderPrees(allPrees.filter((aPree) => lastweek < aPree.date_added.split(" ")[0]));
                break;
            case 'month':
                val = new Date(newDate.setMonth(newDate.getMonth() - 1));
                const lastmonth = val.toISOString().split("T")[0];
                setFilterText("lastmonth");
                renderPrees(allPrees.filter((aPree) => lastmonth < aPree.date_added.split(" ")[0]));
                break;
            default:
                break;
        }
        setShowDropDown(!showDropDown);
    }

    const gototop = () => {
        window.scrollTo(0, 0);
    }

    useEffect( () => {
        //document.getElementById("app-container").addEventListener('scroll', e => handleScroll(e));
        window.addEventListener('scroll', e => handleScroll(e));
        /*if (!gotMedia){
            loadMainMedia();
        } */
        
        /*if(allPrees.length === 0){
            document.getElementById("app-container").style.height = "100vh";
        }else{
            document.getElementById("app-container").style.height = "auto";
        }*/

        //sortPrees();
        //get reactions to prees --> getlist of prees ids from from allPrees = (param) ?
        const user_id = props.context.user ? props.context.user.id : 0;
        if(loadNew === true){
            //setUser(props.context.user);
            axios.post("/api/see-the-pree",{user_id}).then(
                result => {
                    renderPrees(result.data);
                    setLoadNew(false);
                }
            ).catch( error => {
                console.log(error);
            });
        }
    },[allPrees, loadNew]);//, gotMedia, loadMainMedia]);

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
    //console.log(user);
    //console.log(props.context.user);
    //console.log(allPrees);
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
                    <AddPree setWanted={setWanted} setModalOpen={setModalOpen} setWa setLoadNew={setLoadNew} renderPrees={renderPrees} preetype={"individual"}/>
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
                {allPrees && (allPrees.length > 0) ? (    
                    timeline.map((element, index) => (
                        <div key={index}>
                            {element}
                        </div>
                    )) 
                    
                ) : (
                    <>
                    {loadNew ? 
                        <div></div>:
                        <div className="container" style={{ padding:"3rem"}}>
                            <span className="is-size-3" style={{color:"blue"}}>
                                Follow Figures, Make Prees and see 'WAH REALLY A GWAAN'
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