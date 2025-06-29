"use client";
import React, { useRef, useState } from "react";
import "./RecordComponent.css";
import Track from "../Track/Track";

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
  const [tracks, setTracks] = useState<{ name: string; url: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

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

  return (
    <div className="record">
      <button
        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
        onClick={handleAddTrack}
        type="button"
        style={{ marginBottom: "1%" }}
      >
        Añadir Pista a la grabación
      </button>
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
      <div className="tools">
        <button
          onClick={recording ? stopRecording : startRecording}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
        >
          {recording ? "Detener grabación" : "Grabar"}
        </button>
        <button
          onClick={playAudio}
          disabled={!audioUrl}
          className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
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
          <Track key={idx} name={track.name} url={track.url} />
        ))}
      </div>
        
    </div>
  );
};

export default RecordComponent;
