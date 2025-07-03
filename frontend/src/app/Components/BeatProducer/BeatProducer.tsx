"use client";
import React, { useState, useRef, useEffect } from "react";
import * as Tone from "tone";
import styles from "./BeatProducer.module.css";

const sampleLibrary = [
  { name: "Kick" },
  { name: "Snare" },
  { name: "Hat" },
  { name: "Clap" },
  { name: "Perc" },
  { name: "808" },
  { name: "Rim" },
  { name: "Crash" },
  { name: "Ride" },
  { name: "Tom" },
  { name: "Open Hat" },
  { name: "Shaker" },
];

const STEPS_PER_COMPAS = 4;

const BeatProducer = () => {
  const [compases, setCompases] = useState(4); // Número de compases
  const totalSteps = compases * STEPS_PER_COMPAS;
  const [sequence, setSequence] = useState(
    sampleLibrary.map(() => Array(totalSteps).fill(false))
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Actualiza la matriz de pasos si cambian los compases
  useEffect(() => {
    setSequence((prev) =>
      prev.map((row) => {
        if (row.length < totalSteps) {
          return [...row, ...Array(totalSteps - row.length).fill(false)];
        } else if (row.length > totalSteps) {
          return row.slice(0, totalSteps);
        }
        return row;
      })
    );
  }, []);

  const playNote = async (name: string) => {
    await Tone.start();
    const synth = new Tone.Synth().toDestination();
    switch (name) {
      case "Kick":
        synth.triggerAttackRelease("D2", "7n");
        break;
      case "Snare":
        synth.triggerAttackRelease("A4", "5n");
        break;
      case "Hat":
        synth.triggerAttackRelease("F#6", "7n");
        break;
      case "Clap":
        synth.triggerAttackRelease("D5", "16n");
        break;
      case "Perc":
        synth.triggerAttackRelease("G4", "16n");
        break;
      case "808":
        synth.triggerAttackRelease("C2", "2n");
        break;
      case "Rim":
        synth.triggerAttackRelease("C#5", "32n");
        break;
      case "Crash":
        synth.triggerAttackRelease("A5", "2n");
        break;
      case "Ride":
        synth.triggerAttackRelease("F5", "2n");
        break;
      case "Tom":
        synth.triggerAttackRelease("E3", "8n");
        break;
      case "Open Hat":
        synth.triggerAttackRelease("A6", "4n");
        break;
      case "Shaker":
        synth.triggerAttackRelease("D6", "16n");
        break;
    }
  };

  const playStep = (step: number) => {
    sequence.forEach((row, sampleIdx) => {
      if (row[step]) playNote(sampleLibrary[sampleIdx].name);
    });
  };

  const togglePlay = () => {
    if (isPlaying) {
      setIsPlaying(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
    } else {
      setIsPlaying(true);
      let step = 0;
      playStep(0);
      setCurrentStep(0);
      intervalRef.current = setInterval(() => {
        step = (step + 1) % totalSteps;
        setCurrentStep(step);
        playStep(step);
      }, 200); // 200ms por paso
    }
  };

  const toggleCell = (sampleIdx: number, stepIdx: number) => {
    setSequence((prev) =>
      prev.map((row, i) =>
        i === sampleIdx
          ? row.map((cell, j) => (j === stepIdx ? !cell : cell))
          : row
      )
    );
  };

  const exportBeat = async () => {
    const BPM = 120; // Puedes hacerlo variable si quieres
    const secondsPerStep = 60 / BPM / STEPS_PER_COMPAS;
    const repeatCompases = compases; // Número de compases a exportar
    const totalStepsToExport = repeatCompases * STEPS_PER_COMPAS;

    // Crea un contexto offline para renderizar el audio
    const sampleRate = 44100;
    const duration = totalStepsToExport * secondsPerStep;
    const offlineCtx = new (window.OfflineAudioContext ||
      window.webkitOfflineAudioContext)(
      1, // mono
      duration * sampleRate,
      sampleRate
    );

    // Usamos un oscilador simple para cada sample (puedes mejorar esto con samples reales)
    sequence.forEach((row, sampleIdx) => {
      row.forEach((active, stepIdx) => {
        if (active && stepIdx < totalStepsToExport) {
          const time = stepIdx * secondsPerStep;
          const osc = offlineCtx.createOscillator();
          const gain = offlineCtx.createGain();

          // Asigna frecuencias distintas por sample
          let freq = 440;
          switch (sampleLibrary[sampleIdx].name) {
            case "Kick":
              freq = 60;
              break;
            case "Snare":
              freq = 220;
              break;
            case "Hat":
              freq = 8000;
              break;
            case "Clap":
              freq = 1200;
              break;
            case "Perc":
              freq = 400;
              break;
            case "808":
              freq = 50;
              break;
            case "Rim":
              freq = 1000;
              break;
            case "Crash":
              freq = 6000;
              break;
            case "Ride":
              freq = 3000;
              break;
            case "Tom":
              freq = 150;
              break;
            case "Open Hat":
              freq = 9000;
              break;
            case "Shaker":
              freq = 7000;
              break;
          }
          osc.type = "sine";
          osc.frequency.value = freq;
          gain.gain.value = 0.2;

          osc.connect(gain).connect(offlineCtx.destination);
          osc.start(time);
          osc.stop(time + 0.1); // Duración corta para cada golpe
        }
      });
    });

    // Renderiza el audio
    const renderedBuffer = await offlineCtx.startRendering();

    // Convierte el buffer a WAV
    function bufferToWave(abuffer: AudioBuffer, len: number) {
      const numOfChan = abuffer.numberOfChannels,
        length = len * numOfChan * 2 + 44,
        buffer = new ArrayBuffer(length),
        view = new DataView(buffer),
        channels = [];
        let sample = 0,
        offset = 0,
        pos = 0;

      // write WAVE header
      setUint32(0x46464952); // "RIFF"
      setUint32(length - 8); // file length - 8
      setUint32(0x45564157); // "WAVE"

      setUint32(0x20746d66); // "fmt " chunk
      setUint32(16); // length = 16
      setUint16(1); // PCM (uncompressed)
      setUint16(numOfChan);
      setUint32(abuffer.sampleRate);
      setUint32(abuffer.sampleRate * 2 * numOfChan); // avg. bytes/sec
      setUint16(numOfChan * 2); // block-align
      setUint16(16); // 16-bit (hardcoded in this demo)

      setUint32(0x61746164); // "data" - chunk
      setUint32(length - pos - 4); // chunk length

      // write interleaved data
      for (let i = 0; i < abuffer.numberOfChannels; i++)
        channels.push(abuffer.getChannelData(i));

      while (pos < length) {
        for (let i = 0; i < numOfChan; i++) {
          // interleave channels
          sample = Math.max(-1, Math.min(1, channels[i][offset])); // clamp
          sample = (0.5 + sample * 0.5) * 65535; // scale to 16-bit unsigned int
          view.setUint16(pos, sample, true); // write 16-bit sample
          pos += 2;
        }
        offset++;
      }

      function setUint16(data: number) {
        view.setUint16(pos, data, true);
        pos += 2;
      }

      function setUint32(data: number) {
        view.setUint32(pos, data, true);
        pos += 4;
      }

      return buffer;
    }

    const wavBuffer = bufferToWave(renderedBuffer, renderedBuffer.length);
    const blob = new Blob([wavBuffer], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);

    // Descarga el archivo
    const a = document.createElement("a");
    a.href = url;
    a.download = "beat.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div className={styles.beatProducer}>
      <h1>Beat Producer</h1>
      <div style={{ marginBottom: "1rem" }}>
        <button onClick={() => setCompases((c) => Math.max(1, c - 1))}>
          -
        </button>
        <span style={{ margin: "0 1rem" }}>{compases} compases</span>
        <button onClick={() => setCompases((c) => c + 1)}>+</button>
      </div>
      <div>
        <table>
          <thead>
            <tr>
              <th>Sample</th>
              {Array.from({ length: totalSteps }).map((_, i) => (
                <th key={i}>{(i % STEPS_PER_COMPAS) + 1}</th>
              ))}
            </tr>
          </thead>
          <tbody className="t-body">
            {sampleLibrary.map((sample, sampleIdx) => (
              <tr key={sample.name}>
                <td>{sample.name}</td>
                {sequence[sampleIdx].map((active, stepIdx) => (
                  <td
                    className={styles.td}
                    key={stepIdx}
                    style={{
                      background:
                        currentStep === stepIdx
                          ? "#a020f0"
                          : active
                          ? "#d1c4e9"
                          : "#fff",
                      border: "1px solid #ccc",
                      cursor: "pointer",
                      width: 24,
                      height: 24,
                    }}
                    onClick={() => toggleCell(sampleIdx, stepIdx)}
                  />
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <button
          className={`${styles.play} bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition mt-4`}
          onClick={togglePlay}
        >
          {isPlaying ? "Parar" : "Reproducir"}
        </button>
      </div>
      <button
        className={`${styles.export} bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded-2xl shadow-md transition mt-4`}
        onClick={exportBeat}
      >
        Exportar
      </button>
    </div>
  );
};

export default BeatProducer;
