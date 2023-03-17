import React, { useState } from "react"; 
import withContext from "../../../withContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//import axios from "axios";
import ViewUser from "../../ViewUser";
import {Link} from 'react-router-dom';

//****** Try to maintian the search results after a search result is clicked so on return search results will be present. *********
const Results = props => {

    const {userlist} = props;

    const [userIndex, setUserIndex] = useState(0);

    const handleNav = (option) => {
        if(option === "prevUser" && userIndex !== 0){
            setUserIndex(userIndex - 1);
        }else if(option === "nextUser" && userIndex !== (userlist.length - 1)){
            setUserIndex(userIndex + 1);
        }
    }

   /* var placeholders = [
        {id : 0 , text : "test 0"},
        {id : 1 , text : "test 1"},
        {id : 2 , text : "test 2"},
        {id : 3 , text : "test 3"},
        {id : 4 , text : "test 4"},
        {id : 5 , text : "test 5"},
    ]*/

    /*var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
    };
*/  
    console.log(userlist);
    return(
        <div className="hero">
            {userlist && userlist.length > 0 &&
                <div className="box">
                    <div className="search-content content"> 
                        <h1> Users </h1>
                        <div className="columns is-mobile">
                            <div className="column">
                                <button id="prev-user" className="button is-primary" onClick={ e => handleNav("prevUser")}><i className="fas fa-arrow-circle-left"></i></button>
                            </div>
                            <div className="column">
                                <button id="next-user" className="button is-primary" onClick={ e => handleNav("nextUser")}><i className="fas fa-arrow-circle-right"></i></button>
                            </div>
                        </div>
                        <div key={userIndex} className="custom-slide">
                            <ViewUser 
                                key={userIndex}
                                user={userlist[userIndex]}
                            />
                        </div>
                        <br /> 
                        <Link to='/view-user-list/0/search'> <button className="button is-link is-rounded is-small"> ... View All </button> </Link>
                    </div>
                </div>
            }
            
            <br />

            <div className="box">
                <div className="search-content content"> 
                    <h1> Portfolios </h1>
                    {/*<div className="box">
                        <div className="slick-wrapper has-text-centered">
                            <Slider {...settings}>
                                {placeholders.map((aSpot, index) => (
                                    <div key={index} className="slick-slide">
                                        <h3> {aSpot.text} </h3>
                                    </div>
                                ))}
                            </Slider>
                        </div>
                                </div>*/}
                </div>
            </div>
            
            <br />

            <div className="box">
                <div className="search-content content"> 
                    <h1> Preepedia </h1>
                    {/*<div className="box">
                        <div className="slick-wrapper has-text-centered">
                            <Slider {...settings}>
                                {placeholders.map((aSpot, index) => (
                                    <div key={index} className="slick-slide">
                                        <h3> {aSpot.text} </h3>
                                    </div>
                                ))}
                            </Slider>
                        </div>                           
                                </div>*/}
                </div>
            </div>
            
            <hr />
            
            {/*<div className="tabs">
                <ul>
                    <li className="is-active">
                    <span>
                        <span className="icon is-small"><i className="fas fa-hashtag" aria-hidden="true"></i></span>
                        <span> All </span>
                    </span>
                    </li>
                    <li>
                    <span>
                        <span className="icon is-small"><i className="fas fa-quote-left" aria-hidden="true"></i></span>
                        {" "}
                        <span className="icon is-small"><i className="fas fa-quote-right" aria-hidden="true"></i></span>
                        <span> Quotes </span>
                    </span>
                    </li>
                    <li>
                    <span>
                        <span className="icon is-small"><i className="fas fa-image" aria-hidden="true"></i></span>
                        <span> Images </span>
                    </span>
                    </li>
                    <li>
                    <span>
                        <span className="icon is-small"><i className="fas fa-microphone" aria-hidden="true"></i></span>
                        <span> Audios </span>
                    </span>
                    </li>
                    <li>
                    <span>
                        <span className="icon is-small"><i className="fas fa-video" aria-hidden="true"></i></span>
                        <span> Videos </span>
                    </span>
                    </li>
                    <li>
                    <span>
                        <span className="icon is-small"><i className="far fa-grin-stars" aria-hidden="true"></i></span>
                        <span> WG-EXCLUSIVE </span>
                    </span>
                    </li>
                </ul>
                            </div>*/}
            <div className="search-result-div">
                <h1> Search Results </h1>
            </div>
        </div>

    )
}

export default withContext(Results);