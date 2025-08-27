"use client";

import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { useRouter } from "next/navigation";

interface FormData {
  user: number;
  book_title: string;
  rating: number;
  review: string;
  mood: string;
}

interface FormErrors {
  userId?: number;
  book_title?: string;
  rating?: string;
  review?: string;
  mood?: string;
  general?: string;
}

export default function AddReviewPage() {
  const { session, isLoading } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    user: 1,
    book_title: "",
    rating: 1,
    review: "",
    mood: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");

  const router = useRouter();
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
  const validaForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.book_title.trim()) {
      newErrors.book_title = "El título del libro es obligatorio.";
    }

    if (formData.rating < 1 || formData.rating > 5) {
      newErrors.rating = "La calificación debe ser entre 1 y 5.";
    }

    if (!formData.review.trim()) {
      newErrors.review = "La reseña es obligatoria.";
    }

    if (!formData.mood.trim()) {
      newErrors.mood = "El estado de ánimo es obligatorio.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validaForm()) return;

    setLoading(true);
    setErrors({});
    setSuccess("");

    try {
      const response = await fetch("/api/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.accessToken}`,
        },
        body: JSON.stringify({
          user: session?.user.id,
          book_title: formData.book_title,
          rating: formData.rating,
          review: formData.review,
          mood: formData.mood,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrors({ general: data.error || "Error al crear la reseña." });
        return;
      }
      setSuccess("Reseña creada exitosamente");

      router.push("/reviews");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrors({
        general: "Error al crear la reseña. Intente de nuevo.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Crear nueva Reseña
          </h2>
        </div>
        <div className="mt-8 space-y-6">
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Mensajes de Error/Exito*/}
            {errors.general && (
              <div className="bg-red-50 border-red-200 text-red-600 px-4 py-3 rounded-md text-sm">
                {errors.general}
              </div>
            )}
            {success && (
              <div className="bg-green-50 border-green-200 text-green-600 px-4 py-3 rounded-md text-sm">
                {success}
              </div>
            )}
            <div>
              <label htmlFor="book_title" className="sr-only">
                Título del libro
              </label>
              <input
                id="book_title"
                name="book_title"
                type="text"
                required
                value={formData.book_title}
                onChange={handleInputChange}
                className={`relative block w-full px-3 py-2 border ${
                  errors.book_title ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Título del libro"
              ></input>
              {errors.book_title && (
                <p className="mt-1 text-sm text-red-600">{errors.book_title}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="rating"
                className="block text-sm font-medium text-gray-700"
              >
                Calificación (1-5)
              </label>
              <input
                id="rating"
                name="rating"
                type="number"
                min={1}
                max={5}
                step={1}
                required
                value={formData.rating}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.rating ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
              />
              {errors.rating && (
                <p className="mt-1 text-sm text-red-600">{errors.rating}</p>
              )}
            </div>

            <div>
              <label htmlFor="review" className="sr-only">
                Reseña
              </label>
              <input
                id="review"
                name="review"
                type="text"
                required
                value={formData.review}
                onChange={handleInputChange}
                className={`relative block w-full px-3 py-2 border ${
                  errors.review ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Reseña del libro"
              ></input>
              {errors.review && (
                <p className="mt-1 text-sm text-red-600">{errors.review}</p>
              )}
            </div>

            <div>
              <label
                htmlFor="mood"
                className="block text-sm font-medium text-gray-700"
              >
                Estado de ánimo
              </label>
              <select
                id="mood"
                name="mood"
                required
                value={formData.mood}
                onChange={handleInputChange}
                className={`mt-1 block w-full px-3 py-2 border ${
                  errors.mood ? "border-red-300" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm`}
              >
                <option value="">Selecciona tu estado de ánimo</option>
                <option value="feliz">😄 Feliz</option>
                <option value="triste">😢 Triste</option>
                <option value="emocionado">🤩 Emocionado</option>
                <option value="cansado">😴 Cansado</option>
                <option value="enojado">😡 Enojado</option>
              </select>
              {errors.mood && (
                <p className="mt-1 text-sm text-red-600">{errors.mood}</p>
              )}
            </div>

            <button
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2 w-full"
              type="submit"
              disabled={loading}
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando reseña...</span>
                </div>
              ) : (
                "Crear Reseña"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
