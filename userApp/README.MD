# TaskFlow Dashboard

A full-stack task management dashboard built with:

- Node.js
- Express.js
- MongoDB
- EJS
- Docker

## Features

- User Authentication
- Signup/Login
- Password Hashing with bcrypt
- Session Authentication
- CRUD Operations
- Task Status Management
- Dashboard Statistics
- MVC Architecture
- Dockerized Application
- MongoDB Atlas Integration

## Technologies Used

- Node.js
- Express
- MongoDB
- Mongoose
- EJS
- CSS
- Docker

## Project Structure

```bash
src/
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── views/
├── public/
└── index.js
```

## Installation

```bash
npm install
npm start
```

## Docker

Build image:

```bash
docker build -t userapp .
```

Run container:

```bash
docker run -p 5000:5000 --env-file .env userapp
```

## Environment Variables

Create `.env`

```env
MONGO_URI=your_mongodb_connection
```

## Author
