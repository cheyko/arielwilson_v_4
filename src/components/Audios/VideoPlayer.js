import React, { useEffect } from "react";
import withContext from "../../withContext";

const VideoPlayer = props => {

    const {temp_url} = props;
    //const {display_url} = props;
    const {mediatype} = props;
    const {details} = props;

    useEffect( ()=> {
        /*var supportsVideo = !!document.createElement('video').canPlayType;
        if (supportsVideo) {
            var videoContainer = document.getElementById('videoContainer');
            var video = document.getElementById('video');
            var videoControls = document.getElementById('video-controls');
    
            // Display the user defined video controls
            videoControls.style.display = 'block';
            
        }
    
        var playpause = document.getElementById('playpause');
        var stop = document.getElementById('stop');
        var mute = document.getElementById('mute');
        var volinc = document.getElementById('volinc');
        var voldec = document.getElementById('voldec');
        var progress = document.getElementById('progress');
        var progressBar = document.getElementById('progress-bar');
        var fullscreen = document.getElementById('fs');
    
        playpause.addEventListener('click', function(e) {
            if (video.paused || video.ended) video.play();
            else video.pause();
         });
    
         stop.addEventListener('click', function(e) {
            video.pause();
            video.currentTime = 0;
            progress.value = 0;
         });
    
         mute.addEventListener('click', function(e) {
            video.muted = !video.muted;
         });
    
         volinc.addEventListener('click', function(e) {
            alterVolume('+');
         });
         voldec.addEventListener('click', function(e) {
            alterVolume('-');
         });
    
         var alterVolume = function(dir) {
            var currentVolume = Math.floor(video.volume * 10) / 10;
            if (dir === '+') {
               if (currentVolume < 1) video.volume += 0.1;
            }
            else if (dir === '-') {
               if (currentVolume > 0) video.volume -= 0.1;
            }
         }
    
         video.addEventListener('loadedmetadata', function() {
            progress.setAttribute('max', video.duration);
         });
    
         video.addEventListener('timeupdate', function() {
            if (!progress.getAttribute('max')) progress.setAttribute('max', video.duration);
            progress.value = video.currentTime;
            progressBar.style.width = Math.floor((video.currentTime / video.duration) * 100) + '%';
         });
    
         progress.addEventListener('click', function(e) {
            var rect = this.getBoundingClientRect();
            var pos = (e.pageX  - rect.left) / this.offsetWidth;
            video.currentTime = pos * video.duration;
         });

        videoControls.setAttribute('data-state', 'visible');*/
    });

    return (
        <div className="hero">
            <div className="video-player-container">
                <div className="video-player">
                    <h1 className="music-name no-padding"><span>{details.title}</span></h1>
                    <figure className="video-container" id="videoContainer" >
                        <video onContextMenu={ e => {return false;}} controlsList="nodownload" controls id="video" width="640" height="480">
                            <source src={temp_url} type={mediatype}/>
                        </video>
                    </figure>

                    <div className="artist-name"><span>{details.artist}</span></div>
                    <div className="disk"></div>
                </div>
            </div>
        </div>
    )
}
export default withContext(VideoPlayer);