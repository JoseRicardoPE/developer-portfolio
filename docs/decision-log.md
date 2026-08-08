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

name
lastname

---

## DEC-005 — Ausencia de fotografía en el perfil

**Fecha:** 2026-08-07

### Decisión

El modelo `Profile` no incluirá un campo `photo`.

### Motivo

El CV actual no utiliza fotografía y el portfolio web seguirá la misma estructura visual y de contenido.

No se agregará un campo que no responda a un requisito actual del proyecto.

---
