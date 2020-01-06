let btns = {
  A: 65,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

let userInputEl = document.querySelector(".user-input");
let bgImageEl = document.querySelector(".bg-image");
let songCorrectAudio = document.querySelector("#song-correct");
let warpOutAudio = document.querySelector("#warp-out");
let warpInAudio = document.querySelector("#warp-in");

let songLibrary = [
  {
    name: "songOfTime",
    input: [btns.RIGHT, btns.A, btns.DOWN, btns.RIGHT, btns.A, btns.DOWN],
    audio: document.querySelector("#song-of-time")
  },
  {
    name: "zeldaLullaby",
    input: [btns.LEFT, btns.UP, btns.RIGHT, btns.LEFT, btns.UP, btns.RIGHT],
    audio: document.querySelector("#zelda-lullaby")
  },
  {
    name: "sariaSong",
    input: [btns.DOWN, btns.RIGHT, btns.LEFT, btns.DOWN, btns.RIGHT, btns.LEFT],
    audio: document.querySelector("#saria-song")
  },
  {
    name: "eponaSong",
    input: [btns.UP, btns.LEFT, btns.RIGHT, btns.UP, btns.LEFT, btns.RIGHT],
    audio: document.querySelector("#epona-song")
  },
  {
    name: "sunSong",
    input: [btns.RIGHT, btns.DOWN, btns.UP, btns.RIGHT, btns.DOWN, btns.UP],
    audio: document.querySelector("#sun-song")
  },
  {
    name: "songOfStorms",
    input: [btns.A, btns.DOWN, btns.UP, btns.A, btns.DOWN, btns.UP],
    audio: document.querySelector("#song-of-storms")
  },
  {
    name: "songOfHealing",
    input: [btns.LEFT, btns.RIGHT, btns.DOWN, btns.LEFT, btns.RIGHT, btns.DOWN],
    audio: document.querySelector("#song-of-healing")
  },
  {
    name: "songOfSoaring",
    input: [btns.DOWN, btns.LEFT, btns.UP, btns.DOWN, btns.LEFT, btns.UP],
    audio: document.querySelector("#song-of-soaring")
  },
  {
    name: "invertedSongofTime",
    input: [btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.A, btns.RIGHT],
    audio: document.querySelector("#inverted-song-of-time")
  },
  {
    name: "songOfDoubleTime",
    input: [btns.RIGHT, btns.RIGHT, btns.A, btns.A, btns.DOWN, btns.DOWN],
    audio: document.querySelector("#song-of-double-time")
  },
  {
    name: "oathToOrder",
    input: [btns.RIGHT, btns.DOWN, btns.A, btns.DOWN, btns.RIGHT],
    audio: document.querySelector("#oath-to-order")
  },
  {
    name: "preludeOfLight",
    input: [btns.UP, btns.RIGHT, btns.UP, btns.RIGHT, btns.LEFT, btns.UP],
    audio: document.querySelector("#prelude-of-light"),
    image: 'images/temple-of-time.jpg',
  },
  {
    name: "minuetOfForest",
    input: [btns.A, btns.UP, btns.LEFT, btns.RIGHT, btns.LEFT, btns.RIGHT],
    audio: document.querySelector("#minuet-of-forest"),
    image: 'images/sacred-forest-meadow.png',
  },
  {
    name: "boleroOfFire",
    input: [btns.DOWN, btns.A, btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.RIGHT, btns.DOWN],
    audio: document.querySelector("#bolero-of-fire"),
    image: 'images/death-mountain-crater.png',
  },
  {
    name: "serenadeOfWater",
    input: [btns.A, btns.DOWN, btns.RIGHT, btns.RIGHT, btns.LEFT],
    audio: document.querySelector("#serenade-of-water"),
    image: 'images/lake-hylia.png',
  },
  {
    name: "nocturneOfShadow",
    input: [btns.LEFT, btns.RIGHT, btns.RIGHT, btns.A, btns.LEFT, btns.RIGHT, btns.DOWN],
    audio: document.querySelector("#nocturne-of-shadow"),
    image: 'images/kakariko-graveyard.png',
  },
  {
    name: "requiemOfSpirit",
    input: [btns.A, btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.A],
    audio: document.querySelector("#requiem-of-spirit"),
    image: 'images/desert-colossus.jpg',
  },
  {
    name: "sonataOfAwakening",
    input: [btns.UP, btns.LEFT, btns.UP, btns.LEFT, btns.A, btns.RIGHT, btns.A],
    audio: document.querySelector("#sonata-of-awakening")
  },
  {
    name: "goronLullaby",
    input: [btns.A, btns.RIGHT, btns.LEFT, btns.A, btns.RIGHT, btns.LEFT, btns.RIGHT, btns.A],
    audio: document.querySelector("#goron-lullaby")
  },
  {
    name: "newWaveBossaNova",
    input: [btns.LEFT, btns.UP, btns.LEFT, btns.RIGHT, btns.DOWN, btns.LEFT, btns.RIGHT],
    audio: document.querySelector("#new-wave-bossa-nova")
  },
  {
    name: "elegyOfEmptiness",
    input: [btns.RIGHT, btns.LEFT, btns.RIGHT, btns.DOWN, btns.RIGHT, btns.UP, btns.LEFT],
    audio: document.querySelector("#elegy-of-emptiness")
  }
];

let state = {
  userInput: [],
  songPlaying: null,
}



init();

function init(){
  const keys = document.querySelectorAll(".key");
  keys.forEach(key => key.addEventListener("transitionend", removeKeyTransition));
  songLibrary.forEach(song => song.audio.addEventListener("ended", handleSongEnd));
  bgImageEl.addEventListener("transitionend", handleBgTransitionEnd);
  window.addEventListener("keydown", handleKeydown);
}

function handleKeydown(event) {
  let keyCode = event.keyCode;
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!key) return;
  key.classList.add("playing");

  playSound(keyCode);

  updateUserInput(keyCode);
  
  let song = searchSongInLibrary();
  if(song) {
    playSong(song);
    clearUserInput();
    }
  }

