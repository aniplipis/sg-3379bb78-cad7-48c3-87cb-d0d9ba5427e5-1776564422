import { createContext, useContext, useState, useEffect, ReactNode, useCallback, useRef } from "react";
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
  
  // Prevent multiple simultaneous profile fetches for the same user
  const fetchingProfile = useRef<string | null>(null);
  const initialized = useRef(false);

  // Fetch or create user profile - memoized to prevent unnecessary recreations
  const manageUserProfile = useCallback(async (supabaseUser: SupabaseUser): Promise<Profile | null> => {
    // Prevent duplicate fetches
    if (fetchingProfile.current === supabaseUser.id) {
      console.log('⏭️ Profile fetch already in progress for user:', supabaseUser.id);
      return null;
    }

    try {
      fetchingProfile.current = supabaseUser.id;
      console.log('👤 Managing profile for user:', supabaseUser.email);
      
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
        console.log('📊 Premium status:', existingProfile.is_premium);
        processedUsers.add(supabaseUser.id);
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

      // 📧 Send welcome email ONLY for brand new users (non-blocking)
      if (!processedUsers.has(`email-sent-${supabaseUser.id}`)) {
        console.log('📧 Sending welcome email to BRAND NEW user...');
        processedUsers.add(`email-sent-${supabaseUser.id}`);
        
        // Don't await - send email in background to prevent blocking
        sendWelcomeEmail(supabaseUser.email || "", fullName)
          .then((result) => {
            if (result.success) {
              console.log('✅ Welcome email sent successfully to new user');
            } else {
              console.error('❌ Failed to send welcome email to new user:', result.error);
            }
          })
          .catch((err) => {
            console.error('❌ Welcome email error for new user:', err);
          });
      }

      return newProfile;
    } catch (error) {
      console.error("❌ Error in manageUserProfile:", error);
      return null;
    } finally {
      fetchingProfile.current = null;
    }
  }, []); // Empty dependency array - function is stable

  // Initialize auth on mount - ONLY ONCE
  useEffect(() => {
    if (initialized.current) return;
    initialized.current = true;

    let mounted = true;

    const initAuth = async () => {
      try {
        console.log('🔐 Initializing authentication...');
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session?.user && mounted) {
          console.log('✅ Session found for:', session.user.email);
          const userProfile = await manageUserProfile(session.user);
          if (mounted && userProfile) {
            // Set both user and profile together atomically
            setUser(session.user);
            setProfile(userProfile);
            console.log('✅ User and profile loaded successfully');
          }
        } else {
          console.log('❌ No active session found');
        }
      } catch (error) {
        console.error("❌ Error initializing auth:", error);
      } finally {
        if (mounted) {
          setIsLoading(false);
          console.log('✅ Auth initialization complete');
        }
      }
    };

    initAuth();

    return () => {
      mounted = false;
    };
  }, [manageUserProfile]);

  // Listen to auth state changes
  useEffect(() => {
    let mounted = true;

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('🔐 Auth state changed:', event);
        
        if (!mounted) return;

        if (event === 'SIGNED_OUT') {
          console.log('👋 User signed out');
          setUser(null);
          setProfile(null);
          setIsLoading(false);
          return;
        }

        if (event === 'INITIAL_SESSION') {
          // Skip - already handled by initAuth
          console.log('⏭️ Skipping INITIAL_SESSION - already handled');
          return;
        }

        if (session?.user) {
          console.log('👤 Auth state change with user:', session.user.email);
          // Only fetch profile if we don't already have this user with the same data
          if (!user || user.id !== session.user.id || !profile) {
            console.log('🔄 Fetching updated profile...');
            setIsLoading(true);
            const userProfile = await manageUserProfile(session.user);
            if (mounted && userProfile) {
              setUser(session.user);
              setProfile(userProfile);
              console.log('✅ Profile updated in state');
            }
            setIsLoading(false);
          } else {
            console.log('⏭️ Profile already loaded, skipping fetch');
          }
        } else {
          console.log('❌ No user in session');
          setUser(null);
          setProfile(null);
          setIsLoading(false);
        }
      }
    );

    return () => {
      mounted = false;
      subscription.unsubscribe();
    };
  }, [user, profile, manageUserProfile]);

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
        redirectTo: `${window.location.origin}/`,
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