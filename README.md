# ⚙️ VidyaPath — Backend API Server

> **Node.js • Express • MongoDB / Mongoose • JWT + RBAC • 22 REST Modules**

This branch contains the standalone Express REST API server for **VidyaPath (CHARUSAT Vidyapath | CSE Career Branch Ecosystem)**.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (.env)
```bash
cp .env.example .env
```
Fill in the variables:
```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/cse_career_portal
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRE=7d
CORS_ORIGIN=http://localhost:5173
```

### 3. Seed Database
```bash
node src/seed/seed.js
```

### 4. Start Server
```bash
# Production start
npm start

# Development with auto-reload (nodemon)
npm run dev
```
Server runs on: `http://localhost:5000/api`

---

## 📂 Architecture & Directory Structure

```
src/
├── config/       # Database connection (Mongoose) & env validator
├── constants/    # HTTP status codes & system constants
├── controllers/  # 22 Domain controllers (Auth, Books, Projects, Roadmap, etc.)
├── data/         # Fallback static datasets & knowledge base
├── middleware/   # JWT Auth, RBAC, Centralized Error Handling, Rate Limiter
├── models/       # 28 Mongoose Data Models
├── routes/       # 22 REST Route modules & route aggregator
├── seed/         # Database seeder scripts
├── services/     # Business logic & AI services
├── utils/        # Standardized API response envelopes & errors
└── validators/   # Joi / Custom request validators
```

---

## 🧪 Postman Collection
Import `cse_career_portal.postman_collection.json` and `cse_career_portal.postman_environment.json` in Postman to test all 22 API modules.
