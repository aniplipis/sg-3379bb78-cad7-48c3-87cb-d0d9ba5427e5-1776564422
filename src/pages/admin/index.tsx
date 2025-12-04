import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";

export default function AdminIndexPage() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const checkAdminAndRedirect = async () => {
      if (!user) {
        router.push("/admin/login");
        return;
      }

      try {
        const { data, error } = await supabase
          .from("profiles")
          .select("is_admin")
          .eq("id", user.id)
          .single();

        if (error || !data?.is_admin) {
          router.push("/admin/login");
        } else {
          router.push("/admin/memberships");
        }
      } catch (err) {
        console.error("Error:", err);
        router.push("/admin/login");
      }
    };

    checkAdminAndRedirect();
  }, [user, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-white mb-4"></div>
        <p className="text-slate-600 dark:text-slate-400">Redirecting...</p>
      </div>
    </div>
  );
}