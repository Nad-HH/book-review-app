"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FormData, FormErrors } from "../types/auth";

export default function SingUpPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [success, setSuccess] = useState("");

  const validaForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) {
      newErrors.name = "El nombre es obligatorio.";
    } else if (formData.name.trim().length < 2) {
      newErrors.name = "El nombre debe tener al menos 2 caracteres.";
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email) {
      newErrors.email = "El correo electrónico es obligatorio.";
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = "El correo electrónico no es válido.";
    }
    if (!formData.password) {
      newErrors.password = "La contraseña es obligatoria.";
    } else if (formData.password.length < 6) {
      newErrors.password = "La contraseña debe tener al menos 6 caracteres.";
    }
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña.";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validaForm()) return;
    setIsLoading(true);
    setErrors({});
    setSuccess("");
    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });
      const data = await response.json();
      if (!response.ok) {
        setErrors({ general: data.error || "Error al crear la cuenta." });
        return;
      }
      setSuccess("Cuenta creada exitosamente. Ahora puedes iniciar sesión.");
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrors({
        general: "Error al crear la cuenta. Por favor, intente de nuevo.",
      });
    } finally {
      setIsLoading(false);
    }
  };
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
            Crear nueva cuenta
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            O{" "}
            <Link
              href={"/login"}
              className="font-medium text-orange-600 hover:text-orange-500"
            >
              iniciar sesión si ya tienes cuenta
            </Link>
          </p>
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
            {/* Campo de entrada para el nombre */}
            <div>
              <label htmlFor="name" className="sr-only">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleInputChange}
                className={`relative block w-full px-3 py-2 border ${
                  errors.name ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Nombre completo"
              ></input>
              {errors.name && (
                <p className="mt-1 text-sm text-red-600">{errors.name}</p>
              )}
            </div>
            {/* Campo de entrada para el correo */}
            <div>
              <label htmlFor="email" className="sr-only">
                Correo electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={handleInputChange}
                className={`relative block w-full px-3 py-2 border ${
                  errors.email ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Correo electrónico"
              />
              {errors.email && (
                <p className="mt-1 text-sm text-red-600">{errors.email}</p>
              )}
            </div>
            {/* Campo de entrada para la contraseña */}
            <div>
              <label htmlFor="password" className="sr-only">
                Contraseña
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className={`relative block w-full px-3 py-2 border ${
                  errors.password ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Contraseña (mínimo 6 caracteres)"
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-600">{errors.password}</p>
              )}
            </div>
            {/* Campo de entrada para confirmar la contraseña */}
            <div>
              <label htmlFor="confirmPassword" className="sr-only">
                Confirmar contraseña
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                required
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`relative block w-full px-3 py-2 border ${
                  errors.confirmPassword ? "border-red-300" : "border-gray-300"
                } placeholder-gray-500 text-gray-900 rounded-md focus:outline-none focus:ring-orange-500 focus:border-orange-500 focus:z-10 sm:text-sm`}
                placeholder="Confirmar contraseña"
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
            <button
              className="inline-flex items-center justify-center rounded-md font-medium transition-colors disabled:opacity-50 bg-orange-600 text-white hover:bg-orange-700 h-10 px-4 py-2 w-full"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  <span>Creando cuenta...</span>
                </div>
              ) : (
                "Crear cuenta"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
