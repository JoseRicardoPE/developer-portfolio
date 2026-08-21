# Developer Portfolio CMS

## Arquitectura

El proyecto está compuesto por dos aplicaciones independientes:

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

## API REST

La API expone operaciones CRUD para los recursos principales del portfolio.

### Recursos únicos

Los siguientes recursos representan un único documento y no utilizan identificadores en la URL:

- `Profile`
- `ProfessionalProfile`

Endpoints:

- `GET`
- `POST`
- `PUT`
- `DELETE`

**Ejemplos:**
- `/api/profile`
- `/api/professional-profile`

### Recursos de colección
Los siguientes recursos pueden contener múltiples documentos:

- `Technology`
- `Experience`
- `Project`
- `Education`
- `Language`

Estos recursos utilizan identificadores de MongoDB para consultar, actualizar o eliminar documentos específicos.

**Ejemplo:**
- `GET    /api/projects`
- `GET    /api/projects/:id`
- `POST   /api/projects`
- `PUT    /api/projects/:id`
- `DELETE /api/projects/:id`

### Validación de ObjectId

Los endpoints que utilizan `/:id` validan previamente que el identificador tenga un formato válido de `ObjectId`.

La validación se encuentra centralizada en:

`src/utils/validateObjectId.js`

La API utiliza la siguiente convención:

- `ObjectId inválido          → 400 Bad Request`
- `ObjectId válido inexistente → 404 Not Found`
- `Documento encontrado        → 200 OK`

## Frontend

El frontend está desarrollado con Angular 21 como una SPA (Single Page Application).

La aplicación está organizada por responsabilidades, separando los elementos globales, componentes reutilizables y funcionalidades principales del portfolio.

### Core

`src/app/core/` contiene elementos transversales de la aplicación que no pertenecen a una feature visual específica.

Actualmente incluye:

- `models/`: interfaces y modelos utilizados para tipar los datos recibidos desde la API.
- `enums/`: enumeraciones compartidas por la aplicación.
- `services/`: servicios responsables de la comunicación con la API REST.
- `interceptors/`: interceptores HTTP globales.
- `constants/`: constantes compartidas, incluyendo la configuración de endpoints de la API.

### Shared

`src/app/shared/` contiene elementos reutilizables que pueden ser utilizados por diferentes partes de la aplicación.

Actualmente incluye componentes compartidos para:

- Estados de carga.
- Visualización de errores.

La estructura también está preparada para incorporar directives, pipes y utilities compartidos cuando sean necesarios.

### Features

`src/app/features/` contiene las secciones funcionales principales del CV.

Actualmente se encuentran implementadas:

- `profile`
- `professional-profile`
- `technologies`
- `experience`
- `projects`
- `education`
- `languages`

Cada feature mantiene sus responsabilidades de presentación encapsuladas en sus archivos TypeScript, HTML y SCSS.

### Design System

El frontend utiliza un Design System basado en SCSS para centralizar los estilos y mantener consistencia visual entre las diferentes secciones del CV.

Los estilos globales se encuentran en:

`src/styles/`

La estructura está compuesta por:

- `_vars.scss`: Design Tokens globales como colores, tipografía, tamaños, spacing, dimensiones de iconos, layout y breakpoints.
- `_functions.scss`: funciones SCSS reutilizables.
- `_mixins.scss`: mixins reutilizables para tipografía, layout y responsive.
- `_reset.scss`: normalización y reset de estilos del navegador.
- `_base.scss`: estilos base globales de la aplicación.

`styles.scss` actúa como punto de entrada de los estilos globales.

### Mobile First

La estrategia responsive sigue un enfoque Mobile First.

Los estilos base de los componentes corresponden a Mobile y las adaptaciones para resoluciones superiores se realizan mediante breakpoints definidos globalmente.

Los breakpoints actuales son:

- Tablet: `768px`
- Desktop: `1024px`
- Wide: `1440px`

Cuando entre Mobile y Desktop únicamente cambia una propiedad, como `font-size`, se sobrescribe únicamente dicha propiedad dentro del breakpoint correspondiente, evitando duplicar estilos innecesariamente.

### Layout

El layout utiliza como referencias principales los diseños definidos en Figma.

Mobile:

- Reference width: `375px`
- Padding: `24px 16px`
- Content gap: `24px`

Desktop:

- Reference width: `1440px`
- Maximum content width: `1200px`
- Padding: `48px 24px`
- Content gap: `24px`

Las secciones principales utilizan un `gap` de `12px` y los grupos internos que requieren menor separación utilizan un `gap` de `8px`.

### Metodología BEM

Las clases CSS de los componentes utilizan la metodología BEM (Block, Element, Modifier).

Cada feature funciona como un bloque independiente y sus elementos internos utilizan la nomenclatura:

`block__element`

Esto permite mantener estilos encapsulados, predecibles y fáciles de mantener.

### Iconografía

La aplicación utiliza Font Awesome para la iconografía del frontend.

Los tamaños de los iconos se encuentran centralizados dentro de los Design Tokens y se adaptan según el breakpoint correspondiente.

## Estructura del proyecto

