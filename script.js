console.log("Welcome to Spotify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio("songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let songItemPlay = Array.from(document.getElementsByClassName('songItemPlay'));


let songs = [
    { songName: "Badri Ki Dulhania(Title Track)", filePath: "songs/1.mp3", coverPath: "covers/1.jpeg" },
    { songName: "Aankh Marey - SIMMBA", filePath: "songs/2.mp3", coverPath: "covers/2.jpeg" },
    { songName: "Tere Vaaste - Zara Hatke Zara Bachke", filePath: "songs/3.mp3", coverPath: "covers/3.jpeg" },
    { songName: "Kesariya - Brahmastra", filePath: "songs/4.mp3", coverPath: "covers/4.jpeg" },
    { songName: "The Wakhra Song - Judgemental Hai Kya", filePath: "songs/5.mp3", coverPath: "covers/5.jpeg" },
    { songName: "Raataan Lambiyan - Shershaah", filePath: "songs/6.mp3", coverPath: "covers/6.jpeg" },
    { songName: "Dil Diya Gallan - Tiger Zinda Hai", filePath: "songs/7.mp3", coverPath: "covers/7.jpeg" },
    { songName: "Dekhte Dekhte - Batti Gul Meter Chalu", filePath: "songs/8.mp3", coverPath: "covers/8.jpeg" },
    { songName: "Aaye Ho Meri Zindagi Mein - Raja Hindustani", filePath: "songs/9.mp3", coverPath: "covers/9.jpeg" },
    { songName: "Do Pal - Veer Zara", filePath: "songs/10.mp3", coverPath: "covers/10.jpeg" },
]

//Set Song name & Song Cover by Javascript
songItems.forEach((element, i) => {
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
})


// Handle play/pause by click
masterPlay.addEventListener('click', () => {
    if (audioElement.paused || audioElement.currentTime <= 0) {
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
        
        document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-play-circle');
        document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-pause-circle');
    }
    else {
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;

        document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-play-circle');
        document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-pause-circle');
    }
})


// Listen to Events
audioElement.addEventListener('timeupdate', () => {
    // Update Seekbar
    progress = audioElement.currentTime / audioElement.duration * 100;
    myProgressBar.value = progress;

    
   if(myProgressBar.value >= 100)
{ 
    if(songIndex<=8)
    {
    songIndex += 1;
    
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-pause-circle');
    document.getElementsByClassName("songItemPlay")[songIndex-1].classList.add('fa-play-circle');
    document.getElementsByClassName("songItemPlay")[songIndex-1].classList.remove('fa-pause-circle');
    }
}

})

myProgressBar.addEventListener('change', () => {
    audioElement.currentTime = myProgressBar.value * audioElement.duration / 100;
})



const makeAllPlays = () => {
    songItemPlay.forEach((element) => {
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

songItemPlay.forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        if(audioElement.paused || audioElement.currentTime <= 0)
        {
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle'); 
    }   
    else{
        audioElement.pause();
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.add('fa-play-circle');
        e.target.classList.remove('fa-pause-circle');
        audioElement.src = `songs/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        gif.style.opacity = 0;
        //  document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-play-circle');
        //  document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        masterPlay.classList.remove('fa-pause-circle'); 
    }
    })
})


document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-pause-circle');
  
})

document.getElementById('previous').addEventListener('click', () => {

    if (songIndex <= 0) {
        songIndex = 10
    }
    else {
        songIndex -= 1;
    }
    makeAllPlays();
    audioElement.src = `songs/${songIndex + 1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.remove('fa-play-circle');
    document.getElementsByClassName("songItemPlay")[songIndex].classList.add('fa-pause-circle');
})

