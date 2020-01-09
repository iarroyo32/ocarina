const btns = {
  A: 65,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40
};

const keyButtons = [
  {
    keyName: 'A',
    keyCode: 65,
    audio: 'sounds/short-a.wav'
  },
  {
    keyName: 'C-Left',
    keyCode: 37,
    audio: 'sounds/short-cleft.wav'
  },
  {
    keyName: 'C-Up',
    keyCode: 38,
    audio: 'sounds/short-cup.wav'
  },
  {
    keyName: 'C-Right',
    keyCode: 39,
    audio: 'sounds/short-cright.wav'
  },
  {
    keyName: 'C-Down',
    keyCode: 40,
    audio: 'sounds/short-cdown.wav'
  },
];

let songLibrary = [
  {
    name: "the Song of Time",
    input: [btns.RIGHT, btns.A, btns.DOWN, btns.RIGHT, btns.A, btns.DOWN],
    audio: 'sounds/song-of-time.mp3'
  },
  {
    name: "Zelda's Lullaby",
    input: [btns.LEFT, btns.UP, btns.RIGHT, btns.LEFT, btns.UP, btns.RIGHT],
    audio: 'sounds/zelda-lullaby.mp3'
  },
  {
    name: "Saria's Song",
    input: [btns.DOWN, btns.RIGHT, btns.LEFT, btns.DOWN, btns.RIGHT, btns.LEFT],
    audio: 'sounds/saria-song.mp3'
  },
  {
    name: "Epona's Song",
    input: [btns.UP, btns.LEFT, btns.RIGHT, btns.UP, btns.LEFT, btns.RIGHT],
    audio: 'sounds/epona-song.mp3'
  },
  {
    name: "the Sun's Song",
    input: [btns.RIGHT, btns.DOWN, btns.UP, btns.RIGHT, btns.DOWN, btns.UP],
    audio: 'sounds/sun-song.mp3'
  },
  {
    name: "the Song of Storms",
    input: [btns.A, btns.DOWN, btns.UP, btns.A, btns.DOWN, btns.UP],
    audio: 'sounds/song-of-storms.mp3'
  },
  {
    name: "the Song of Healing",
    input: [btns.LEFT, btns.RIGHT, btns.DOWN, btns.LEFT, btns.RIGHT, btns.DOWN],
    audio: 'sounds/song-of-healing.mp3'
  },
  {
    name: "the Song of Soaring",
    input: [btns.DOWN, btns.LEFT, btns.UP, btns.DOWN, btns.LEFT, btns.UP],
    audio: 'sounds/song-of-soaring.mp3'
  },
  {
    name: "the Inverted Song of Time",
    input: [btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.A, btns.RIGHT],
    audio: 'sounds/inverted-song-of-time.mp3'
  },
  {
    name: "the Song of Double Time",
    input: [btns.RIGHT, btns.RIGHT, btns.A, btns.A, btns.DOWN, btns.DOWN],
    audio: 'sounds/song-of-double-time.mp3'
  },
  {
    name: "the Oath to Order",
    input: [btns.RIGHT, btns.DOWN, btns.A, btns.DOWN, btns.RIGHT],
    audio: 'sounds/oath-to-order.mp3'
  },
  {
    name: "the Prelude of Light",
    input: [btns.UP, btns.RIGHT, btns.UP, btns.RIGHT, btns.LEFT, btns.UP],
    audio: 'sounds/prelude-of-light.mp3',
    image: 'images/temple-of-time.jpg'
  },
  {
    name: "the Minuet of Forest",
    input: [btns.A, btns.UP, btns.LEFT, btns.RIGHT, btns.LEFT, btns.RIGHT],
    audio: 'sounds/minuet-of-forest.mp3',
    image: 'images/sacred-forest-meadow.png'
  },
  {
    name: "the Bolero of Fire",
    input: [btns.DOWN, btns.A, btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.RIGHT, btns.DOWN],
    audio: 'sounds/bolero-of-fire.mp3',
    image: 'images/death-mountain-crater.png'
  },
  {
    name: "the Serenade of Water",
    input: [btns.A, btns.DOWN, btns.RIGHT, btns.RIGHT, btns.LEFT],
    audio: 'sounds/serenade-of-water.mp3',
    image: 'images/lake-hylia.png'
  },
  {
    name: "the Nocturne of Shadow",
    input: [btns.LEFT, btns.RIGHT, btns.RIGHT, btns.A, btns.LEFT, btns.RIGHT, btns.DOWN],
    audio: 'sounds/nocturne-of-shadow.mp3',
    image: 'images/kakariko-graveyard.png'
  },
  {
    name: "the Requiem of Spirit",
    input: [btns.A, btns.DOWN, btns.A, btns.RIGHT, btns.DOWN, btns.A],
    audio: 'sounds/requiem-of-spirit.mp3',
    image: 'images/desert-colossus.jpg'
  },
  {
    name: "the Sonata of Awakening",
    input: [btns.UP, btns.LEFT, btns.UP, btns.LEFT, btns.A, btns.RIGHT, btns.A],
    audio: 'sounds/sonata-of-awakening.mp3'
  },
  {
    name: "the Goron Lullaby",
    input: [btns.A, btns.RIGHT, btns.LEFT, btns.A, btns.RIGHT, btns.LEFT, btns.RIGHT, btns.A],
    audio: 'sounds/goron-lullaby.mp3'
  },
  {
    name: "the New Wave Bossa Nova",
    input: [btns.LEFT, btns.UP, btns.LEFT, btns.RIGHT, btns.DOWN, btns.LEFT, btns.RIGHT],
    audio: 'sounds/new-wave-bossa-nova.mp3'
  },
  {
    name: "the Elegy of Emptiness",
    input: [btns.RIGHT, btns.LEFT, btns.RIGHT, btns.DOWN, btns.RIGHT, btns.UP, btns.LEFT],
    audio: 'sounds/elegy-of-emptiness.mp3'
  }
];

