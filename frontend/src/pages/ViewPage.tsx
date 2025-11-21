import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Download, FileText, AlertCircle, Eye, Clock } from 'lucide-react';
import axios from 'axios';
import Button from '../components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/Card';

const API_BASE = 'http://localhost:5001/api';

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
      <div className="container max-w-2xl mx-auto py-16 px-4">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
          <p className="text-muted-foreground">Loading content...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container max-w-2xl mx-auto py-16 px-4">
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-destructive">
              <AlertCircle className="h-5 w-5" />
              Content Not Available
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">{error}</p>
            <p className="text-sm text-muted-foreground">
              This link may have expired or reached its view limit.
            </p>
            <Button asChild variant="outline">
              <a href="/">Create New ZapLink</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container max-w-2xl mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Shared Content</h1>
          <p className="text-muted-foreground">
            This content was shared securely via ZapLink
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {content?.type === 'file' ? (
                <>
                  <Download className="h-5 w-5" />
                  File Download
                </>
              ) : (
                <>
                  <FileText className="h-5 w-5" />
                  Shared Text
                </>
              )}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {content?.type === 'file' ? (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="font-medium">{content.filename}</p>
                  <p className="text-sm text-muted-foreground">
                    Click below to download the file
                  </p>
                </div>
                <Button asChild className="w-full">
                  <a href={content.downloadUrl} download>
                    <Download className="mr-2 h-4 w-4" />
                    Download File
                  </a>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <pre className="whitespace-pre-wrap text-sm font-mono">
                    {content?.content}
                  </pre>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Eye className="h-4 w-4" />
                <span>Views remaining: {content?.viewsLeft}</span>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Expires automatically</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="text-center">
          <Button variant="outline" asChild>
            <a href="/">Create Your Own ZapLink</a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ViewPage;