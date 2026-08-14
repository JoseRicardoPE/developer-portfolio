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
