const video = document.querySelector('#player');
const durationControl = document.querySelector('#durationLevel');
const soundControl = document.querySelector('#micLevel');

const playButtonVideo = document.querySelector('.video-player__img');


let intervalId;
let soundLevel;
const MAX_SOUND_VALUE = 10;
const NORMAL_UPDATE_RANGE = 1000;

document.addEventListener('DOMContentLoaded', function(){

    video.addEventListener('canplaythrough', ()=>{
        durationControl.max = video.duration;
    })

    durationControl.min = 0;
    durationControl.value = 0;

    soundControl.min = 0;
    soundControl.max = MAX_SOUND_VALUE;

    initPlayButton();
    addListener();


});

function initPlayButton(){
    const playButtons = document.querySelectorAll('.play');
    playButtons.forEach(button => {
        button.addEventListener('click', playStop)
    })

    const micControl = document.querySelector('#mic');
    micControl.addEventListener('click', soundOf)
}

function addListener(){
    video.addEventListener('click', playStop)

    durationControl.addEventListener('click', setVideoDuration);
    durationControl.addEventListener('click', stopInterval);

    soundControl.addEventListener('click', changeSoundVolume);
}

function playStop (){
    playButtonVideo.classList.toggle('video-player__img--hidden')

    durationControl.max = video.duration;

    if(video.paused){
        intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE);
        video.play();
    }else{
       stopInterval()
    }
}

function updateDuration(){
    durationControl.value = video.currentTime;
}

function setVideoDuration(){
    intervalId = setInterval(updateDuration, NORMAL_UPDATE_RANGE)
    video.currentTime = durationControl.value;

    if(video.paused){
        playButtonVideo.classList.add('video-player__img--hidden')
        video.play();
       
    }
}

function stopInterval(){
    video.pause();
    clearInterval(intervalId)
}

function soundOf(){
    if(video.volume === 0){
        video.volume = soundLevel;
        soundControl.value = soundLevel * MAX_SOUND_VALUE;
    } else {
        soundLevel = video.volume;
        video.volume = 0;
        soundControl.value = 0;
    }
}

function changeSoundVolume(){
    video.volume = soundControl.value / MAX_SOUND_VALUE;
}