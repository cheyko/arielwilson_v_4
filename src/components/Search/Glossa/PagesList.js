import React,{ useState, useEffect} from "react";
import withContext from "../../../withContext";
import axios from "axios";
import PageItem from "./PageItem";

const PagesList = props => {

    const [loadlist, setLoadList] = useState(null);
    const [viewlist, setViewList] = useState(null);
    const pagetypes = ["normal", "mini-biography", "historical",  "recent", "on-going"];
    const sections = [ "people", "place", "thing","event", "animal", "plant", "topic" ];
    const [filter, setFilter] = useState(true);
    const [title, setTitle] = useState("");
    const [section, setSection] = useState("");
    const [pagetype, setPageType] = useState("");
    const {searchval} = props;

    useEffect(() => {
        window.scrollTo(0, 0);
        if (viewlist === null){
            getAllPages();
        }
        filterList();

    }, [title, section, pagetype]);

    const getAllPages = () => {
        const result = axios.get(`${process.env.REACT_APP_PROXY}/api/glossa`).then(
            (result) => {
                if (result.status !== 200){
                    throw new Error('List of Followings were not sent from server.');
                }else{
                    setLoadList(result.data.pages);
                    setViewList(result.data.pages);
                }
            }
        )
    }

    const filterList = () => {
        
        let result = loadlist;
        if (title && title !== ""){
            result = result.filter(page => page.title.replace(/ /g,'').toLowerCase().includes(title.replace(/ /g,'').toLowerCase()));         
        }
        if (searchval && searchval !== ""){
            result = result.filter(page => page.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));                 
        }

        if (section && section !== "all"){
            result = result.filter(page => page.section === section);
        }    
        if (pagetype && pagetype !== "all"){
            result = result.filter(page => page.pagetype === pagetype);
        }
        setViewList(result); 
        //setOffset(0);
        setFilter(false);
        setTitle(searchval);    
    }

    return (
        <div className="hero">
            <div className="has-text-centered">
                <br />
                <div className="box">
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-full-mobile is-half-tablet">
                            <div className="field">
                                <div className="rows">
                                    <div className="row">
                                        <label className="form-label" htmlFor="title">
                                            <b>Title</b>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <input
                                            className="input form-input"
                                            type="text"
                                            id="title"
                                            name="title"
                                            value={title}
                                            onChange={event => {
                                                setTitle(event.target.value);
                                                //filterList(event);
                                                setFilter(true);
                                            }}
                                            placeholder="Search"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="column is-half-mobile is-one-quarter-tablet">
                            <div className="field">
                                <div className="rows">
                                    <div className="row">
                                        <label className="form-label" htmlFor="section">
                                            <b>Section</b>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <select
                                            className="select form-select"
                                            id="section"
                                            value={section}
                                            onChange={event => {
                                                setSection(event.target.value)
                                                setFilter(true);
                                            }}>
                                            <option value="all"> All </option>
                                            {sections.map( (atype,index) => (
                                                <option key={index} value={atype}>
                                                    {atype}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div className="column is-half-mobile is-one-quarter-tablet">
                            <div className="field">
                                <div className="rows">
                                    <div className="row">
                                        <label className="form-label" htmlFor="categories">
                                            <b>Categories</b>
                                        </label>
                                    </div>
                                    <div className="row">
                                        <select
                                            className="select form-select"
                                            id="pagetype"
                                            value={pagetype}
                                            onChange={event => {
                                                setPageType(event.target.value)
                                                setFilter(true);
                                            }}>
                                            <option value="all"> All </option>
                                            {pagetypes.map( (atype,index) => (
                                                <option key={index} value={atype}>
                                                    {atype}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="preepedia-list columns is-multiline is-mobile">
                    { viewlist && viewlist.length > 0 ? (
                        viewlist.map((aPage, index) => (
                            <div className="column is-full-mobile is-half-tablet is-one-third-desktop" key={index}>
                                <PageItem 
                                    key={index}
                                    page={aPage}
                                />
                            </div>
                        ))
                    ):(
                        <div className="container">
                            <span className="title has-text-grey-light"> No Pages to be viewed </span>
                        </div>
                    )
                    }
                </div>
            </div>
        </div>
    )
}
export default withContext(PagesList);