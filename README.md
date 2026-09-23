# 💻 VidyaPath — Frontend Client

> **React 18 • Vite • Eye-Comfort Design System • SPA**

This branch contains the standalone React frontend client for **VidyaPath (CHARUSAT Vidyapath | CSE Career Branch Ecosystem)**.

---

## 🚀 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional)
If running against a custom backend API, set `VITE_API_URL` (defaults to `http://localhost:5000/api`):
```bash
# .env
VITE_API_URL=http://localhost:5000/api
```

### 3. Start Development Server
```bash
npm run dev
```
The app will launch at `http://localhost:5173`.

### 4. Production Build
```bash
npm run build
```

---

## 📂 Directory Structure

```
src/
├── assets/          # Brand logos, icons, illustrations
├── components/      # Reusable UI components (buttons, cards, AI drawer, etc.)
├── constants/       # App config, route paths, storage keys
├── context/         # Auth, Theme, Toast, and User contexts
├── hooks/           # Custom React hooks (useAuth, useNotifications, useTheme)
├── layouts/         # MainLayout, AuthLayout, ProtectedRoute
├── pages/           # 28 Page Views (Dashboard, Roadmap, Books, Projects, etc.)
├── services/        # Axios API clients
├── styles/          # Vanilla CSS Design System with Eye-Comfort Tokens
└── utils/           # Helper functions & token management
```
