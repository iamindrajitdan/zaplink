import React, { useState } from 'react';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const SharePage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [maxViews, setMaxViews] = useState(5);
  const [ttlHours, setTtlHours] = useState(24);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleShare = async () => {
    if (!file && !text.trim()) return;
    
    setLoading(true);
    const formData = new FormData();
    
    if (file) formData.append('file', file);
    if (text) formData.append('text', text);
    formData.append('maxViews', maxViews.toString());
    formData.append('ttlHours', ttlHours.toString());

    try {
      const response = await axios.post(`${API_BASE}/share`, formData);
      setResult(response.data);
    } catch (error) {
      console.error('Share failed:', error);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-blue-600">⚡ ZapLink</h1>
      
      {!result ? (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4">Share File or Text</h2>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Upload File</label>
              <input
                type="file"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="text-center text-gray-500">OR</div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Share Text</label>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to share..."
                className="w-full p-3 border rounded h-32"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2">Max Views</label>
                <input
                  type="number"
                  value={maxViews}
                  onChange={(e) => setMaxViews(parseInt(e.target.value))}
                  min="1"
                  max="100"
                  className="w-full p-2 border rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Expires (hours)</label>
                <input
                  type="number"
                  value={ttlHours}
                  onChange={(e) => setTtlHours(parseInt(e.target.value))}
                  min="1"
                  max="168"
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            
            <button
              onClick={handleShare}
              disabled={loading || (!file && !text.trim())}
              className="w-full bg-blue-600 text-white py-3 rounded font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading ? 'Creating Link...' : '⚡ Create ZapLink'}
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-green-50 border border-green-200 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-800 mb-4">✅ Link Created!</h2>
          <div className="space-y-3">
            <div>
              <label className="block text-sm font-medium text-green-700">Share URL:</label>
              <div className="flex">
                <input
                  type="text"
                  value={result.shareUrl}
                  readOnly
                  className="flex-1 p-2 border rounded-l bg-white"
                />
                <button
                  onClick={() => navigator.clipboard.writeText(result.shareUrl)}
                  className="px-4 py-2 bg-green-600 text-white rounded-r hover:bg-green-700"
                >
                  Copy
                </button>
              </div>
            </div>
            <p className="text-sm text-green-600">
              Expires: {new Date(result.expiresAt).toLocaleString()} | Views left: {result.viewsLeft}
            </p>
          </div>
          <button
            onClick={() => { setResult(null); setFile(null); setText(''); }}
            className="mt-4 text-blue-600 hover:underline"
          >
            Create Another Link
          </button>
        </div>
      )}
    </div>
  );
};

export default SharePage;