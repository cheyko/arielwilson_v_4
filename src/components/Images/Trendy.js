import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import TrendyList from "./TrendyList";
import TrendyUpload from "./TrendyUpload";
import "./index";

const Trendy = props => {

    const [view, setView] = useState("main");

    //const accessLevel = props.context.user.accessLevel;

    var placeholders = [
        {id : 0 , text : "test 0"},
        {id : 1 , text : "test 1"},
        {id : 2 , text : "test 2"},
        {id : 3 , text : "test 3"},
        {id : 4 , text : "test 4"},
        {id : 5 , text : "test 5"},
    ];

    var settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 1500,
    };

    let navigate = useNavigate();

    useEffect( () => {
        window.scroll(0,0);
    },[]);

    return(
        <div className="hero">
            <div className="hero-contain">
                <section className="page-header">
                    <div className="container">
                        <div className="container page-header has-text-centered">
                            <button className="button is-small is-pulled-left is-info" onClick={e => view === "main" ? navigate(-1) : setView("main") }> <i className="fas fa-arrow-circle-left"></i> &nbsp; Return </button>
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
                                            <span className="button dropdown-item" onClick={e => setView("upload")}>
                                                Upload Media 
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("resource")}>
                                                View Recent 
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("important")}>
                                                View Playlist  
                                            </span>
                                            <span className="button dropdown-item" onClick={e => setView("live")}>
                                                Settings
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="media is-fullwidth">
                                <div className="content is-fullwidth">
                                    <b className="title reaction-btn subpage-title" onClick={e => setView("main")}> 
                                        <i className="fas fa-scroll"></i> 
                                            {" "}TRENDY INFLUENCE{" "}
                                        <i className="fas fa-camera-retro"></i> 
                                    </b>

                                </div>
                            </div>
                           
                            {view === "main" && 
                                <div>
                                    <span>
                                        View Influencial and Exclusive Prees on TRENDY INFLUENCE. Subscribe, Purchase or Freely View
                                        Quotes & Images from the World's Finest.
                                    </span>
                                    <div className="card-image">
                                        <figure className="image is-3by1">
                                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                        </figure>
                                    </div>  
                                </div>           
                            }
                        </div>
                        {view === "main" && 
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
                                <div className="slick-wrapper hero-body">
                                    <div className="card reaction-btn">
                                        <div className="container has-text-centered"><span className="has-text-link" onClick={e => setView("stereolist")}> <b> Explore more on Stereo </b></span></div>
                                        <Slider {...settings}>
                                            {placeholders.map((aSpot, index) => (
                                                <div key={index} className="slick-slide">
                                                    <h3> {aSpot.text} </h3>
                                                </div>
                                            ))}
                                        </Slider>
                                    </div>
                                </div>
                            </div>
                        }
                    </div>

                </section>
                <div className="page-body">
                    {view === "main" &&
                        <div className="main">
                            <section id="sliced-list" className="content section">
                                <h1>List</h1>
                            </section>
                            <section id="subscribe-ads" className="content section">
                                <h1>Subscribe ad</h1>
                            </section>
                            <section id="signup-upload-ads" className="content section">
                                <h1>Upload ad</h1>
                            </section>
                        </div>
                    }   
                    {view === "upload" &&
                        <div className="container">
                            <TrendyUpload />
                            {/*accessLevel === 1 ? (
                               <StereoUpload />
                            ):(
                              <h1>UPLOAD AD</h1>  
                            )*/}
                        </div>
                    }
                    {view === "stereolist" &&
                        <div className="container">
                             
                            <TrendyList />
                        </div>
                    }
                </div>
                <br />
                <footer className="footer">
                    <h1>Footer</h1>
                </footer>
            </div>
        </div>
    )
}
export default withContext(Trendy);