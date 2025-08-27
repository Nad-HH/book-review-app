"use client";

import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function Navbar() {
  const { data: session, status } = useSession();

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-xl font-bold text-gray-800">
            BookReviews
          </Link>
          <div className="flex items-center space-x-4">
            {status === "loading" ? (
              <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : session ? (
              <div className="flex items-center space-x-4">
                <Link href="reviews">
                  <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2">
                    Reseñas
                  </button>
                </Link>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => signOut()}
                    className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2"
                  >
                    Cerrar Sesiòn
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-x-2">
                <Link href="/login">
                  <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2">
                    Iniciar Sesiòn
                  </button>
                </Link>
                <Link href="/signup">
                  <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2">
                    Registrarse
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
