import React, {useState} from 'react';
import withContext from "../../../withContext";
import ShowEvents from './ShowEvents';


const Events = props => {
    const {subSection} = props;

    return (
        <div>
            <div className="hero-container">
                <article className="box">
                    {subSection === 'meetings' && 
                        <div className="meetings-div">
                            <ShowEvents typeOf={"Meeting"} />
                        </div>
                    }
                    {subSection === 'conferences' &&
                        <div className="conferences-div">
                            <ShowEvents typeOf={"Conference"} />
                        </div>
                    }
                    {subSection === 'functions' &&
                        <div className="functions-div">
                            <ShowEvents typeOf={"Function"} />
                        </div>
                    }
                    {subSection === 'concerts' &&
                        <div className="concerts-div">
                            <ShowEvents typeOf={"Concert"} />
                        </div>
                    }
                    {subSection === 'shows' &&
                        <div className="shows-div">
                            <ShowEvents typeOf={"Show"} />
                        </div>
                    }
                    {subSection === 'parties' &&
                        <div className="parties-div">
                            <ShowEvents typeOf={"Party"} />
                        </div>
                    }
                   
                </article>
            </div>    
        </div>
    )
}

export default withContext(Events);