"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getAllSessions } from "@/app/Services/sessionService";
import styles from "./Projects.module.css";
import edit from './../../assets/edit.png'
import trash from './../../assets/delete.png'
import Image from 'next/image';

interface Project {
  id: number;
  title: string;
  style: string;
  bpm: number;
}

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProjects = async () => {
      const { data } = await getAllSessions();
      console.log(data);
      setProjects(data); // Guarda los proyectos en el estado
    };
    fetchProjects();
  }, []);

  return (
    <>
      <div className={styles.pageProjects}>
        <h1 className={styles.headerProjects}>Proyectos</h1>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition"
            onClick={() => router.push("/CreateProject")}>Añadir Proyecto</button>
        <table className={styles.tableProjects}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Estilo</th>
              <th>BPM</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {projects.map((project: Project, index) => (
              <tr key={index}>
                <td>{project.id}</td>
                <td>{project.title}</td>
                <td>{project.style.toUpperCase()}</td>
                <td>{project.bpm}</td>
                <td className={styles.projectOptions}>
                    <button>
                      <Image src={edit} alt="Editar proyecto" width={24} height={24} />
                    </button>
                    <button>
                      <Image src={trash} alt="Eliminar proyecto" width={24} height={24} />
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Projects;
