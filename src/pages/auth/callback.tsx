
import { useEffect } from "react";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { sendWelcomeEmail } from "@/services/authService";

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
        // Check if this is a new user (OAuth registration)
        const user = data.session.user;
        const isNewUser = router.query.type === 'signup' || !user.last_sign_in_at;
        
        // Send welcome email for new OAuth users
        if (isNewUser && user.email) {
          try {
            const userName = user.user_metadata?.full_name || 
                           user.user_metadata?.name || 
                           user.email.split('@')[0];
            
            const emailResult = await sendWelcomeEmail(user.email, userName);
            
            if (emailResult.success) {
              console.log('✅ Welcome email sent successfully to:', user.email);
            } else {
              console.error('❌ Failed to send welcome email:', emailResult.error);
            }
          } catch (emailError) {
            console.error('❌ Error sending welcome email:', emailError);
            // Don't block login if email fails
          }
        }
        
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
