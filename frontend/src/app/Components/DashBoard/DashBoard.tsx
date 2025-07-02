import React from "react";
import Link from "next/link";
import './DashBoard.css'

const DashBoard = () => {
  return (
    <div className="dashboard">
      <Link href="/Beat" passHref>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition dashboard-button">
          Producir Instrumental
        </button>
      </Link>
      <Link href="/CreateProject" passHref>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition dashboard-button">
          Crear Proyecto
        </button>
      </Link>
      <Link href="/MyProjects" passHref>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition dashboard-button">
          Mis Proyectos
        </button>
      </Link>
      <Link href="/Community" passHref>
        <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition dashboard-button">
          Proyectos de la comunidad
        </button>
      </Link>
    </div>
  );
};

export default DashBoard;