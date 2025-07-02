"use client";
import React, { useState } from "react";
import * as Tone from "tone";

// Ejemplo de librería de samples (puedes cargar más dinámicamente)
const sampleLibrary = [
  { name: "Kick", url: "/samples/mixdown (1).wav" },
  // Añade más samples aquí
];

const BeatProducer = () => {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const playSample = async (url: string) => {
    const audio = new Audio(url);
    audio.play();
  };

  const playNote = async () => {
    await Tone.start(); // Necesario por políticas del navegador
    const synth = new Tone.Synth().toDestination();
    synth.triggerAttackRelease("C4", "8n");
  };

  return (
    <div>
      <h2>Beat Producer</h2>
      <div>
        <h3>Librería de Samples</h3>
        <ul>
          {sampleLibrary.map((sample) => (
            <li key={sample.name}>
              <button
                onClick={() => {
                  setSelectedSample(sample.name);
                  playSample(sample.url);
                  playNote()
                }}
              >
                {sample.name}
              </button>
            </li>
          ))}
        </ul>
      </div>
      {/* Aquí puedes añadir un secuenciador, pads, drag & drop, etc. */}
      {selectedSample && <p>Sample seleccionado: {selectedSample}</p>}
    </div>
  );
};

export default BeatProducer;
