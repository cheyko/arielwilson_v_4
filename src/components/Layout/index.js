import { Outlet } from 'react-router-dom';
import withContext from '../../withContext';
import Welcome from '../Homepage/Welcome';
import Navbar from "../Navbar";
//import Homepage from '../Homepage';

import "./index.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useEffect } from 'react';


const Layout = props => {

  useEffect(() => {
      if (document.documentElement.classList.contains("hide-scroll") === true){
        document.documentElement.classList.remove("hide-scroll");
      }
  },[document]);
  return(
    <div>
      {props.context.welcome ? 
        <div className="hero">
            <Welcome />
        </div>:
        <div className="hero main-container">
          <div className="columns is-mobile is-multiline no-padding no-margin">
            <div id='nav-column' className="column nav-column is-one-quarter no-padding no-margin"> 
                <Navbar />
            </div>
            <div id="app-container" className="column  no-padding no-margin container app-container"> 
              <div className={`mobile-menu menu-color reaction-btn ${!props.context.toggle ? "has-text-centered" : "has-text-right"}`} onClick={ e => props.context.toggleMenu(e) }>
                  {!props.context.toggle ?
                    ( <span className="button reverse-colors"><b> Main Menu </b> &nbsp; <FontAwesomeIcon icon={faBars} size="2x" /> </span> )
                    :
                    ( <span className="button reverse-colors"><FontAwesomeIcon icon={faTimes} size="2x" /> </span> )
                  }
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      }
    </div>
  )
  /*return(
    <>
      {props.context.ready ? (           
        <div className="hero main-container">
          <div className="columns is-mobile is-multiline no-padding no-margin">
            <div id='nav-column' className="column nav-column is-one-quarter no-padding no-margin"> 
                <Navbar />
            </div>
            <div id="app-container" className="column  no-padding no-margin container app-container"> 
              <div className={`mobile-menu menu-color reaction-btn ${!props.context.toggle ? "has-text-centered" : "has-text-right"}`} onClick={ e => props.context.toggleMenu(e) }>
                  {!props.context.toggle ?
                    ( <span className="button reverse-colors"><b> Main Menu </b> &nbsp; <FontAwesomeIcon icon={faBars} size="2x" /> </span> )
                    :
                    ( <span className="button reverse-colors"><FontAwesomeIcon icon={faTimes} size="2x" /> </span> )
                  }
              </div>
              <Outlet />
            </div>
          </div>
        </div>
      ):( 
        props.context.welcome ? (
          <div className="hero">
              <Welcome />
          </div>
        ):(
          <div className="hero homepage-div">
              <Homepage />  
          </div>
        )                
      )}
    </>
  );*/

}

export default withContext(Layout);