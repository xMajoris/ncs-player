const playlist = [
  { id: "A_AtqKMqPUE", title: "Defeat The Night", artist: "JPB" },
  { id: "6FNHe3kf8_s", title: "Different Heaven", artist: "Nekozilla" },
  { id: "bJ-ldzTkJEA", title: "Candyland", artist: "Tobu" },
  { id: "J2X5mJ3HDYE", title: "Invincible", artist: "DEAF KEV" },
  { id: "3nQNiWdeH2Q", title: "Heroes Tonight", artist: "Janji" },
  { id: "1KqQQHpQc8w", title: "Cloud 9", artist: "Itro & Tobu" },
  { id: "p7ZsBPK656s", title: "On & On", artist: "Cartoon" },
  { id: "C6IaUMAg3Dc", title: "We Are", artist: "Jo Cohen & Sex Whales" },
  { id: "zyXmsVwZqX4", title: "Why We Lose", artist: "Cartoon" },
  { id: "L7kF4MXXCoA", title: "Dreams pt. II", artist: "Lost Sky" },
  { id: "n4tK7LYFxI0", title: "Shine", artist: "Spektrem" },
  { id: "yHLtE1wFeRQ", title: "Linked", artist: "Jim Yosef & Anne Yvette" },
  { id: "q1ULJ92aldE", title: "Feel Good", artist: "Syn Cole" },
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
let player;
let isMuted = false;
let previousVolume = 80;

const playBtn = document.querySelector(".play");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const albumArt = document.querySelector("#albumCover");
const songTitleDisplay = document.querySelector(".music-title");

const volumeWrapper = document.querySelector(".volume-control-wrapper");
const volIconBtn = document.querySelector(".vol-icon");
const volumeSlider = document.querySelector(".volume-slider");

const tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

window.onYouTubeIframeAPIReady = function() {
  player = new YT.Player('ytPlayer', {
    height: '0',
    width: '0',
    videoId: playlist[currentSongIndex].id,
    playerVars: { 'playsinline': 1, 'controls': 0 },
    events: { 'onReady': onPlayerReady, 'onStateChange': onPlayerStateChange }
  });
};

function onPlayerReady(event) {
  updateMetadata();
  player.setVolume(previousVolume);
  volumeSlider.value = previousVolume;
}

function updateMetadata() {
  const currentSong = playlist[currentSongIndex];
  albumArt.style.opacity = 0;
  songTitleDisplay.style.opacity = 0;
  setTimeout(() => {
    albumArt.src = `https://img.youtube.com/vi/${currentSong.id}/hqdefault.jpg`;
    songTitleDisplay.innerText = `${currentSong.title} - ${currentSong.artist}`;
    albumArt.style.opacity = 1;
    songTitleDisplay.style.opacity = 1;
  }, 200);
}

function onPlayerStateChange(event) {
  if (event.data === YT.PlayerState.PLAYING) {
    isPlaying = true;
    playBtn.innerText = "⏸";
  } else if (event.data === YT.PlayerState.PAUSED) {
    isPlaying = false;
    playBtn.innerText = "▶";
  }
}

function loadSong() {
  updateMetadata();
  if (player && typeof player.loadVideoById === 'function') {
    player.loadVideoById(playlist[currentSongIndex].id);
    isPlaying = true;
    playBtn.innerText = "⏸";
  }
}

playBtn.addEventListener("click", function () {
  if (!player) return;
  if (isPlaying) player.pauseVideo();
  else player.playVideo();
});

nextBtn.addEventListener("click", function () {
  currentSongIndex++;
  if (currentSongIndex >= playlist.length) currentSongIndex = 0;
  loadSong();
});

prevBtn.addEventListener("click", function () {
  currentSongIndex--;
  if (currentSongIndex < 0) currentSongIndex = playlist.length - 1;
  loadSong();
});

volIconBtn.addEventListener("click", function() {
  if (!volumeWrapper.classList.contains('show-slider')) {
    volumeWrapper.classList.add('show-slider');
  } else {
    toggleMute();
  }
});

function toggleMute() {
  if (!player) return;
  if (player.isMuted()) {
    player.unMute();
    isMuted = false;
    volIconBtn.innerText = "🔊";
    volumeSlider.value = previousVolume; 
  } else {
    player.mute();
    isMuted = true;
    previousVolume = player.getVolume();
    volIconBtn.innerText = "🔇";
    volumeSlider.value = 0;
  }
}

document.addEventListener('click', function(event) {
  const isClickInside = volumeWrapper.contains(event.target);
  if (!isClickInside && volumeWrapper.classList.contains('show-slider')) {
    volumeWrapper.classList.remove('show-slider');
  }
});

volumeSlider.addEventListener("input", function() {
  if (!player) return;
  
  const newVol = this.value;
  player.setVolume(newVol);
  
  if (newVol == 0) {
    volIconBtn.innerText = "🔇";
    player.mute();
    isMuted = true;
  } else {
    player.unMute();
    isMuted = false;
    if (newVol > 50) {
        volIconBtn.innerText = "🔊";
    } else {
        volIconBtn.innerText = "🔉";
    }
  }
});