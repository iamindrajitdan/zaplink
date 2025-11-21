import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import SharePage from './pages/SharePage';
import ViewPage from './pages/ViewPage';

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-background">
            <Navbar />
            <Routes>
              <Route path="/" element={
                <ProtectedRoute>
                  <SharePage />
                </ProtectedRoute>
              } />
              <Route path="/view/:linkId" element={<ViewPage />} />
            </Routes>
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;