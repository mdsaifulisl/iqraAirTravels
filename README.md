# Visa Vibe Travel Agency 🌍✈️

A full-stack travel agency web application where users can explore destinations, tours, visas, air tickets, and blogs. It also includes a powerful admin panel to manage all content dynamically.

---

## 🔗 Live Demo

https://visa-vibe-agency.vercel.app/

---

## 🚀 Features

* 🌐 Explore travel destinations and tours
* 🛂 Visa management system
* ✈️ Air ticket listings
* 📝 Blog management
* 📩 Contact message system
* 🧑‍💼 Admin dashboard
* 🔐 JWT authentication
* 🖼️ Image upload support
* ⚙️ Dynamic site settings

---

## 🛠️ Tech Stack

### Backend

* Node.js
* Express.js
* MySQL
* JWT Authentication

### Frontend

* React.js

---

## ⚙️ Environment Variables

Create a `.env` file in the root directory:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=root
DB_NAME=travel_agency_db
PORT=5000
BASE_URL=http://localhost:5000
JWT_SECRET=0ajnhadsfbnikjlsadfhjkln&*(*3wldafskljbfsda;l
```

---

## 📦 Installation

### 1. Clone the repository

```bash
git clone <your-repo-url>
cd <project-folder>
```

### 2. Install dependencies (server + client)

```bash
npm run install-all
```

---

## ▶️ Running the Project

### Development mode

```bash
npm run dev
```

### Production mode

```bash
npm start
```

---

## 🏗️ Build Client

```bash
npm run build
```

---

## 📜 Available Scripts

```json
"scripts": {
  "start": "node app.js",
  "dev": "nodemon app.js",
  "build": "cd ../client && npm install && npm run build",
  "install-all": "npm install && cd ../client && npm install"
}
```

---

## 🗄️ Database Setup

### 1. Create Database

```sql
CREATE DATABASE travel_agency_db;
```

### 2. Import Database

Save your SQL dump as `database.sql`, then run:

```bash
mysql -u root -p travel_agency_db < database.sql
```

---

## 📊 Database Tables

The project includes the following main tables:

* `users`
* `tours`
* `destinations`
* `visas`
* `air_tickets`
* `blogs`
* `contacts`
* `faqs`
* `sliders`
* `settings`
* `abouts`

---

## 📁 Project Structure

```
/server
  /controllers
  /routes
  /models
  /middlewares

/client
  /src
  /components
  /pages
```

---

## ⚠️ Important Notes

* Make sure MySQL server is running
* Update `.env` credentials based on your system
* Never expose your real `JWT_SECRET` in production
* Ensure uploads folder has proper permissions

---

## 👨‍💻 Author

Md. Saiful Islam

---

## 📄 License

This project is for educational and personal use only.
