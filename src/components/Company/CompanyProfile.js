import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import withContext from "../../withContext";
import "./index.css";

const CompanyProfile = props => {
    //const {thePics} = props;
    const {company} = props;
    const view = props.show;

    const thePics = ["https://bulma.io/images/placeholders/128x128.png","https://www.youtube.com/embed/YE7VzlLtp-4","https://bulma.io/images/placeholders/64x64.png",process.env.PUBLIC_URL + "/images/bio/cover/default.mp4"];
    const types = ["image","video","image","video"];
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const [openImage, setOpen] = useState(false);
    const [pIndex, setIndex] = useState(0);
    const show = thePics.length < 3 ? thePics.length : 3;

    useEffect(() => {

        setNav1(slider1);
        setNav2(slider2);

    }, [slider1,slider2]);
    
    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        lazyLoad: 'progressive',
        autoplay: false,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        arrows: false,
        afterChange: current => setIndex(current)
    };

    const settingsThumbs = {
        speed: 500,
        slidesToShow: show,
        slidesToScroll: 1,
        asNavFor: '.slider-for',
        dots: true,
        centerMode: true,
        swipeToSlide: true,
        focusOnSelect: true,
        centerPadding: '10px',
        responsive:[
          {
            breakpoint: 700,
            settings: {
                arrows: false,
            }
          }
        ]
    };

      function testfunc(e){
          setOpen(true);
          e.preventDefault();
      };

      let navigate = useNavigate();

      return(
          <div className="box company-profile">
            {view === 'both' && <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i>  </button>}
            <div className='has-text-centered'>
              <b>{company}</b>
            </div>
            <div className='has-text-centered'> 
              <video className='slick-slide-video customSlide'controls>
                  <source src={thePics[3]} type="video/mp4"/>
              </video>
            </div>
            <div className="wrapper">
                <div className="currentSlide">
                    <Slider
                        {...settings}
                        asNavFor={nav2}
                        ref={slider => (setSlider1(slider))}
                        >
                        {thePics.map((media, index) => {
                          if (types[index] === "image"){
                            return(
                              <div className="slick-slide" key={index}>
                                <img className="slick-slide-image customSlide" name={index} onClick={testfunc} alt={"Image " + index} 
                                src={media} />

                              </div>
                            );
                          }else if (types[index] === "video"){
                            return(
                              <div className="slick-slide" key={index}>
                                <video className='slick-slide-video customSlide' key={index} controls>
                                    <source src={media} type="video/mp4"/>
                                </video>
                              </div>
                            );
                          }else{
                            return(
                              <div className="slick-slide" key={index}>
                                <audio className="audio-playback" key={index} controls>
                                    {/*<source src={aUrl} type="audio/mp3"/> */}
                                    <source src={media} type="audio/mp3"/>
                                </audio>
                              </div>
                            );
                          }
                        })}

                    </Slider>
                      {openImage && (
                      <Lightbox
                        imageTitle={`Image ${pIndex} of ${thePics.length - 1}`}
                        mainSrc={thePics[pIndex]} 
                        nextSrc={thePics[((pIndex+1) % thePics.length)]} 
                        prevSrc={thePics[((pIndex + thePics.length - 1) % thePics.length)]} 
                        onCloseRequest={() => setOpen(false)}
                        onMovePrevRequest={() =>
                          setIndex((pIndex + thePics.length - 1) % thePics.length)
                        }
                        onMoveNextRequest={() =>
                          setIndex((pIndex + 1) % thePics.length)
                        }
                      />
                      )}
                </div>
                {thePics.length > 1 &&
                <div className="thumbnail thumbnail-slider-wrap">
                    <Slider
                        {...settingsThumbs}
                        asNavFor={nav1}
                        ref={slider => (setSlider2(slider))}>

                        {thePics.map((media, index) => {
                          if (types[index] === "image"){
                            return(
                              <div className="slick-slide" key={index}>
                                <img className="slick-slide-image" src={media} />
                              </div>
                            );
                          }else if (types[index] === "video"){
                            return(
                              <div className="slick-slide" key={index}>
                                <video className='slick-slide-video' key={index} controls>
                                    <source src={media} type="video/mp4"/>
                                </video>
                              </div>
                            );
                          }else{
                            return(
                              <div className="slick-slide" key={index}>
                                <audio className="audio-playback" key={index} controls>
                                    <source src={media} type="audio/mp3"/>
                                </audio>
                              </div>
                            );
                          }
                        })}
                    </Slider>
                </div>}
            </div>
          </div>
    );
};

export default withContext(CompanyProfile);