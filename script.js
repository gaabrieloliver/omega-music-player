const playlistTitle = document.getElementById('playlist-title');
const repeatButton = document.getElementById('repeat');
const previous = document.getElementById('previous');
const next = document.getElementById('next');
const cover = document.getElementById('cover');
const bandName = document.getElementById('band-name');
const songName = document.getElementById('song-name');
const song = document.getElementById('audio');
const play = document.getElementById('play');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');
const likeButton = document.getElementById('like');


const oTempoMudou = {
    songName : 'O Tempo Mudou',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'o_tempo_mudou',
    liked : false,
};

const oDiaQueSeraPraSempre = {
    songName : 'O Dia Que Será Pra Sempre',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'o_dia_que_sera_pra_sempre',
    liked : false,
};

const pisaduras = {
    songName : 'Pisaduras',
    artist : 'Rodolfo Abrantes',
    bandName : 'Rodolfo Abrantes',
    file : 'pisaduras',
    liked : false,
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;
const originalPlaylist = JSON.parse(localStorage.getItem('playlist')) ?? [oTempoMudou, oDiaQueSeraPraSempre, pisaduras];
let sortedPlaylist = [...originalPlaylist]; /* ... === spread(espalhar)*/
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

//apenas parte visual
function likeButtonRender() {
    if (sortedPlaylist[index].liked === true) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active');
    } else {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active');
    }
}

function initializeSong(){ 
    cover.src = `images/${sortedPlaylist[index].file}.jpeg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
    likeButtonRender();
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    }
    else {
        // index = index - 1;
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    }
    else {
        // index = index - 1;
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgress(){
    song.currentTime
    song.duration
    const barWidth = (song.currentTime/song.duration)*100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
    songTime.innerText = toHHMMSS(song.currentTime);

}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX
    const jumpToTime = (clickPosition/width) * song.duration;
    song.currentTime = jumpToTime;
}

// embaralha um array
function shuffleArray(preShufleArray){
    const size = preShufleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0){
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShufleArray[currentIndex];
        preShufleArray[currentIndex] = preShufleArray[randomIndex];
        preShufleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if(isShuffled === false){
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    } else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function likeButtonClicked() {
    if(sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    } else {
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
    localStorage.setItem('playlist', JSON.stringify(originalPlaylist));
}

function repeatButtonClicked() {
    if(repeatOn === false){
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }

}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    } else {
        playSong();
    }
}

// Utilização do return
function toHHMMSS(originalNumber) {
    let hours = Math.floor(originalNumber/3600);
    let min = Math.floor((originalNumber - hours * 3600)/60);
    let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function updateTotalTime() {
    totalTime.innerText = toHHMMSS(song.duration);
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('ended', nextOrRepeat);
song.addEventListener('loadedmetadata', updateTotalTime);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
