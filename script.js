const playlist = [
  { file: "songs/Defeat the Night.mp3", cover: "assets/NCS.png", title: "Defeat The Night", artist: "JPB" },
  { file: "songs/Blank.mp3", cover: "assets/NCS.png", title: "Blank", artist: "Disfigure" },
  { file: "songs/Symbolism.mp3", cover: "assets/NCS.png", title: "Symbolism", artist: "Electro-Light" },
  { file: "songs/Sky High.mp3", cover: "assets/NCS.png", title: "Sky High", artist: "Elektronomia" },
  { file: "songs/Nekozilla.mp3", cover: "assets/NCS.png", title: "Nekozilla", artist: "Different Heaven" },
  { file: "songs/Invincible.mp3", cover: "assets/NCS.png", title: "Invincible", artist: "DEAF KEV" },
  { file: "songs/Heroes Tonight.mp3", cover: "assets/NCS.png", title: "Heroes Tonight", artist: "Janji" },
  { file: "songs/On & On.mp3", cover: "assets/NCS.png", title: "On & On", artist: "Cartoon" },
  { file: "songs/Superhero.mp3", cover: "assets/NCS.png", title: "Superhero", artist: "Alex Hagen" },
  { file: "songs/Hellcat.mp3", cover: "assets/NCS.png", title: "Hellcat", artist: "Desmeon" },
  { file: "songs/C U Again.mp3", cover: "assets/NCS.png", title: "C U Again", artist: "Futuristik ft. Mikk mae" },
  { file: "songs/Eclipse.mp3", cover: "assets/NCS.png", title: "Eclipse", artist: "Jim Yosef" },
  { file: "songs/Light It Up.mp3", cover: "assets/NCS.png", title: "Light It Up", artist: "Robin Hustin & Tobimorrow" },
  { file: "songs/Ark.mp3", cover: "assets/NCS.png", title: "Ark", artist: "Ship Wrek" },
  { file: "songs/Turn It Up.mp3", cover: "assets/NCS.png", title: "Turn It Up", artist: "Tobu" },
  { file: "songs/Why Do I.mp3", cover: "assets/NCS.png", title: "Why Do I?", artist: "Unknown Brain ft. Bri Tolani" },
  { file: "songs/MATAFAKA.mp3", cover: "assets/NCS.png", title: "MATAFAKA", artist: "Unknown Brain ft. Marvin Divine" },
  { file: "songs/Stronger.mp3", cover: "assets/NCS.png", title: "Stronger (Raiko Remix)", artist: "Prismo" },
  { file: "songs/Fearless.mp3", cover: "assets/NCS.png", title: "Fearless", artist: "TULE" },
  { file: "songs/Mortals.mp3", cover: "assets/NCS.png", title: "Mortals", artist: "Warriyo ft. Laura Brehm" },
  { file: "songs/Mortals Funk Remix.mp3", cover: "assets/NCS.png", title: "Mortals Funk Remix", artist: "Warriyo & LXNGVX" },
  { file: "songs/We Are.mp3", cover: "assets/NCS.png", title: "We Are", artist: "Jo Cohen & Sex Whales" },
  { file: "songs/Why we lose.mp3", cover: "assets/NCS.png", title: "Why We Lose", artist: "Cartoon" },
  { file: "songs/Dreams pt. II.mp3", cover: "assets/NCS.png", title: "Dreams pt. II", artist: "Lost Sky" },
  { file: "songs/Shine.mp3", cover: "assets/NCS.png", title: "Shine", artist: "Spektrem" },
  { file: "songs/Linked.mp3", cover: "assets/NCS.png", title: "Linked", artist: "Jim Yosef & Anne Yvette" },
  { file: "songs/Feel Good.mp3", cover: "assets/NCS.png", title: "Feel Good", artist: "Syn Cole" }
];

function embaralharPlaylist(lista) {
  for (let i = lista.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [lista[i], lista[j]] = [lista[j], lista[i]];
  }
}
embaralharPlaylist(playlist);

let currentSongIndex = 0;
let isPlaying = false;
let previousVolume = 0.8;

const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const albumArt = document.querySelector("#albumCover");
const songTitleDisplay = document.querySelector(".music-title");

const volIconBtn = document.querySelector(".vol-icon");
const volumeSlider = document.querySelector(".volume-slider");

const audioElement = new Audio();
audioElement.volume = previousVolume;
volumeSlider.value = previousVolume * 100;

function digitarSaudacao() {
  const agora = new Date();
  const hora = agora.getHours();
  let textoSaudacao = "Welcome";

  if (hora >= 5 && hora < 12) {
    textoSaudacao = "Good Morning";
  } else if (hora >= 12 && hora < 18) {
    textoSaudacao = "Good Afternoon";
  } else {
    textoSaudacao = "Good Evening";
  }

  const welcomeElement = document.querySelector(".welcome");
  if (!welcomeElement) return;

  welcomeElement.innerText = "";
  let i = 0;
  const velocidade = 100;

  function escrever() {
    if (i < textoSaudacao.length) {
      welcomeElement.innerText += textoSaudacao.charAt(i);
      i++;
      setTimeout(escrever, velocidade);
    }
  }

  escrever();
}

digitarSaudacao();

function loadSong(shouldPlay = false) {
  const currentSong = playlist[currentSongIndex];
  
  albumArt.style.opacity = 0;
  songTitleDisplay.style.opacity = 0;

  setTimeout(() => {
    albumArt.src = currentSong.cover;
    songTitleDisplay.innerText = `${currentSong.title} - ${currentSong.artist}`;
    albumArt.style.opacity = 1;
    songTitleDisplay.style.opacity = 1;
  }, 200);

  audioElement.src = currentSong.file;
  audioElement.load();

  if (shouldPlay) {
    audioElement.play().then(() => {
      isPlaying = true;
      playBtn.innerText = "⏸";
    }).catch(e => console.log(e));
  }
}

loadSong(false);

playBtn.addEventListener("click", function () {
  if (isPlaying) {
    audioElement.pause();
    isPlaying = false;
    playBtn.innerText = "▶";
  } else {
    audioElement.play().then(() => {
      isPlaying = true;
      playBtn.innerText = "⏸";
    }).catch(e => console.log(e));
  }
});

nextBtn.addEventListener("click", function () {
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) currentSongIndex = 0;
  loadSong(isPlaying);
});

prevBtn.addEventListener("click", function () {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = playlist.length - 1;
  loadSong(isPlaying);
});

audioElement.addEventListener("ended", function() {
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) currentSongIndex = 0;
  loadSong(true);
});

volIconBtn.addEventListener("click", function() {
  toggleMute();
});

function toggleMute() {
  if (audioElement.muted) {
    audioElement.muted = false;
    volIconBtn.innerText = "🔊";
    volumeSlider.value = previousVolume * 100;
  } else {
    audioElement.muted = true;
    previousVolume = audioElement.volume;
    volIconBtn.innerText = "🔇";
    volumeSlider.value = 0;
  }
}

volumeSlider.addEventListener("input", function() {
  const newVol = this.value;
  audioElement.volume = newVol / 100;
  audioElement.muted = false;
  
  if (newVol == 0) {
    volIconBtn.innerText = "🔇";
  } else if (newVol > 50) {
    volIconBtn.innerText = "🔊";
  } else {
    volIconBtn.innerText = "🔉";
  }
});