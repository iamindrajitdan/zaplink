# Contributing to ZapLink

## Development Setup

1. Fork the repository
2. Clone your fork: `git clone https://github.com/yourusername/zaplink.git`
3. Install dependencies:
   ```bash
   cd backend && npm install
   cd ../frontend && npm install
   ```
4. Start development servers:
   ```bash
   # Terminal 1
   cd backend && npm run dev
   
   # Terminal 2  
   cd frontend && npm start
   ```

## Pull Request Process

1. Create a feature branch: `git checkout -b feature/your-feature`
2. Make your changes
3. Test locally
4. Commit: `git commit -m "Add your feature"`
5. Push: `git push origin feature/your-feature`
6. Create a Pull Request

## Code Style

- Use TypeScript for frontend
- Follow existing code patterns
- Keep functions small and focused
- Add comments for complex logic