const { useState, useRef, useEffect, createRef } = React;

function App() {
  const [keyPlaying, setKeyPlaying] = useState(null);
  const [userInput, setUserInput] = useState([]);
  const [songPlaying, setSongPlaying] = useState(null);
  const [songName, setSongName] = useState(null);
  const [isWarpingOut, setIsWarpingOut] = useState(false);
  const [bgImage, setBgImage] = useState('images/hyrule-field.jpg');
  
  const keyAudioRefs = useRef(createRefMap(keyButtons, 'keyCode'));
  const songAudioRefs = useRef(createRefMap(songLibrary, 'audio'));
  const songCorrectAudioRef = useRef(null);
  const warpOutAudioRef = useRef(null);
  const warpInAudioRef = useRef(null);

  useEffect(() => {
    window.addEventListener("keydown", handleKeydown);
    return () => {
      window.removeEventListener("keydown", handleKeydown);
    };
  });

  useEffect(() => {
    let song = searchSongInLibrary(userInput);
    
    if (song) {
      playSong(song);
      setUserInput([]);
    }
  }, [userInput]);

  function handleKeydown(event) {
    let keyCode = event.keyCode;
    let keyButton = keyButtons.find(keyButton => keyButton.keyCode === keyCode);

    if (keyButton) {
      setKeyPlaying(keyCode);
      updateUserInput(keyCode);
      playSound(keyCode);
    }
  }

  function playSound(keyCode){
    const keyAudioRef = keyAudioRefs.current[keyCode];
    if (!keyAudioRef) return;
    playAudio(keyAudioRef.current);
  }

  function playAudio(audio){
    audio.currentTime = 0;
    audio.play();
  }

  function updateUserInput(keyCode){
    let newUserInput = userInput;

    if (userInput.length === 8) {
      newUserInput = userInput.slice(1, userInput.length);
    }

    newUserInput = [...newUserInput, keyCode];

    setUserInput(newUserInput);
  }

  function searchSongInLibrary(userInput) {
    for (let song of songLibrary) {
      let songLength = song.input.length;
      let userInputCopy = [...userInput];
  
      if (userInputCopy.length > songLength) {
        userInputCopy.splice(0, userInputCopy.length - songLength);
      }
  
      if (areArraysEqual(song.input, userInputCopy)) {
        return song;
      }
    }
  }

  function playSong(song) {
    playAudio(songCorrectAudioRef.current);

    setTimeout(function() {
      const songAudioRef = songAudioRefs.current[song.audio];
      playAudio(songAudioRef.current);
      setSongPlaying(song);
      setSongName(song.name);
    }, 200);
  }

  function handleSongEnd(){
    if (songPlaying.image) {
      setIsWarpingOut(true);
      playAudio(warpOutAudioRef.current);
    }
    setSongName('');
  }

  function handleWarpOutEnd() {
    if (!isWarpingOut) return;
    setIsWarpingOut(false);
  
    setBgImage(songPlaying.image);
    playAudio(warpInAudioRef.current);
    setSongPlaying(null);
  }

  function removeKeyTransition(event) {
    if (event.propertyName !== "transform") return;
    setKeyPlaying(null);
  }

  function createRefMap(arr, key) {
    let map = {};
    arr.forEach(item => {
      map[item[key]] = createRef();
    });
    return map;
  }

  return (
    <div className="app">
      <div
        className="bg-image"
        onTransitionEnd={handleWarpOutEnd}
        style={{
          opacity: isWarpingOut ? 0 : 1,
          backgroundImage: `url(${bgImage})`
        }}
      />

      <div className="interface">

        <div className="user-input">{userInput.join(', ')}</div>
        <div className="song-name">{songName ? `You played ${songName}.` : ''}</div>

        <div className="keys">
          {keyButtons.map(keyButton => (
            <div
              key={keyButton.keyCode}
              className={`key ${keyPlaying === keyButton.keyCode ? 'playing' : ''}`}
              onTransitionEnd={removeKeyTransition}
            >
              <kbd>{keyButton.keyName}</kbd>
              <span className="sound">{keyButton.keyName}</span>
            </div>
          ))}
        </div>

        {keyButtons.map(keyButton => (
          <audio
            key={keyButton.keyCode}
            ref={keyAudioRefs.current[keyButton.keyCode]}
            src={keyButton.audio}
          />
        ))}

        <audio ref={songCorrectAudioRef} src="sounds/song-correct.wav"></audio>
        <audio ref={warpOutAudioRef} src="sounds/warp-out.wav"></audio>
        <audio ref={warpInAudioRef} src="sounds/warp-in.wav"></audio>

        {songLibrary.map(song => (
          <audio
            key={song.audio}
            ref={songAudioRefs.current[song.audio]}
            src={song.audio}
            onEnded={handleSongEnd}
          />
        ))}

      </div>
    </div>
  )
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

ReactDOM.render(
  <App />,
  document.getElementById('root')
);