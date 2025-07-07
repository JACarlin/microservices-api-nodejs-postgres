# Proyecto de Reingeniería: API REST con Microservicios

> Un sistema backend robusto construido con Node.js, Express, PostgreSQL y Docker, siguiendo una arquitectura de microservicios. Este proyecto incluye autenticación JWT, gestión de usuarios por roles y operaciones CRUD para reportes.

---

### 🚀 Tecnologías Utilizadas

* **Backend:** Node.js, Express.js
* **Base de Datos:** PostgreSQL
* **Contenerización:** Docker, Docker Compose
* **Arquitectura:** Microservicios con API Gateway
* **Autenticación:** JSON Web Tokens (JWT)

---

### ✨ Características

* **Servicio de Autenticación:** Registro y Login con JWT.
* **Gestión de Usuarios por Roles:** Endpoints exclusivos para administradores (CRUD de usuarios).
* **Gestión de Reportes:** CRUD completo de reportes con permisos basados en el propietario o rol de admin.
* **API Gateway:** Un único punto de entrada que redirige el tráfico al microservicio correspondiente.
* **100% Dockerizado:** Configuración lista para producción con un solo comando.

---

### 🏁 Cómo Empezar

Sigue estos pasos para levantar el proyecto en tu entorno local.

#### Prerrequisitos

* [Docker](https://www.docker.com/products/docker-desktop/) y Docker Compose
* [Node.js](https://nodejs.org/en/) (v18 o superior)
* [Git](https://git-scm.com/)

#### Instalación

1.  **Clona el repositorio:**
    ```bash
    git clone https://github.com/JACarlin/microservices-api-nodejs-postgres.git
    cd microservices-api-nodejs-postgres
    ```

2.  **Configura las variables de entorno:**
    Copia el archivo de ejemplo y adáptalo si es necesario.
    ```bash
    cp .env.example .env
    ```

3.  **Levanta los contenedores:**
    Este comando construirá las imágenes y levantará todos los servicios.
    ```bash
    docker-compose up --build
    ```

La API estará disponible en `http://localhost:3000`.

---
