import React, { useState, useEffect } from 'react';
import Lightbox from 'react-image-lightbox';
import Slider from "react-slick";
import withContext from "../../../withContext";

const ListingImageView = props => {
    const {listing, thePics} = props;
    const [nav1, setNav1] = useState(null);
    const [nav2, setNav2] = useState(null);
    const [slider1, setSlider1] = useState(null);
    const [slider2, setSlider2] = useState(null);
    const [openImage, setOpen] = useState(false);
    const [pIndex, setIndex] = useState(0);

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
        slidesToShow: 3,
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
          console.log(openImage);
          console.log(pIndex);
          e.preventDefault();
      };
      return(
          <div className="box imagesContainer">
            <div className="slick-wrapper">
                <div className="currentSlide">
                    <Slider
                        {...settings}
                        asNavFor={nav2}
                        ref={slider => (setSlider1(slider))}
                        >
                        {thePics.map((pic, index) => 

                          <div className="slick-slide" key={index}>
                            <h2 className="slick-slide-title">{listing.title === "" ? "PropFinder" : listing.title}</h2>
                            <img className="slick-slide-image customSlide" name={index} onClick={testfunc} alt={listing.listing_id} 
                            src={pic} />

                          </div>
                        )}

                    </Slider>
                      {openImage && (
                      <Lightbox
                        imageTitle={`Image ${pIndex} of ${thePics.length - 1}`}
                        mainSrc={thePics[pIndex]}//{`/images/test/${pIndex}.jpg`} 
                        nextSrc={thePics[((pIndex+1) % thePics.length)]}//{`/images/test/${((pIndex+1) % slidesData.length)}.jpg`}  
                        prevSrc={thePics[((pIndex + thePics.length - 1) % thePics.length)]}//{`/images/test/${((pIndex + slidesData.length - 1) % slidesData.length)}.jpg`}  
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
                </div>
            </div>
          </div>
    );
};

export default withContext(ListingImageView);