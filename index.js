let btns = {
  A: 65,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

let userInput = [];
let userInputEl = document.querySelector(".user-input");
let songCorrectAudio = document.querySelector("#song-correct");

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
    audio: document.querySelector("#prelude-of-light")
  },
  {
    name: "minuetOfForest",
    input: [btns.A, btns.UP, btns.LEFT, btns.RIGHT, btns.LEFT, btns.RIGHT],
    audio: document.querySelector("#minuet-of-forest")
  },
  {
    name: "boleroOfFire",
    input: [btns.DOWN, btns.A, btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.RIGHT, btns.DOWN],
    audio: document.querySelector("#bolero-of-fire")
  },
  {
    name: "serenadeOfWater",
    input: [btns.A, btns.DOWN, btns.RIGHT, btns.RIGHT, btns.LEFT],
    audio: document.querySelector("#serenade-of-water")
  },
  {
    name: "nocturneOfShadow",
    input: [btns.LEFT, btns.RIGHT, btns.RIGHT, btns.A, btns.LEFT, btns.RIGHT, btns.DOWN],
    audio: document.querySelector("#nocturne-of-shadow")
  },
  {
    name: "requiemOfSpirit",
    input: [btns.A, btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.A],
    audio: document.querySelector("#requiem-of-spirit")
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

function playSound(event) {
  let keyCode = event.keyCode;
  let audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  const key = document.querySelector(`.key[data-key="${keyCode}"]`);
  if (!audio) return; //stops function from running! wow!
  audio.currentTime = 0; //rewinds audio to the start
  audio.play();
  key.classList.add("playing");

  if (userInput.length === 8) {
    userInput.shift();
  }
  userInput.push(keyCode);

  userInputEl.innerHTML = userInput.join(", ");

  for (let song of songLibrary) {
    let songLength = song.input.length;
    let userInputCopy = [...userInput];

    if (userInputCopy.length > songLength) {
      userInputCopy.splice(0, userInputCopy.length - songLength);
    }

    if (areArraysEqual(song.input, userInputCopy)) {
      playSong(song.audio);
      break;
    }
  }

  console.log(userInput);
}

function playSong(songAudio) {
  userInput = [];
  userInputEl.innerHTML = userInput.join(", ");

  songCorrectAudio.currentTime = 0;
  songCorrectAudio.play();
  setTimeout(function() {
    songAudio.currentTime = 0;
    songAudio.play();
  }, 200);
}

function removeTransition(event) {
  if (event.propertyName !== "transform") return;
  this.classList.remove("playing");
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

const keys = document.querySelectorAll(".key");
keys.forEach(key => key.addEventListener("transitionend", removeTransition));

window.addEventListener("keydown", playSound);
