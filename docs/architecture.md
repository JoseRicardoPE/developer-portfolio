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
Los endpoints de lectura de contenido internacionalizable aceptan opcionalmente el query parameter `lang`, actualmente con soporte para `es` y `en`.

Ejemplo:

`GET /api/experiences?lang=en`

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

- `models/`: interfaces y modelos utilizados para tipar los datos de la aplicación, incluyendo los recibidos desde la API y modelos de estado global.
- `enums/`: enumeraciones compartidas por la aplicación.
- `services/`: servicios responsables de la comunicación con la API REST y de funcionalidades globales de la aplicación, como la gestión del tema visual, idioma y metadata SEO.
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
- `navigation`
- `theme-toggle`
- `language-selector`

Cada feature mantiene sus responsabilidades de presentación encapsuladas en sus archivos TypeScript, HTML y SCSS.

### Navigation

La navegación principal del CV se encuentra encapsulada en la feature:

`src/app/features/navigation/`

La navegación se realiza entre las diferentes secciones de la SPA mediante identificadores de sección, sin requerir cambios de ruta.

Los elementos de navegación se encuentran separados de la lógica del componente mediante:

- `data/navigation-items.data.ts`: configuración de los elementos disponibles en el menú.
- `model/navigation-item.model.ts`: contrato utilizado para tipar cada elemento de navegación.

El componente mantiene mediante Signals los estados de interfaz necesarios para controlar la apertura y cierre del menú y la visibilidad del botón de retorno al inicio.

La navegación incorpora:

- Navegación entre secciones del CV.
- Desplazamiento suave hacia las secciones.
- Menú adaptable a Mobile y Desktop.
- Cierre del menú al seleccionar una sección o interactuar fuera de él.
- Botón `scroll-to-top` para regresar al inicio del documento.

La configuración de los elementos del menú permanece separada de la lógica y presentación del componente, facilitando su mantenimiento y extensión.

### Design System

El frontend utiliza un Design System basado en SCSS para centralizar los estilos y mantener consistencia visual entre las diferentes secciones del CV.

Los estilos globales se encuentran en:

`src/styles/`

La estructura está compuesta por:

- `_vars.scss`: Design Tokens globales estáticos como tipografía, tamaños, spacing, dimensiones de iconos, layout y breakpoints.
- `_functions.scss`: funciones SCSS reutilizables.
- `_mixins.scss`: mixins reutilizables para tipografía, elementos visuales, layout y responsive.
- `_reset.scss`: normalización y reset de estilos del navegador.
- `_base.scss`: estilos base globales de la aplicación.
- `_themes.scss`: definición de los tokens visuales dinámicos utilizados por los temas Light y Dark.

`styles.scss` actúa como punto de entrada de los estilos globales.

Los valores estructurales del Design System permanecen definidos mediante variables SCSS, mientras que los valores que pueden cambiar dinámicamente según el tema visual se representan mediante CSS Custom Properties.

### Theme System

La aplicación soporta los temas visuales `light` y `dark`.

La gestión del tema se encuentra centralizada en:

`src/app/core/services/theme.service.ts`

El tipo utilizado para representar los temas disponibles se encuentra definido en:

`src/app/core/models/theme.model.ts`

La interfaz visual para cambiar manualmente el tema se encuentra encapsulada en:

`src/app/features/theme-toggle/`

El estado del tema se gestiona mediante Angular Signals y se aplica globalmente sobre el documento mediante el atributo:

`data-theme`

Los estilos específicos de cada tema se encuentran centralizados en:

`src/styles/_themes.scss`

Los colores que cambian entre temas utilizan CSS Custom Properties, permitiendo actualizar la apariencia de la aplicación sin duplicar los estilos de cada componente.

La selección inicial del tema sigue el siguiente orden de prioridad:

1. Preferencia almacenada previamente por el usuario en `localStorage`.
2. Preferencia de color configurada en el sistema operativo mediante `prefers-color-scheme`.

Cuando el usuario selecciona manualmente un tema, la preferencia se almacena en `localStorage` para conservarla entre sesiones.

Si no existe una preferencia manual almacenada, la aplicación escucha los cambios de `prefers-color-scheme` mediante `matchMedia` y actualiza el tema en tiempo real cuando cambia la configuración del sistema operativo.

### Language / Internationalization System

La aplicación soporta actualmente los idiomas `es` y `en`.

La gestión del idioma se encuentra centralizada en:

`src/app/core/services/app-language.service.ts`

El tipo utilizado para representar los idiomas disponibles se encuentra definido en:

`src/app/core/models/app-language.model.ts`

La configuración de locales se encuentra centralizada en:

`src/app/core/constants/app-locale.constants.ts`

La interfaz visual para cambiar el idioma se encuentra encapsulada en:

`src/app/features/language-selector/`

Los textos estáticos de la interfaz se gestionan mediante `@ngx-translate/core` y archivos de traducción ubicados en:

