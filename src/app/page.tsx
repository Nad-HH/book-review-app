import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="relative w-full h-screen flex flex-col items-center justify-center text-center text-white">
        <Image
          src="/fondo.jpg"
          alt="Fondo de libros"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-opacity-40"></div>

        <div className="relative z-10 px-6">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4">
            ¡Bienvenido a BookReviews!
          </h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl mx-auto">
            Descubre, califica y comparte reseñas de tus libros favoritos.
          </p>
          <a
            href="/reviews"
            className="inline-block bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-6 rounded-md transition"
          >
            Ver todas las reseñas
          </a>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 text-center">
        <p>© 2025 BookReviews. Todas las reseñas son de nuestros usuarios.</p>
      </footer>
    </div>
  );
}
