import React, { useEffect, useMemo, useRef, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const [song, setSong] = useState("amine");

  const vocals = useRef(new Audio("./audio/amine/vocals.mp3"));
  const bass = useRef(new Audio("./audio/amine/bass.mp3"));
  const drums = useRef(new Audio("./audio/amine/drums.mp3"));
  const other = useRef(new Audio("./audio/amine/other.mp3"));

  useEffect(() => {
    vocals.current.pause();
    bass.current.pause();
    drums.current.pause();
    other.current.pause();

    vocals.current = new Audio(`./audio/${song}/vocals.mp3`);
    bass.current = new Audio(`./audio/${song}/bass.mp3`);
    drums.current = new Audio(`./audio/${song}/drums.mp3`);
    other.current = new Audio(`./audio/${song}/other.mp3`);

    vocals.current.play();
    bass.current.play();
    drums.current.play();
    other.current.play();

    return () => {
      vocals.current.pause();
      bass.current.pause();
      drums.current.pause();
      other.current.pause();
    };
  }, [song]);

  return (
    <div>
      <button onClick={() => (song === "amine" ? setSong("jonah") : setSong("amine"))}>Toggle song</button>
      <Slider id="vocals" onChange={(value) => (vocals.current.volume = value / 100)} />
      <Slider id="bass" onChange={(value) => (bass.current.volume = value / 100)} />
      <Slider id="drums" onChange={(value) => (drums.current.volume = value / 100)} />
      <Slider id="other" onChange={(value) => (other.current.volume = value / 100)} />

      <input id={id} type="range" min="0" max="100" value={value} step="1" />
    </div>
  );
}

interface SliderProps {
  onChange: (number: number) => void;
  id: string;
}

const Slider: React.FunctionComponent<SliderProps> = ({ onChange, id }) => {
  const [value, setValue] = useState(100);

  return (
    <div>
      <h3>{id}</h3>
      <input
        id={id}
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => {
          setValue(e.target.valueAsNumber);
          onChange(e.target.valueAsNumber);
        }}
        step="1"
      />
    </div>
  );
};

export default App;