`public/i18n/`

Actualmente se utilizan:

- `es.json`
- `en.json`

El idioma seleccionado se almacena en `localStorage` mediante la clave `app-language`.

Cuando no existe una preferencia almacenada, la aplicación utiliza Español como idioma predeterminado.

El cambio de idioma se realiza sin recargar la aplicación.

### Internationalization of API Content

El contenido dinámico proveniente de la API soporta localización mediante el query parameter:

`?lang=es|en`

Los campos que requieren traducción se almacenan en MongoDB mediante una estructura localizada:

{
  es: "...",
  en: "..."
}

Para arrays traducibles se utiliza la misma estrategia:

{
  es: ["..."],
  en: ["..."]
}

La transformación de los documentos se realiza en el backend antes de enviar la respuesta al frontend.

La lógica común de selección del contenido localizado se encuentra centralizada en:

`src/utils/localizeField.js`

Cada recurso dispone de un helper de localización específico cuando es necesario.

El backend utiliza Español como idioma predeterminado cuando el parámetro `lang` no existe o contiene un idioma no soportado.

Los servicios Angular envían el idioma activo mediante el parámetro `lang`, manteniendo los modelos del frontend desacoplados de la estructura bilingüe almacenada en MongoDB.

### SEO and Metadata

La estrategia SEO del frontend combina metadata estática inicial con metadata dinámica gestionada por Angular.

La metadata inicial se encuentra definida en:

`src/index.html`

Esta configuración proporciona valores predeterminados en Español para:

- `title`
- `description`
- Canonical URL
- Open Graph
- Twitter/X Card

La gestión dinámica de metadata se encuentra centralizada en:

`src/app/core/services/seo.service.ts`

El contrato utilizado para representar la metadata SEO se encuentra definido en:

`src/app/core/models/seo-metadata.model.ts`

`SeoService` utiliza los servicios `Title` y `Meta` de Angular para actualizar la metadata según el idioma activo de la aplicación.

Los textos localizables de SEO se encuentran definidos en:

`public/i18n/es.json`

`public/i18n/en.json`

La URL canónica actual de producción es:

`https://fullstackricardo.com/`

Los recursos públicos relacionados con SEO incluyen:

- `robots.txt`
- `sitemap.xml`
- `favicon.ico`
- `favicon.png`
- `images/og-image.png`

La imagen utilizada para Open Graph tiene una resolución de `1200x630`.

### Accessibility

La aplicación prioriza HTML semántico y utiliza atributos ARIA únicamente cuando la semántica nativa no proporciona suficiente información.

La estructura principal utiliza elementos semánticos como:

- `header`
- `nav`
- `main`
- `section`
- `article`

La jerarquía de encabezados sigue una estructura lógica desde `h1` hasta los niveles correspondientes de cada sección.

Las listas de contenido utilizan elementos nativos `ul` y `li`. Los elementos puramente decorativos, como separadores y bullets visuales, se generan mediante CSS y no forman parte del contenido accesible.

Los controles interactivos utilizan elementos HTML nativos siempre que es posible y proporcionan nombres y estados accesibles cuando son necesarios.

La navegación mediante teclado contempla:

- Apertura y cierre de menús mediante controles nativos.
- Cierre mediante la tecla `Escape`.
- Gestión del foco al cerrar o seleccionar opciones.
- Foco programático sobre las secciones seleccionadas.
- Estados `focus-visible`.
- Respeto de `prefers-reduced-motion` para desplazamientos animados.

Los enlaces externos que se abren en una nueva pestaña proporcionan información adicional para tecnologías de asistencia mediante contenido visualmente oculto.

El atributo `lang` del documento se mantiene sincronizado con el idioma activo de la aplicación.

La accesibilidad fue validada mediante Lighthouse y pruebas manuales con NVDA y Firefox.

### Production Deployment

La aplicación utiliza una arquitectura de despliegue independiente para frontend, backend y base de datos.

El entorno de producción está compuesto por:

- Frontend Angular desplegado como Static Site en Render.
- API REST Node.js + Express desplegada como Web Service en Render.
- Base de datos MongoDB alojada en MongoDB Atlas.

El frontend de producción se encuentra disponible mediante:

`https://fullstackricardo.com`

El subdominio:

`https://www.fullstackricardo.com`

redirige automáticamente al dominio raíz.

El backend de producción se encuentra disponible mediante:

`https://api.fullstackricardo.com`

Este dominio está configurado como Custom Domain del Web Service de Render y apunta al servicio mediante un registro DNS `CNAME`.

La comunicación en producción sigue el flujo:

`fullstackricardo.com → Render Static Site → Angular → api.fullstackricardo.com/api → Render Web Service → MongoDB Atlas`

El frontend utiliza Angular Environments para mantener separada la configuración de desarrollo y producción.

La configuración local se encuentra en:

