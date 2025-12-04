
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      // Get the code from URL params (for OAuth)
      const { data, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Error in auth callback:", error);
        router.push("/?auth_error=" + encodeURIComponent(error.message));
        return;
      }

      if (data.session) {
        // Successfully authenticated
        router.push("/");
      } else {
        router.push("/?auth_error=no_session");
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <p className="text-lg text-muted-foreground">Completing authentication...</p>
      </div>
    </div>
  );
}
