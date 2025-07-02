"use client"
import React, { useState } from "react";

// Ejemplo de librería de samples (puedes cargar más dinámicamente)
const sampleLibrary = [
  { name: "Kick", url: "/samples/kick.wav" },
  { name: "Snare", url: "/samples/snare.wav" },
  { name: "HiHat", url: "/samples/hihat.wav" },
  // Añade más samples aquí
];

const BeatProducer = () => {
  const [selectedSample, setSelectedSample] = useState<string | null>(null);

  const playSample = async (url: string) => {
    const audio = new Audio(url);
    audio.play();
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