`src/environments/environment.ts`

y utiliza:

`http://localhost:3000/api`

La configuración de producción se encuentra en:

`src/environments/environment.production.ts`

y utiliza:

`https://api.fullstackricardo.com/api`

Angular reemplaza automáticamente `environment.ts` por `environment.production.ts` durante el build de producción mediante la configuración `fileReplacements` definida en `angular.json`.

Los endpoints permanecen centralizados en:

`src/app/core/constants/api.constants.ts`

Los servicios Angular consumen estos endpoints sin conocer directamente si la aplicación se está ejecutando en desarrollo o producción.

El backend utiliza variables de entorno para almacenar configuración sensible y específica del entorno, incluyendo:

- `MONGODB_URI`: cadena de conexión a MongoDB Atlas.
- `NODE_ENV`: entorno de ejecución de la aplicación.
- `CORS_ORIGIN`: origen permitido para las solicitudes realizadas desde el frontend.

La conexión de producción a MongoDB se realiza mediante MongoDB Atlas y se establece antes de iniciar el servidor HTTP.

Render utiliza el endpoint:

`GET /api/health`

como Health Check para verificar que la API se encuentra disponible.

El servicio de Render mantiene habilitado su subdominio original como endpoint alternativo:

`https://developer-cv-api.onrender.com`

mientras que el dominio público utilizado por el frontend es:

`https://api.fullstackricardo.com`

Render administra los certificados HTTPS de los dominios personalizados utilizados por frontend y backend.

El frontend mantiene habilitado como endpoint alternativo el subdominio proporcionado por Render:

`https://developer-cv.onrender.com`

El dominio público y canónico utilizado por la aplicación es:

`https://fullstackricardo.com`

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
│   │   │   ├── validateObjectId.js
│   │   │   ├── localizeField.js
│   │   │   ├── localizeEducation.js
│   │   │   ├── localizeExperience.js
│   │   │   ├── localizeLanguage.js
│   │   │   ├── localizeProfessionalProfile.js
│   │   │   ├── localizeProject.js
│   │   │   └── localizeTechnology.js
│   │   ├── app.js
│   │   └── server.js
│   │
│   ├── .env.example
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   ├── public/
│   │   ├── images/
│   │   │    └── og-image.png
│   │   ├── i18n/
│   │   │   ├── es.json
│   │   │   └── en.json
│   │   ├── favicon.ico
│   │   ├── favicon.png
│   │   ├── robots.txt
│   │   └── sitemap.xml
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
│   │   │   │   │   ├── api-response.model.ts
│   │   │   │   │   ├── theme.model.ts
│   │   │   │   │   ├── app-language.model.ts
│   │   │   │   │   └── seo-metadata.model.ts
│   │   │   │   │
│   │   │   │   ├── enums/
│   │   │   │   │   └── education-type.enum.ts
│   │   │   │   │
│   │   │   │   ├── services/
│   │   │   │   │   ├── profile.service.ts
│   │   │   │   │   ├── professional-profile.service.ts
│   │   │   │   │   ├── technology.service.ts
│   │   │   │   │   ├── experience.service.ts
│   │   │   │   │   ├── project.service.ts
│   │   │   │   │   ├── education.service.ts
│   │   │   │   │   ├── language.service.ts
│   │   │   │   │   ├── theme.service.ts
│   │   │   │   │   ├── app-language.service.ts
│   │   │   │   │   └── seo.service.ts
│   │   │   │   │
│   │   │   │   ├── interceptors/
│   │   │   │   │   └── error.interceptor.ts
│   │   │   │   │
│   │   │   │   └── constants/
│   │   │   │       ├── api.constants.ts
│   │   │   │       └── app-locale.constants.ts
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
│   │   │   │   ├── languages/
│   │   │   │   │   ├── languages.html
│   │   │   │   │   ├── languages.ts
│   │   │   │   │   └── languages.scss
│   │   │   │   │
│   │   │   │   ├── navigation/
│   │   │   │   │   ├── data/
│   │   │   │   │   │   └── navigation-items.data.ts
│   │   │   │   │   │
│   │   │   │   │   ├── model/
│   │   │   │   │   │   └── navigation-item.model.ts
│   │   │   │   │   │
│   │   │   │   │   ├── navigation.ts
│   │   │   │   │   ├── navigation.html
│   │   │   │   │   └── navigation.scss
│   │   │   │   │
│   │   │   │   ├── theme-toggle/
│   │   │   │   │   ├── theme-toggle.ts
│   │   │   │   │   ├── theme-toggle.html
│   │   │   │   │   └── theme-toggle.scss
│   │   │   │   │
│   │   │   │   └── language-selector/
│   │   │   │       ├── language-selector.ts
│   │   │   │       ├── language-selector.html
│   │   │   │       └── language-selector.scss
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
│   │   │   ├── _base.scss
│   │   │   └── _themes.scss
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