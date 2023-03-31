import React, { useState } from "react";
import "./index.css";
import withContext from "../../withContext";
//import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
//import ViewUser from "../ViewUser";
//import {Link} from 'react-router-dom';
//import Results from "./Results";
import Menu from "./Menu";
//import Preepedia from "./Preepedia";
//import PagesSearch from "./PagesSearch";

//****** Try to maintian the search results after a search result is clicked so on return search results will be present. *********
const Specials = props => {

    const [checkwg, setCheckWG] = useState("");
    const [flashMsg, setFlashMsg] = useState("");
    //const [userlist, setUserList] = useState([]);
    //const [portfoliolist, setPortfolioList] = useState([]);
    const [view, setView] = useState("menu");

    // remember to slice all list from search to 6 items with the 7th being view more.

    const handleChange = (e) => {
        e.preventDefault();
        setCheckWG(e.target.value);
    }

    const doSearch = async (e) => {
        setView("results")
        e.preventDefault();

        const search = await axios.post('/api/do-search',{checkwg}).catch(
            (search) => {
                if (search.status !== 200){ 
                    setFlashMsg("No results from search");
                    return false;
                } 
            }
        )

        // have a main page func that saves all list; takes as params a list and a option
        if (search.status === 200){
            if (search.data.userlist){
                //setUserList(Array.from(search.data.userlist));
                props.context.listSave(Array.from(search.data.userlist),"userlist");
                console.log("userlist");
            }
            if (search.data.portfoliolist){
                //setPortfolioList(Array.from(search.data.portfoliolist));
                console.log("portfolios");
            }
            if (search.data.preepedialist){
                console.log("preepedia");
            }
            if (search.data.crawllist){
                console.log("crawllist");
            }
        }   


        
    }
    
    return(
        <div className="hero">
            <div className="container">
                <div className="has-text-centered">

                    <div className="search-options">
                        {view === "menu" &&
                            <Menu view={view} setView={setView} handleChange={handleChange} doSearch={doSearch} />
                        }
                        {view === "sentiments" &&
                            <div className="hero-body">
                                <br/>
                                <h1>Sentiments</h1>
                                {flashMsg}
                            </div>
                        }
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default withContext(Specials);