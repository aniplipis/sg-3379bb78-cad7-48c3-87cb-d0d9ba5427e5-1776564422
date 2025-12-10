import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Mail, Send, CheckCircle, XCircle, Loader2 } from 'lucide-react';

export default function TestEmailPage() {
  const [email, setEmail] = useState('');
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleTest = async () => {
    if (!email || !userName) {
      alert('Please enter both email and user name');
      return;
    }

    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('/api/test/send-welcome-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, userName }),
      });

      const data = await response.json();
      setResult(data);
    } catch (error: any) {
      setResult({
        success: false,
        error: error.message || 'Failed to send test email'
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <Card className="w-full max-w-md border-gold/30">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Mail className="w-6 h-6 text-gold" />
            Test Welcome Email
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            Test if emails are working with domain: abgmax.maxsaham.com
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium mb-2 block">User Name</label>
            <Input
              type="text"
              placeholder="Test User"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              className="border-gold/30"
            />
          </div>

          <div>
            <label className="text-sm font-medium mb-2 block">Email Address</label>
            <Input
              type="email"
              placeholder="test@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border-gold/30"
            />
          </div>

          <Button
            onClick={handleTest}
            disabled={loading}
            className="w-full bg-gold hover:bg-gold/90 text-black"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Sending...
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                Send Test Email
              </>
            )}
          </Button>

          {result && (
            <div className={`p-4 rounded-lg border ${
              result.success 
                ? 'bg-green-500/10 border-green-500/30' 
                : 'bg-red-500/10 border-red-500/30'
            }`}>
              <div className="flex items-start gap-2">
                {result.success ? (
                  <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                ) : (
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                )}
                <div className="flex-1">
                  <p className={`font-semibold ${
                    result.success ? 'text-green-500' : 'text-red-500'
                  }`}>
                    {result.message || (result.success ? 'Success!' : 'Failed!')}
                  </p>
                  {result.error && (
                    <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                      {JSON.stringify(result.error, null, 2)}
                    </pre>
                  )}
                  {result.data && (
                    <pre className="mt-2 text-xs text-muted-foreground overflow-auto">
                      {JSON.stringify(result.data, null, 2)}
                    </pre>
                  )}
                </div>
              </div>
            </div>
          )}

          <div className="text-xs text-muted-foreground space-y-1">
            <p>✅ Domain: abgmax.maxsaham.com (Verified)</p>
            <p>✅ From: noreply@abgmax.maxsaham.com</p>
            <p>⚠️ Check spam folder if email doesn't arrive</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}