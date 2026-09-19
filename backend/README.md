# CSE Career Portal Backend API 🚀

Production-grade RESTful API backend for the **CSE Career Portal**, built with Node.js, Express.js, MongoDB, and Mongoose.

---

## 🏗 Architecture & Flow

The backend adheres strictly to a decoupled layered architecture:

```
Routes  ──>  Middleware  ──>  Controller  ──>  Service  ──>  Model  ──>  MongoDB
```

- **Routes**: Define HTTP endpoints and bind middleware/controllers.
- **Middleware**: Authentication, Role-Based Access Control, Request Rate Limiting, Error Handling, and 404 Routing.
- **Controllers**: Thin handlers responsible only for unpacking HTTP requests and formatting standard responses.
- **Services**: Pure business logic, data calculations, and cross-model orchestration.
- **Models**: Mongoose schemas with validation, compound indexing, and lifecycle hooks.
- **Validators**: Input schema validations for requests.

---

## 📂 Folder Structure

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js             # Mongoose connection & lifecycle event listeners
│   │   └── env.js            # Environment variable loader & validator
│   ├── constants/
│   │   └── httpStatusCodes.js # Standardized HTTP status codes
│   ├── controllers/
│   │   └── healthController.js
│   ├── middleware/
│   │   ├── errorHandler.js   # Centralized error handler
│   │   ├── notFoundHandler.js# 404 Route handler
│   │   └── rateLimiter.js    # Express rate limiter
│   ├── models/               # (Phase 2: Database Schemas)
│   ├── routes/
│   │   ├── healthRoutes.js
│   │   └── index.js          # API router aggregator (/api/*)
│   ├── seed/                 # (Phase 3: JSON Seed Catalogs)
│   ├── services/
│   │   └── healthService.js
│   ├── utils/
│   │   ├── apiResponse.js    # Standardized response envelopes
│   │   └── appError.js       # Operational error subclass
│   ├── validators/           # (Phase 4-5: Request validation schemas)
│   └── app.js                # Express app setup & middleware pipeline
│
├── server.js                 # Server entrypoint & graceful shutdown
├── package.json
├── .env
├── .env.example
└── README.md
```

---

## ⚙️ Environment Variables

Copy `.env.example` to `.env`:

```env
PORT=5000
MONGODB_URI=mongodb://127.0.0.1:27017/cse_career_portal
JWT_SECRET=your_jwt_secret_key_here
JWT_EXPIRES_IN=7d
CLIENT_URL=http://localhost:5173
NODE_ENV=development
```

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Development Server
```bash
npm run dev
```

### 3. Start Production Server
```bash
npm start
```

---

## 🩺 Health Check API

- **Endpoint**: `GET /api/health`
- **Response**:
```json
{
  "success": true,
  "message": "CSE Career Portal API is running",
  "data": {
    "uptimeSeconds": 42,
    "timestamp": "2026-09-20T00:00:00.000Z",
    "environment": "development",
    "database": {
      "status": "Connected",
      "name": "cse_career_portal"
    },
    "system": {
      "nodeVersion": "v25.4.0",
      "memoryUsageMB": 38
    }
  }
}
```
