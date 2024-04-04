const playlistTitle = document.getElementById('playlist-title');
const shuffle = document.getElementById('shuffle');
const repeat = document.getElementById('repeat');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const cover = document.getElementById('cover');
const bandName = document.getElementById('band-name');
const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const currentProgress = document.getElementById('current-progress');

const oTempoMudou = {
    songName : 'O Tempo Mudou',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'o_tempo_mudou',
};

const oDiaQueSeraPraSempre = {
    songName : 'O Dia Que Será Pra Sempre',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'o_dia_que_sera_pra_sempre'
};

const pisaduras = {
    songName : 'Pisaduras',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'pisaduras'
};

let isPlaying = false;
const playlist = [oTempoMudou, oDiaQueSeraPraSempre, pisaduras];
let index = 0;

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

function initializeSong(){
    cover.src = `images/${playlist[index].file}.jpeg`;
    song.src = `songs/${playlist[index].file}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong() {
    if (index === 0) {
        index = playlist.length - 1;
    }
    else {
        // index = index - 1;
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === playlist.length - 1) {
        index = 0;
    }
    else {
        // index = index - 1;
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar(){
    song.currentTime
    song.duration
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);

