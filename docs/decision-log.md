# Decision Log

Registro de decisiones técnicas y arquitectónicas tomadas durante el desarrollo del proyecto.

---

## DEC-001 — Arquitectura Full Stack

**Fecha:** 2026-08-07

### Decisión

El proyecto se desarrollará como una aplicación Full Stack dividida en dos aplicaciones independientes:

- Frontend: Angular 21
- Backend: Node.js + Express
- Base de datos: MongoDB

### Motivo

Separar frontend, backend y persistencia permite mantener responsabilidades independientes y facilita la evolución y mantenimiento del proyecto.

---

## DEC-002 — MongoDB como base de datos

**Fecha:** 2026-08-07

### Decisión

Se utilizará MongoDB como sistema de persistencia.

### Motivo

El contenido del portfolio está compuesto principalmente por documentos estructurados como perfil, experiencia, proyectos, formación y tecnologías.

MongoDB permite almacenar esta información de forma flexible y trabajar con ella mediante Mongoose.

---

## DEC-003 — Mongoose como ODM

**Fecha:** 2026-08-07

### Decisión

Se utilizará Mongoose para interactuar con MongoDB desde el backend.

### Motivo

Mongoose permite definir schemas, modelos y validaciones para mantener una estructura consistente en los datos.

---

## DEC-004 — Separación de nombre y apellido

**Fecha:** 2026-08-07

### Decisión

El modelo `Profile` utilizará campos independientes para el nombre y el apellido:

- `name`
- `lastname`

### Motivo

El CV presenta visualmente el nombre y el apellido como elementos independientes.

Mantenerlos separados permite que el frontend controle su presentación de forma flexible y mantenga una correspondencia directa con la estructura visual del CV.

---

## DEC-005 — Ausencia de fotografía en el perfil

**Fecha:** 2026-08-07

### Decisión

El modelo `Profile` no incluirá un campo `photo`.

### Motivo

El CV actual no utiliza fotografía y el portfolio web seguirá la misma estructura visual y de contenido.

No se agregará un campo que no responda a un requisito actual del proyecto.

---

## DEC-006 — Unificación de formación en el modelo Education

**Fecha:** 2026-08-08

### Decisión

La formación académica y la formación complementaria se gestionarán mediante un único modelo `Education`.

No se creará un modelo independiente `ComplementaryEducation`.

El modelo `Education` utilizará el campo `type` para identificar el tipo de formación:

- `degree`
- `bootcamp`
- `course`
- `certification`

### Motivo

La formación académica y la formación complementaria comparten una estructura de datos similar, incluyendo información como título, institución y fechas.

Mantener un único modelo evita duplicar schemas y permite gestionar los diferentes tipos de formación mediante una misma colección.

El campo type permitirá distinguir cada tipo de formación y facilitará posteriormente su filtrado y presentación desde la API y el frontend.

---

## DEC-007 — Validación centralizada de ObjectId

**Fecha:** 2026-08-10

### Decisión

Los endpoints de recursos de colección que reciben un identificador mediante `/:id` validarán el formato del `ObjectId` antes de realizar una consulta a MongoDB.

La validación se centralizará en:

`src/utils/validateObjectId.js`

y será utilizada por los controladores de los siguientes recursos:

- `Technology`
- `Experience`
- `Project`
- `Education`
- `Language`

Los recursos `Profile` y `ProfessionalProfile` no requieren esta validación porque representan documentos únicos y sus endpoints no utilizan `/:id`.

### Motivo

Las operaciones de Mongoose como `findById()`, `findByIdAndUpdate()` y `findByIdAndDelete()` esperan identificadores compatibles con `ObjectId`.

Si se recibe un identificador con un formato inválido, Mongoose puede generar un `CastError`.

Validar previamente el identificador permite evitar que este caso sea tratado como un error interno del servidor y proporciona respuestas HTTP más claras y consistentes.

La API utilizará la siguiente convención:

- `400 Bad Request`: el identificador recibido no tiene un formato válido de `ObjectId`.
- `404 Not Found`: el identificador tiene un formato válido, pero el documento no existe.
- `200 OK`: el identificador es válido y el documento solicitado existe.

### Implementación

La validación utiliza:

`mongoose.Types.ObjectId.isValid(id)`

La lógica se encuentra centralizada en una función reutilizable para evitar duplicar directamente la validación de Mongoose en cada controlador.

---

## DEC-008 — Estrategia de integración entre Angular y la API REST

**Fecha:** 2026-08-14

### Decisión

