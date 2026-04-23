import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function AuthCallback() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("Processing...");

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔐 Auth callback started...');
        console.log('📍 Full URL:', window.location.href);
        console.log('📍 Hash:', window.location.hash);
        console.log('📍 Search:', window.location.search);
        
        // Check both hash and query params for recovery type
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        
        const typeFromHash = hashParams.get('type');
        const typeFromQuery = queryParams.get('type');
        const type = typeFromHash || typeFromQuery;
        
        const isPasswordRecovery = type === 'recovery';
        
        console.log('🔍 Auth type:', type);
        console.log('🔍 Is password recovery:', isPasswordRecovery);
        
        // For password recovery, redirect to reset password page
        if (isPasswordRecovery) {
          console.log('➡️ Password recovery detected - redirecting...');
          setStatus("Redirecting to reset password page...");
          await new Promise(resolve => setTimeout(resolve, 500));
          router.push("/auth/reset-password");
          return;
        }
        
        // For OAuth flows, just redirect - Supabase handles session automatically
        console.log('➡️ OAuth callback - redirecting to home...');
        setStatus("Sign in successful! Redirecting...");
        await new Promise(resolve => setTimeout(resolve, 1000));
        router.push("/");
        
      } catch (err) {
        console.error("❌ Callback error:", err);
        setStatus("Redirecting...");
        // Redirect anyway
        setTimeout(() => {
          router.push("/");
        }, 1000);
      }
    };

    // Only run once when component mounts
    handleAuthCallback();
  }, []); // Empty dependency array - run only once

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-6">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-bold mb-2">Completing Sign In</h2>
        <p className="text-muted-foreground">{status}</p>
      </div>
    </div>
  );
}