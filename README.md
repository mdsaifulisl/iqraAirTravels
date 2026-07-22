# 🌍 Travel Agency Management System

<p align="center">
  <img src="https://img.shields.io/badge/Node.js-v22.17.1-339933?style=for-the-badge&logo=node.js&logoColor=white" />
  <img src="https://img.shields.io/badge/Express.js-v5.x-000000?style=for-the-badge&logo=express&logoColor=white" />
  <img src="https://img.shields.io/badge/MySQL-Database-4479A1?style=for-the-badge&logo=mysql&logoColor=white" />
  <img src="https://img.shields.io/badge/Sequelize-ORM-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white" />
  <img src="https://img.shields.io/badge/JWT-Authentication-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white" />
  <img src="https://img.shields.io/badge/License-MIT-success?style=for-the-badge" />
</p>

---

# 📖 Overview

The **Travel Agency Backend API** is a secure and scalable RESTful API built with **Node.js**, **Express.js**, and **MySQL**. It powers a complete travel agency website by providing authentication, database operations, file uploads, email services, and other backend functionalities.

The project follows a clean and modular architecture, making it easy to maintain, extend, and deploy in both development and production environments.

---

# 🚀 Tech Stack

| Category | Technology |
|----------|------------|
| Runtime | Node.js v22.17.1 |
| Framework | Express.js v5.x |
| Database | MySQL |
| ORM | Sequelize |
| Authentication | JWT (JSON Web Token) |
| Password Hashing | BcryptJS |
| Email Service | Nodemailer |
| File Upload | Multer |
| Security | Helmet, HPP, CORS |
| Environment Variables | Dotenv |

---

# 📂 Project Structure

```text
Travel-Agency/
│
├── client/                     # React Frontend
│
├── server/                     # Node.js Backend
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── routes/
│   ├── uploads/
│   ├── utils/
│   ├── app.js
│   ├── package.json
│   └── .env
│
├── database/
│   └── travel_agency_db.sql     # MySQL Database Backup
│
└── README.md
```

---

# 📦 Prerequisites

Before running the project, install the following:

- Node.js v22.17.1 or later
- npm
- MySQL Server
- MySQL Workbench (Recommended)
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
git clone https://github.com/mdsaifulisl/iqraAirTravels.git
cd iqraAirTravels
```

---

## 2. Install Dependencies

### Backend

```bash
cd server
npm install
```

### Frontend

```bash
cd ../client
npm install
```

Or install both together:

```bash
cd server
npm run install-all
```

---

# 🗄️ Database Setup

## Step 1: Create Database

Open **MySQL Workbench** and execute:

```sql
CREATE DATABASE travel_agency_db;
```

---

## Step 2: Import Database

The project includes a database backup:

```text
database/
└── travel_agency_db.sql
```

Using **MySQL Workbench**:

1. Open MySQL Workbench.
2. Connect to your MySQL server.
3. Select the **travel_agency_db** database.
4. Click **Server → Data Import**.
5. Choose **Import from Self-Contained File**.
6. Select `travel_agency_db.sql`.
7. Click **Start Import**.

After importing, all required tables and sample data will be created automatically.

> **⚠️ Important**
>
> The application **will not work correctly** unless all required tables exist inside the `travel_agency_db` database.

---

# 🔐 Environment Variables

Create a `.env` file inside the **server** folder.

```env
PORT=5000
BASE_URL=http://localhost:5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=travel_agency_db

EMAIL_HOST=server301.web-hosting.com
EMAIL_PORT=225
EMAIL_USER=support@agency.com
EMAIL_PASS=your-email-password

JWT_SECRET=your-secret-key
```

> **⚠️ Never commit your `.env` file to GitHub.**
>
> Add `.env` to your `.gitignore`.

---

# ▶️ Running the Project

## Start Backend

```bash
cd server
npm run dev
```

Backend URL

```
http://localhost:5000
```

---

## Start Frontend

```bash
cd client
npm run dev
```

Frontend URL

```
http://localhost:5173
```

---

# 📜 Available NPM Scripts

| Script | Description |
|----------|-------------|
| `npm start` | Start backend in production mode |
| `npm run dev` | Start backend using Nodemon |
| `npm run build` | Install frontend dependencies and build React project |
| `npm run install-all` | Install backend and frontend dependencies |

---

# 🛡️ Key Security Features

- ✅ JWT Authentication
- ✅ Password Hashing with BcryptJS
- ✅ Helmet Security Headers
- ✅ HTTP Parameter Pollution Protection (HPP)
- ✅ Cross-Origin Resource Sharing (CORS)
- ✅ Environment Variable Protection
- ✅ Secure File Upload with Multer
- ✅ Secure Email Sending using Nodemailer

---

# ✨ Main Functionalities

- 🔐 User Authentication
- 👤 User Registration & Login
- 🔑 JWT Protected APIs
- 👥 User Management
- 🌍 Destination Management
- ✈️ Air Ticket Management
- 🧳 Tour Package Management
- 📄 Visa Management
- 📰 Blog Management
- 📬 Contact Form API
- ❓ FAQ Management
- 📁 File Upload
- 📧 Email Notifications
- 🗄️ MySQL Database Integration
- 🔄 Sequelize ORM
- ⚡ RESTful API Architecture

---

# 📡 API Base URL

Development

```
http://localhost:5000
```

---

# ✅ Before Running the Website

Make sure all of the following are completed:

- Node.js is installed.
- npm dependencies are installed.
- MySQL Server is running.
- The `travel_agency_db` database has been created.
- All SQL tables have been imported from `travel_agency_db.sql`.
- The `.env` file is configured correctly.
- Backend server is running.
- Frontend server is running.

Without importing the SQL database, the website cannot function properly because the required tables and data will be missing.

---

# 🚀 Deployment Notes

Before deploying:

- Update all environment variables.
- Use a production MySQL database.
- Set a strong `JWT_SECRET`.
- Configure your SMTP credentials.
- Enable HTTPS in production.
- Import the database into your production MySQL server.

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the repository.

2. Create a feature branch.

```bash
git checkout -b feature/your-feature
```

3. Commit your changes.

```bash
git commit -m "Add new feature"
```

4. Push your branch.

```bash
git push origin feature/your-feature
```

5. Open a Pull Request.

---

# 📄 License

This project is licensed under the **MIT License**.

---

<p align="center">
Made with ❤️ using Node.js, Express.js, MySQL & Sequelize
</p>