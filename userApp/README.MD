# TaskFlow - Task Management System

TaskFlow is a full-stack task management web application built using Node.js, Express, MongoDB, EJS, TailwindCSS, and Docker.

The system allows users to:

- Register accounts
- Login securely
- Create tasks
- Edit tasks
- Delete tasks
- Track task status
- View dashboard statistics
- Manage personalized task lists

---

# Features

## Authentication System
- User Signup
- User Login
- Session Authentication
- Secure Password Hashing using bcrypt
- Logout Functionality

## Task Management
- Add Tasks
- Edit Tasks
- Delete Tasks
- Task Status Management
- Dashboard Statistics

## Frontend
- Responsive Landing Page
- TailwindCSS Integration
- EJS Templating Engine
- Responsive Dashboard UI

## Backend
- MVC Architecture
- MongoDB Atlas Database
- Express Sessions
- REST-style Routing

## DevOps
- Dockerized Application
- Docker Compose Setup
- Environment Variables

---

# Technologies Used

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- EJS
- TailwindCSS
- Docker
- Express Session
- bcrypt

---

# Project Structure

```plaintext
userApp/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── public/
│   ├── publicessentials/
│   ├── routes/
│   ├── views/
│   ├── input.css
│   └── index.js
│
├── Dockerfile
├── docker-compose.yml
├── package.json
├── tailwind.config.js
└── README.md
```

---

# Installation

## Clone Repository

```bash
git clone <your-repository-link>
cd userApp
```

---

# Install Dependencies

```bash
npm install
```

---

# Environment Variables

Create a `.env` file:

```env
MONGO_URI=your_mongodb_connection_string
```

---

# Run Project

## Development Mode

```bash
npm run dev
```

---

# TailwindCSS

Run Tailwind watcher:

```bash
npm run build:tailwind
```

---

# Docker Setup

## Build Docker Image

```bash
docker build -t userapp .
```

## Run Docker Container

```bash
docker run -p 5000:5000 --env-file .env userapp
```

---

# Docker Compose

Run:

```bash
docker-compose up
```

---

# Future Improvements

- Task Categories
- File Uploads
- Notifications
- Email Verification
- Search & Filtering
- Dark Mode
- Team Collaboration
- Task Priority Levels

---

# Author

The flow:::::::::::::::::::::
             USER
              |
        ┌──────────────┐
        │   NGINX       │
        └─────┬────────┘
              │
   ┌──────────┼──────────┐
   │          │          │
TASKFLOW   STUDENT     LIBRARY
(API GW)   SERVICE     SERVICE
   │          │          │
   └──────────┴──────────┘
            MONGODB
