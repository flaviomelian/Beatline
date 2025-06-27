import React from 'react';
import Link from 'next/link';

const Home = () => {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-white px-6">
      <h1 className="text-4xl font-bold mb-4 text-center">🎛️ Multitrack Studio</h1>
      <p className="text-lg text-gray-300 text-center max-w-xl mb-8">
        Graba, edita y mezcla pistas de audio directamente en el navegador.  
        Crea sesiones multipista y exporta tus ideas donde quieras.
      </p>

      <Link href="/session/new">
        <a className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition">
          🎙️ Crear nueva sesión
        </a>
      </Link>
    </main>
  );
};

export default Home;