El frontend Angular utilizará una estrategia centralizada para la comunicación con la API REST y para la gestión de los estados asociados a las peticiones HTTP.

La integración utilizará los siguientes elementos:

- Angular environments para configurar la URL base de la API según el entorno.
- `environment.ts` para el entorno de desarrollo.
- `environment.production.ts` para el entorno de producción.
- `api.constants.ts` para centralizar los endpoints de la API.
- Servicios Angular para encapsular las peticiones HTTP de cada recurso.
- `HttpClient` como cliente para la comunicación con la API REST.
- Un interceptor HTTP funcional para centralizar el registro de errores HTTP.
- Angular Signals para gestionar los estados de datos, carga y error en cada feature.
- Componentes compartidos `Loading` y `ErrorMessage` para representar estados comunes de la interfaz.

Los títulos de las secciones permanecerán independientes del estado de las peticiones HTTP, permitiendo que continúen visibles durante los estados de carga o error.

### Motivo

Centralizar la configuración de la API evita utilizar URLs hardcodeadas directamente en los servicios y permite adaptar la aplicación a diferentes entornos sin modificar la lógica de comunicación.

Los servicios mantienen separada la responsabilidad de acceso a datos de la lógica de presentación de los componentes.

El interceptor permite disponer de un punto común para registrar errores HTTP, mientras que cada feature mantiene la responsabilidad de decidir qué mensaje mostrar al usuario.

Los Signals permiten representar de forma explícita los tres estados principales de cada petición:

- Datos.
- Carga.
- Error.

Los componentes compartidos evitan duplicar la representación visual de los estados de carga y error entre las diferentes secciones del portfolio.

### Implementación

El flujo de comunicación queda estructurado de la siguiente manera:

`Environment → API Constants → Angular Services → HttpClient → HTTP Interceptor → Express API → MongoDB`

En desarrollo se utiliza:

`environment.ts → http://localhost:3000/api`

En producción se utiliza:

`environment.production.ts → /api`

Angular realiza el reemplazo del archivo de environment mediante `fileReplacements` en la configuración de producción de `angular.json`.

Cada feature mantiene Signals para representar su estado:

- `data`: información obtenida desde la API.
- `loading`: indica que la petición se encuentra en curso.
- `error`: contiene el mensaje que debe mostrarse cuando la petición falla.

Los estados comunes de interfaz se representan mediante:

- `shared/components/loading`
- `shared/components/error-message`

---

## DEC-009 — Design System centralizado con SCSS

**Fecha:** 2026-08-20

### Decisión

El frontend utilizará un Design System centralizado basado en SCSS para mantener consistencia visual entre las diferentes secciones del portfolio.

Los estilos globales se organizarán en:

- `_vars.scss`: Design Tokens globales.
- `_functions.scss`: funciones SCSS reutilizables.
- `_mixins.scss`: mixins reutilizables.
- `_reset.scss`: normalización de estilos del navegador.
- `_base.scss`: estilos base de la aplicación.

El archivo `styles.scss` actuará como punto de entrada de los estilos globales.

Los Design Tokens centralizarán valores reutilizables como:

- Colores.
- Tipografía.
- Tamaños de fuente.
- Pesos tipográficos.
- Line heights.
- Spacing.
- Tamaños de iconos.
- Valores de layout.
- Breakpoints.

Las variables globales representarán valores reutilizables y no estarán asociadas innecesariamente a componentes específicos cuando compartan el mismo valor.

### Motivo

Centralizar los valores visuales evita repetir valores directamente en los estilos de cada componente y mantiene una única fuente de referencia para el diseño.

Una escala global permite reutilizar valores equivalentes aunque pertenezcan a diferentes elementos visuales.

Esto facilita:

- Mantener consistencia entre componentes.
- Realizar cambios globales.
- Reducir duplicación.
- Mantener los estilos escalables.
- Conservar correspondencia con el Design System definido en Figma.

### Implementación

Los estilos globales se encuentran en:

`frontend/src/styles/`

Los componentes consumen las variables y mixins mediante el sistema de módulos de Sass utilizando `@use`.

Los estilos específicos de cada feature permanecen encapsulados en su correspondiente archivo `.scss`.

### Evolución

A partir de la implementación del sistema de temas Light/Dark, los Design Tokens se dividen según su comportamiento:

- Los valores estáticos continúan utilizando variables SCSS.
- Los valores visuales que cambian dinámicamente según el tema utilizan CSS Custom Properties.

