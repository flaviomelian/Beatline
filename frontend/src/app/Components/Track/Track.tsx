import React, { useEffect, useRef } from "react";
import Image from "next/image";
import play from "../../assets/play-pause.png";
import "./Track.css";

interface TrackProps {
  name: string;
  url: string;
}

const Track: React.FC<TrackProps> = ({ name, url }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const drawWaveform = async () => {
      if (!canvasRef.current) return;
      const canvas = canvasRef.current;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      // Fetch and decode audio
      const response = await fetch(url);
      const arrayBuffer = await response.arrayBuffer();
      const audioCtx = new (window.AudioContext ||
        (window as any).webkitAudioContext)();
      const audioBuffer = await audioCtx.decodeAudioData(arrayBuffer);

      // Get channel data (mono)
      const rawData = audioBuffer.getChannelData(0);
      const samples = 500; // Number of points in the waveform
      const blockSize = Math.floor(rawData.length / samples);
      const filteredData = [];
      for (let i = 0; i < samples; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += Math.abs(rawData[i * blockSize + j]);
        }
        filteredData.push(sum / blockSize);
      }

      // Draw waveform
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "#ea01ff";
      const height = canvas.height;
      for (let i = 0; i < samples; i++) {
        const x = (i / samples) * canvas.width;
        const y = (1 - filteredData[i]) * height;
        ctx.fillRect(x, y, 2, filteredData[i] * height);
      }
    };

    drawWaveform();
  }, [url]);

  return (
    <div className="track">
      <span>{name}</span>
      <canvas
        ref={canvasRef}
        width={500}
        height={60}
        style={{ width: "100%", background: "#222", borderRadius: "6px" }}
      />
      <audio controls src={url} style={{ width: "100%", background: 'black'}} />
    </div>
  );
};

export default Track;
