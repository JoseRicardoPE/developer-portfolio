# Database

## Tecnología

El proyecto utiliza:

- MongoDB como base de datos.
- Mongoose como ODM para Node.js.

## Base de datos

La base de datos utilizada por la aplicación es:

`developer_portfolio`

Durante el desarrollo local, MongoDB se ejecuta localmente y la conexión se configura mediante:

`MONGODB_URI`

Ejemplo para un entorno local:

```env
MONGODB_URI=mongodb://localhost:27017/developer_portfolio
```

En producción, la base de datos se encuentra alojada en MongoDB Atlas.

La conexión de producción también se configura mediante la variable de entorno:

`MONGODB_URI`

La cadena de conexión de producción se administra como una variable de entorno del backend desplegado en Render y no se almacena en el repositorio.

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

El contenido del CV se encuentra dividido en los siguientes modelos:

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

El modelo `Profile` contiene la información principal y de contacto utilizada en el encabezado del CV.

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

- `paragraphs[]`: párrafos localizados en español e inglés.

El campo `paragraphs` almacena un arreglo de textos para cada idioma, permitiendo mantener versiones independientes del contenido en español e inglés.

El uso de arreglos permite modificar la cantidad de párrafos sin necesidad de cambiar el schema.

## Technology

El modelo `Technology` representa las tecnologías agrupadas por categoría.

Campos:

- `category`: nombre de la categoría localizado en español e inglés.
- `items[]`: tecnologías pertenecientes a la categoría.

Ejemplos de categorías:

- `Frontend`
- `UI Engineering`
- `Herramientas`
- `Backend Fundamentals`

Cada categoría se representa mediante un documento independiente.

El campo `category` mantiene versiones independientes en español e inglés, mientras que `items` contiene un arreglo de tecnologías compartido entre ambos idiomas.

## Experience

El modelo `Experience` almacena la experiencia profesional.

Campos:

- `position`: cargo localizado en español e inglés.
- `company`: nombre de la empresa.
- `startDate`: fecha de inicio.
- `endDate`: fecha de finalización.
- `current`: indica si la experiencia laboral se encuentra vigente.
- `responsibilities[]`: responsabilidades localizadas en español e inglés.

Los campos `startDate` y `endDate` se almacenan utilizando el tipo `Date`.

El campo `current` permite identificar una experiencia laboral vigente. Cuando su valor es `true`, `endDate` puede permanecer en `null`.

El campo `position` mantiene versiones independientes en español e inglés.

El campo `responsibilities` almacena un arreglo de textos para cada idioma, permitiendo mantener versiones localizadas de las responsabilidades de cada experiencia.

## Project

El modelo `Project` almacena los proyectos destacados del CV.

Campos:

- `name`: nombre del proyecto localizado en español e inglés.
- `description`: descripción localizada en español e inglés.
- `technologies[]`: tecnologías utilizadas en el proyecto.
- `contributions[]`: contribuciones localizadas en español e inglés.
- `url`: URL pública del proyecto.
- `repository`: URL del repositorio.
- `relatedExperience`: experiencia profesional relacionada con el proyecto.

Los campos `name` y `description` mantienen versiones independientes en español e inglés.

El campo `contributions` almacena un arreglo de textos para cada idioma, permitiendo mantener versiones localizadas de las contribuciones realizadas en el proyecto.

El campo `technologies` contiene un arreglo de tecnologías compartido entre ambos idiomas.

Los campos `description`, `url`, `repository` y `relatedExperience` son opcionales porque no todos los proyectos requieren esa información.

## Education

El modelo `Education` gestiona tanto la formación académica como la formación complementaria.

Campos:

- `type`: tipo de formación.
- `title`: título de la formación localizado en español e inglés.
- `institution`: nombre de la institución.
- `startDate`: fecha de inicio.
- `endDate`: fecha de finalización.
- `technologies[]`: tecnologías relacionadas con la formación.
- `contributions[]`: contribuciones o descripciones localizadas en español e inglés.

El campo `type` acepta los siguientes valores:

- `degree`
- `bootcamp`
- `course`
- `certification`

Los campos `startDate` y `endDate` se almacenan utilizando el tipo `Date` y pueden permanecer en `null`.

El campo `title` mantiene versiones independientes en español e inglés.

El campo `contributions` almacena un arreglo de textos para cada idioma, permitiendo mantener versiones localizadas del contenido asociado a la formación.

El campo `technologies` contiene un arreglo de tecnologías compartido entre ambos idiomas.

La formación complementaria no utiliza una colección independiente.

Esta decisión permite reutilizar la misma estructura para diferentes tipos de formación.

## Language

El modelo `Language` almacena los idiomas y su nivel de dominio.

Campos:

- `language`: contenido localizado en español e inglés.
- `level`: nivel localizado en español e inglés.
- `description[]`: descripciones localizadas en español e inglés.

El campo `description` almacena un arreglo de textos para cada idioma y permite agregar información adicional sobre el nivel o uso del idioma.

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
