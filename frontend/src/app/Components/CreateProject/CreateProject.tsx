"use client";
import React, { useState, useEffect } from "react";
import styles from "./CreateProject.module.css";
import { createSession, getSession, updateSession } from "../../Services/sessionService";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const id = searchParams.get("id");

  useEffect(() => {
    const fetchProject = async () => {
      if (id) {
        const { data } = await getSession(id);
        if (data) {
          setTitle(data.title || "");
          setBpm(data.bpm ? data.bpm.toString() : "");
          setEstilo(data.style || "");
        }
      }
    };
    fetchProject();
  }, [id]);

  const handleEstiloChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setEstilo(e.target.value);
    if (defaultBpms[e.target.value])
      setBpm(defaultBpms[e.target.value].toString());
    else setBpm("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newSession = {
      title,
      bpm: bpm ? parseInt(bpm) : null,
      style: estilo,
      userId: null,
    };

    if (id)  await updateSession(id, newSession);
    else await createSession(newSession);
    router.push("/MyProjects");
  };

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <h1 className={styles.header}>Crear Proyecto</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputs}>
            <label htmlFor="title">Título del Proyecto:</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />

            <select
              id={styles.estilo}
              value={estilo}
              onChange={handleEstiloChange}
            >
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
          </div>

          <button
            className={`${styles.button} bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition`}
            type="submit"
          >
            {id ? "Editar" : "Crear"}
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateProject;
