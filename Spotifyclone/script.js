console.log("Welcome To Spotify Clone by Yashesh")
//intialize variables
let songindex = 0;
let audioElement = new Audio('songs/1.mp3');
let masterplay = document.getElementById('masterplay');
let myprogressbar = document.getElementById('myprogressbar');
let gif = document.getElementById('gif');
let songitems = Array.from(document.getElementsByClassName('songitem'));
let songs = [
    { songName: "Warriyo", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
    { songName: "Cielo", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
    { songName: "Deaf kev", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
    { songName: "Different", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
    { songName: "Janji", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
    { songName: "Rabba-e-ishq", filePath: "songs/6.mp3", coverPath: "covers/6.jpg" },
    { songName: "sakhiyan-e-ishq", filePath: "songs/7.mp3", coverPath: "covers/7.jpg" },
    { songName: "bhula dena-e-ishq", filePath: "songs/8.mp3", coverPath: "covers/8.jpg" },
    { songName: "tumhari kasam-e-ishq", filePath: "songs/9.mp3", coverPath: "covers/9.jpg" }
]

songitems.forEach((element, i) => {
    //console.log(element, i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName;
})
//audioElement.play();
//handle ply/pause
masterplay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else {
        audioElement.pause();
        masterplay.classList.remove('fa-circle-pause');
        masterplay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})
//listen to events
audioElement.addEventListener('timeupdate', () => {
    //console.log('timeupdate')
    //update seekbar

    progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
    //console.log(progress);
    myprogressbar.value = progress;
})

myprogressbar.addEventListener('change', () => {
    audioElement.currentTime = myprogressbar.value * audioElement.duration / 100;
})

const makeallplays = () => {
    Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
        element.target.classList.remove('fa-circle-pause');
        element.target.classList.add('fa-circle-play');
    })
}
Array.from(document.getElementsByClassName('songItemplay')).forEach((element) => {
    element.addEventListener('click', (e) => {
        console.log(e.target);
        makeallplays();
        songindex = parseInt(e.target.id)
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = 'songs/${songindex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterplay.classList.remove('fa-circle-play');
        masterplay.classList.add('fa-circle-pause');
    })
})
//document.getElementById('previous').addEventListener()