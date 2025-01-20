import React from "react";
import withContext from "../../../withContext";
import {Link} from "react-router-dom";

//////// Specials Menu /////////

const Menu = props => {

    return (
        <div className="hero">
            <div className="hero-body">
                <div className="search-header">
                    <div className="has-text-centered">
                        <h1 className="subtitle"><b>SPECIALS</b></h1>
                    </div>
                    <div className="card">
                        <div className="card-content">  
                            <div className="columns">                                 
                                <div className="column">
                                    <input onChange={ e => props.handleChange(e)} className="input" placeholder="FIND SPECI@L" type="text" name="checkwg" />
                                </div>
                                <div className="column is-one-fifth">
                                    <button onClick={e => props.doSearch(e)} className="button is-normal">
                                        <span className="icon">
                                        <i className="fas fa-search"></i>
                                        </span>
                                        <span>Search</span>
                                    </button>
                                </div>
                            </div> 
                        </div>
                    </div>
                    
                    <hr />
                </div>

                 
                <div className="search-menu columns is-multiline">
                <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                    <div className="box reaction-btn" onClick={e => props.setView("syllabus")}>
                        <div className="card-image">
                            <figure className="image is-5by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                            </figure>
                        </div>
                        <div className="card-content">
                            <div className="content">
                                <b>
                                    <i className="fas fa-book"></i> Syllabus
                                </b>
                                <p>
                                    Online Courses; Look, Listen, Learn and take No more 'L's in Life (). 
                                </p>
                            </div>
                        </div>

                    </div>

                </div>
               
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box reaction-btn" onClick={e => props.setView("gameheart")}>
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        <i className="fas fa-game-console"></i> GamHeart
                                    </b>
                                    <p>
                                        Maximum Games and Maximum Fun.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        
                        <div className="box reaction-btn" onClick={e => props.setView("fortune1")}>
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        <i className="fas fa-slot-machine"></i> Fortune-1
                                    </b>
                                    <p>
                                        Your spot for Online winnings.
                                    </p>
                                </div>
                            </div>

                        </div>
                        

                    </div>
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box reaction-btn" onClick={e => props.setView("sentiments")}>
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        <i className="fa-solid fa-people"></i> Sentiments
                                    </b>
                                    <p>
                                        The Set Match; The ideal intersection makes the perfect union. 
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box reaction-btn" onClick={e => props.setView("befitting")}>
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        <i className="fa-solid fa-dumbbell"></i> BeFitting
                                    </b>
                                    <p>
                                        Your Wealth is Your Heath; Surely. 
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box reaction-btn" onClick={e => props.setView("pill")}>
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        <i className="fa-solid fa-books-medical"></i> Peace.In.Living.Life (PILL)
                                    </b>
                                    <p>
                                        Live In Peace; Life Stories, Counselling, Motivational Content and the Best Mental Health Platform. 
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                {/*
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box">
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        Pree Search
                                    </b>
                                    <p>
                                        Find the Post you are looking for.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box">
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        WGR Search
                                    </b>
                                    <p>
                                        Search through Live, News, Sports, Weather, etc.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box">
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        Web Search
                                    </b>
                                    <p>
                                        This is a test description
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                */}
                </div>

            </div>
        </div>
    )
}
export default withContext(Menu);