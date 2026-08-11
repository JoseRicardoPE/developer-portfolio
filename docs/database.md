# Database

## Tecnología

El proyecto utiliza:

- MongoDB como base de datos.
- Mongoose como ODM para Node.js.

## Base de datos

La base de datos utilizada durante el desarrollo es:

`developer_portfolio`

La conexión se configura mediante la variable de entorno:

`MONGODB_URI`

Ejemplo para un entorno local:

```env
MONGODB_URI=mongodb://localhost:27017/developer_portfolio
```

## Conexión

La conexión con MongoDB se encuentra centralizada en:

`backend/src/config/database.js`

Flujo de inicialización:

```text
server.js
    ↓
connectToDataBase()
    ↓
MongoDB
    ↓
app.listen()
```

Si la conexión con MongoDB falla, la aplicación finaliza su ejecución.

## ODM

Mongoose se utiliza para:

- Definir schemas.
- Crear modelos.
- Validar la estructura de los datos.
- Gestionar la interacción entre el backend y MongoDB.
- Generar automáticamente `createdAt` y `updatedAt` mediante `timestamps`.

## Identificadores de documentos

MongoDB utiliza `ObjectId` como identificador para los documentos de los recursos de colección.

Los siguientes recursos utilizan `ObjectId` para realizar operaciones sobre documentos específicos:

- `Technology`
- `Experience`
- `Project`
- `Education`
- `Language`

Los endpoints que reciben un parámetro `/:id` validan previamente que el identificador tenga un formato válido antes de realizar operaciones mediante Mongoose.

La validación se encuentra centralizada en:

`backend/src/utils/validateObjectId.js`

Las operaciones utilizadas para trabajar con documentos específicos incluyen:

- `findById()`
- `findByIdAndUpdate()`
- `findByIdAndDelete()`

Los recursos `Profile` y `ProfessionalProfile` representan documentos únicos y, por lo tanto, sus endpoints no requieren un identificador en la URL.

## Modelos y colecciones

El contenido del portfolio se encuentra dividido en los siguientes modelos:

| Modelo                | Colección              | Propósito                                      |
| --------------------- | ---------------------- | ---------------------------------------------- |
| `Profile`             | `profiles`             | Información principal y de contacto del perfil |
| `ProfessionalProfile` | `professionalprofiles` | Descripción del perfil profesional             |
| `Technology`          | `technologies`         | Tecnologías agrupadas por categoría            |
| `Experience`          | `experiences`          | Experiencia profesional y responsabilidades    |
| `Project`             | `projects`             | Proyectos destacados y contribuciones          |
| `Education`           | `educations`           | Formación académica y complementaria           |
| `Language`            | `languages`            | Idiomas y nivel de dominio                     |

La estructura conceptual de la base de datos es:

```text
developer_portfolio
│
├── profiles
├── professionalprofiles
├── technologies
├── experiences
├── projects
├── educations
└── languages
```

## Profile

El modelo `Profile` contiene la información principal y de contacto utilizada en el encabezado del portfolio.

Campos:

- `name`
- `lastname`
- `title`
- `subtitle`
- `location`
- `email`
- `phone`
- `linkedin`
- `github`

El modelo no contiene fotografía ni la descripción completa del perfil profesional.

## ProfessionalProfile

El modelo `ProfessionalProfile` almacena el contenido de la sección de perfil profesional.

Campos:

- `paragraphs[]`

Los párrafos se almacenan como un arreglo para permitir que la cantidad de contenido pueda cambiar sin modificar el schema.

## Technology

El modelo `Technology` representa las tecnologías agrupadas por categoría.

Campos:

- `category`
- `items[]`

Ejemplos de categorías:

- `Frontend`
- `UI Engineering`
- `Herramientas`
- `Backend Fundamentals`

Cada categoría se representa mediante un documento independiente.

## Experience

El modelo `Experience` almacena la experiencia profesional.

Campos:

- `position`
- `company`
- `startDate`
- `endDate`
- `current`
- `responsibilities[]`

`startDate` y `endDate` se almacenan utilizando el tipo `Date`.

El campo `current` permite identificar una experiencia laboral vigente. En ese caso, `endDate` puede permanecer en `null`.

## Project

El modelo `Project` almacena los proyectos destacados del portfolio.

Campos:

- `name`
- `description`
- `technologies[]`
- `contributions[]`
- `url`
- `repository`
- `relatedExperience`

Los campos `description`, `url`, `repository` y `relatedExperience` son opcionales porque no todos los proyectos requieren esa información.

## Education

El modelo `Education` gestiona tanto la formación académica como la formación complementaria.

Campos:

- `type`
- `title`
- `institution`
- `startDate`
- `endDate`
- `technologies[]`
- `contributions[]`

El campo `type` acepta los siguientes valores:

- `degree`
- `bootcamp`
- `course`
- `certification`

La formación complementaria no utiliza una colección independiente.

Esta decisión permite reutilizar la misma estructura para diferentes tipos de formación.

## Language

El modelo `Language` almacena los idiomas y su nivel de dominio.

Campos:

- `language`
- `level`
- `description`

El campo `description` es opcional y permite agregar información adicional sobre el nivel o uso del idioma.

## Timestamps

Todos los modelos utilizan:

```js
{
    timestamps: true
}
```

Mongoose agrega automáticamente:

- `createdAt`
- `updatedAt`

Estos campos permiten conocer cuándo fue creado o actualizado cada documento.
