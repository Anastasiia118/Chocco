let player;
const playerContainer = $('.player');

let eventsInit = () => {
    $(".player__start").click(e => {
        e.preventDefault();

        const btn = $(e.currentTarget);

        if(playerContainer.hasClass('paused')) {
            player.pauseVideo();
        } else {
            
            player.playVideo();
        }
    });

    $(".player__playback").click( e => {
        const bar = $(e.currentTarget); 
        const clickedPosition =  e.originalEvent.layerX;
        const newButtonPositionPercent = (clickedPosition / bar.width()) * 100;
        const newPlaybackPositionSec = (player.getDuration() / 100) * newButtonPositionPercent;

        $(".player__playback-button").css({
            left: `${newButtonPositionPercent}%`
        });

        player.seekTo(newPlaybackPositionSec);
    });

    $(".player__splash").click(e => {
        player.playVideo();
    })
};

const formatTime = timeSec => {
    const roundTime = Math.round(timeSec);

    const minutes = addZero(Math.floor(roundTime / 60));
    const seconds = addZero(roundTime - minutes * 60);

    function addZero(num) {
        return num < 10 ? `0${num}` : num;
    }

    return `${minutes} : ${seconds}`;
}

const onPlayerReady = () => {
    let interval;
    const durationSec = player.getDuration();

    $(".player__duration-estimate").text(formatTime(durationSec));

    if(typeof interval != 'undefined') {
        clearInterval(interval);
    }

    interval = setInterval(() => {
        const completedSec = player.getCurrentTime();
        const completedPercent = (completedSec / durationSec) * 100;

        $(".player__playback-button").css({
            left: `${completedPercent}%`
        });

        $(".player__duration-completed").text(formatTime(completedSec));
    }, 1000);
};

const onPlayerStateChange = event => {
    /*
    -1 (unstarted)воспроизведение не начато
    0 (ended)воспроизведение завершено
    1 (playing)воспроизведение
    2 (paused)пауза
    3 (buffering)буферизация
    5 (video cued)видео подают реплики
    */

    switch (event.data) {
        case 1:
            playerContainer.addClass('player--active');
            playerContainer.addClass("paused");
            break;
        case 2:
            playerContainer.removeClass('player--active');
            playerContainer.removeClass("paused");
            break;    

    }
};

function onYouTubeIframeAPIReady() {

    const playerWidth = $("player-section__container").width();
    const playerHeight = $("player-section__container").height();


    player = new YT.Player('yt-player', {
            height: playerHeight,
            width: playerWidth,
            videoId: 'JMpWY1Ozt5I',
            events: {
                onReady: onPlayerReady,
                onStateChange: onPlayerStateChange
            },
            playerVars: {
                controls: 0,
                disablekb: 0,
                showinfo: 0,
                rel: 0,
                autoplay: 0,
                modestbranding: 0
            }
        });
    }

eventsInit();