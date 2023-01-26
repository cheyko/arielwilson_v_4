import React, { useState } from "react";
import withContext from "../../../withContext";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import Countries from "../Countries";
import All from "../All";
import Local from "../Local";
import National from "../National";
import International from "../International";
import Categories from "../Categories";

const News = props => {

    const [showSearch, setShowSearch] = useState(false);
    const [filterCountry, setCountryValue] = useState("all");

    return (
        <div className="hero">
            <div className="container">
                <Tabs>
                    <div className="message is-info">
                        <div className="message-header">
                            <TabList className="has-text-centered">
                                {showSearch && 
                                    <div className="columns is-mobile is-multiline">
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
                                    <Tab> <i style={{fontSize:"x-large"}} className="fas fa-newspaper" aria-hidden="true"></i> <span className="wgr-section-names"> News </span> </Tab>
                                    <Tab> Local </Tab>
                                    <Tab> National </Tab>
                                    <Tab> International </Tab>
                                    <Tab> Countries </Tab>
                                    <Tab> Categories </Tab>
                                    <Tab><i style={{fontSize:"x-large"}} className="fas fa-plus" aria-hidden="true"></i></Tab>
                                </span>
                            </TabList>
                        </div>
                        <div className="message-body">
                            <ul className="horizontal-list">
                                 <li class="button is-link is-outlined">Local</li>  
                                
                                 <li class="button is-link is-outlined">Politics</li>  
                                
                                 <li class="button is-link is-outlined">International</li>  

                                 <li class="button is-link is-outlined">{filterCountry}</li>  
                            </ul>
                            <hr className="info-seperator" />
                            <TabPanel>
                                <All section={"news"} articles={[]}/>
                            </TabPanel>
                            <TabPanel>
                                <Local section={"news"} articles={[]} />
                                <span>Multiline List View with Filter and pagination</span>
                            </TabPanel>
                            <TabPanel>
                                <National section={"news"} articles={[]} />
                                <span>Multiline List View with Filter and pagination</span>
                            </TabPanel>
                            <TabPanel>
                                <International section={"news"} articles={[]}/>
                                <span>Multiline List View with Filter and pagination</span>
                            </TabPanel>
                            <TabPanel>
                                <Countries filterCountry={filterCountry} setCountryValue={setCountryValue} />
                                <span>Thumbnail/Tiles View with search input</span>
                            </TabPanel>
                            <TabPanel>
                                <Categories />
                                <span>Thumbnail/Tiles View with search input</span>
                            </TabPanel>
                            <TabPanel>
                                <h1>Additional</h1>
                                <span>Card List View</span>
                                
                            </TabPanel>
                            
                        </div>
                    </div>
                </Tabs>
                 
            </div>
        </div>
    )
}

export default withContext(News);