La estrategia de gestión de temas y tokens dinámicos se encuentra documentada en `DEC-013`.

---

## DEC-010 — Estrategia responsive Mobile First

**Fecha:** 2026-08-20

### Decisión

La implementación responsive del frontend seguirá una estrategia Mobile First.

Los estilos base de los componentes representarán la versión Mobile y las adaptaciones para resoluciones superiores se aplicarán mediante media queries con `min-width`.

Los breakpoints estarán centralizados como Design Tokens globales:

- Tablet: `768px`
- Desktop: `1024px`
- Wide: `1440px`

Las referencias principales de diseño serán:

- Mobile: `375px`
- Desktop: `1440px`

Cuando una propiedad mantenga el mismo comportamiento entre Mobile y Desktop, no se volverá a declarar dentro del breakpoint.

Si únicamente cambia una propiedad, como `font-size`, se sobrescribirá solamente esa propiedad en Desktop en lugar de aplicar nuevamente un conjunto completo de estilos.

### Motivo

Mobile First permite definir primero la estructura mínima necesaria y extender progresivamente el diseño conforme aumenta el espacio disponible.

Evitar redeclarar propiedades que ya fueron definidas en los estilos base reduce duplicación de CSS y mantiene las reglas responsive más simples.

Centralizar los breakpoints evita utilizar valores arbitrarios directamente en los componentes y mantiene un comportamiento responsive consistente en toda la aplicación.

### Implementación

Los breakpoints se encuentran definidos en:

`frontend/src/styles/_vars.scss`

Los mixins responsive se encuentran centralizados en:

`frontend/src/styles/_mixins.scss`

Los componentes definen sus estilos Mobile como estilos base y utilizan los mixins responsive únicamente cuando necesitan modificar su presentación para resoluciones superiores.

---

## DEC-011 — Metodología BEM para nomenclatura CSS

**Fecha:** 2026-08-20

### Decisión

Las clases CSS de las features del frontend utilizarán la metodología BEM (Block, Element, Modifier).

Cada feature visual se considerará un bloque independiente.

Los elementos que pertenecen al bloque utilizarán la nomenclatura:

`block__element`

Cuando sea necesario representar una variante o estado visual mediante una clase CSS, podrá utilizarse:

`block__element--modifier`

o:

`block--modifier`

según corresponda.

### Motivo

BEM proporciona una convención predecible para nombrar las clases y permite identificar claramente la relación entre un componente y sus elementos internos.

Esto facilita:

- Evitar nombres de clases ambiguos.
- Mantener los estilos asociados a cada feature.
- Comprender la estructura del componente desde el template.
- Reducir conflictos entre estilos.
- Facilitar el mantenimiento conforme crezca la aplicación.

### Implementación

Cada feature utiliza su nombre como bloque principal.

Por ejemplo:

`technologies`

Sus elementos internos utilizan nombres derivados del bloque:

- `technologies__title`
- `technologies__content`
- `technologies__group`
- `technologies__category`
- `technologies__items`
- `technologies__item`

Los nombres BEM describen la responsabilidad estructural o semántica del elemento y no su apariencia visual.

---

## DEC-012 — Navegación interna por secciones

**Fecha:** 2026-08-25

### Decisión

La navegación principal del CV se implementará como una feature independiente ubicada en:

`frontend/src/app/features/navigation/`

La navegación entre las diferentes secciones del CV se realizará mediante identificadores de sección dentro de la misma SPA, sin utilizar Angular Router para estos desplazamientos.

Los elementos disponibles en el menú se mantendrán separados de la lógica y presentación del componente mediante:

- `data/navigation-items.data.ts`: configuración de los elementos de navegación.
- `model/navigation-item.model.ts`: contrato utilizado para tipar cada elemento.

El componente utilizará Angular Signals para gestionar los estados de interfaz relacionados con:

- Apertura y cierre del menú.
- Visibilidad del botón `scroll-to-top`.

La navegación incluirá:

- Navegación directa entre las secciones del CV.
- Desplazamiento suave.
- Cierre del menú al seleccionar una sección.
- Cierre del menú al interactuar fuera del componente.
- Botón `scroll-to-top` para regresar al inicio del documento.

### Motivo

El CV se presenta actualmente como una única página y sus secciones forman parte del mismo documento.

Utilizar navegación mediante identificadores permite desplazarse directamente entre las secciones sin introducir rutas adicionales que no representan páginas independientes.

Separar los elementos de navegación de la lógica del componente evita hardcodear repetidamente su estructura en el template y facilita agregar, eliminar o modificar secciones posteriormente.

