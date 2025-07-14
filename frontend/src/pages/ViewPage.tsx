import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const API_BASE = 'http://localhost:5000/api';

const ViewPage: React.FC = () => {
  const { linkId } = useParams<{ linkId: string }>();
  const [content, setContent] = useState<any>(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await axios.get(`${API_BASE}/view/${linkId}`);
        setContent(response.data);
      } catch (err: any) {
        setError(err.response?.data?.error || 'Failed to load content');
      }
      setLoading(false);
    };

    if (linkId) fetchContent();
  }, [linkId]);

  if (loading) {
    return (
      <div className="max-w-2xl mx-auto p-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading content...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto p-8">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <h2 className="text-xl font-semibold text-red-800 mb-2">❌ {error}</h2>
          <p className="text-red-600">This link may have expired or been used up.</p>
          <a href="/" className="mt-4 inline-block text-blue-600 hover:underline">
            Create a new ZapLink
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold text-center mb-8 text-blue-600">⚡ ZapLink Content</h1>
      
      <div className="bg-white rounded-lg shadow-lg p-6">
        {content?.type === 'file' ? (
          <div className="text-center">
            <h2 className="text-xl font-semibold mb-4">📁 {content.filename}</h2>
            <a
              href={content.downloadUrl}
              download
              className="inline-block bg-blue-600 text-white px-6 py-3 rounded font-semibold hover:bg-blue-700"
            >
              ⬇️ Download File
            </a>
          </div>
        ) : (
          <div>
            <h2 className="text-xl font-semibold mb-4">📝 Shared Text</h2>
            <div className="bg-gray-50 p-4 rounded border">
              <pre className="whitespace-pre-wrap text-gray-800">{content?.content}</pre>
            </div>
          </div>
        )}
        
        <div className="mt-6 pt-4 border-t text-center text-sm text-gray-500">
          Views remaining: {content?.viewsLeft}
        </div>
      </div>
      
      <div className="text-center mt-6">
        <a href="/" className="text-blue-600 hover:underline">
          Create your own ZapLink
        </a>
      </div>
    </div>
  );
};

export default ViewPage;