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
        
        // Get the session from the URL hash
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();

        if (sessionError) {
          console.error("❌ Error in auth callback:", sessionError);
          setError(sessionError.message);
          setTimeout(() => {
            router.push("/?auth_error=" + encodeURIComponent(sessionError.message));
          }, 2000);
          return;
        }

        if (!session) {
          console.error("❌ No session found");
          setError("No session found");
          setTimeout(() => {
            router.push("/?auth_error=no_session");
          }, 2000);
          return;
        }

        console.log('✅ Session found:', session.user.email);
        console.log('✅ Authentication successful, redirecting to home...');
        
        // Just redirect - let AuthContext handle profile creation and welcome email
        router.push("/");
        
      } catch (err) {
        console.error("❌ Unexpected error in auth callback:", err);
        setError("Authentication failed. Please try again.");
        setTimeout(() => {
          router.push("/?auth_error=unexpected_error");
        }, 2000);
      }
    };

    // Small delay to ensure URL hash is processed
    const timer = setTimeout(() => {
      handleAuthCallback();
    }, 100);

    return () => clearTimeout(timer);
  }, [router]);

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
            <p className="text-sm text-muted-foreground">Redirecting you back...</p>
          </>
        ) : (
          <>
            <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <h2 className="text-xl font-bold mb-2">Completing Authentication</h2>
            <p className="text-muted-foreground">Please wait while we sign you in...</p>
          </>
        )}
      </div>
    </div>
  );
}