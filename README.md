# CSE Career Portal 🚀

A production-ready, centralized career and learning platform for Computer Science Engineering students.

---

## 📅 Development Roadmap & Order

1. **Backend Foundation** *(Completed)*
2. **Database & Core Schemas** *(Next)*
3. **Content Seed Data**
4. **Authentication & Authorization (JWT + RBAC)**
5. **Backend REST APIs**
6. **API Testing**
7. **Frontend**
8. **Frontend-Backend Integration**
9. **Advanced Features (AI Assistant, ATS Resume, Command-K Search)**
10. **Testing & Production Deployment**

---

## 🏗 Backend Architecture

```
backend/
├── src/
│   ├── config/
│   │   ├── db.js             # Mongoose connection & lifecycle handlers
│   │   └── env.js            # Environment loader & validator
│   ├── constants/
│   │   └── httpStatusCodes.js # Standardized status codes
│   ├── controllers/
│   │   └── healthController.js
│   ├── middleware/
│   │   ├── errorHandler.js   # Centralized error handler
│   │   ├── notFoundHandler.js# 404 Route handler
│   │   └── rateLimiter.js    # Express rate limiter
│   ├── models/               # (Phase 2)
│   ├── routes/
│   │   ├── healthRoutes.js
│   │   └── index.js          # Route aggregator (/api/*)
│   ├── seed/                 # (Phase 3)
│   ├── services/
│   │   └── healthService.js
│   ├── utils/
│   │   ├── apiResponse.js    # Standardized response envelope
│   │   └── appError.js       # Operational error subclass
│   ├── validators/           # (Phase 4-5)
│   └── app.js                # Express app setup & middleware pipeline
│
├── server.js                 # Server entrypoint & graceful shutdown
├── package.json
├── .env
├── .env.example
└── README.md
```

---

## 🚀 Running the Backend

```bash
# Navigate to backend and install dependencies
cd backend
npm install

# Start server
npm start
# or development with nodemon
npm run dev
```

Health check:
`GET http://localhost:5000/api/health`
