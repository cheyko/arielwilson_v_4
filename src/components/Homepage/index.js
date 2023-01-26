import React, { useEffect } from "react";
import withContext from "../../withContext";
import { Redirect } from "react-router-dom";

import Login from "./Login";
import Signup from "./Signup";


const LeftContainer = () => {

    useEffect( ( ) => {
        window.scroll(0,0);
    });
    return(
        <div className="hero">
            <section className="card">
                <figure className="image is-4by3">
                    <img src={process.env.PUBLIC_URL + "/images/homepage/first_image.png"} alt="WAH GWAAN" />
                </figure>
            </section>

            <section className="section content">
                <ul className="cloud-text">
                    <li>
                        The Ultimate Social Media; Offering a very Controlled, Safe and Friendly Environment.
                    </li>
                    <br />
                    <li>
                        The Most Secure and Reliable Digital Billfold/Purse to exchange 'MONEY' along with the Most Convenient Trading Platform. 
                    </li>
                    <br />
                    <li>
                        A Plethora of Postings; Events, Jobs, Bookings, Schedules and Much More.
                    </li>
                </ul>
            </section>

            <section className="card">
                <figure className="image is-4by3" style={{height:"100%"}}>
                    <img src={process.env.PUBLIC_URL + "/images/homepage/3rd_image.png"} alt="WAH GWAAN has a Spot for You." />
                </figure>
            </section>

            <section className="section content">
                <ul className="cloud-text">
                    <li>
                        Many Categories of Social Happenings.
                    </li>
                    <br />
                    <li>
                        Connect With Loved Ones, Friends, Family, Groups, Colleagues and Members of your "FRAT".  
                    </li>
                    <br />
                    <li>
                        Live Events; Personal, Commercial, Social and Ritual. 
                    </li>
                </ul>
            </section>

            <section className="card">
                <figure className="image is-4by3">
                    <img src={process.env.PUBLIC_URL + "/images/homepage/Everybody.png"} alt="It's For Everybody." />
                </figure>
            </section>
        </div>
    )
} 

const RightContainer = () => {

    return(
        <div className="hero">
            <section className="card">
                <figure className="image is-4by3">
                    <img src={process.env.PUBLIC_URL + "/images/homepage/2nd_image.png"} alt="Sign-Up Today, Experience it All." />
                </figure>
            </section>

            <section className="section content">
                <ul className="cloud-text">
                    <li>
                        Search W@H GW@@N for People, Places, Things, Information, Data, Reports, Statistics, etc.
                    </li>
                    <br />
                    <li>
                        Many Special Features such as; Courses, Arcade, Gambling[18+], Dating[18+], Fitness-Platform + Spiritual Well-Being)
                    </li>
                    <br />
                    <li>
                        Everything in one place, It is made for your Convenience.
                    </li>
                    
                </ul>
        
            </section>

            <section className="card">
                <figure className="image is-4by3" style={{height:"100%"}}>
                    <img src={process.env.PUBLIC_URL + "/images/homepage/4th_image.png"} alt="Vast MarketPlace" />
                </figure>
            </section>

            <section className="section content">
                <ul className="cloud-text">
                    <li>
                       The Best Censored and Safe Content.
                    </li>
                    <br />
                    <li>
                        A Marketplace filled with Products, Services, Food & Beverage, Real Estate and Vehicles.
                    </li>
                    <br />
                    <li>
                        News, Sports, Weather, Business, Entertainment, Culture and More.
                    </li>
                </ul>
           
        </section>
    
        <section className="card">
            <figure className="image is-4by3">
                <img src={process.env.PUBLIC_URL + "/images/homepage/Final_image.png"} alt="It's Everything, Literally" />
            </figure>
        </section>
    </div>
 
    )
} 

const Homepage = props => {
    return (
        !props.context.user ? (
        <div className="hero">
            <div>
                <div className="columns">
                    <div className="intro-div column no-padding is-one-third">

                        <div className="box section no-margin top-section">
                            <h1 className="title"> W@H GW@@N </h1>
                            <h3 className="subtitle"> It’s <b>Absolute</b>, <b>Limitless</b>, made with <b>Love</b>. It’s Everything, it’s <b>A-L-L</b> you need in a Single Platform.  </h3>
                        </div>

                        <div className="left-container">
                            <LeftContainer />
                        </div>
                    </div>
                    <div className="auth-div column no-padding is-one-third">
                        <div className="mid-container">
                            <div className="container">
                                <Login />
                                <hr style={{margin:"0.5rem"}}/>
                                <Signup />
                            </div>
                            <footer className="homepage-footer">
                                <small> - What do we call an <b className="special-text">Attaché</b> ?</small> <br />
                                <small> - View our <b className="special-text">Terms and Agreement</b>.</small> <br />
                                <small> - Some profit proceeds of W@H GW@@N will go to the <b className="special-text">U.W.I.A Fund</b>.</small> <br />
                            </footer>
                        </div>
                    </div>
                    <div className="features-snippet-div column no-padding is-one-third">
                        <div className="box section no-margin top-section">
                            <h3 className="subtitle"> Never miss a Beat, The Best Marketplace, Great Social Environment and, an Unlimited Experience. <b style={{color:"royalblue"}}>It's W@H GW@@N</b>.</h3>
                        </div>
                        <div className="left-container-copy">
                            <LeftContainer />
                            <hr />
                        </div>
                        <div className="right-container">
                            <RightContainer />
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
    ) : (
            <Redirect to="/" />
        )
    )
}

export default withContext(Homepage);