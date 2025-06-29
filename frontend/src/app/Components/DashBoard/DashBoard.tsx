import React from "react";
import './DashBoard.css'

const DashBoard = () => {
  return (
    <div className="dashboard">
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition">
        Crear Proyecto
      </button>
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition">
        Mis Proyectos
      </button>
      <button className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition">
        Proyectos de la comunidad
      </button>
    </div>
  );
};

export default DashBoard;
