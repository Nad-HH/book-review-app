# 📚 Sistema de Reseñas de Libros

Aplicación fullstack para reseñas de libros que permite a los usuarios registrarse, iniciar sesión, crear, ver y eliminar reseñas.

---

## 🛠️Tecnologías
- **Frontend:** Next.js 15, React 18, TypeScript 5  
- **Estilos:** Tailwind CSS 3  
- **Backend:** API Routes de Next.js 15 (TypeScript)  
- **Base de datos:** PostgreSQL 15+, Prisma ORM  
- **Autenticación:** NextAuth.js (con JWT)  
- **Despliegue:** Railway  
- **Control de versiones:** GitHub  


---

## 🚀 Instalación

Sigue estos pasos para correr el proyecto localmente:

1. **Clona el repositorio:**
    ```bash
    git clone https://github.com/Nad-HH/book-review-app.git
    cd book-review-app
    ```

2. **Instala las dependencias:**
    ```bash
    npm install
    2. **Instala las dependencias:**
        ```bash
        npm install
        ```

    3. **Copia las variables de entorno:**
        ```bash
        cp .env.example .env
        ```

    4. **Configura la base de datos en PostgreSQL:**

    - Crea la base de datos y el usuario. Si decides crear un usuario específico, asegúrate de asignarle los siguientes permisos:
      ```sql
      CREATE DATABASE app_review_libros;
      CREATE ROLE user_app_review_libros WITH LOGIN PASSWORD '123456';
      GRANT CONNECT ON DATABASE app_review_libros TO user_app_review_libros;
      GRANT USAGE, ALL ON SCHEMA public TO user_app_review_libros;
      GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO user_app_review_libros;
      GRANT ALL PRIVILEGES ON ALL FUNCTIONS IN SCHEMA public TO user_app_review_libros;
      GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO user_app_review_libros;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO user_app_review_libros;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON FUNCTIONS TO user_app_review_libros;
      ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON SEQUENCES TO user_app_review_libros;
      ALTER ROLE user_app_review_libros CREATEDB;
      ```

4. **Inicializa Prisma y ejecuta migraciones:**
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

## 🧑‍💻 Despliegue Local

1. Inicia el servidor de desarrollo:
    ```bash
    npm run dev
    ```

2. Accede a la aplicación en [http://localhost:3000](http://localhost:3000).

## 🌐 Despliegue en Producción

La aplicación está desplegada en Railway:  
[https://book-review-app-production-cdbe.up.railway.app/](https://book-review-app-production-cdbe.up.railway.app/)

Para el despliegue en producción se configuró la base de datos y las variables de entorno necesarias en Railway.
---

## 🔌 Puntos finales de la API

- `POST /api/signup` — Registrar un nuevo usuario
- `GET /api/reviews` — Obtener todas las reseñas (requiere autorización)
- `POST /api/reviews` — Añadir una nueva reseña (requiere autorización)
- `DELETE /api/reviews/:id` — Eliminar una reseña (solo propietario autorizado)

---

## 🧭 Páginas y rutas

- `/signup` — Registro de usuario
- `/login` — Inicio de sesión
- `/reviews` — Ver todas las reseñas
- `/add-review` — Crear una nueva reseña

---

## ⚠️ Errores conocidos

- **NextAuth:** Asegúrate de que la estructura de archivos de autenticación esté dentro de la carpeta `auth` para evitar errores.
- **Middleware:** Configura correctamente el middleware según las páginas protegidas y verifica los nombres de las rutas.
- **Prisma:** Si cambias el esquema, ejecuta nuevamente las migraciones.

---

## ⏱️ Tiempo estimado de inversión

Aproximadamente 8-12 horas, dependiendo de la experiencia previa con las tecnologías mencionadas.


