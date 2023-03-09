import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import { useNavigate } from 'react-router-dom';
import Slider from "react-slick";
import withContext from "../../withContext";

const ImagesView = props => {
    const {thePics} = props;
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
        autoplay: true,
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
          <div className="box imagesContainer">
            <button className="button" onClick={() => navigate(-1)}> <i className="fas fa-arrow-circle-left"></i>  </button>
            <br/>
            <div className="wrapper">
                <div className="currentSlide">
                    <Slider
                        {...settings}
                        asNavFor={nav2}
                        ref={slider => (setSlider1(slider))}
                        >
                        {thePics.map((pic, index) => 

                          <div className="slick-slide" key={index}>
                            <img className="slick-slide-image customSlide" name={index} onClick={testfunc} alt={"Image " + index} 
                            src={pic} />

                          </div>
                        )}

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

                        {thePics.map((pic, index) =>

                        <div className="slick-slide" key={index}>
                            <img className="slick-slide-image" alt={index} 
                            src={pic} />
                        </div>

                        )}
                    </Slider>
                </div>}
            </div>
          </div>
    );
};

export default withContext(ImagesView);