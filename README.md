# 🌍 Travel Agency Backend API

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v22.17.1-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js">
  <img src="https://img.shields.io/badge/Express.js-v5.x-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL">
  <img src="https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" alt="Sequelize">
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" alt="JWT">
  <img src="https://img.shields.io/badge/License-MIT-green?style=for-the-badge" alt="License">
</p>

---

# 📖 Overview

**Travel Agency Backend API** is a scalable RESTful backend built with **Node.js**, **Express.js**, and **MySQL**. It provides secure authentication, database management, email services, file uploads, and APIs for a modern travel agency application.

The backend is designed with security, maintainability, and scalability in mind, making it suitable for both development and production environments.

---

# 🚀 Tech Stack

| Category | Technology |
|-----------|------------|
| Runtime | Node.js v22.17.1 |
| Framework | Express.js v5.x |
| Database | MySQL |
| ORM | Sequelize |
| Authentication | JSON Web Token (JWT) |
| Password Hashing | BcryptJS |
| Email Service | Nodemailer |
| File Upload | Multer |
| Security | Helmet, HPP, CORS |
| Environment Variables | Dotenv |

---

# 📦 Prerequisites

Before running the project, make sure you have installed:

- Node.js v22.17.1 or higher
- npm
- MySQL Server
- Git

Verify your installation:

```bash
node -v
npm -v
mysql --version
```

---

# ⚙️ Installation & Setup

## 1. Clone the Repository

```bash
git clone <repository-url>
```

```bash
cd backend
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Configure Environment Variables

Create a `.env` file in the project root.

Example:

```env
PORT=5000
BASE_URL=http://localhost:5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=travel_agency_db

EMAIL_HOST=server301.web-hosting.com
EMAIL_PORT=465
EMAIL_USER=support@iqraairtravels.com
EMAIL_PASS=Support@^~1&

JWT_SECRET=0ajnhadsfbnikjlsadfhjkln&*(*3wldafskljbfsda;l
```

> **⚠️ Security Notice**
>
> Never commit your `.env` file to GitHub.
> Add it to your `.gitignore` file before pushing your project.

---

## 4. Create the MySQL Database

```sql
CREATE DATABASE travel_agency_db;
```

---

## 5. Start the Development Server

```bash
npm run dev
```

The API will be available at:

```
http://localhost:5000
```

---

# 🔐 Environment Variables

| Variable | Description |
|-----------|-------------|
| `PORT` | Application running port |
| `BASE_URL` | Base URL of the backend |
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | MySQL database name |
| `EMAIL_HOST` | SMTP server |
| `EMAIL_PORT` | SMTP port |
| `EMAIL_USER` | SMTP email account |
| `EMAIL_PASS` | SMTP email password |
| `JWT_SECRET` | Secret key used for JWT authentication |

---

# 📜 Available NPM Scripts

| Script | Description |
|----------|-------------|
| `npm start` | Start the production server |
| `npm run dev` | Start the development server using Nodemon |
| `npm run build` | Install frontend dependencies and build the client application |
| `npm run install-all` | Install backend and frontend dependencies |

---

# 🛡️ Key Security Features

✅ JWT Authentication

✅ Password Hashing using BcryptJS

✅ Helmet Security Headers

✅ HTTP Parameter Pollution (HPP) Protection

✅ Cross-Origin Resource Sharing (CORS)

✅ Environment Variable Management using Dotenv

✅ Secure File Upload Handling with Multer

✅ Secure Email Sending via Nodemailer

---

# ✨ Main Functionalities

- 🔐 User Authentication
- 👤 User Registration & Login
- 🔑 JWT Protected Routes
- 🔒 Password Encryption
- 📧 Email Sending
- 📁 File Upload API
- 🗄️ MySQL Database Integration
- 🔄 Sequelize ORM Support
- 🌍 RESTful API Architecture
- 🛡️ Security Middleware Integration
- ⚡ Scalable Backend Structure
- 📦 Environment-Based Configuration

---

# 📂 Project Structure

```
backend/
│
├── config/
├── controllers/
├── middleware/
├── models/
├── routes/
├── uploads/
├── utils/
├── app.js
├── package.json
├── .env
└── README.md
```

---

# 📡 API Base URL

Development

```
http://localhost:5000
```

---

# 💻 Development Workflow

Install dependencies

```bash
npm install
```

Run development server

```bash
npm run dev
```

Run production server

```bash
npm start
```

Build frontend

```bash
npm run build
```

Install backend & frontend together

```bash
npm run install-all
```

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository
2. Create a new branch

```bash
git checkout -b feature/your-feature
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature/your-feature
```

5. Open a Pull Request

---

# 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
Made with ❤️ using Node.js, Express.js, MySQL & Sequelize
</p>