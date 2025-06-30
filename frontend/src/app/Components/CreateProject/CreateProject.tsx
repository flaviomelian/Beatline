"use client";

import React, { useState } from "react";
import styles from "./CreateProject.module.css";

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [bpm, setBpm] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newSession = {
      title,
      bpm: bpm ? parseInt(bpm) : null,
    };

    console.log("Proyecto a crear:", newSession);
    // Aquí podrías enviar los datos al backend con fetch/axios
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.header}>Crear Proyecto</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <label htmlFor="title">Título del Proyecto:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label htmlFor="bpm">BPM (opcional):</label>
          <input
            type="number"
            id="bpm"
            value={bpm}
            onChange={(e) => setBpm(e.target.value)}
            placeholder="Ej: 120"
          />

          <button
            className={`${styles.button} bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition`}
            type="submit"
          >
            Crear
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateProject;
