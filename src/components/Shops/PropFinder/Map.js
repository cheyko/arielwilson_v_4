import React from 'react';
//import Geocode from "react-geocode";


const Map = (props) => {
    const address = props.fullAddr;
    const {height} = props;
    //console.log(address);
    //const address = 'Brunswick Avennue, Spanish Town, St. Catherine, Jamaica';
    
    /*Geocode.setApiKey("AIzaSyBFYSwZ3uS7imrkqTnKZrbcZSLZhbY5UVM");
    Geocode.setLanguage("en");
    Geocode.fromAddress(address).then(
      (response) => {console.log(response);},
      (error) => {console.error(error);}
    );*/
    
    const searchUrl = `https://maps.google.com/maps?q=${address}&t=&z=16&ie=UTF8&iwloc=&output=embed`;

    //console.log(searchUrl);
    return (
        <div className="mapouter">
          <div className="gmap_canvas">
            <iframe
              title={address}
              src={searchUrl}
              width="100%"
              height={height}
              id="gmap_canvas"
              frameBorder="0"
              scrolling="no"
              marginHeight="0"
              marginWidth="0"
            />
          </div>
        </div>
    )
}

export default Map;