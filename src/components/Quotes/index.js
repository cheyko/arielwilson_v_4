import React, {useState, useEffect} from "react";
import withContext from "../../withContext";
import PreeItem from "../Timeline/PreeItem";
import TilePreeItem from "../HelperComponents/TilePreeItem";

const Quotes = props => {
    const loadQuotes = props.context.prees ? props.context.prees.filter(pree => pree.is_media === false) : [];
    const [quotes, renderQuotes] = useState([]);
    const [section, setSection] = useState("all");

    useEffect( () => {
        window.scrollTo(0,0);
        if (section === "all" || section === "yours"){
            showQuotes();
            console.log(section);
        }
        //sortPrees();
        //get reactions to prees --> getlist of prees ids from from allPrees = (param) ?
    },[section]);

    const showQuotes = () => {
        let results;
        console.log(section);
        switch(section){
            case "all":
                results = loadQuotes;
                renderQuotes(results);
                //console.log("test");
                break;
            case "yours":
                results = loadQuotes.filter( (pree) => pree.user.user_id === props.context.user.id);
                //console.log(results);
                renderQuotes(results);
                break;
            case "tagged":
                results = loadQuotes.filter( (pree) => pree.user.user_id === props.context.user.id);
                //console.log(results);
                renderQuotes(results);
                break;
            default:
                break;
        }
    }

    //console.log(props.context.user.id);
    //console.log(quotes);

    return (
        <div className="hero">
             <div className="quotes-page hero-body">
                <div className="tabs-header wgr-tabs">                      
                    <div className="card box-bg header-container">
                        <div className="has-text-centered">
                            <h1 className="custom-heading subtitle"><b>QUOTES</b></h1>
                        </div>
                        <div className="tabs-bg custom-tabs tabs is-fullwidth card">
                            <ul>
                                <li>
                                    <button 
                                        className={`button ${section === "all" ? "is-active" : "is-not-active"}`}
                                        onClick={e => {
                                            //showQuotes(e,"all");
                                            setSection("all");
                                            showQuotes();
                                        }} 
                                    >
                                        <span className="icon is-small">
                                            <i style={{fontSize:"x-large"}} className="fas fa-quote-left" aria-hidden="true"></i>
                                        </span>
                                        {" "}
                                        <span className="icon is-small">
                                            <i style={{fontSize:"x-large"}} className="fas fa-quote-right" aria-hidden="true"></i>
                                        </span>
                                        &nbsp;
                                        <span className="tabs-title"> ALL </span>
                                    </button>
                                </li>
                                <li>
                                    <button  
                                        className={`button ${section === "yours" ? "is-active" : "is-not-active"}`} 
                                        onClick={e => {
                                            //showQuotes(e,"yours");
                                            setSection("yours");
                                            showQuotes();
                                        }} 
                                    >
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-user" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> YOURS </span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={`button ${section === "tagged" ? "is-active" : "is-not-active"}`} 
                                        onClick={e => {
                                            //showQuotes(e,"yours");
                                            setSection("tagged");
                                        }} 
                                    >
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-at" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> TAGGED </span>
                                    </button>
                                </li>
                                <li>
                                    <button  
                                        className={`button ${section === "favourites" ? "is-active" : "is-not-active"}`}
                                        onClick={e => {
                                            //showQuotes(e,"yours");
                                            setSection("favourites");
                                        }} 
                                    >
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fab fa-gratipay" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> FAVOURITES </span>
                                    </button>
                                </li>
                                <li>
                                    <button 
                                        className={`button ${section === "wg-influence" ? "is-active" : "is-not-active"}`}
                                        onClick={e => {
                                            //showQuotes(e,"yours");
                                            setSection("wg-influence");
                                        }} 
                                    >
                                        <span className="icon is-small"><i style={{fontSize:"x-large"}} className="fas fa-scroll" aria-hidden="true"></i></span>
                                        <span className="tabs-title"> WG INFLUENCE* </span>
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="custom-page-content">
                    <div className="quotes-div">
                        {section === "all" &&
                            (
                                <div className="all-quotes prees-container">
                                    <div className="Top-Quotes">
                                        <div className="media-header"></div>
                                        <h1> Top Quotes </h1>
                                    </div>
                                    <hr />
                                    {quotes && quotes.length > 0 ? (
                                        quotes.map((quote, index) => (
                                            <PreeItem
                                                aPree={quote}
                                                key={index}
                                                showComments={false}
                                                clickable={"view"}
                                            />
                                        )) 
                                    ) : (
                                        <div className="column">
                                            <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                                                No Quotes a Gwaan right now.
                                            </span>
                                        </div>
                                    )}
                                </div>
                            )
                        }
                        {section === "yours" &&
                            (
                                <div className="your-quotes">
                                    <div className="columns is-multiline is-mobile">
                                        {quotes && quotes.length > 0 ? (
                                            quotes.map((quote, index) => (
                                                <div key={index} className="column tile-column is-one-third">
                                                    <TilePreeItem
                                                        aPree={quote}
                                                        key={index}
                                                    />
                                                </div>
                                            )) 
                                        ) : (
                                            <div className="column">
                                                <span className="is-size-3 has-text-grey-light" style={{color:"blue"}}>
                                                    You have No Quotes.
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )
                        }

                        {section === "tagged" &&

                        ( 
                            <div className="tagged-quotes">
                                <h1> TAGGED </h1>
                            </div>
                        )
                        }

                        {section === "wg-influence" &&

                            ( 
                                <div className="professional-quotes">
                                    <h1>WG-INFLUENCE</h1>
                                </div>
                            )
                        }

                        {section === "favourites" &&
                            (
                                <div className="favourite-quotes">
                                    <h1> FAVOURITES </h1>
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </div>
    )

}

export default withContext(Quotes);