import React from "react";
import withContext from "../../withContext";
import Slider from "react-slick";

const All = props => {
    const products = [1,2,3,4,5,6]
    const carousel = products && products.length ? 
        products.slice(0,6).map((product, index) => (
            <div key={index} className="article-slide">
                <div class="card">
                    <div className="card-image">
                        <figure className="image is-4by3">
                            <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                        </figure>
                    </div>
                    <div className="card-content">
                        <div className="content">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                            Phasellus nec iaculis mauris. <span>@bulmaio</span>.
                            <span>#css</span> <span>#responsive</span>
                            <br />
                            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
                        </div>
                        <div className="media">
                            <div className="media-left">
                                <figure className="image is-48x48">
                                    <img src="https://bulma.io/images/placeholders/96x96.png" alt="Placeholder" />
                                </figure>
                            </div>
                            <div className="media-content">
                                <p className="title is-4">John Smith</p>
                                <p className="subtitle is-6">@johnsmith</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    ):(
        <div className="column">
            <span className="title has-text-grey-light">
                No Articles Found !
            </span>
        </div>
    )
  
    const settingsThumbs = {
        speed: 1000,
        slidesToShow: 3,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        centerMode: true,
        focusOnSelect: true,
        centerPadding: '10px',
        responsive:[
        {
            breakpoint: 770,
            settings: {
                slidesToShow: 2,
            }
        },
        {
            breakpoint: 475,
            settings: {
                slidesToShow: 1,
            }
        },
        ]
    };

    return(
        <div className="hero">
            <div className="has-text-centered">
                <h4 className="title" style={{textTransform:"capitalize"}}> {props.section} </h4> 
            </div>

            <small>Main - headlines</small>
            <div className="card">
                <figure class="image is-3by1">
                    <iframe class="has-ratio" title="title" src="https://www.youtube.com/embed/YE7VzlLtp-4" frameborder="0" allowfullscreen></iframe>
                </figure>
            </div>
            <br />
            <div className="columns is-multiline">
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" >
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" >
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
            </div>
        
            <hr className="info-seperator" />
            <small>Latest - newest and most important articles</small>
            <div className="latest has-text-centered">
                <div className="box">
                    <div className="slick-wrapper">
                        <Slider {...settingsThumbs}>
                            {carousel}
                        </Slider>             
                    </div>
                    <br />
                    <p> <button className="button is-link"> View Other Latest Articles  </button> </p>
                </div>
            </div>

            <hr className="info-seperator" />
            <small>Featured - editors choices</small>
            <div className="columns is-multiline">
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" >
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" >
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
            </div>

            <hr className="info-seperator" />
            <small>Trending - current most views</small>
            <div className="latest has-text-centered">
                <div className="box">
                    <div className="slick-wrapper">
                        <Slider {...settingsThumbs}>
                            {carousel}
                        </Slider>             
                    </div>
                    <br />
                    <p> <button className="button is-link"> View Other Trending Articles  </button> </p>
                </div>
            </div>
        

            <hr className="info-seperator" />
            <small>Recommended - view by similar users</small>
            <div className="columns is-multiline">
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" >
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3" >
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
                <div className="column is-half">
                    <div className="card">
                        <div className="card-image">
                            <figure className="image is-4by3">
                                <img src="https://bulma.io/images/placeholders/1280x960.png" alt="Placeholder" />
                            </figure>
                        </div>
                        
                    </div>
                </div>
            </div>

        </div>
        
    )
}
export default withContext(All);