import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import withContext from '../../withContext';
import Welcome from '../Homepage/Welcome';
import Navbar from "../Navbar";
import Homepage from '../Homepage';

import "./index.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faGlobe } from '@fortawesome/free-solid-svg-icons';;

const Layout = props => {

    return(
        <>
        {props.context.ready ? (           
                <div className="hero">
                  <div className="columns is-mobile">
                    <div className="column is-one-quarter nav-container"> 
                      
                      <div className="display-div">
                        <h1 className='title'> W@H GW@@N </h1>
                        <figure className="image is-128x128">
                          <img className="is-rounded" src="https://bulma.io/images/placeholders/128x128.png" />
                        </figure>
                      </div>
                      <br />
                      <div className='menu-options'>
                        <div className='columns'>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                        </div>
                        <div className='columns'>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                        </div>
                        <div className='columns'>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                        </div>
                        <div className='columns'>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                        </div>
                        <div className='columns'>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                          <div className='column control-btn'>
                            <FontAwesomeIcon icon={faGlobe} size="3x" /><br/>
                            <b>Option 1</b>
                          </div>
                        </div>
                        
                      </div>
                     
                    </div>
                    <div className="column app-container"> 
                      app
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
            {/*props.context.ready ? (           
                <div className="hero main-container">
                  <div className="columns is-mobile is-multiline">
                    <div className="column nav-column is-one-quarter"> 
                      <div className="App">
                        <Navbar />
                      </div>
                    </div>
                    <div className="column container app-container is-three-quarters"> 
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
                )*/}
        </>
    );

}

export default withContext(Layout);