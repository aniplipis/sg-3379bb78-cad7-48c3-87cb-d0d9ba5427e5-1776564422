
import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  id: string;
  email: string;
  name: string;
  isPremium: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("maxSahamUser");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem("maxSahamUsers") || "[]");
    const existingUser = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!existingUser) {
      setIsLoading(false);
      throw new Error("Invalid email or password");
    }

    const userData: User = {
      id: existingUser.id,
      email: existingUser.email,
      name: existingUser.name,
      isPremium: existingUser.isPremium || false,
    };

    setUser(userData);
    localStorage.setItem("maxSahamUser", JSON.stringify(userData));
    setIsLoading(false);
  };

  const register = async (name: string, email: string, password: string) => {
    setIsLoading(true);
    
    await new Promise(resolve => setTimeout(resolve, 1000));

    const users = JSON.parse(localStorage.getItem("maxSahamUsers") || "[]");
    
    const existingUser = users.find((u: any) => u.email === email);
    if (existingUser) {
      setIsLoading(false);
      throw new Error("Email already registered");
    }

    const newUser = {
      id: Date.now().toString(),
      name,
      email,
      password,
      isPremium: false,
      createdAt: new Date().toISOString(),
    };

    users.push(newUser);
    localStorage.setItem("maxSahamUsers", JSON.stringify(users));

    const userData: User = {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      isPremium: newUser.isPremium,
    };

    setUser(userData);
    localStorage.setItem("maxSahamUser", JSON.stringify(userData));
    setIsLoading(false);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("maxSahamUser");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        register,
        logout,
        isLoading,
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
