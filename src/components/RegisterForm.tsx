import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, User, Mail, Lock, Chrome, Phone, TrendingUp, AlertCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { sendWelcomeEmail } from "@/services/authService";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  tradingview_username: z.string().optional(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine((val) => val === true, {
    message: "You must accept the terms and conditions",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchToLogin?: () => void;
}

export function RegisterForm({ onSuccess, onSwitchToLogin }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const [showAlreadyRegistered, setShowAlreadyRegistered] = useState(false);
  const { register: registerUser, loginWithGoogle } = useAuth();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterFormData) => {
    setIsLoading(true);
    setError(null);
    setSuccess(false);
    setShowAlreadyRegistered(false);

    try {
      await registerUser(data.name, data.email, data.password, data.phone, data.tradingview_username);

      // Send welcome email asynchronously (non-blocking)
      // Don't wait for it to complete - registration should succeed regardless of email status
      console.log('📧 Triggering welcome email (non-blocking)...');
      sendWelcomeEmail(data.email, data.name)
        .then((result) => {
          if (result.success) {
            console.log('✅ Welcome email sent successfully');
          } else {
            console.error('❌ Welcome email failed (non-blocking):', result.error);
          }
        })
        .catch((err) => {
          console.error('❌ Welcome email error (non-blocking):', err);
        });

      // Show success immediately without waiting for email
      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account.",
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Check for specific error messages that indicate user already exists
      const errorMessage = err.message || '';
      
      if (
        errorMessage.includes('already registered') || 
        errorMessage.includes('User already registered') ||
        errorMessage.includes('already exists') ||
        errorMessage.includes('duplicate') ||
        errorMessage.toLowerCase().includes('already')
      ) {
        setShowAlreadyRegistered(true);
        setError("This email is already registered. Please sign in instead.");
        toast({
          title: "Account already exists",
          description: "This email is already registered. Please use the Login tab to sign in.",
          variant: "destructive",
        });
      } else {
        setError(err.message || "Registration failed. Please try again.");
        toast({
          title: "Registration failed",
          description: err.message || "Please try again later.",
          variant: "destructive",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await loginWithGoogle();
      // OAuth redirect will handle the rest
    } catch (err: any) {
      setError(err.message || "Google sign-up failed. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-3 sm:space-y-6">
      {/* Google Sign-Up Button */}
      <Button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full h-10 sm:h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-semibold text-xs sm:text-sm"
      >
        {isLoading ? (
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
        ) : (
          <>
            <Chrome className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 text-blue-600" />
            <span>Sign up with Google</span>
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-xs sm:text-sm">
          <span className="px-3 sm:px-4 bg-card text-muted-foreground">Or register with email</span>
        </div>
      </div>

      {/* Already Registered Alert */}
      {showAlreadyRegistered && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-600 dark:text-amber-400 px-3 py-3 sm:px-4 sm:py-4 rounded-lg text-xs sm:text-sm">
          <div className="flex items-start gap-2 mb-2">
            <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <div className="font-semibold mb-1">Account Already Exists</div>
              <p className="text-xs sm:text-sm">This email is already registered in our system.</p>
            </div>
          </div>
          {onSwitchToLogin && (
            <Button
              type="button"
              onClick={onSwitchToLogin}
              className="w-full mt-2 bg-amber-600 hover:bg-amber-700 text-white"
              size="sm"
            >
              Go to Login
            </Button>
          )}
        </div>
      )}

      {error && !showAlreadyRegistered && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-3 py-2 sm:px-4 sm:py-3 rounded-lg text-xs sm:text-sm">
          <div className="font-semibold mb-1">Account created successfully! 🎉</div>
          <div className="text-[10px] sm:text-xs">Please check your email to confirm your account. You'll be redirected shortly...</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2.5 sm:space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground/90 text-xs sm:text-sm">Full Name</Label>
          <div className="relative mt-1 sm:mt-1.5">
            <User className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Muhammad Haniff"
              className="pl-8 sm:pl-10 h-10 sm:h-12 bg-background border-border focus:border-gold text-xs sm:text-sm"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

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
          <Label htmlFor="phone" className="text-foreground/90 text-xs sm:text-sm">Phone Number</Label>
          <div className="relative mt-1 sm:mt-1.5">
            <Phone className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+60123456789"
              className="pl-8 sm:pl-10 h-10 sm:h-12 bg-background border-border focus:border-gold text-xs sm:text-sm"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tradingview_username" className="text-foreground/90 text-xs sm:text-sm">
            TradingView Username <span className="text-muted-foreground text-[10px] sm:text-xs">(Optional)</span>
          </Label>
          <div className="relative mt-1 sm:mt-1.5">
            <TrendingUp className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              id="tradingview_username"
              type="text"
              placeholder="your_tradingview_username"
              className="pl-8 sm:pl-10 h-10 sm:h-12 bg-background border-border focus:border-gold text-xs sm:text-sm"
              {...register("tradingview_username")}
            />
          </div>
          {errors.tradingview_username && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.tradingview_username.message}</p>
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

        <div>
          <Label htmlFor="confirmPassword" className="text-foreground/90 text-xs sm:text-sm">Confirm Password</Label>
          <div className="relative mt-1 sm:mt-1.5">
            <Lock className="absolute left-2 sm:left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-8 sm:pl-10 h-10 sm:h-12 bg-background border-border focus:border-gold text-xs sm:text-sm"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-xs sm:text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="w-3 h-3 sm:w-4 sm:h-4 mt-1 rounded border-border text-gold focus:ring-gold"
            {...register("terms")}
          />
          <label htmlFor="terms" className="ml-1.5 sm:ml-2 text-[10px] sm:text-sm text-muted-foreground">
            I agree to the{" "}
            <button type="button" className="text-gold hover:text-gold/80">
              Terms of Service
            </button>{" "}
            and{" "}
            <button type="button" className="text-gold hover:text-gold/80">
              Privacy Policy
            </button>
          </label>
        </div>
        {errors.terms && (
          <p className="text-destructive text-xs sm:text-sm">{errors.terms.message}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading || success}
          className="w-full h-10 sm:h-12 bg-gold hover:bg-gold/90 text-black font-semibold text-xs sm:text-sm"
        >
          {isLoading ? (
            <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
          ) : success ? (
            "Redirecting..."
          ) : (
            "Create Free Account"
          )}
        </Button>

        <div className="text-center text-[10px] sm:text-sm text-muted-foreground">
          By creating a free account, you'll get access to exclusive FCPO training videos, eBooks, and community features.
        </div>
      </form>
    </div>
  );
}