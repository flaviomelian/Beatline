import Link from "next/link";
import './styles.css'

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center justify-items-center">
        <h1 className="text-4xl font-bold mb-4 text-center">🎛️ Multitrack Studio</h1>
        <p className="text-lg text-gray-300 text-center max-w-xl mb-8">
          Graba, edita y mezcla pistas de audio directamente en el navegador.  
          Crea sesiones multipista y exporta tus ideas donde quieras.
        </p>

        <Link href="/session/new" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-2xl shadow-md transition">
          🎙️ Crear nueva sesión
        </Link>
      </main>
    </div>
  );
}
