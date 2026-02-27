# 📊 Frontend Intern Dashboard Task

This project is a single-page React application developed as part of the **Frontend Intern Dashboard Development Task**.  
The application includes a **Login Page** and a **Dashboard Page** integrated with a REST API.

---

## 🚀 Live Demo
👉 *(Add your deployed link here)*  
Example: https://your-app.vercel.app

---

## 📂 GitHub Repository
👉 *(This repository contains the full source code)*

---

## 🛠️ Tech Stack
- React (Vite)
- React Router
- Tailwind CSS
- Framer Motion (for animations)
- Lucide React Icons

---

## ✨ Features Implemented

### 🔐 Authentication (Login)
- Login page designed according to the provided UI design.
- User authentication using REST API:
  - Endpoint: `/api/login`
  - Method: `POST`
- JWT token is stored in `localStorage` after successful login.
- Implemented protected routes (PrivateRoute) so the dashboard is accessible only after login.

---

### 📊 Dashboard
- Dashboard UI built based on the provided Dribbble design.
- Data is fetched dynamically from the REST API:
  - `https://task-api-eight-flax.vercel.app/`
- Implemented components:
  - Analytics section
  - Statistics cards
  - Task-related UI blocks
- Smooth animations added using Framer Motion.
- Fully responsive layout for different screen sizes.

---

## 📁 Project Structure

```txt
src/
 ├── Page/
 │    ├── LoginPage.jsx
 │    ├── Dashboard.jsx
 │    ├── AnalyticsPage.jsx
 │    └── NotFound.jsx
 ├── layout/
 │    └── DashboardLayout.jsx
 ├── router/
 │    ├── Router.jsx
 │    └── PrivateRoute.jsx
 ├── components/
 │    └── (Reusable UI components)
 └── main.jsx





----

### ⚙️ Setup Instructions

Clone the repository:

git clone <your-repo-link>

Install dependencies:

npm install

Run the development server:

npm run dev

Open in browser:

http://localhost:5173
🔑 Test Login Credentials
Email: user1@example.com  
Password: password123

----
### API Reference

Login:
POST https://task-api-eight-flax.vercel.app/api/login

Analytics & Dashboard Data:
GET https://task-api-eight-flax.vercel.app/api/analytics

### Notes

Token-based authentication is implemented.

Dashboard route is protected and cannot be accessed without login.

UI closely follows the provided design reference.

The project is deployed and publicly accessible.
---
### Author

Md. Perbej Bhuiyan Akib
CSE Graduate | Frontend Developer
GitHub: https://github.com/akib2012