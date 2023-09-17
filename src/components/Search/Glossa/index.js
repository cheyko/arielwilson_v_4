import React, { useEffect, useState } from "react";
import withContext from "../../../withContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import CreatePedia from "./CreateGlossa";
import PagesList from "./PagesList";

const Preepedia = props => {

    const [view, setView] = useState("home")
    var placeholders = [
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
    };

    let navigate = useNavigate();

    useEffect( () => {
        window.scroll(0,0);
    });

    return(
        <div className="hero">
            <div className="hero-content">
                <div className="hero-contain">
                    <div className="container">
                        <div className="has-text-centered">
                            <button className="button is-small is-pulled-left is-info" onClick={e => view === "home" ? navigate(-1) : setView("home") }> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
                            <div className="is-pulled-right"> 
                                <div className="dropdown is-right is-hoverable">
                                    <div className="dropdown-trigger">
                                        <button className="button is-small is-info" aria-haspopup="true" aria-controls="dropdown-menu3">
                                            <span className="icon is-small">
                                                <b> <i className="fas fa-bars"></i> </b>
                                            </span>
                                            <span>Options</span>
                                        </button>
                                    </div>
                                    <div className="dropdown-menu" id="dropdown-menu3" role="menu">
                                        <div className="dropdown-content" style={{padding:0}}>
                                            <span className="button dropdown-item" onClick={e => setView("create")}>
                                                Create Page
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("resource")}>
                                                Add Resource 
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("importance")}>
                                                View Importance  
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="media is-fullwidth">
                                <div className="content is-fullwidth">
                                    <b className="title reaction-btn subpage-title" onClick={e => setView("home")}> <i className="fas fa-book"></i> Glossa </b>

                                </div>
                            </div>
                            {view === "home" && 
                                <div>
                                    <span>
                                        Browse a vast set of information; Read Preepedia Pages to aquire
                                        knowledge in various fields of life.
                                    </span>
                                    <div className="card-image">
                                        <figure className="image is-3by1">
                                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                        </figure>
                                    </div>  
                                </div>           
                            }
                        </div>
                        {view === "home" && 
                            <div className="home-content">
                                <br />
                                <div className="container">
                                    <div className="box">
                                        <div className="field has-addons">
                                            <div className="control has-icons-right is-fullwidth">
                                                <input className="input" placeholder="Search Preepedia" type="text" name="checkprp" />
                                                <span className="icon is-medium is-right">
                                                    <i className="fas fa-search"></i>
                                                </span>
                                                
                                            </div>
                                            <div className="control">
                                                <button type="submit" className="button is-link is-rounded is-focused"> Search </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <br />
                                <div className="slick-wrapper">
                                    <div className="card reaction-btn">
                                        <div className="container has-text-centered"><span> <b> View All Pages </b></span></div>
                                        <Slider {...settings}>
                                            {placeholders.map((aSpot, index) => (
                                                <div onClick={e => setView("pageslist")} key={index} className="slick-slide">
                                                    <h3> {aSpot.text} </h3>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        }
                        {view === "create" &&
                            <div className="container">
                                <br />
                                <CreatePedia />
                            </div>
                        }
                        {view === "pageslist" &&
                            <div className="container">
                                <PagesList />
                            </div>
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
export default withContext(Preepedia);