El uso de Signals permite representar de forma simple y reactiva los estados locales de interfaz del componente.

### Implementación

La feature se encuentra organizada en:

`frontend/src/app/features/navigation/`

con la siguiente estructura:

- `data/navigation-items.data.ts`
- `model/navigation-item.model.ts`
- `navigation.ts`
- `navigation.html`
- `navigation.scss`

La navegación utiliza enlaces internos asociados a los identificadores de las secciones correspondientes.

La iconografía del menú y del botón `scroll-to-top` utiliza Font Awesome, manteniendo la estrategia global de iconografía definida para el frontend.

---

## DEC-013 — Gestión global de temas Light y Dark

**Fecha:** 2026-08-26

### Decisión

El frontend soportará los temas visuales `light` y `dark` mediante una estrategia global centralizada.

La lógica y el estado del tema estarán gestionados por:

`frontend/src/app/core/services/theme.service.ts`

Los temas disponibles estarán tipados mediante:

`frontend/src/app/core/models/theme.model.ts`

La interfaz que permite al usuario cambiar manualmente el tema estará encapsulada en:

`frontend/src/app/features/theme-toggle/`

El estado global del tema se gestionará mediante Angular Signals.

El tema activo se aplicará al documento mediante el atributo:

`data-theme`

sobre el elemento `body`.

Los valores visuales que cambian entre Light y Dark se definirán mediante CSS Custom Properties centralizadas en:

`frontend/src/styles/_themes.scss`

Los Design Tokens que no dependen del tema, como spacing, tamaños tipográficos, breakpoints y valores de layout, continuarán utilizando variables SCSS.

### Prioridad del tema

La selección inicial del tema seguirá el siguiente orden:

1. Preferencia seleccionada previamente por el usuario y almacenada en `localStorage`.
2. Preferencia del sistema operativo obtenida mediante `prefers-color-scheme`.

Cuando el usuario seleccione manualmente un tema, dicha preferencia tendrá prioridad sobre la configuración del sistema operativo.

Si no existe una preferencia manual almacenada, la aplicación reaccionará en tiempo real a cambios en `prefers-color-scheme`.

### Motivo

Centralizar el estado del tema evita que las features individuales necesiten determinar si la aplicación se encuentra en modo Light o Dark.

El uso de CSS Custom Properties permite cambiar dinámicamente los valores visuales en runtime sin generar estilos específicos para cada tema dentro de cada componente.

Mantener los Design Tokens estructurales mediante SCSS y utilizar CSS Custom Properties únicamente para los valores dinámicos permite conservar el Design System existente y añadir soporte para temas sin duplicar estilos.

Persistir la selección mediante `localStorage` permite mantener la preferencia del usuario entre sesiones.

Utilizar `prefers-color-scheme` cuando no existe una elección manual permite respetar la configuración visual del sistema operativo del usuario.

### Implementación

El flujo de gestión del tema queda estructurado de la siguiente manera:

`ThemeToggle → ThemeService → Angular Signal → body[data-theme] → CSS Custom Properties`

La definición de los temas se encuentra en:

`frontend/src/styles/_themes.scss`

Los componentes consumen directamente los Design Tokens dinámicos mediante:

`var(--token-name)`

sin contener lógica específica para determinar el tema activo.

`ThemeService` utiliza `matchMedia('(prefers-color-scheme: dark)')` para detectar la preferencia inicial del sistema y escuchar cambios posteriores cuando no existe una preferencia manual.

La selección manual del usuario se almacena en `localStorage`.

---

## DEC-014 — Estrategia de internacionalización del CV

**Fecha:** 2026-08-29

### Decisión

La aplicación soportará inicialmente los idiomas Español (`es`) e Inglés (`en`) mediante una estrategia de internacionalización centralizada que permita cambiar el idioma en runtime sin recargar la aplicación.

La gestión del idioma activo estará centralizada en:

`frontend/src/app/core/services/app-language.service.ts`

Los idiomas soportados estarán tipados mediante:

`frontend/src/app/core/models/app-language.model.ts`

La configuración utilizada para relacionar cada idioma con su locale correspondiente estará centralizada en:

`frontend/src/app/core/constants/app-locale.constants.ts`

La interfaz para seleccionar el idioma estará encapsulada en:

`frontend/src/app/features/language-selector/`

Los textos estáticos de la interfaz se gestionarán mediante `@ngx-translate/core` y archivos de traducción almacenados en:

`frontend/public/i18n/`

