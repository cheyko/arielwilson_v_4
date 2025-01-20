import React from "react";
import withContext from "../../../withContext";
import {Link} from "react-router-dom";

//////// Search Menu /////////

const Menu = props => {

    return (
        <div className="hero">
            <div className="container">
                <div className="search-menu columns is-multiline is-mobile">
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
                                        Exclusives Search
                                    </b>
                                    <p>
                                        This is a test description.
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <Link to="/glossa">
                            <div className="box reaction-btn">
                                <div className="card-image">
                                    <figure className="image is-5by3">
                                        <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        <b>
                                            <i className="fas fa-book"></i> Glossa
                                        </b>
                                        <p>
                                            Your Online Info Bank
                                        </p>
                                    </div>
                                </div>

                            </div>
                        </Link>

                    </div>
                    <div className="column is-full-mobile is-half-tablet is-one-third-desktop">
                        <div className="box reaction-btn" onClick={e => props.setView("pages")}>
                            <div className="card-image">
                                <figure className="image is-5by3">
                                    <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder"/>
                                </figure>
                            </div>
                            <div className="card-content">
                                <div className="content">
                                    <b>
                                        <i className="fas fa-id-card"></i> Index
                                    </b>
                                    <p>
                                        Sort through different pages of users, groups, businesses, etc.
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
                </div>

            </div>
        </div>
    )
}
export default withContext(Menu);