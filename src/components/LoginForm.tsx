import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail, Lock, Chrome, AlertCircle } from "lucide-react";
import { authService } from "@/services/authService";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showForgotPassword, setShowForgotPassword] = useState(false);
  const [resetEmailSent, setResetEmailSent] = useState(false);
  const { login, loginWithGoogle } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const emailValue = watch("email");

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);

    try {
      await login(data.email, data.password);
      onSuccess();
    } catch (err: any) {
      console.error("Login error:", err);
      
      // Provide specific error messages based on error type
      let errorMessage = "Login failed. Please check your credentials.";
      
      if (err.message) {
        if (err.message.includes("Invalid login credentials")) {
          errorMessage = "Invalid email or password. Please check your credentials and try again.";
        } else if (err.message.includes("Email not confirmed")) {
          errorMessage = "Please verify your email address before logging in. Check your inbox for the confirmation email.";
        } else if (err.message.includes("User not found")) {
          errorMessage = "No account found with this email address. Please sign up first.";
        } else {
          errorMessage = err.message;
        }
      }
      
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleForgotPassword = async () => {
    if (!emailValue || !emailValue.includes("@")) {
      setError("Please enter your email address first.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const { error } = await authService.resetPassword(emailValue);
      
      if (error) {
        setError(error.message);
      } else {
        setResetEmailSent(true);
        setTimeout(() => {
          setResetEmailSent(false);
          setShowForgotPassword(false);
        }, 5000);
      }
    } catch (err: any) {
      setError(err.message || "Failed to send password reset email.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      // OAuth redirect will handle the rest
    } catch (err: any) {
      setError(err.message || "Google sign-in failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Google Sign-In Button */}
      <Button
        type="button"
        onClick={handleGoogleLogin}
        disabled={isLoading}
        className="w-full h-10 sm:h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-semibold text-xs sm:text-sm"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        ) : (
          <>
            <Chrome className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600" />
            <span>Continue with Google</span>
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-3 sm:px-4 bg-card text-muted-foreground">Or continue with email</span>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {resetEmailSent && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-600 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm flex items-start gap-2">
          <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
          <span>Password reset email sent! Check your inbox.</span>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-3 sm:space-y-4">
        <div>
          <Label htmlFor="email" className="text-foreground/90 text-xs sm:text-sm">Email Address</Label>
          <div className="relative mt-1 sm:mt-1.5">
            <Mail className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-8 sm:pl-10 h-10 sm:h-12 bg-background border-border focus:border-gold text-xs sm:text-sm"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-foreground/90 text-xs sm:text-sm">Password</Label>
          <div className="relative mt-1 sm:mt-1.5">
            <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-8 sm:pl-10 h-10 sm:h-12 bg-background border-border focus:border-gold text-xs sm:text-sm"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div className="flex items-center justify-between text-xs sm:text-sm">
          <div className="flex items-center">
            <input
              type="checkbox"
              id="remember"
              className="w-3 h-3 sm:w-4 sm:h-4 rounded border-border text-gold focus:ring-gold"
            />
            <label htmlFor="remember" className="ml-1.5 sm:ml-2 text-muted-foreground">
              Remember me
            </label>
          </div>
          <button
            type="button"
            onClick={() => setShowForgotPassword(!showForgotPassword)}
            className="text-gold hover:text-gold/80 transition-colors"
          >
            Forgot password?
          </button>
        </div>

        {showForgotPassword && (
          <div className="bg-muted/50 border border-border rounded-lg p-3 sm:p-4 space-y-2 sm:space-y-3">
            <p className="text-xs sm:text-sm text-muted-foreground">
              Enter your email above and click the button below to receive a password reset link.
            </p>
            <Button
              type="button"
              onClick={handleForgotPassword}
              disabled={isLoading}
              variant="outline"
              className="w-full h-9 sm:h-10 text-xs sm:text-sm"
            >
              {isLoading ? (
                <Loader2 className="w-3 h-3 sm:w-4 sm:h-4 animate-spin" />
              ) : (
                "Send Reset Email"
              )}
            </Button>
          </div>
        )}

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full h-10 sm:h-12 bg-gold hover:bg-gold/90 text-black font-semibold text-xs sm:text-sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : (
            "Sign In"
          )}
        </Button>
      </form>
    </div>
  );
}
