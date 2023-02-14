import React, { useEffect, useState } from "react";
import withContext from "../../withContext";
import "./index.css";
import Lightbox from "react-image-lightbox";
import ArtistView from "./ArtistView";

const MusicPlayer = props => {

    const [music, setMusic] = useState(null);
    const [seekBar, setSeekBar] = useState(null);
    //const [songName, setSongName] = useState(null);
    //const [artistName, setArtistName] = useState(null);
    const [disk, setDisk] = useState(null);
    const [container, setContainer] = useState(null);
    const [currentTime, setCurrentTime] = useState(null);
    const [musicDuration, setDuration] = useState(null);
    const [playBtn, setPlayBtn] = useState(null);
    const [forwardBtn, setForwardBtn] = useState(null);
    //const [backwardBtn, setBackwardBtn] = useState(null);
    const [loading, setLoading] = useState(true);
    const [openImage, setOpen] = useState(false);
    const [modalIsOpen, setModalOpen] = useState(false);

    const {temp_url} = props;
    const {display_url} = props;
    const {mediatype} = props;
    const {details} = props;

    useEffect( () => {
        if(loading){
            setMusic(document.querySelector('#audio'));
            setSeekBar(document.querySelector('.seek-bar'));
            //setSongName(document.querySelector('.music-name'));
            //setArtistName(document.querySelector('.artist-name'));
            setDisk(document.querySelector('.disk'));
            setContainer(document.querySelector('.music-player'));
            setCurrentTime(document.querySelector('.current-time'));
            setDuration(document.querySelector('.song-duration'));
            setPlayBtn(document.querySelector('.play-btn'));
            setForwardBtn(document.querySelector('.forward-btn'));
            //setBackwardBtn(document.querySelector('.backward-btn'));
            setLoading(false);
        }
        
        if(temp_url && seekBar && currentTime && music){
            loadMusic();
        }

        if(container && display_url !== ""){ 
            container.style.backgroundImage = `url(${display_url})`;
        }

        setInterval(() => {
            if (music){
                seekBar.value = music.currentTime;
                currentTime.innerHTML = formatTime(music.currentTime);
                if(Math.floor(music.currentTime) === Math.floor(seekBar.max)){
                    forwardBtn.click();
                }
            }
        }, 500);        

    },[openImage, seekBar, musicDuration, currentTime, music, playBtn, temp_url, display_url, container, forwardBtn,loading]);

    const loadMusic = () => {

        seekBar.value = 0; // set range slide value to 0;
        let url = temp_url;
        music.src = url;
        music.type = mediatype;

        currentTime.innerHTML = '00:00';
        setTimeout(() => {
            seekBar.max = music.duration;
            musicDuration.innerHTML = formatTime(music.duration); 
        }, 300);
    }

    const formatTime = (time) => {
        let min = Math.floor(time / 60);
        if(min < 10){
            min = `0${min}`;
        }
        let sec = Math.floor(time % 60);
        if(sec < 10){
            sec = `0${sec}`;
        }
        return `${min} : ${sec}`;
    }

    const handlePlay = (e) => {  

        e.preventDefault();
        if (playBtn && temp_url && music){
            if(playBtn.className.includes('pause')){
                music.play();
            } else{
                music.pause();
            }
            playBtn.classList.toggle('pause');
            disk.classList.toggle('play');
        }
    };

    /*const handleView = (e) => {
        e.preventDefault(e);
        setOpen(true);
    }
    
    const handleClose = (e) => {
        e.preventDefault(e);
        if(openImage === true){
            console.log("image opened");
            var closeBtn = document.getElementsByClassName('ril-close');
            console.log(closeBtn.item(0));
            closeBtn[0] ? closeBtn[0].addEventListener("click", console.log("clicked")):console.log("null");
        }
        setOpen(false);
        return false;

    }*/

    const handleChangeSeekBar = (e) => {
        music.currentTime = seekBar.value;
    }

    // forward and backward button
    const playNext = (e) => { 
        loadMusic();
        playMusic();
    };

    const playPrevious = (e) => { 
        loadMusic();
        playMusic();
    };

    const playMusic = () => {
        music.play();
        playBtn.classList.remove('pause');
        disk.classList.add('play');
    }

    //loadMusic();
    
    return(
        <div className="hero" >
            <div id="music-player-container" className="music-player-container">
                <div className="music-player">
                    {openImage && (
                        <Lightbox
                            imageTitle={details.title}
                            mainSrc={display_url}
                            onCloseRequest={(e) => setOpen(false)}
                        />
                    )}
                    <h1 className="music-name"><span>{details.title}</span></h1>
                    <p className="artist-name"><span>{details.artist}</span></p>
                    <ArtistView modalIsOpen={modalIsOpen} setModalOpen={setModalOpen} />
                    <div className="disk" onClick={e => setModalOpen(true)}></div>
                    <div className="song-slider">
                        <input type="range" value="0" className="seek-bar" onChange={e => handleChangeSeekBar(e)} />
                        <span className="tag current-time">00:00</span>
                        <span className="tag song-duration">00:00</span>
                    </div>
                    <div className="controls-class">
                        <button className="btn-small view-art-btn" onClick={e => setOpen(true)}><i style={{fontWeight:"bold", fontSize:"large"}} className="fas fa-eye"></i></button>
                        <button className="btn backward-btn" onClick={e => playNext}><i style={{fontWeight:"bolder", fontSize:"x-large"}} className="fas fa-chevron-left"></i></button>
                        <button id="play-btn" className="play-btn pause" onClick={e => handlePlay(e)}>
                            <span></span>
                            <span></span>
                        </button>
                        <button className="btn forward-btn" onClick={e => playPrevious}><i style={{fontWeight:"bolder", fontSize:"x-large"}} className="fas fa-chevron-right"></i></button>
                        <button className="btn-small option-btn"><i style={{fontWeight:"bold", fontSize:"large"}} className="fas fa-ellipsis-v"></i></button>
                    </div>
                    <audio src="" id="audio"></audio>
                    
                </div>
            </div>
        </div>
    )
}
export default withContext(MusicPlayer);