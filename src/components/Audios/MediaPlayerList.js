import React,{ useState, useEffect, useCallback, useMemo} from "react";
import withContext from "../../withContext";
import axios from "axios";
import MediaItem from "./MediaItem";

const MediaPlayerList = props => {

    const [loadlist, setLoadList] = useState(null);
    const [viewlist, setViewList] = useState(null);

    const audio_categories = useMemo(() =>{ return ["Recording", "Music","Podcast","Audiobook","Speech","Interview"] }, []);
    const music_genres = useMemo(() =>{ return ["Alternative", "Afro-Beats","Dancehall", "Hip-Hop", "Rap", "R&B", "Reggae", "Rock", "World"] }, []);
    //const genres = ["Alternative", "Dancehall", "Hip-Hop", "Rap", "R&B", "Reggae", "Rock", "World"];
    const options = useMemo(() => {return ["Free","Stream","Purchase","Contingency","Follower", "Frat", "Rank"]},[]);

    const video_categories = useMemo(() => {return ["Recording", "Music Video", "Film", "Short Film"]},[]);

    const all_genres = useMemo(() => {return ["Action", "Comedy", "Horror", "Romance", "Thriller", "Western"]},[]);
    const recording_genres = useMemo( () => {return ["Normal", " Highlight", "Historical", "Information", "Review", "News", "Sports", "Political", "Business"]},[]);

    const [filter, setFilter] = useState(true);
    const [section, setSection] = useState("all");
    const [searchval, setSearchVal] = useState("");
    const [category, setCategory] = useState("all");
    const [genre, setGenre] = useState("all");
    const [playback, setPlayBack] = useState("all");

    const [categorieslist, setViewCategories] = useState([]);
    const [genreslist, setViewGenres] = useState([]);

    const getExclusives = () => {
        axios.get('/api/exclusive').then(
            (result) => {
                if (result.status !== 200){
                    throw new Error('List of Followings were not sent from server.');
                }else{
                    var list = result.data.exclusives.filter(exclusive => exclusive.attachment.md === true || exclusive.attachment.stereo === true)
                    setLoadList(list);
                    setViewList(list);
                }
            }
        )
    }
     const filterList = useCallback(
        () => {
            let result = loadlist;
            setViewCategories([]);
            setViewGenres([]);
            if (section && section !== "all"){
                if (section === "stereo"){
                    result = result.filter(exclusive => exclusive.attachment.stereo === true);
                    setViewCategories(audio_categories);
                }else{
                    result = result.filter(exclusive => exclusive.attachment.md === true);
                    setViewCategories(video_categories);
                }
            }
            if(category && category !== "all"){
                result = result.filter(exclusive => exclusive.attachment.category === category);
                
                if(category === "Music" || category === "Music Video"){
                    setViewGenres(music_genres);
                }
                else if (category === "Audiobook" || category === "Film" || category === "Short Film"){
                    setViewGenres(all_genres);
                }
                else{
                    setViewGenres(recording_genres);
                }
            }
            if (searchval && searchval !== ""){
                result = result.filter(exclusive => exclusive.attachment.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase())
                || exclusive.attachment.artistname.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
            }
            if (genre && genre !== "all"){
                result = result.filter(exclusive => exclusive.attachment.genre === genre);
            }    
            if (playback && playback !== "all"){
                result = result.filter(exclusive => exclusive.attachment.playback === playback);
            }
            setViewList(result); 
            setFilter(false);
        },
        [section, category, searchval, genre, playback, all_genres, audio_categories, loadlist, music_genres, recording_genres, video_categories],
      );

      useEffect(() => {
        window.scrollTo(0, 0);
        if (viewlist === null){
            getExclusives();
        }
        if (filter){
            filterList();
        }

    }, [searchval, genre, playback, section, category,filter, viewlist,loadlist, filterList]);
    /*const filterList = () => {
        let result = loadlist;
        setViewCategories([]);
        setViewGenres([]);
        if (section && section !== "all"){
            if (section === "stereo"){
                result = result.filter(exclusive => exclusive.attachment.stereo === true);
                setViewCategories(audio_categories);
            }else{
                result = result.filter(exclusive => exclusive.attachment.md === true);
                setViewCategories(video_categories);
            }
        }
        if(category && category !== "all"){
            result = result.filter(exclusive => exclusive.attachment.category === category);
            
            if(category === "Music" || category === "Music Video"){
                setViewGenres(music_genres);
            }
            else if (category === "Audiobook" || category === "Film" || category === "Short Film"){
                setViewGenres(all_genres);
            }
            else{
                setViewGenres(recording_genres);
            }
        }
        if (searchval && searchval !== ""){
            result = result.filter(exclusive => exclusive.attachment.title.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase())
            || exclusive.attachment.artistname.replace(/ /g,'').toLowerCase().includes(searchval.replace(/ /g,'').toLowerCase()));         
        }
        if (genre && genre !== "all"){
            result = result.filter(exclusive => exclusive.attachment.genre === genre);
        }    
        if (playback && playback !== "all"){
            result = result.filter(exclusive => exclusive.attachment.playback === playback);
        }
        setViewList(result); 
        setFilter(false);
    }*/

    return (
        <div className="hero">
            <div className="hero-body has-text-centered">
                <br />
                <div className="card" style={{marginLeft:"1rem"}}>
                    <div className="columns is-multiline is-mobile">
                        <div className="column is-12">
                            <div className="columns is-multiline is-mobile">
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
                                    <div className="columns is-multiline is-mobile">    
                                        <div className="column is-3">
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
                                                            <option value="stereo"> Stereo </option>
                                                            <option value="md"> Max-Definition </option>
                                                            
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                        
                                        </div><div className="column is-3">
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
                                                            <hr />
                                                            {categorieslist.map( (atype,index) => (
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
                                                            {genreslist.map( (atype,index) => (
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
                                                        <label className="form-label" htmlFor="categories">
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
                                <MediaItem 
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
export default withContext(MediaPlayerList);