function playSound(keyCode){
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  if (!audio) return;
  playAudio(audio);
}

function updateUserInput(keyCode){
  if (state.userInput.length === 8) {
    state.userInput.shift();
  }
  state.userInput.push(keyCode);

  userInputEl.innerHTML = state.userInput.join(", ");
}

function clearUserInput(){
  state.userInput = [];
  userInputEl.innerHTML = '';
}

function searchSongInLibrary(){
  for (let song of songLibrary) {
    let songLength = song.input.length;
    let userInputCopy = [...state.userInput];

    if (userInputCopy.length > songLength) {
      userInputCopy.splice(0, userInputCopy.length - songLength);
    }

    if (areArraysEqual(song.input, userInputCopy)) {
      return song;
    }
  }
}

function playSong(song) {
  playAudio(songCorrectAudio)
  setTimeout(function() {
    playAudio(song.audio)
    state.songPlaying = song;
  }, 200);
}

function handleSongEnd(){
  if(state.songPlaying.image){
    bgImageEl.style.opacity = 0;
    playAudio(warpOutAudio);
  }
}
  
function handleBgTransitionEnd(){
  if (bgImageEl.style.opacity === '1') return;

  bgImageEl.style.backgroundImage = `url(${state.songPlaying.image})`;
  bgImageEl.style.opacity = 1;
  playAudio(warpInAudio);
}

function removeKeyTransition(event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("playing");
}

function playAudio(audio){
  audio.currentTime = 0;
  audio.play();
}

function areArraysEqual(arr1, arr2) {
  if (arr1.length !== arr2.length) {
    return false;
  }

  let areEqual = true;

  arr1.forEach(function(value, index) {
    if (arr1[index] !== arr2[index]) {
      areEqual = false;
    }
  });
  return areEqual;
}
