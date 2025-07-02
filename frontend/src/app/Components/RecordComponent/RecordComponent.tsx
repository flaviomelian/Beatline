"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "./RecordComponent.module.css";
import Track from "../Track/Track";
import { getAllSessions } from "@/app/Services/sessionService";
import { createTrack } from "@/app/Services/tracksService";
import { createAudio } from "@/app/Services/audioService";
import toWav from "audiobuffer-to-wav";

interface Project {
  id: number;
  title: string;
  style: string;
  bpm: number;
}

const RecordComponent: React.FC = () => {
  const [recording, setRecording] = useState(false);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(
    null
  );
  const [audioChunks, setAudioChunks] = useState<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const analyserRef = useRef<AnalyserNode | null>(null);
  const dataArrayRef = useRef<Uint8Array | null>(null);
  const sourceRef = useRef<MediaStreamAudioSourceNode | null>(null);
  const animationIdRef = useRef<number | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioRefs = useRef<Array<HTMLAudioElement | null>>([]);
  const [tracks, setTracks] = useState<{
    color: null; name: string; url: string 
}[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [projects, setProjects] = useState([]);
  const [currentProjectID, setCurrentProjectID] = useState(0);

  useEffect(() => {
    const fecthSessions = async () => {
      const { data } = await getAllSessions();
      setProjects(data);
    };

    fecthSessions();
  }, []);

  const exportAllTracks = async () => {
    // Carga todos los audios y decodifícalos
    const audioCtx = new window.AudioContext();
    const buffers = await Promise.all(
      tracks.map(async (track) => {
        const response = await fetch(track.url);
        const arrayBuffer = await response.arrayBuffer();
        return await audioCtx.decodeAudioData(arrayBuffer);
      })
    );

    const length = Math.max(...buffers.map((b) => b.length));
    const sampleRate = audioCtx.sampleRate;
    const output = audioCtx.createBuffer(1, length, sampleRate);

    buffers.forEach((buffer) => {
      const channel = buffer.getChannelData(0);
      const outputChannel = output.getChannelData(0);
      for (let i = 0; i < channel.length; i++) {
        outputChannel[i] += channel[i] / buffers.length;
      }
    });

    // Convierte a WAV y descarga
    const wav = toWav(output);
    const blob = new Blob([wav], { type: "audio/wav" });
    const url = URL.createObjectURL(blob);

    // 2. Guarda el audio mezclado en la base de datos
    console.log("prevvvvvvv")
    const audio = await createAudio({
      url, // o puedes subir el blob a tu backend y guardar la URL real
      name: "mixdown.wav",
      projectId: currentProjectID,
      isMixdown: true,
    });

    console.log("audioResponse", audio)

    // 3. Guarda cada track individual en la base de datos
    for (const track of tracks) {
      await createTrack({
        name: track.name,
        color: track.color || null,
        projectId: currentProjectID,
        audioId: audio.data.id
      });
    }

    // 4. Descarga el archivo para el usuario
    const a = document.createElement("a");
    a.href = url;
    a.download = "mixdown.wav";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const draw = () => {
    if (!analyserRef.current || !canvasRef.current) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const bufferLength = analyserRef.current.fftSize;
    if (!dataArrayRef.current) return;
    analyserRef.current.getByteTimeDomainData(dataArrayRef.current);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#ea01ff";
    ctx.beginPath();

    const sliceWidth = (canvas.width * 1.0) / bufferLength;
    let x = 0;
    for (let i = 0; i < bufferLength; i++) {
      const v = dataArrayRef.current[i] / 128.0;
      const y = (v * canvas.height) / 2;
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
      x += sliceWidth;
    }
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.stroke();

    animationIdRef.current = requestAnimationFrame(draw);
  };

  const startRecording = async () => {
    if (recording) return;
    setRecording(true);
    setAudioUrl(null);
    setAudioChunks([]);

    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    streamRef.current = stream;

    // MediaRecorder para grabar el audio
    const recorder = new MediaRecorder(stream);
    setMediaRecorder(recorder);

    const chunks: Blob[] = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };
    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "audio/webm" });
      setAudioUrl(URL.createObjectURL(blob));
      setAudioChunks(chunks);
    };
    recorder.start();

    // Visualización de la onda
    audioContextRef.current = new (window.AudioContext ||
      (window as Window & typeof globalThis).AudioContext)();
    sourceRef.current = audioContextRef.current.createMediaStreamSource(stream);
    analyserRef.current = audioContextRef.current.createAnalyser();
    analyserRef.current.fftSize = 2048;
    const bufferLength = analyserRef.current.fftSize;
    dataArrayRef.current = new Uint8Array(bufferLength);

    sourceRef.current.connect(analyserRef.current);
    draw();
  };

  const stopRecording = () => {
    setRecording(false);
    if (animationIdRef.current) {
      cancelAnimationFrame(animationIdRef.current);
    }
    if (audioContextRef.current) {
      audioContextRef.current.close();
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
    }
  };

  const playAudio = () => {
    if (audioUrl && audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play();
    }
  };

  const downloadAudio = () => {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = "grabacion.webm";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleAddTrack = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setTracks((prev) => [...prev, { name: file.name, url }]);
      // Limpia el input para poder volver a seleccionar el mismo archivo si se quiere
      e.target.value = "";
    }
  };

  const playAllTracks = () => {
    console.log(audioRefs);
    audioRefs.current.forEach((audio) => {
      if (audio) {
        audio.currentTime = 0;
        audio.play();
      }
    });
  };

  const deleteAudio = (index: number) => {
    setTracks((prev) => prev.filter((_, i) => i !== index));
    audioRefs.current.splice(index, 1);
  };

  return (
    <div className={styles.record}>
      <div className={styles.otherTools}>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
          onClick={handleAddTrack}
          type="button"
          style={{ marginBottom: "1%" }}
        >
          Añadir Pista a la grabación
        </button>
        <select
          id={styles.estilo}
          value={currentProjectID ?? "default"}
          onChange={(e) => setCurrentProjectID(Number(e.target.value))}
        >
          <option value="default">Seleccionar proyecto</option>
          {projects.map((project: Project, index) => {
            return (
              <option key={index} value={project.id}>
                {project.title}
              </option>
            );
          })}
        </select>
      </div>
      <input
        ref={fileInputRef}
        type="file"
        accept="audio/*"
        style={{ display: "none" }}
        onChange={handleFileChange}
      />
      <canvas
        ref={canvasRef}
        width={1000}
        height={120}
        style={{
          background: "#111",
          borderRadius: "8px",
          marginBottom: "16px",
        }}
      />
      <div className={styles.tools}>
        <button
          onClick={recording ? stopRecording : startRecording}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
        >
          {recording ? "Detener grabación" : "Grabar"}
        </button>
        <button
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
          onClick={playAllTracks}
          type="button"
          disabled={tracks.length === 0}
        >
          Reproducir
        </button>
        <button
          onClick={downloadAudio}
          disabled={!audioUrl}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
        >
          Guardar
        </button>
      </div>
      <div className="tracks">
        {tracks.map((track, idx) => (
          <Track
            key={idx}
            name={track.name}
            url={track.url}
            audioRef={(el) => (audioRefs.current[idx] = el)}
            deleteAudio={() => deleteAudio(idx)}
          />
        ))}
        {tracks.length > 0 ? (
          <button
            className={`${styles.save} bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition`}
            onClick={exportAllTracks}
          >
            Guardar Audio Completo
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default RecordComponent;
