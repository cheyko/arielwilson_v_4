import React, {useState} from 'react';
import withContext from '../../withContext';
import './index.css';
import Slider from "react-slick";
import Cash from './Cash';
import Cards from './Cards';
import $ from 'jquery';

const Wallet = props => {
    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
        responsive: [
            {
              breakpoint: 700,
              settings: {
                slidesToShow: 2,
              },
            },
            {
                breakpoint: 400,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const [wView, setView] = useState('cash');
    const [showDropDown, setShowDropDown] = useState(false);
    const [showMore, setShowMore] = useState(false);

    const toggleMenu = (e) => {
        e.preventDefault();
        $(".navbar-burger").toggleClass("is-active");
        $(".navbar-menu").toggleClass("is-active");
    }

    return(
        <div className="hero">
            <nav className="navbar" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <a className="navbar-item">
                        <h1 className="subtitle"><b>WALLET</b></h1>
                    </a>

                    <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample" onClick={ e => toggleMenu(e)}>
                    
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <span aria-hidden="true"></span>
                    <small>sections</small>
                    </a>
                </div>

                <div id="navbarBasicExample" className="navbar-menu">
                    <div className="navbar-start">
                        <div className="buttons">
                            <a className={`navbar-item button ${wView === "cash" ? "is-active" : "is-not-active"}`} onClick={e => {setView("cash");toggleMenu(e);}}>
                                <i className="fas fa-money-bill" aria-hidden="true"></i> &nbsp; CASH
                            </a>

                            <a className={`navbar-item button ${wView === "card" ? "is-active" : "is-not-active"}`} onClick={e => {setView("card");toggleMenu(e);}}>
                                <i className="fas fa-credit-card" aria-hidden="true"></i> &nbsp; CARD
                            </a>

                            <a className={`navbar-item button ${wView === "crypto" ? "is-active" : "is-not-active"}`} onClick={e => {setView("crypto");toggleMenu(e);}}>
                                <i className="fab fa-bitcoin" aria-hidden="true"></i> &nbsp; CRYPTO
                            </a>

                            <a className={`navbar-item button ${wView === "assets" ? "is-active" : "is-not-active"}`} onClick={e => {setView("assets");toggleMenu(e);}}>
                                <i className="fas fa-lock" aria-hidden="true"></i> &nbsp; WG-ASSETS
                            </a>

                            <a className={`navbar-item button ${wView === "forex" ? "is-active" : "is-not-active"}`} onClick={e => {setView("forex");toggleMenu(e);}}>
                                <i className="fas fa-comment-dollar" aria-hidden="true"></i> &nbsp; FOREX
                            </a>

                            <a className={`navbar-item button ${wView === "stocks" ? "is-active" : "is-not-active"}`} onClick={e => {setView("stocks");toggleMenu(e);}}>
                                <i className="fas fa-trademark" aria-hidden="true"></i> &nbsp; STOCKS & BONDS
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
        
            <div className="page-content">
                <div className="wallet-div hero-contain">
                    <div className="box has-text-centered">
                        <b className="subtitle has-text-weight-bold"> WG-NET - </b>
                        <span>$100,000</span>{" "}<small className="tag">USD</small>
                    </div>
                    
                    <div className="slick-wrapper has-text-centered">
                        <Slider {...settings}>
                            <div key={0} className="slick-slide">
                                <div className="card networth-slide-card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h5 style={{textTransform:"capitalize",textDecoration:"underline"}}>Total Cash </h5>
                                            <span>$100,000</span>{" "}<small className="tag">USD</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div key={1} className="slick-slide">
                                <div className="card networth-slide-card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h5 style={{textTransform:"capitalize",textDecoration:"underline"}}>Number of Cards </h5>
                                            <span>2</span>{" "}<small className="tag">Debit Card</small><br />
                                            <span>1</span>{" "}<small className="tag">Credit Card</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div key={3} className="slick-slide">
                                <div className="card networth-slide-card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h5 style={{textTransform:"capitalize",textDecoration:"underline"}}>Total Value of Crypto-Currencies </h5>
                                            <span>$100,000</span>{" "}<small className="tag">USD</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div key={4} className="slick-slide">
                                <div className="card networth-slide-card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h5 style={{textTransform:"capitalize",textDecoration:"underline"}}>Current Value of Declared Assets </h5>
                                            <span>$100,000</span>{" "}<small className="tag">USD</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div key={4} className="slick-slide">
                                <div className="card networth-slide-card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h5 style={{textTransform:"capitalize",textDecoration:"underline"}}>Current Value of Stored Assets </h5>
                                            <span>$100,000</span>{" "}<small className="tag">USD</small>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div key={5} className="slick-slide">
                                <div className="card networth-slide-card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h5 style={{textTransform:"capitalize",textDecoration:"underline"}}> Forex </h5>
                                            <div><b>Balance : </b> <span>1000</span>{" "}<small className="tag">USD</small></div> 
                                            <div><b>Active  : </b> <span>3</span>{" "} <small className="tag">Trades</small></div> 
                                            <div><b>Value of Last Traded Pair : </b><span>1.345</span>{" "}<small className="tag">USD/EUR</small></div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div key={5} className="slick-slide">
                                <div className="card networth-slide-card">
                                    <div className="card-content">
                                        <div className="content">
                                            <h5 style={{textTransform:"capitalize",textDecoration:"underline"}}> Stocks & Bonds </h5>
                                            <div><b>Held Stocks  : </b> <span>3</span>{" "} <small className="tag">Stocks</small></div> 
                                            <div><b>Total Value : </b> <span>4000</span>{" "}<small className="tag">USD</small></div> 
                                            <div><b>Highest Stock Value : </b><span>44.345</span>{" "}<small className="tag">USD</small></div> 
                                        </div>
                                    </div>
                                </div>
                            </div>
                             
                        </Slider>
                    </div>
                </div>
                <div className="hero">
                    <div className="hero-contain">
                        {wView === 'cash' &&
                            <div>
                                <Cash />      
                            </div>
                        }
                        {wView === 'card' &&
                            <div>
                                <Cards />      
                            </div>
                        }
                        {wView === 'crypto' &&
                            <div>
                                <h1>CRYPTO</h1>       
                            </div>
                        }
                        {wView === 'assets' &&
                            <div>
                                <h1>Asset Management</h1>       
                            </div>
                        }
                        {wView === 'forex' &&
                            <div>
                                <h1>Forex Portfolio</h1>       
                            </div>
                        }
                        {wView === 'stocks' &&
                            <div>
                                <h1>Stock Portfolio</h1>       
                            </div>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    )
} 
export default withContext(Wallet);