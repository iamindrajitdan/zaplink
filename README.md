# ⚡ ZapLink

> Secure, password-less file and text sharing tool for local development

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue.svg)](https://reactjs.org/)

## 🚀 Quick Start

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Server runs on: http://localhost:5000

### 2. Frontend Setup
```bash
cd frontend
npm install
npm start
```
App runs on: http://localhost:3000

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
├── backend/           # Node.js + Express API
│   ├── routes/        # API endpoints
│   ├── storage/files/ # Temporary file storage
│   └── server.js      # Main server
├── frontend/          # React + Tailwind UI
│   ├── src/pages/     # Main pages
│   └── src/components/# Reusable components
└── README.md
```

## 🔧 Features
- ✅ File uploads (≤10MB)
- ✅ Text sharing
- ✅ View-based expiry
- ✅ Time-based TTL
- ✅ Clean, responsive UI
- ✅ Copy-to-clipboard

## 📝 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/share` | Create shareable link |
| GET | `/api/view/:linkId` | View shared content |
| DELETE | `/api/expire/:linkId` | Expire link manually |

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