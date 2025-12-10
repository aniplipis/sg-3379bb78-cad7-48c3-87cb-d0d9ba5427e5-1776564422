import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        console.log('🔐 Auth callback started...');
        
        // Wait a bit for the hash to be processed by Supabase
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Get the session
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Session error:", sessionError);
          // Don't block redirect on session errors - just go home
          router.push("/");
          return;
        }

        if (session) {
          console.log('✅ Session found for:', session.user.email);
        } else {
          console.log('⚠️ No session found, but redirecting anyway');
        }

        // Always redirect to home - let AuthContext handle the rest
        console.log('➡️ Redirecting to home...');
        router.push("/");
        
      } catch (err) {
        console.error("❌ Callback error:", err);
        // Even on error, redirect to home
        router.push("/");
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
            <p className="text-sm text-muted-foreground">Redirecting...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Completing Sign In</h2>
            <p className="text-muted-foreground">Please wait...</p>
          </>
        )}
      </div>
    </div>
  );
}