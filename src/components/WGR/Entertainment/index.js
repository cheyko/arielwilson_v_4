import React, { useState } from "react";
import withContext from "../../../withContext";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Countries from "../Countries";

const Entertainment = props => {

    const [showSearch, setShowSearch] = useState(false);
    const [filterCountry, setCountryValue] = useState("all");

    return (
        <div className="hero">
            <div className="container">
                <Tabs>
                    <div className="message is-danger">
                        <div className="message-header">
                            <TabList className="has-text-centered" style={{width:"100%"}}>
                                {showSearch && 
                                    <div className="columns">
                                        <div className="field column">
                                            <span className="control has-icons-left has-icons-right">
                                                <input className="input" type="text" placeholder="Search" />
                                                <span className="icon is-small is-left">
                                                <i className="fas fa-search"></i>
                                                </span>
                                                
                                            </span>
                                        </div>
                                        <div className="column is-1">
                                            <span className="icon is-small is-right">
                                                <button className="button is-small">search</button>
                                            </span>
                                        </div>
                                    </div>
                                }
                                
                                <span className="search-icon" onClick={e => setShowSearch(!showSearch)}><i style={{fontSize:"x-large",cursor:"pointer"}} className="fas fa-search" aria-hidden="true"></i></span> 
                                <span className="main-tabs">
                                    <Tab> <i style={{fontSize:"x-large"}} className="fas fa-icons" aria-hidden="true"></i> <span className="wgr-section-names"> Entertainment </span> </Tab>
                                    <Tab> Local </Tab>
                                    <Tab> National </Tab>
                                    <Tab> International </Tab>
                                    <Tab> Countries </Tab>
                                    <Tab> ArtForm </Tab>
                                    <Tab><i style={{fontSize:"x-large"}} className="fas fa-plus" aria-hidden="true"></i></Tab>
                                </span>
                            </TabList>
                        </div>
                        <div className="message-body">
                            <div className="recent-views">
                                <span><button class="button is-link is-outlined">Local</button>{" "}</span>
                                
                                <span><button class="button is-link is-outlined">Film</button>{" "}</span>
                                
                                <span><button class="button is-link is-outlined">Cochella</button> {" "}</span>

                                <span><button class="button is-link is-outlined">Nicki Minaj</button> {" "}</span>

                                <span><button class="button is-link is-outlined">Centerstage</button> {" "}</span>

                                <span><button class="button is-link is-outlined">Afro-Beats</button> {" "}</span>
                            </div>
                            <hr className="info-seperator" />
                            <TabPanel>
                                <h1>All</h1>
                            </TabPanel>
                            <TabPanel>
                                <h1>Local</h1>
                            </TabPanel>
                            <TabPanel>
                                <h1>National</h1>
                            </TabPanel>
                            <TabPanel>
                                <h1>International</h1>
                            </TabPanel>
                            <TabPanel>
                                <h1>Countries</h1>
                                <Countries filterCountry={filterCountry} setCountryValue={setCountryValue} />
                            </TabPanel>
                            <TabPanel>
                                <h1>ArtForm</h1>
                            </TabPanel>
                            <TabPanel>
                                <h1>Additional</h1>
                            </TabPanel>
                            
                        </div>
                    </div>
                </Tabs>
                 
            </div>
        </div>
    )
}

export default withContext(Entertainment);