```text

developer-portfolio/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── database.js
│   │   ├── controllers/
│   │   │   ├── profileController.js
│   │   │   ├── professionalProfileController.js
│   │   │   ├── experienceController.js
│   │   │   ├── projectController.js
│   │   │   ├── educationController.js
│   │   │   ├── languageController.js
│   │   │   └── technologyController.js
│   │   ├── middlewares/
│   │   ├── models/
│   │   │   ├── profile.model.js
│   │   │   ├── professionalProfile.model.js
│   │   │   ├── experience.model.js
│   │   │   ├── project.model.js
│   │   │   ├── education.model.js
│   │   │   ├── language.model.js
│   │   │   └── technology.model.js
│   │   ├── routes/
│   │   │   ├── profileRoutes.js
│   │   │   ├── professionalProfileRoutes.js
│   │   │   ├── experienceRoutes.js
│   │   │   ├── projectRoutes.js
│   │   │   ├── educationRoutes.js
│   │   │   ├── languageRoutes.js
│   │   │   └── technologyRoutes.js
│   │   ├── services/
│   │   │   ├── profileService.js
│   │   │   ├── professionalProfileService.js
│   │   │   ├── experienceService.js
│   │   │   ├── projectService.js
│   │   │   ├── educationService.js
│   │   │   ├── languageService.js
│   │   │   └── technologyService.js
│   │   ├── utils/
│   │   │   └── validateObjectId.js
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   └── favicon.ico
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   │   ├── models/
│   │   │   │   │   ├── profile.model.ts
│   │   │   │   │   ├── professional-profile.model.ts
│   │   │   │   │   ├── technology.model.ts
│   │   │   │   │   ├── experience.model.ts
│   │   │   │   │   ├── project.model.ts
│   │   │   │   │   ├── education.model.ts
│   │   │   │   │   ├── language.model.ts
│   │   │   │   │   └── api-response.model.ts
│   │   │   │   │
│   │   │   │   ├── enums/
│   │   │   │   │   ├── education-type.enum.ts
│   │   │   │   │   └── language-type.enum.ts
│   │   │   │   ├── services/
│   │   │   │   │   ├── profile.service.ts
│   │   │   │   │   ├── professional-profile.service.ts
│   │   │   │   │   ├── technology.service.ts
│   │   │   │   │   ├── experience.service.ts
│   │   │   │   │   ├── project.service.ts
│   │   │   │   │   ├── education.service.ts
│   │   │   │   │   └── language.service.ts
│   │   │   │   │
│   │   │   │   ├── interceptors/
│   │   │   │   │   └── error.interceptor.ts
│   │   │   │   │
│   │   │   │   └── constants/
│   │   │   │       └── api.constants.ts
│   │   │   │
│   │   │   ├── shared/
│   │   │   │   ├── components/
│   │   │   │   │   ├── loading/
│   │   │   │   │   │   ├── loading.ts
│   │   │   │   │   │   ├── loading.html
│   │   │   │   │   │   └── loading.scss
│   │   │   │   │   │
│   │   │   │   │   └── error-message/
│   │   │   │   │       ├── error-message.ts
│   │   │   │   │       ├── error-message.html
│   │   │   │   │       └── error-message.scss
│   │   │   │   │
│   │   │   │   ├── directives/
│   │   │   │   ├── pipes/
│   │   │   │   └── utils/
│   │   │   │
│   │   │   ├── features/
│   │   │   │   ├── profile/
│   │   │   │   │   ├── profile.ts
│   │   │   │   │   ├── profile.html
│   │   │   │   │   └── profile.scss
│   │   │   │   │
│   │   │   │   ├── professional-profile/
│   │   │   │   │   ├── professional-profile.ts
│   │   │   │   │   ├── professional-profile.html
│   │   │   │   │   └── professional-profile.scss
│   │   │   │   │
│   │   │   │   ├── technologies/
│   │   │   │   │   ├── technologies.ts
│   │   │   │   │   ├── technologies.html
│   │   │   │   │   └── technologies.scss
│   │   │   │   │
│   │   │   │   ├── experience/
│   │   │   │   │   ├── experience.ts
│   │   │   │   │   ├── experience.html
│   │   │   │   │   └── experience.scss
│   │   │   │   │
│   │   │   │   ├── projects/
│   │   │   │   │   ├── projects.ts
│   │   │   │   │   ├── projects.html
│   │   │   │   │   └── projects.scss
│   │   │   │   │
│   │   │   │   ├── education/
│   │   │   │   │   ├── education.ts
│   │   │   │   │   ├── education.html
│   │   │   │   │   └── education.scss
│   │   │   │   │
│   │   │   │   └── languages/
│   │   │   │       ├── languages.ts
│   │   │   │       ├── languages.html
│   │   │   │       └── languages.scss
│   │   │   │
│   │   │   ├── app.ts
│   │   │   ├── app.html
│   │   │   ├── app.scss
│   │   │   ├── app.spec.ts
│   │   │   ├── app.config.ts
│   │   │   └── app.routes.ts
│   │   │
│   │   ├── environments/
│   │   │   ├── environment.production.ts
│   │   │   └── environment.ts
│   │   │
│   │   ├── styles/
│   │   │   ├── _vars.scss
│   │   │   ├── _functions.scss
│   │   │   ├── _mixins.scss
│   │   │   ├── _reset.scss
│   │   │   └── _base.scss
│   │   │
│   │   ├── index.html
│   │   ├── main.ts
│   │   └── styles.scss
│   │
│   ├── .editorconfig
│   ├── .gitignore
│   ├── .prettierrc
│   ├── angular.json
│   ├── package.json
│   ├── package-lock.json
│   ├── tsconfig.json
│   ├── tsconfig.app.json
│   └── tsconfig.spec.json
│
├── docs/
│   ├── architecture.md
│   ├── database.md
│   └── decision-log.md
│
├── README.md
├── LICENSE
└── .gitignore