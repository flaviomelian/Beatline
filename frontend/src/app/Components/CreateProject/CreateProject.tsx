"use client";

import React, { useState } from "react";
import styles from "./CreateProject.module.css";
import { createSession } from '../../Services/sessionService'

const defaultBpms: Record<string, number> = {
  rap: 90,
  trap: 140,
  pop: 120,
  rock: 110,
  reggaeton: 95,
  house: 128,
  lofi: 70,
  drumandbass: 174,
  dubstep: 140,
  balada: 75,
};

const CreateProject = () => {
  const [title, setTitle] = useState("");
  const [bpm, setBpm] = useState("");
  const [estilo, setEstilo] = useState("");

  const handleEstiloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    console.log("ñdsalknjfslñakdnfmslkdnvclsdknfslkdnf",e.target.value)
    setEstilo(e.target.value);
    if (defaultBpms[e.target.value]) setBpm(defaultBpms[e.target.value].toString());
    else setBpm("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSession = {
      title,
      bpm: bpm ? parseInt(bpm) : null,
      style: estilo, 
      userId: null
    };

    await createSession(newSession)
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

          <select id="estilo" value={estilo} onChange={handleEstiloChange}>
            <option value="">-- Elige un estilo --</option>
            <option value="rap">Rap</option>
            <option value="trap">Trap</option>
            <option value="pop">Pop</option>
            <option value="rock">Rock</option>
            <option value="reggaeton">Reggaetón</option>
            <option value="house">House</option>
            <option value="lofi">Lo-fi</option>
            <option value="drumandbass">Drum and Bass</option>
            <option value="dubstep">Dubstep</option>
            <option value="balada">Balada / R&B</option>
          </select>

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
