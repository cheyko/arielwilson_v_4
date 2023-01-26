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

    /*var placeholders = [
        {id : 0 , text : "test 0"},
        {id : 1 , text : "test 1"},
        {id : 2 , text : "test 2"},
        {id : 3 , text : "test 3"},
        {id : 4 , text : "test 4"},
        {id : 5 , text : "test 5"},
    ]

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };*/

    const [checkwg, setCheckWG] = useState("");
    const [flashMsg, setFlashMsg] = useState("");
    const [userlist, setUserList] = useState([]);
    const [portfoliolist, setPortfolioList] = useState([]);
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
                setUserList(Array.from(search.data.userlist));
                props.context.listSave(Array.from(search.data.userlist),"userlist");
                console.log("userlist");
            }
            if (search.data.portfoliolist){
                setPortfolioList(Array.from(search.data.portfoliolist));
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

    /*const settingsThumbs = {
        speed: 1000,
        slidesToShow: 1,
        infinite: false,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        centerMode: true,
        responsive:[
          {
            breakpoint: 480,
            settings: {
                slidesToShow: 1,
            }
          },
          {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
            }
          },
          {
            breakpoint: 1025,
            settings: {
                slidesToShow: 3,
            }
          }
        ]
    };*/

    
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
                            </div>
                            /*<PagesSearch setView={setView} />*/
                        }
                        {/*view === "results" &&
                            <Results checkwg={checkwg} setCheckWG={setCheckWG} setView={setView} userlist={userlist} />
                    */}
                    </div>
                    <hr />
                </div>
            </div>
        </div>
    )
}

export default withContext(Specials);