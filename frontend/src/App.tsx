import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SharePage from './pages/SharePage';
import ViewPage from './pages/ViewPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Routes>
          <Route path="/" element={<SharePage />} />
          <Route path="/view/:linkId" element={<ViewPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;