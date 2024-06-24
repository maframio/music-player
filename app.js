const menuBtn = document.querySelector(".menu-btn");

const conteiner = document.querySelector(".conteiner");

const progressBar = document.querySelector(".bar");
const currentTimeElement = document.querySelector(".current-time");
const durationElement = document.querySelector(".duration");
const progressDot = document.querySelector(".dot");

menuBtn.addEventListener('click', ()=>{
    conteiner.classList.toggle("active");
})

let playing = false;
let currentSong = 0;
let audio = new Audio();

// lista de músicas
const songs =[
    {
        title: "Bem mais que tudo",
        artist: "Aline Barros",
        img_src: "imgs/aline_barros.jpeg",
        src: "musicas/Bem Mais Que Tudo.mp3"
    },

    {
        title: "Redenção",
        artist: "Fernanda Brum",
        img_src: "imgs/fernanda_brum.jpg",
        src: "musicas/Redenção.mp3"
    },

    {
        title: "Quando Jesus Estendeu a Sua Mão",
        artist: "Josafá Souza",
        img_src: "imgs/josafa.jpeg",
        src: "./musicas/Quando Jesus Estendeu a Sua Mão.mp3"
    },

    {
        title: "Se Isso Não For Amor",
        artist: "Samuel Mariano",
        img_src: "imgs/samuel_mariano.jpeg",
        src: "musicas/isso.mp3"
    },
    {
        title: "Quase Morri",
        artist: "Marco Antonio",
        img_src: "imgs/marco_antonio.jpeg",
        src: "musicas/Quase Morri.mp3"
    },

]

const playListConteiner = document.querySelector("#playlist");
const infoWrapper = document.querySelector(".info");
const coverImage = document.querySelector(".cover-image");
const currentSongTitle = document.querySelector(".current-song-title");

function init(){
    updatePlaylist(songs);
    loadSong(currentSong);
}


function updatePlaylist(songs){
    // removendo qualquer elemento existente
    playListConteiner.innerHTML = "";

    // percorrendo o array de músicas 
    songs.forEach((song, index) => {
        // extraind nome e fonte da música
        const {title, artist, img_src, src} = song;

        // criando um linha(tr) na tabela para colocar uma música
        const tr = document.createElement("tr");
        tr.classList.add("song");
        tr.innerHTML = `
            <td class="no">
                <h5>${index+1}</h5>
            </td>

            <td class="title">
                <h6>${title}</h6>
            </td>

            <td class="length">
                <h5></h>4:45</h5>
            </td>

                            
        `;

        playListConteiner.appendChild(tr);


        // tocando o audio quando for clicado
        tr.addEventListener("click", (e)=>{
            currentSong = index;
            loadSong(currentSong);
            audio.play();
            conteiner.classList.remove("active");
            playPauseBtn.classList.replace("fa-play", "fa-pause");
            playing = true;
        });
        //obtendo a duração do audio
        const audioForDuration = new Audio(src);
        audioForDuration.addEventListener("loadedmetadata", ()=>{
            const duration = audioForDuration.duration;

            let songDuration = formatTime(duration);
            tr.querySelector(".length h5").innerText = songDuration;
        })

    });

}

function formatTime(time){
    let minutes = Math.floor(time / 60);
    let seconds = Math.floor(time % 60); // arrendondando os segundos

    return `${minutes}:${seconds}`;
}


// carregando as músicas 
function loadSong(index){
    // mudando o nome do som e do artistas na info do player
    infoWrapper.innerHTML = `
        <h2>${songs[index].title}</h2>
        <h3>${songs[index].artist}</h3>
    `
    audio.src = `${songs[index].src}`;
    // console.log(songs[index].src);

    // mudando a capa da som 
    coverImage.style.backgroundImage = `url(${songs[index].img_src})`;

    // mudando o titulo do som atual
    currentSongTitle.innerHTML = `${songs[index].title}`;
}

// play pause next e prev funcionalidades
const playPauseBtn = document.querySelector("#playpause");
const prev = document.querySelector("#prev");
const next = document.querySelector("#next");

playPauseBtn.addEventListener("click", ()=>{
    if(playing){
        playPauseBtn.classList.replace('fa-pause', 'fa-play');
        playing = false;
        audio.pause();
    }else{
        playPauseBtn.classList.replace('fa-play', 'fa-pause');
        playing = true;
        audio.play();
        
    }
});



function nextSong(){
    // se ainda houver músicas na lista ir para a proxima
    if(currentSong < songs.length -1){
        currentSong++;
    }else{
        currentSong = 0;
    }
    loadSong(currentSong);

    if(playing){
        audio.play();
    }
}

next.addEventListener('click', nextSong);


function prevSong(){
    if(currentSong > 0){
        currentSong--;
    }else{
        currentSong = songs.length -1
    }

    loadSong(currentSong);


    if(playing){
        audio.play();
    }
}

prev.addEventListener("click", prevSong);


// adicionando uma barra de progresso
function progress(){
    let {duration, currentTime} = audio;

    isNaN(duration) ? duration = 0 : duration;
    isNaN(currentTime) ? currentTime = 0 : currentTime;

    currentTimeElement.innerHTML = formatTime(currentTime);
    durationElement.innerHTML = formatTime(duration);

    // movendo a barra de progresso
    let progressPorcentage = (currentTime / duration) * 100;
    progressDot.style.left = `${progressPorcentage}%`;

}

audio.addEventListener("timeupdate", progress);


// mudando o lugar onde toca a música conforme o click
function setProgress(e){
    let width = this.clientWidth;
    let clickx = e.offsetX;
    let duration = audio.duration;
    
    audio.currentTime = (clickx / width) * duration;
}

progressBar.addEventListener("click", setProgress);

// chamanda de funcões
init();