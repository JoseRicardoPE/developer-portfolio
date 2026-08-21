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