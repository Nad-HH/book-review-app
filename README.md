# 📚 Sistema de Reseñas de Libros
Aplicación fullstack para reseñas de libros que permite a los usuarios registrarse, iniciar sesión y gestionar reseñas de libros. Los usuarios pueden crear nuevas reseñas, ver las existentes y eliminar las propias.

---

## 📌 Índice
- [Tecnologías](#tecnologías)
- [Instalación](#instalación)
- [Despliegue Local](#despliegue-local)
- [Despliegue en Producción](#despliegue-en-producción)
- [API Endpoints](#api-endpoints)
- [Páginas y Rutas](#páginas-y-rutas)
- [Características de la aplicación](#características-de-la-aplicación)
- [Errores conocidos](#errores-conocidos)
- [Tiempo estimado de inversión](#tiempo-estimado-de-inversión)

---

## Tecnologías

- **Frontend:** Next.js 15, React 19, TypeScript 5  
- **Estilos:** Tailwind CSS 4  
- **Backend:** API Routes de Next.js 15 (TypeScript)  
- **Base de datos:** PostgreSQL 15+, Prisma ORM  
- **Autenticación:** NextAuth.js (con JWT)  
- **Despliegue:** Railway  
- **Control de versiones:** GitHub  

---

## Instalación

Sigue estos pasos para correr el proyecto localmente:

###  **Clona el repositorio:**
```bash
    git clone https://github.com/Nad-HH/book-review-app.git
    cd book-review-app
```

###  **Instala las dependencias:**

```bash
    npm install
```

### **Copia las variables de entorno:**
 ```bash
    cp .env.example .env
 ```

### **Inicializa Prisma y ejecuta migraciones:**
Antes de iniciar Prisma, configura la variable de conexión en el archivo `.env` con los datos de tu usuario y base de datos de PostgreSQL. Por ejemplo:

```env
DATABASE_URL="postgresql://tu_usuario:tu_contraseña@localhost:5432/tu_base_de_datos"
```

Asegúrate de reemplazar `tu_usuario`, `tu_contraseña` y `tu_base_de_datos` por los valores correspondientes a tu configuración local en la variable `DATABASE_URL`.  
Luego, ejecuta los siguientes comandos para inicializar Prisma y aplicar la migración inicial:

```bash
    npx prisma init
    npx prisma migrate dev --name init
```

---

## Despliegue Local

1. Inicia el servidor de desarrollo:
```bash
npm run dev
```

2. Accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## Despliegue en Producción

La aplicación está desplegada en Railway:  
[https://book-review-app-production-cdbe.up.railway.app/](https://book-review-app-production-cdbe.up.railway.app/)

### Pasos para desplegar en producción:

1. Inicia sesión en tu cuenta de Railway y selecciona el proyecto a desplegar desde GitHub.
2. Agrega un servicio de base de datos PostgreSQL desde Railway.
3. Configura las variables de entorno necesarias en Railway (puedes usar `.env.example` como referencia).
4. Si el código se construye correctamente y no hay errores, ve a la sección **Settings** y luego a **Public Networking** para obtener el dominio público de la aplicación.
5. Accede a la aplicación usando el dominio proporcionado.

---

## API Endpoints

- `POST /api/signup` — Registrar un nuevo usuario.
- `GET /api/reviews` — Obtener todas las reseñas (solo usuarios autenticados).
- `POST /api/reviews` — Añadir una nueva reseña (solo usuarios autenticados).
- `DELETE /api/reviews/:id` — Eliminar una reseña (solo el propietario autenticado).

> **Nota sobre la autenticación**
>
> El inicio de sesión no se expone como un endpoint REST tradicional (`/api/login`), ya que la autenticación es gestionada automáticamente por NextAuth.js.
>
> NextAuth configura y expone las siguientes rutas para la autenticación:
>
> - `POST /api/auth/callback/credentials` — Validación de credenciales.
> - `GET /api/auth/session` — Consultar la sesión activa.
> - `POST /api/auth/signin` — Iniciar sesión.
> - `POST /api/auth/signout` — Cerrar sesión.
>
> La lógica de validación de credenciales (email y contraseña usando Prisma y bcrypt) se define en la configuración de NextAuth (`lib/auth.ts`). No es necesario implementar manualmente un endpoint `/api/login`, ya que NextAuth gestiona todo el flujo de autenticación.

---

## Páginas y Rutas

- `/` — Página principal
- `/signup` — Registro de usuario: formulario para crear una nueva cuenta.
- `/login` — Inicio de sesión: acceso para usuarios registrados.
- `/reviews` — Listado de reseñas: visualiza todas las reseñas creadas por los usuarios.
- `/add-review` — Nueva reseña: formulario para crear y publicar una reseña de un libro.

> **Nota:** Algunas rutas requieren autenticación para acceder o realizar acciones.

---
## Características de la Aplicación

En esta aplicación se implementaron varias herramientas para garantizar seguridad, organización y facilidad de uso:

- **Autenticación con NextAuth**
Se utilizó NextAuth con un proveedor de credenciales personalizadas (email y contraseña) en combinación con Prisma + bcrypt.
Esto permite manejar sesiones de forma segura y generar JWT, los cuales se usan para validar que solo usuarios autenticados puedan acceder o realizar acciones en el sistema.

- **Prisma como ORM**
Prisma facilita el manejo de la base de datos, con un control más claro de los modelos, migraciones y relaciones. Esto asegura integridad en los datos y hace más simple la evolución del esquema de la base de datos.

- **Validaciones**
Se implementaron validaciones tanto en el frontend (use client e interfaces de usuario) como en el backend (API Routes) para evitar datos inválidos y garantizar consistencia.

- **Control de permisos con JWT**
Cada petición hacia las API Routes requiere el JWT, de esta forma se valida:
    - Que el usuario esté logueado.
    - Que solo el propietario de una reseña pueda eliminarla, evitando accesos indebidos.

- **Estados de ánimo y colores en la interfaz**
Para mejorar la experiencia visual, cada reseña incluye un estado de ánimo que se representa con un color específico en la interfaz. Esto brinda una forma más intuitiva y atractiva de diferenciar las reseñas según el sentimiento del usuario.
---

## Errores conocidos

- **NextAuth:** Es muy estricto con la estructura de archivos al momento de usar las API Routes, lo que puede generar errores si no se sigue exactamente la convención.  
- **Middleware:** La configuración del middleware para autorización de páginas requiere cuidado; un endpoint mal configurado puede dejar accesos abiertos o bloquear rutas necesarias.  
- **Prisma:** Cada vez que se modifica el esquema es necesario ejecutar nuevamente las migraciones.
- **Railway:** En el despliegue es necesario asignarlas explícitamente a cada deploy, de lo contrario no son reconocidas por la aplicación.  

---

## Tiempo estimado de inversión

Aproximadamente 8-12 horas, dependiendo de la experiencia previa con las tecnologías mencionadas.


