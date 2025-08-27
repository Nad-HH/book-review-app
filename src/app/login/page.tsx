"use client";

import React, { Suspense } from "react";
import LoginPageComponent from "./LoginPageComponent"; // el componente que contiene tu formulario

export default function LoginPageWrapper() {
  return (
    <Suspense fallback={<div>Cargando...</div>}>
      <LoginPageComponent />
    </Suspense>
  );
}
