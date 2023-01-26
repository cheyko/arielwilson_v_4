import React from "react";
import withContext from "../../withContext";
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

const Cards = props => {

    return (
        <div className="hero">
            <div className="card">
                <article className="message">
                     
                    <Tabs>
                        <div className="message-header">
                            <TabList>
                                <Tab>Card Details</Tab>
                                <Tab>Transactions</Tab>
                            </TabList>
                        </div>
                        <div className="message-body">
                            <TabPanel>
                                <h1>Card Details</h1>
                            </TabPanel>
                            <TabPanel>
                                <h1>Transactions</h1>
                            </TabPanel>
                        </div>
                    </Tabs>
                 
                </article>
            </div>
        </div>
    )
}

export default withContext(Cards);