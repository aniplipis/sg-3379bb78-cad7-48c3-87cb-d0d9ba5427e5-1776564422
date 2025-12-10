import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import type { User as SupabaseUser } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";
import { sendWelcomeEmail } from "@/services/authService";

type Profile = Database["public"]["Tables"]["profiles"]["Row"];

interface AuthContextType {
  user: SupabaseUser | null;
  profile: Profile | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  register: (name: string, email: string, password: string, phone: string, tradingview_username?: string) => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  isLoggingOut: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Track which users we've already processed (in-memory, per session)
const processedUsers = new Set<string>();

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  // Fetch or create user profile
  const manageUserProfile = async (supabaseUser: SupabaseUser): Promise<Profile | null> => {
    try {
      console.log('👤 Managing profile for user:', supabaseUser.email);
      
      // Check if we've already processed this user this session
      if (processedUsers.has(supabaseUser.id)) {
        console.log('⏭️ User already processed this session, skipping email check');
      }
      
      // First, try to fetch existing profile
      const { data: existingProfile, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", supabaseUser.id)
        .maybeSingle();

      // If there's an error other than "no rows found", log it
      if (fetchError && fetchError.code !== "PGRST116") {
        console.error("❌ Error fetching profile:", fetchError);
        return null;
      }

      // ✅ EXISTING USER - Just return profile, NO email
      if (existingProfile) {
        console.log('✅ Existing profile found - welcome back!');
        processedUsers.add(supabaseUser.id);
        
        // Show welcome back toast (will be handled in the component)
        if (typeof window !== 'undefined') {
          window.dispatchEvent(new CustomEvent('auth-existing-user', { 
            detail: { userName: existingProfile.full_name || supabaseUser.email } 
          }));
        }
        
        return existingProfile;
      }

      // 🆕 NEW USER - Create profile and send welcome email
      console.log('📝 Creating new profile for brand new user...');
      
      // Try to get full_name from multiple sources
      const fullName = 
        supabaseUser.user_metadata?.full_name || 
        supabaseUser.user_metadata?.name ||
        supabaseUser.user_metadata?.display_name ||
        (supabaseUser.email ? supabaseUser.email.split("@")[0] : "User");

      const { data: newProfile, error: createError } = await supabase
        .from("profiles")
        .insert([
          {
            id: supabaseUser.id,
            email: supabaseUser.email || "",
            full_name: fullName,
            avatar_url: supabaseUser.user_metadata?.avatar_url || supabaseUser.user_metadata?.picture || null,
            phone: supabaseUser.user_metadata?.phone || null,
            tradingview_username: supabaseUser.user_metadata?.tradingview_username || null,
          },
        ])
        .select()
        .single();

      if (createError) {
        console.error("❌ Error creating profile:", createError);
        return null;
      }

      console.log('✅ New profile created successfully');
      processedUsers.add(supabaseUser.id);

      // 📧 Send welcome email ONLY for brand new users
      console.log('📧 Sending welcome email to BRAND NEW user...');
      
      sendWelcomeEmail(supabaseUser.email || "", fullName).then((result) => {
        if (result.success) {
          console.log('✅ Welcome email sent successfully to new user');
        } else {
          console.error('❌ Failed to send welcome email to new user:', result.error);
        }
      }).catch((err) => {
        console.error('❌ Welcome email error for new user:', err);
      });

      return newProfile;
    } catch (error) {
      console.error("❌ Error in manageUserProfile:", error);
      return null;
    }
  };

  useEffect(() => {
    const initAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user) {
          const userProfile = await manageUserProfile(session.user);
          setUser(session.user);
          setProfile(userProfile);
        }
      } catch (error) {
        console.error("Error initializing auth:", error);
      } finally {
        setIsLoading(false);
      }
    };

    initAuth();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event);
        setIsLoading(true);
        if (session?.user) {
          const userProfile = await manageUserProfile(session.user);
          setUser(session.user);
          setProfile(userProfile);
        } else {
          setUser(null);
          setProfile(null);
        }
        setIsLoading(false);
      }
    );

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const login = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
  };

  const loginWithGoogle = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const register = async (name: string, email: string, password: string, phone: string, tradingview_username?: string) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          full_name: name,
          phone: phone,
          tradingview_username: tradingview_username || null,
        },
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    });
    if (error) throw error;
  };

  const logout = async () => {
    try {
      setIsLoggingOut(true);
      
      // Clear local state immediately
      setUser(null);
      setProfile(null);
      
      // Sign out from Supabase
      const { error } = await supabase.auth.signOut();
      
      if (error) {
        console.error("Logout error:", error);
        throw error;
      }
      
      // Redirect to home page after successful logout
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } catch (error) {
      console.error("Failed to logout:", error);
      // Even if there's an error, clear local state
      setUser(null);
      setProfile(null);
      
      // Force redirect to home
      if (typeof window !== 'undefined') {
        window.location.href = '/';
      }
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        profile,
        isAuthenticated: !!user,
        login,
        loginWithGoogle,
        register,
        logout,
        isLoading,
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}