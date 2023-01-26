import React,{ useState, useEffect} from "react";
import withContext from "../../withContext";
import axios from "axios";
import TrendyItem from "./TrendyItem";

const TrendyList = props => {

    const [loadlist, setLoadList] = useState(null);
    const [viewlist, setViewList] = useState(null);
    const options = ["Stream","Purchase","Contingency","Follower", "Frat", "Rank", "Highlight","Classic"];
    const image_categories = ["Personal", "Design"];
    const quote_categories = ["Poem", "Piece", "Saying"];
    const personal_genres = ["Selfie", "Scenery", "Throwback", "Display"];
    const design_genres = ["Wallpaper", "Cartoon", "3D"];
    const all_genres = ["Inspirational", "Historical", "Romance", "Comical", "Slang"];
    const sections = ["Trendy","Influence"];
    const [filter, setFilter] = useState(true);
    const [section, setSection] = useState("all");
    const [searchval, setSearchVal] = useState("");
    const [category, setCategory] = useState("all");
    const [genre, setGenre] = useState("all");
    const [playback, setPlayBack] = useState("all");

    const [categorieslist, setViewCategories] = useState([]);
    const [genreslist, setViewGenres] = useState([]);

    useEffect(() => {
        window.scrollTo(0, 0);
        if (viewlist === null){
            getExclusives();
        }
        if(filter){
            filterList();
        }
    }, [searchval, genre, playback, section, category, filter]);

    const getExclusives = () => {
        const result = axios.get('/api/exclusive').then(
            (result) => {
                if (result.status !== 200){
                    throw new Error('List of Followings were not sent from server.');
                }else{
                    var list = result.data.exclusives.filter(exclusive => exclusive.attachment.influence === true || exclusive.attachment.magazine === true)
                    setLoadList(list);
                    setViewList(list);
                }
            }
        )
    }

    const filterList = () => {
        let result = loadlist;
        setViewCategories([]);
        setViewGenres([]);
        if (section && section !== "all"){
            if (section === "Trendy"){
                result = result.filter(exclusive => exclusive.attachment.magazine === true);
                setViewCategories(image_categories);
            }else{
                result = result.filter(exclusive => exclusive.attachment.influence === true);
                setViewCategories(quote_categories);
            }
        }
        if (searchval && searchval !== ""){
            result = result.filter(exclusive => exclusive.attachment.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase())
            || exclusive.attachment.artistname.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if(category && category !== "all"){
            result = result.filter(exclusive => exclusive.attachment.category === category);
            if(category === "Personal"){
                setViewGenres(personal_genres);
            }
            if(category === "Design"){
                setViewGenres(design_genres);
            }
            if(section === "Influence"){
                setViewGenres(all_genres);
            }
        }
        if (genre && genre !== "all"){
            result = result.filter(exclusive => exclusive.attachment.genre === genre);
        }    
        if (playback && playback !== "all"){
            result = result.filter(exclusive => exclusive.attachment.playback === playback);
        }
        setViewList(result); 
        setFilter(false);
    }

    return (
        <div className="hero">
            <div className="hero-body has-text-centered">
                <br />
                <div className="card" style={{marginLeft:"1rem"}}>
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-12">
                            <div className="columns">
                                <div className="column is-6">
                                    <div className="field">
                                        <div className="rows">
                                            <div className="row">
                                                <label className="form-label" htmlFor="title">
                                                    <b>Search</b>
                                                </label>
                                            </div>
                                            <div className="row">
                                                <input
                                                    className="input form-input"
                                                    type="text"
                                                    name="searchval"
                                                    value={searchval}
                                                    onChange={event => {
                                                        setSearchVal(event.target.value);
                                                        //filterList(event);
                                                        setFilter(true);
                                                    }}
                                                    placeholder="Search"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                
                                <div className="column is-6">
                                    <div className="columns">  
                                        <div className="column is-3">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="category">
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
                                                            <hr />
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
                                        <div className="column is-3">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="category">
                                                            <b>Category</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            id="category"
                                                            value={category}
                                                            onChange={event => {
                                                                setCategory(event.target.value)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All </option>
                                                            <hr/>
                                                            
                                                            {categorieslist.length > 0 ?
                                                            (categorieslist.map( (atype,index) => (
                                                                <option key={index} value={atype}>
                                                                    {atype}
                                                                </option>
                                                            ))
                                                            ):(
                                                                <option value="all"> Select Section </option> 
                                                             
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>  
                                        <div className="column is-3">
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="genre">
                                                            <b>Genre</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            id="genre"
                                                            value={genre}
                                                            onChange={event => {
                                                                setGenre(event.target.value)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All </option>
                                                            <hr/>
                                                            {genreslist.length > 0 ?
                                                            (
                                                                genreslist.map( (atype,index) => (
                                                                    <option key={index} value={atype}>
                                                                        {atype}
                                                                    </option>
                                                                ))
                                                            ):(
                                                 
                                                                <option value="all"> Select Section & Category </option> 
                                                             
                                                            )}
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div>
                                
                                        <div className="column is-3">
                                           
                                            <div className="field">
                                                <div className="rows">
                                                    <div className="row">
                                                        <label className="form-label" htmlFor="playback">
                                                            <b>Playback</b>
                                                        </label>
                                                    </div>
                                                    <div className="row">
                                                        <select
                                                            className="select form-select"
                                                            id="playback"
                                                            value={playback}
                                                            onChange={event => {
                                                                setPlayBack(event.target.value)
                                                                setFilter(true);
                                                            }}>
                                                            <option value="all"> All </option>
                                                            <hr />
                                                            {options.map( (atype,index) => (
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
                            </div>
                        </div>
                    </div>
                </div>
                <br />
                <div className="columns is-multiline is-mobile">
                    { viewlist && viewlist.length > 0 ? (
                        viewlist.map((aPree, index) => (
                            <div className="column" key={index}>
                                <TrendyItem 
                                    key={index}
                                    aPree={aPree}
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
export default withContext(TrendyList);