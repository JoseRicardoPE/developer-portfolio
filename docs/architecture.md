# Developer Portfolio CMS

## Arquitectura

El proyecto estará compuesto por dos aplicaciones independientes:

- Frontend: Angular 21
- Backend: Node.js + Express
- Base de datos: MongoDB

La comunicación entre ambas aplicaciones se realizará mediante una API REST.

## Objetivo

Desarrollar un portafolio profesional administrable donde toda la información del perfil, experiencia, proyectos, tecnologías y formación pueda gestionarse desde una base de datos y visualizarse en una SPA desarrollada con Angular.

## Backend

El backend está desarrollado con Node.js y Express.

La aplicación sigue una arquitectura por capas, separando las responsabilidades de las rutas, controladores, servicios y modelos.

### Entry points

- `server.js`: punto de entrada de la aplicación. Se encarga de cargar las variables de entorno, establecer la conexión con MongoDB e iniciar el servidor HTTP.
- `app.js`: configuración de la aplicación Express, middlewares y rutas.

### Configuración

La configuración de la conexión a MongoDB se encuentra en:

`src/config/database.js`

La conexión utiliza la variable de entorno:

`MONGODB_URI`

Las variables de entorno se gestionan mediante `dotenv`.

### Middlewares

Actualmente se utilizan:

- `cors`: permite gestionar solicitudes entre diferentes orígenes.
- `morgan`: registra las solicitudes HTTP durante el desarrollo.
- `express.json()`: permite procesar solicitudes con contenido JSON.
- `express.urlencoded()`: permite procesar datos codificados en URL.

### Database

La aplicación utiliza MongoDB como sistema de persistencia y Mongoose como ODM.

La conexión se establece antes de iniciar el servidor HTTP.

Actualmente la conexión se realiza mediante:

`mongoose.connect(process.env.MONGODB_URI)`

### Health Check

La API dispone de un endpoint:

`GET /api/health`

Este endpoint permite comprobar que el servidor está funcionando correctamente.

## Modelos

Actualmente se han definido los siguientes modelos:

- `Profile`: información principal y de contacto del perfil.
- `ProfessionalProfile`: descripción del perfil profesional.
- `Technology`: tecnologías agrupadas por categoría.
- `Experience`: experiencia profesional y responsabilidades.
- `Project`: proyectos destacados y contribuciones.
- `Education`: formación académica y complementaria.
- `Language`: idiomas y nivel de dominio.

## Estructura del proyecto

```text
developer-portfolio/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   └── profileController.js
│   │   ├── middlewares/
│   │   ├── models/
│   │   │    ├── profile.model.js
│   │   │    ├── professionalProfile.model.js
│   │   │    ├── technology.model.js
│   │   │    ├── experience.model.js
│   │   │    ├── project.model.js
│   │   │    ├── education.model.js
│   │   │    └── language.model.js
│   │   ├── routes/
│   │   │   └── profileRoutes.js
│   │   ├── services/
│   │   │   └── profileService.js
│   │   ├── utils/
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   └── package.json
│
├── frontend/
│
├── docs/
│
├── README.md
├── LICENSE
└── .gitignore



