import React, { useState } from 'react';
import { Upload, FileText, Copy, Check, Settings, Zap } from 'lucide-react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import Button from '../components/ui/Button';
import Input from '../components/ui/Input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const API_BASE = 'http://localhost:5001/api';

const SharePage: React.FC = () => {
  const { user } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [text, setText] = useState('');
  const [maxViews, setMaxViews] = useState(5);
  const [ttlHours, setTtlHours] = useState(24);
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);

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

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(result.shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const resetForm = () => {
    setResult(null);
    setFile(null);
    setText('');
    setCopied(false);
  };

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      {!result ? (
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">Share Instantly</h1>
            <p className="text-muted-foreground">
              Secure, temporary file and text sharing with automatic expiration
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload File
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid w-full max-w-sm items-center gap-1.5">
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] || null)}
                  className="cursor-pointer"
                />
                <p className="text-sm text-muted-foreground">
                  Maximum file size: 10MB
                </p>
              </div>
            </CardContent>
          </Card>

          <div className="text-center">
            <span className="px-3 py-1 text-sm text-muted-foreground bg-muted rounded-full">
              OR
            </span>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Share Text
              </CardTitle>
            </CardHeader>
            <CardContent>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text to share..."
                className="flex min-h-[120px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Expiration Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Max Views</label>
                  <Input
                    type="number"
                    value={maxViews}
                    onChange={(e) => setMaxViews(parseInt(e.target.value))}
                    min="1"
                    max="100"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expires (hours)</label>
                  <Input
                    type="number"
                    value={ttlHours}
                    onChange={(e) => setTtlHours(parseInt(e.target.value))}
                    min="1"
                    max="168"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            onClick={handleShare}
            disabled={loading || (!file && !text.trim())}
            className="w-full"
            size="lg"
          >
            {loading ? (
              'Creating Link...'
            ) : (
              <>
                <Zap className="mr-2 h-4 w-4" />
                Create ZapLink
              </>
            )}
          </Button>
        </div>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-600">
              <Check className="h-5 w-5" />
              Link Created Successfully!
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Share URL</label>
              <div className="flex gap-2">
                <Input
                  value={result.shareUrl}
                  readOnly
                  className="flex-1"
                />
                <Button
                  onClick={copyToClipboard}
                  variant="outline"
                  size="sm"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium">Expires:</span>
                <p className="text-muted-foreground">
                  {new Date(result.expiresAt).toLocaleString()}
                </p>
              </div>
              <div>
                <span className="font-medium">Views left:</span>
                <p className="text-muted-foreground">{result.viewsLeft}</p>
              </div>
            </div>

            <Button onClick={resetForm} variant="outline" className="w-full">
              Create Another Link
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default SharePage;