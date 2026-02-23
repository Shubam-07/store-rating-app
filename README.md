# 🏪 Store Rating Platform

A full-stack web application that allows users to submit and manage ratings (1–5) for registered stores with role-based access control.

---

## 🚀 Tech Stack

### Backend
- Node.js
- Express.js
- MySQL
- Prisma ORM
- JWT Authentication
- bcrypt (Password Hashing)

### Frontend
- React.js
- React Router
- Axios
- React Icons

---

## 👥 User Roles

### 🔐 System Administrator
- Login securely
- View dashboard (Total Users, Stores, Ratings)
- Add new users (Admin / User / Store Owner)
- Add new stores
- View users with filtering & sorting
- View stores with average rating

### 👤 Normal User
- Signup with validation
- Login securely
- View all stores
- Submit rating (1–5)
- Modify rating
- View personal submitted rating

### 🏪 Store Owner
- Login securely
- View store average rating
- See list of users who rated their store

---

## 🔐 Authentication & Security

- JWT-based authentication
- Role-based authorization middleware
- Password hashing using bcrypt
- Protected routes
- One rating per user per store (composite unique constraint)

---

## 📂 Project Structure

```
store-rating-app/
│
├── backend/
│   ├── routes/
│   ├── middleware/
│   ├── prisma/
│   ├── db.js
│   ├── index.js
│   └── .env
│
├── frontend/
│   ├── src/
│   ├── pages/
│   ├── components/
│   └── api/
│
└── README.md
```

---

## ⚙️ Setup Instructions

### 1️⃣ Clone Repository

```bash
git clone <your-repo-link>
cd store-rating-app
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```
DATABASE_URL="mysql://root:yourpassword@localhost:3306/store_rating_db"
JWT_SECRET="your_secret_key"
```

Run Prisma Migration:

```bash
npx prisma migrate dev
```

Start Backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm start
```

---

## 🎯 Features Implemented

- Role-based login system
- Admin dashboard
- User rating system (1–5)
- Rating update functionality
- Store owner analytics
- Modern SaaS-style dashboard UI
- Password visibility toggle
- Protected routing

---

## 📌 Future Improvements

- Pagination
- Advanced filtering
- Password update feature
- Deployment (Render / Vercel)
- Dark mode support

---

## 👨‍💻 Author

**Shubam Bonik**  
FullStack Intern Coding Challenge Submission

---