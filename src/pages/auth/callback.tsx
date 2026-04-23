import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [debugInfo, setDebugInfo] = useState<string>("");

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
        
        console.log('🔍 Type from hash:', typeFromHash);
        console.log('🔍 Type from query:', typeFromQuery);
        console.log('🔍 Final auth type:', type);
        console.log('🔍 Is password recovery:', isPasswordRecovery);
        
        setDebugInfo(`Type: ${type}, Recovery: ${isPasswordRecovery}`);
        
        // For password recovery, redirect immediately
        if (isPasswordRecovery) {
          console.log('➡️ Password recovery detected - redirecting to reset password page...');
          router.push("/auth/reset-password");
          return;
        }
        
        // For other auth flows, wait for session
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Session error:", sessionError);
          router.push("/");
          return;
        }

        if (session) {
          console.log('✅ Session found for:', session.user.email);
        } else {
          console.log('⚠️ No session found, redirecting to home');
        }

        console.log('➡️ Regular auth - redirecting to home...');
        router.push("/");
        
      } catch (err) {
        console.error("❌ Callback error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        
        // Check for recovery type even on error
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const queryParams = new URLSearchParams(window.location.search);
        const isPasswordRecovery = hashParams.get('type') === 'recovery' || queryParams.get('type') === 'recovery';
        
        router.push(isPasswordRecovery ? "/auth/reset-password" : "/");
      }
    };

    // Only run once when component mounts
    handleAuthCallback();
  }, []); // Empty dependency array - run only once

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center max-w-md mx-auto p-6">
        {error ? (
          <>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">❌</span>
            </div>
            <h2 className="text-xl font-bold text-red-400 mb-2">Authentication Error</h2>
            <p className="text-muted-foreground mb-4">{error}</p>
            <p className="text-sm text-muted-foreground mb-2">Debug: {debugInfo}</p>
            <p className="text-sm text-muted-foreground">Redirecting...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Completing Sign In</h2>
            <p className="text-muted-foreground mb-2">Please wait...</p>
            {debugInfo && <p className="text-sm text-muted-foreground">Debug: {debugInfo}</p>}
          </>
        )}
      </div>
    </div>
  );
}