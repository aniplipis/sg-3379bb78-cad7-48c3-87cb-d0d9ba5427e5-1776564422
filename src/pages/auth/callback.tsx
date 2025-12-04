import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Handle the OAuth callback by exchanging the code for a session
        const hashParams = new URLSearchParams(window.location.hash.substring(1));
        const accessToken = hashParams.get('access_token');
        const refreshToken = hashParams.get('refresh_token');

        // If we have tokens in the URL hash (OAuth flow)
        if (accessToken) {
          const { data: { session }, error: sessionError } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken || '',
          });

          if (sessionError) throw sessionError;

          if (session?.user) {
            await handleUserSession(session.user.id);
          }
        } else {
          // Fallback: check if session already exists
          const { data: { session }, error: sessionError } = await supabase.auth.getSession();

          if (sessionError) throw sessionError;

          if (session?.user) {
            await handleUserSession(session.user.id);
          } else {
            // No session found, redirect to home
            router.push("/");
          }
        }
      } catch (err) {
        console.error("Auth callback error:", err);
        setError("Authentication failed. Redirecting...");
        setTimeout(() => router.push("/"), 2000);
      }
    };

    const handleUserSession = async (userId: string) => {
      try {
        // Check if this is an admin login attempt
        const isAdminLogin = router.query.admin === "true";

        if (isAdminLogin) {
          // Verify admin status
          const { data: profile, error: profileError } = await supabase
            .from("profiles")
            .select("is_admin")
            .eq("id", userId)
            .single();

          if (profileError) {
            console.error("Error checking admin status:", profileError);
            setError("Failed to verify admin status");
            setTimeout(() => router.push("/admin/login"), 2000);
            return;
          }

          if (!profile?.is_admin) {
            // Not an admin, sign them out and redirect
            await supabase.auth.signOut();
            setError("Access denied. You do not have admin privileges.");
            setTimeout(() => router.push("/admin/login"), 2000);
            return;
          }

          // Valid admin, redirect to admin dashboard
          router.push("/admin/memberships");
        } else {
          // Regular user login, redirect to members area
          router.push("/members");
        }
      } catch (err) {
        console.error("Session handling error:", err);
        setError("Failed to verify user. Redirecting...");
        setTimeout(() => router.push("/"), 2000);
      }
    };

    // Only run after router is ready
    if (router.isReady) {
      handleCallback();
    }
  }, [router, router.isReady]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900">
      <div className="text-center">
        {error ? (
          <>
            <div className="text-red-500 text-xl mb-4">⚠️</div>
            <p className="text-lg font-medium text-red-600 dark:text-red-400 mb-2">{error}</p>
            <p className="text-sm text-slate-600 dark:text-slate-400">Redirecting...</p>
          </>
        ) : (
          <>
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-white mb-4"></div>
            <p className="text-lg font-medium text-slate-900 dark:text-white mb-2">
              Completing sign in...
            </p>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Please wait while we verify your credentials
            </p>
          </>
        )}
      </div>
    </div>
  );
}