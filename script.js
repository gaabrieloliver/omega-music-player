const playlistTitle = document.getElementById('playlist-title');
const shuffle = document.getElementById('shuffle');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const repeat = document.getElementById('repeat');
const cover = document.getElementById('cover');
const bandName = document.getElementById('band-name');
const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');

const oTempoMudou = {
    songName : 'O Tempo Mudou',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'album-o-dia-em-que-sera-pra-sempre',
    file : 'O Tempo Mudou'
};

const oDiaQueSeraPraSempre = {
    songName : 'O Dia Que Será Pra Sempre',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'album-o-dia-em-que-sera-pra-sempre',
    file : 'O Dia Que Será Pra Sempre'
};



let isPlaying = false;



function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true ){
        pauseSong();
    } 
    else {
        playSong();
    }
}

play.addEventListener('click', playPauseDecider);