Inicialmente se utilizarán:

- `es.json`
- `en.json`

El idioma seleccionado por el usuario se almacenará en `localStorage` mediante la clave:

`app-language`

Cuando no exista una preferencia almacenada, Español (`es`) será el idioma predeterminado.

El contenido dinámico proveniente de MongoDB utilizará campos localizados cuando su contenido requiera traducción:

{
  es: "...",
  en: "..."
}

Los endpoints de lectura de recursos internacionalizables aceptarán el query parameter:

`?lang=es|en`

La API transformará los documentos antes de enviarlos al frontend, devolviendo únicamente el contenido correspondiente al idioma solicitado.

La selección común del contenido localizado estará centralizada en:

`backend/src/utils/localizeField.js`

Los recursos que lo requieran dispondrán de helpers específicos de localización.

### Motivo

Centralizar el idioma activo evita distribuir lógica condicional relacionada con Español e Inglés entre los diferentes componentes del frontend.

Utilizar archivos de traducción para los textos estáticos permite mantener el contenido de interfaz separado de los componentes y facilita incorporar nuevos idiomas posteriormente.

Mantener los campos traducibles en MongoDB permite que el contenido dinámico del CV también pueda presentarse en diferentes idiomas sin duplicar documentos completos.

Realizar la transformación del contenido localizado en el backend mantiene al frontend desacoplado de la estructura bilingüe almacenada en MongoDB y permite conservar interfaces simples para los recursos consumidos.

El uso del query parameter `lang` mantiene explícito el idioma solicitado en cada petición y permite que la API determine qué representación del contenido debe devolver.

Persistir la selección mediante `localStorage` permite conservar la preferencia del usuario entre sesiones.

### Implementación

El flujo de internacionalización del contenido estático queda estructurado de la siguiente manera:

`LanguageSelector → AppLanguageService → Angular Signal → ngx-translate → Translation Files`

El flujo del contenido dinámico queda estructurado de la siguiente manera:

`AppLanguageService → Angular Service → ?lang → Express Controller → Localization Helper → MongoDB Document → Localized API Response`

Los servicios Angular envían el idioma activo mediante el parámetro `lang`.

El backend utiliza Español (es) como idioma predeterminado cuando el parámetro `lang` no existe o contiene un idioma no soportado.

Los componentes consumen contenido ya localizado y no necesitan conocer la estructura bilingüe almacenada en MongoDB.

Las fechas utilizan el locale correspondiente al idioma activo. Para las fechas del CV representadas por mes y año se utiliza UTC durante el formateo, evitando desplazamientos provocados por la zona horaria local.

---

## DEC-015 — Estrategia de SEO y accesibilidad

**Fecha:** 2026-08-31

### Decisión

El frontend utilizará una estrategia centralizada de SEO y accesibilidad basada en metadata estática inicial, metadata dinámica localizada y HTML semántico.

La metadata inicial se definirá en:

`frontend/src/index.html`

Esta metadata proporcionará valores predeterminados en Español para los elementos principales utilizados por buscadores y plataformas sociales.

La gestión dinámica de metadata estará centralizada en:

`frontend/src/app/core/services/seo.service.ts`

El contrato utilizado para representar la metadata SEO estará definido en:

`frontend/src/app/core/models/seo-metadata.model.ts`

`SeoService` actualizará dinámicamente:

- `title`
- `description`
- Canonical URL
- Open Graph
- Twitter/X Card
- Locale utilizado por Open Graph

Los textos localizables de SEO se mantendrán en los archivos de traducción existentes:

`frontend/public/i18n/es.json`

`frontend/public/i18n/en.json`

El atributo `lang` del documento se mantendrá sincronizado con el idioma activo mediante `AppLanguageService`.

La aplicación utilizará como URL canónica:

`https://fullstackricardo.com/`

Los recursos públicos relacionados con SEO incluirán:

- `robots.txt`
- `sitemap.xml`
- `favicon.ico`
- `favicon.png`
- `images/og-image.png`

La estrategia de accesibilidad priorizará HTML semántico y elementos interactivos nativos. Los atributos ARIA se utilizarán únicamente cuando aporten información que no pueda representarse suficientemente mediante semántica HTML nativa.

La navegación y los controles interactivos deberán ser utilizables mediante teclado y mantener estados de foco visibles.

Los elementos puramente decorativos no formarán parte del contenido expuesto a tecnologías de asistencia.

### Motivo

Centralizar la metadata evita distribuir lógica SEO entre diferentes componentes y proporciona un único punto responsable de actualizar la información utilizada por el documento.

