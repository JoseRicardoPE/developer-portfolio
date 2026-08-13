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
│   │   │   │   │   └── education-type.enum.ts
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
│   │   │   │   │   ├── section-title/
│   │   │   │   │   ├── loading/
│   │   │   │   │   └── error-message/
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