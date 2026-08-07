# Developer Portfolio CMS

Personal portfolio and resume platform built as a Full Stack application.

The project is designed to showcase my professional experience, technical skills, education and featured projects through a modern and responsive web application.

The portfolio is powered by a REST API and a database, allowing the content to be managed dynamically instead of being hardcoded in the frontend.

---

## 🚀 Project Overview

Developer Portfolio CMS is a Full Stack web application designed to centralize and present my professional profile as a Software Engineer / Frontend Developer.

The application will provide information about:

- Professional profile
- Technical skills
- Professional experience
- Featured projects
- Academic background
- Complementary education
- Languages

The project is being developed following a structured development process using Agile principles, Git and Conventional Commits.

---

## 🛠️ Tech Stack

### Frontend

- Angular 21
- TypeScript
- HTML5
- SCSS
- Responsive Web Design

### Backend

- Node.js
- Express
- REST API

### Database

- MongoDB
- Mongoose

### Tools

- Git
- GitHub
- Postman
- Figma

---

## 🏗️ Architecture

The application is divided into two independent applications:

```text
┌──────────────────────┐
│      Angular 21      │
│      Frontend        │
└──────────┬───────────┘
           │
           │ HTTP / REST API
           ▼
┌──────────────────────┐
│    Node.js + Express │
│       Backend        │
└──────────┬───────────┘
           │
           │ Mongoose
           ▼
┌──────────────────────┐
│       MongoDB        │
└──────────────────────┘
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

More information about the architecture can be found in:

`docs/architecture.md`

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