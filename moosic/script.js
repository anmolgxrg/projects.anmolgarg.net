document.addEventListener('DOMContentLoaded', function () {
    var audio = document.getElementById('audioSource');
    var playPauseBtn = document.getElementById('playPauseBtn');
    var progress = document.getElementById('progress');
    var currentTimeDisplay = document.getElementById('currentTime');
    var durationDisplay = document.getElementById('duration');
    
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secondsPart = Math.floor(seconds % 60);
        return minutes + ':' + (secondsPart < 10 ? '0' + secondsPart : secondsPart);
    }

    audio.addEventListener('loadedmetadata', function () {
        durationDisplay.textContent = formatTime(audio.duration);
    });

    audio.addEventListener('timeupdate', function () {
        const percentage = (audio.currentTime / audio.duration) * 100;
        progress.style.width = percentage + '%';
        currentTimeDisplay.textContent = formatTime(audio.currentTime);
    });

    playPauseBtn.addEventListener('click', function () {
        if (audio.paused) {
            audio.play();
            playPauseBtn.textContent = 'Pause';
        } else {
            audio.pause();
            playPauseBtn.textContent = 'Play';
        }
    });

    var playlist = document.getElementById('playlist');
    var links = playlist.getElementsByClassName('songs')[0].getElementsByTagName('a');
    var currentIndex = 0;

    function playSong(index) {
        audio.src = links[index].href;
        audio.play();
    }

    for (let i = 0; i < links.length; i++) {
        links[i].addEventListener('click', function(event) {
            event.preventDefault();
            currentIndex = i;
            playSong(currentIndex);
        }, false);
    }

    document.querySelector('.left-arrow').addEventListener('click', function() {
        if (currentIndex > 0) {
            currentIndex--;
            playSong(currentIndex);
        }
    });

    document.querySelector('.right-arrow').addEventListener('click', function() {
        if (currentIndex < links.length - 1) {
            currentIndex++;
            playSong(currentIndex);
        }
    });

    playSong(0);
});
