# Developer Portfolio CMS

Full Stack platform for my professional CV, built with Angular, Node.js, Express and MongoDB.

The application presents my professional experience, technical skills, education, languages and featured projects through a modern, responsive and multilingual web application.

Its content is provided dynamically through a REST API backed by MongoDB instead of being hardcoded in the frontend.

🌐 **Live:** https://fullstackricardo.com
🔗 **API:** https://api.fullstackricardo.com

---

## 🚀 Project Overview

Developer Portfolio CMS is a Full Stack web application designed to centralize and present my professional profile as a Software Engineer / Frontend Engineer.

The application includes:

- Professional profile
- Technical skills
- Professional experience
- Featured projects
- Academic and complementary education
- Languages
- Spanish and English content
- Light and dark themes
- Responsive design
- SEO metadata
- Accessibility improvements

The project was developed following a structured workflow based on Agile principles, Git, GitHub, feature branches, pull requests and Conventional Commits.

The application is currently deployed in production using Render and MongoDB Atlas.

---

## 🛠️ Tech Stack

### Frontend

- Angular 21
- TypeScript
- HTML5
- SCSS
- Angular Signals
- RxJS
- ngx-translate
- Font Awesome
- Responsive Web Design
- Mobile First

### Backend

- Node.js
- Express
- REST API
- CORS
- Morgan

### Database

- MongoDB
- MongoDB Atlas
- Mongoose

### Deployment

- Render Static Site
- Render Web Service
- MongoDB Atlas
- Custom domains
- HTTPS
- Environment-based configuration

### Tools

- Git
- GitHub
- Postman
- Figma
- Visual Studio Code

---

## 🏗️ Architecture

The project is divided into two independent applications:

```text
┌────────────────────────────┐
│        Angular 21          │
│         Frontend           │
│   fullstackricardo.com     │
└─────────────┬──────────────┘
              │
              │ HTTPS / REST API
              ▼
┌────────────────────────────┐
│      Node.js + Express     │
│          Backend           │
│ api.fullstackricardo.com   │
└─────────────┬──────────────┘
              │
              │ Mongoose
              ▼
┌────────────────────────────┐
│       MongoDB Atlas        │
│    developer_portfolio     │
└────────────────────────────┘
```

The backend follows a layered architecture:

```text
Routes
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
MongoDB
```

The frontend communicates with the backend through a REST API.

Development and production environments use independent API configurations through Angular environments.

More information about the architecture can be found in:

`docs/architecture.md`

---

## 🌍 Production

The application is currently available in production at:

**Frontend**

https://fullstackricardo.com

The `www` subdomain automatically redirects to the root domain:

https://www.fullstackricardo.com

**Backend API**

https://api.fullstackricardo.com

Production architecture:

```text
fullstackricardo.com
        ↓
Render Static Site
        ↓
Angular
        ↓
api.fullstackricardo.com/api
        ↓
Render Web Service
        ↓
MongoDB Atlas
```

HTTPS certificates for the custom domains are managed by Render.

---

## 📂 Project Structure

```text
developer-portfolio/
│
├── backend/
├── frontend/
├── docs/
├── README.md
├── LICENSE
└── .gitignore
```

The repository follows a monorepo-style structure where the Angular frontend and Node.js backend are maintained as independent applications.
