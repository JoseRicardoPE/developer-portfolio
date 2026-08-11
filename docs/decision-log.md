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
