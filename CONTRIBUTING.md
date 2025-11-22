# Contributing to ZapLink

We welcome contributions! This guide will help you get started with development.

## 🛠️ Development Setup

### Prerequisites
- Node.js 18+
- npm or yarn
- Docker (optional, for containerized development)

### Option 1: Docker Development (Recommended)
```bash
# Clone the repository
git clone https://github.com/iamindrajitdan/zaplink.git
cd zaplink

# Start development environment
docker-compose up --build
```

### Option 2: Manual Setup
1. **Fork and Clone**
   ```bash
   git clone https://github.com/YOUR_USERNAME/zaplink.git
   cd zaplink
   ```

2. **Backend Setup**
   ```bash
   cd backend
   cp .env.example .env
   npm install
   npm run dev
   ```

3. **Frontend Setup**
   ```bash
   cd frontend
   cp .env.example .env
   npm install
   npm start
   ```

4. **Environment Configuration**
   - Configure Firebase credentials in frontend `.env`
   - Set backend port and CORS settings in backend `.env`

## 📝 Code Standards

### TypeScript Guidelines
- Use TypeScript for all new frontend code
- Define proper interfaces and types
- Avoid `any` type unless absolutely necessary
- Use strict mode configurations

### React Best Practices
- Use functional components with hooks
- Implement proper error boundaries
- Follow component composition patterns
- Use React.memo for performance optimization when needed

### Backend Standards
- Use Express.js middleware patterns
- Implement proper error handling
- Add input validation for all endpoints
- Use async/await for asynchronous operations

### Styling Guidelines
- Use Tailwind CSS utility classes
- Follow mobile-first responsive design
- Maintain consistent spacing and typography
- Use Radix UI components for complex interactions

## 🔄 Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Development Workflow**
   - Make your changes
   - Test thoroughly (both manual and automated)
   - Ensure code follows style guidelines
   - Update documentation if needed

3. **Commit Standards**
   ```bash
   git commit -m "feat: add new sharing feature"
   git commit -m "fix: resolve authentication bug"
   git commit -m "docs: update API documentation"
   ```

4. **Submit PR**
   - Push to your fork: `git push origin feature/your-feature-name`
   - Create Pull Request with clear description
   - Link any related issues
   - Wait for code review

## 🧪 Testing

### Frontend Testing
```bash
cd frontend
npm test
```

### Backend Testing
```bash
cd backend
npm test  # Add tests as the project grows
```

### Manual Testing Checklist
- [ ] File upload/download functionality
- [ ] Text sharing and viewing
- [ ] Authentication flow (signup/login)
- [ ] Link expiration (views and time-based)
- [ ] Responsive design on mobile/desktop
- [ ] Dark/light theme switching

## 🐛 Bug Reports

When reporting bugs, please include:
- Steps to reproduce
- Expected vs actual behavior
- Browser/OS information
- Screenshots if applicable
- Console errors (if any)

## ✨ Feature Requests

For new features:
- Check existing issues first
- Provide clear use case
- Consider implementation complexity
- Discuss in issues before starting work

## 📚 Project Architecture

### Frontend Structure
```
src/
├── components/     # Reusable UI components
├── contexts/      # React context providers
├── pages/         # Route components
├── lib/           # Utility functions
└── types/         # TypeScript type definitions
```

### Backend Structure
```
├── routes/        # Express route handlers
├── middleware/    # Custom middleware
├── storage/       # File storage directory
└── utils/         # Helper functions
```

## 🔗 Useful Commands

```bash
# Install dependencies for both frontend and backend
npm run install:all

# Start both servers concurrently
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Format code
npm run format
```

## 📞 Getting Help

- Create an issue for bugs or questions
- Join discussions in existing issues
- Check the README for basic setup
- Review existing code for patterns

Thank you for contributing to ZapLink! 🚀