Mantener metadata estática inicial permite que el documento disponga de información SEO predeterminada antes de que Angular actualice dinámicamente los valores localizados.

Integrar la metadata con el sistema de internacionalización permite mantener `title`, `description` y metadata social sincronizados con el idioma activo de la aplicación.

Definir una URL canónica evita representaciones ambiguas de la URL principal y establece una referencia consistente para buscadores y plataformas sociales.

Utilizar `robots.txt`, `sitemap.xml`, favicon y una imagen Open Graph proporciona los recursos básicos necesarios para indexación e identificación y presentación del sitio.

Priorizar HTML semántico permite que navegadores y tecnologías de asistencia interpreten la estructura y los controles utilizando comportamiento estándar, reduciendo la necesidad de añadir ARIA innecesariamente.

Gestionar correctamente el foco, la navegación mediante teclado, los nombres accesibles y los estados interactivos permite que las funcionalidades principales no dependan exclusivamente del uso del mouse.

### Implementación

El flujo de actualización de metadata localizada queda estructurado de la siguiente manera:

`AppLanguageService → Angular Signal → App effect → SeoService → ngx-translate → Title / Meta → Document Metadata`

`SeoService` utiliza los servicios `Title` y `Meta` de Angular para actualizar la metadata del documento.

La metadata inicial permanece definida en `index.html` utilizando Español como idioma predeterminado.

`AppLanguageService` sincroniza el idioma activo con el atributo `lang` del elemento `html`.

La estructura principal del documento utiliza elementos semánticos como `header`, `nav`, `main`, `section` y `article` cuando corresponden a la responsabilidad del contenido.

La jerarquía de encabezados mantiene una estructura lógica desde el `h1` principal hacia los niveles correspondientes de cada sección.

Las listas de contenido utilizan elementos nativos `ul` y `li`, mientras que bullets y separadores puramente visuales se generan mediante CSS.

Los controles de navegación, selección de idioma y cambio de tema utilizan elementos nativos y exponen nombres o estados accesibles cuando es necesario.

La navegación permite gestionar el foco mediante teclado, cerrar controles mediante `Escape` y dirigir el foco hacia la sección seleccionada.

Los estados `focus-visible` utilizan tokens compatibles con los temas Light y Dark.

Los desplazamientos animados respetan la preferencia `prefers-reduced-motion`.

Los enlaces externos que abren una nueva pestaña incluyen información adicional disponible para tecnologías de asistencia mediante contenido visualmente oculto.

La implementación fue validada mediante Lighthouse y pruebas manuales con NVDA y Firefox.

---

### DEC-016 — Estrategia de despliegue y configuración de producción

**Fecha:** 2026-09-01

**Decisión**

Separar el despliegue de los diferentes componentes de la aplicación, utilizando servicios independientes para el frontend, backend y base de datos.

El backend Node.js + Express se despliega como un Web Service en Render y utiliza el dominio personalizado:

`https://api.fullstackricardo.com`

La persistencia de datos en producción se realiza mediante MongoDB Atlas.

El frontend utiliza Angular Environments para mantener configuraciones independientes entre desarrollo y producción, utilizando en producción:

`https://api.fullstackricardo.com/api`

como URL base de la API.

**Motivo**

Mantener desacoplados el frontend, backend y base de datos permite desplegar, configurar y evolucionar cada componente de forma independiente.

El uso de variables de entorno evita almacenar configuración sensible directamente en el código fuente, mientras que Angular Environments permite seleccionar automáticamente la configuración correspondiente durante el proceso de build.

El dominio personalizado de la API proporciona una URL estable e independiente del proveedor utilizado para alojar el backend.

**Implementación**

- MongoDB Atlas se utiliza como base de datos del entorno de producción.
- Render aloja la API REST desarrollada con Node.js y Express.
- `api.fullstackricardo.com` está configurado como Custom Domain del servicio backend.
- El DNS utiliza un registro `CNAME` para dirigir `api.fullstackricardo.com` al servicio de Render.
- `environment.ts` mantiene la configuración utilizada durante el desarrollo local.
- `environment.production.ts` define la URL de la API utilizada en producción.
- Angular utiliza `fileReplacements` para seleccionar el environment correspondiente durante el build.
- Los endpoints permanecen centralizados en `api.constants.ts`.
- La configuración sensible del backend se administra mediante variables de entorno.
- `CORS_ORIGIN` restringe las solicitudes del navegador al origen configurado para el frontend.

---
