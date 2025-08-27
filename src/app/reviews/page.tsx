"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Review } from "../types/review";
import Link from "next/link";

export default function ReviewPage() {
  const { session, isLoading } = useAuth();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchReviews = async () => {
    setLoading(true);
    try {
      const response = await fetch("/api/reviews", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      console.log("respuesta", data);
      setReviews(data);
    } catch (error) {
      console.error(error);
      alert("Error al cargar las reseñas");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("¿Estás seguro de que deseas eliminar esta reseña?")) {
      return;
    }
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.accessToken}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        alert("Reseña eliminada");
        fetchReviews();
      } else {
        alert(data.error || "Error al eliminar la reseña");
      }
    } catch (error) {
      console.error(error);
      alert("Error al eliminar la reseña");
    } finally {
      setLoading(false);
    }
  };

  const moodEmojis: { [key: string]: string } = {
    feliz: "😄",
    triste: "😢",
    emocionado: "🤩",
    cansado: "😴",
    enojado: "😡",
  };

  if (isLoading) {
    return (
      <div className="flex items-center min-h-[400px]">
        <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!session) {
    return null;
  }
  return (
    <div className="space-y-6">
      <div className="bg-black shadow rounded-lg p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
          <div className="bg-gradient-to-r from-zinc-500 to-zinc-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Mi Perfil</h3>
            <div className="space-y-2">
              <p>
                <strong>Nombre: </strong>
                {session.user.name}
              </p>
              <p>
                <strong>Email: </strong>
                {session.user.email}
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-zinc-500 to-zinc-600 text-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">Acciones</h3>
            <div className="space-y-2">
              <Link href="/add-review" passHref>
                <button className="inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 bg-yellow-500 text-white hover:bg-yellow-600 h-10 px-4 py-2 w-full">
                  Crear review
                </button>
              </Link>
              <button
                onClick={fetchReviews}
                disabled={loading}
                className="inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 bg-red-400 text-white hover:bg-orange-600 h-10 px-4 py-2 w-full mt-3"
              >
                {loading ? "Cargando..." : "Cargar reseñas"}
              </button>
            </div>
          </div>
        </div>

        <div className="min-h-screen bg-black">
          <div className="container mx-auto py-8 px-4">
            <h1 className="text-3xl font-bold mb-6 text-center text-white">
              Lista de Reseñas
            </h1>

            {reviews.length === 0 ? (
              <p className="text-center text-gray-600">
                No hay reseñas disponibles.
              </p>
            ) : (
              <div
                className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
                style={{
                  backgroundImage: 'url("/fondo02.jpg")',
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  padding: "1rem",
                  borderRadius: "1rem",
                }}
              >
                {reviews.map((review) => {
                  let moodColor = "bg-gray-100";
                  if (review.mood === "feliz") moodColor = "bg-yellow-100";
                  if (review.mood === "triste") moodColor = "bg-blue-100";
                  if (review.mood === "enojado") moodColor = "bg-red-100";
                  if (review.mood === "emocionado") moodColor = "bg-green-100";
                  if (review.mood === "cansado") moodColor = "bg-purple-100";

                  return (
                    <div
                      key={review.id}
                      className={`${moodColor} p-6 rounded-xl shadow-lg flex flex-col justify-between`}
                    >
                      <div>
                        <h2 className="text-xl font-bold mb-2">
                          {review.book_title}
                        </h2>
                        <p className="text-yellow-500 font-semibold">
                          {review.rating} ⭐
                        </p>
                        <p className="mt-2 text-gray-800">{review.review}</p>
                      </div>

                      <div className="mt-4 flex items-center justify-between text-sm text-gray-600">
                        <span>
                          Mood:{" "}
                          <span className="text-2xl">
                            {moodEmojis[review.mood] || "❓"}
                          </span>
                        </span>
                        <span>
                          {review.user.name} ({review.user.email})
                        </span>
                      </div>

                      <div className="mt-2 text-sm text-gray-400">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>

                      {session.user.id === review.user.id.toString() && (
                        <button
                          className="mt-4 w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
                          onClick={() => handleDelete(review.id)}
                        >
                          Eliminar
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
