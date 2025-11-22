# ⚡ ZapLink

> Secure, authenticated file and text sharing tool with automatic expiration

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue.svg)](https://www.typescriptlang.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-blue.svg)](https://www.docker.com/)

## 🚀 Quick Start

### Option 1: Docker (Recommended)
```bash
docker-compose up --build
```
- Backend: http://localhost:5000
- Frontend: http://localhost:3000

### Option 2: Manual Setup

#### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs on: http://localhost:5000

#### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
App runs on: http://localhost:3000

#### 3. Environment Setup
Copy `.env.example` to `.env` in both backend and frontend directories and configure as needed.

## 🧪 Test the API

### Share a file:
```bash
curl -X POST http://localhost:5000/api/share \
  -F "file=@test.txt" \
  -F "maxViews=5" \
  -F "ttlHours=24"
```

### Share text:
```bash
curl -X POST http://localhost:5000/api/share \
  -H "Content-Type: application/json" \
  -d '{"text":"Hello ZapLink!","maxViews":3,"ttlHours":12}'
```

### View content:
```bash
curl http://localhost:5000/api/view/{linkId}
```

## 📁 Project Structure
```
zaplink/
├── backend/                    # Node.js + Express API
│   ├── routes/                 # API endpoints
│   │   ├── auth.js            # Authentication routes
│   │   └── link.js            # Link sharing routes
│   ├── storage/files/         # Temporary file storage
│   ├── Dockerfile             # Backend container
│   └── server.js              # Main server
├── frontend/                   # React + TypeScript + Tailwind UI
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── ui/           # Base UI components
│   │   │   ├── AuthModal.tsx # Authentication modal
│   │   │   ├── Navbar.tsx    # Navigation component
│   │   │   └── ProtectedRoute.tsx # Route protection
│   │   ├── contexts/         # React contexts
│   │   │   ├── AuthContext.tsx   # Authentication state
│   │   │   └── ThemeContext.tsx  # Theme management
│   │   ├── pages/            # Main application pages
│   │   │   ├── SharePage.tsx # File/text sharing
│   │   │   └── ViewPage.tsx  # Content viewing
│   │   └── lib/              # Utility functions
│   ├── Dockerfile            # Frontend container
│   └── nginx.conf            # Production web server config
├── docker-compose.yml         # Multi-container setup
├── CONTRIBUTING.md           # Development guidelines
├── LICENSE                   # MIT license
└── README.md                # This file
```

## 🔧 Features
- ✅ **Authentication System** - Firebase-based user authentication
- ✅ **File Uploads** - Support for files up to 10MB
- ✅ **Text Sharing** - Share formatted text content
- ✅ **Smart Expiration** - View-based and time-based expiry
- ✅ **Protected Routes** - Authenticated access to sharing features
- ✅ **Modern UI** - TypeScript + React + Tailwind CSS + Radix UI
- ✅ **Theme Support** - Dark/light mode toggle
- ✅ **Copy-to-Clipboard** - One-click link sharing
- ✅ **Docker Ready** - Containerized deployment
- ✅ **Responsive Design** - Mobile-friendly interface

## 📝 API Endpoints

### Link Management
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/share` | Create shareable link |
| GET | `/api/view/:linkId` | View shared content |
| DELETE | `/api/expire/:linkId` | Expire link manually |

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/signup` | Create new user account |
| POST | `/api/auth/login` | User login |

## 🛠️ Tech Stack

**Backend:**
- Node.js + Express
- Multer (file uploads)
- UUID (unique identifiers)
- CORS (cross-origin requests)

**Frontend:**
- React 18 + TypeScript
- Tailwind CSS + Radix UI
- React Router (navigation)
- Axios (HTTP client)
- Firebase (authentication)
- Lucide React (icons)

**DevOps:**
- Docker + Docker Compose
- Nginx (production)
- Nodemon (development)

## 🤝 Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for development setup and guidelines.

## 📜 License

MIT License - see [LICENSE](LICENSE) file for details.

## ☁️ Ready for Cloud?

Use this Amazon Q Developer prompt to create the production version:

```
Create a serverless ZapLink app using AWS Lambda + API Gateway + S3 + DynamoDB. 
Follow clean architecture with Handler → Service → Repository layers.
Include SAM template and deployment scripts.
```