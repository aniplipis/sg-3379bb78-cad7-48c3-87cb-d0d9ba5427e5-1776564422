import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, User, Mail, Lock, Chrome, Phone, TrendingUp } from "lucide-react";
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
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
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

    try {
      await registerUser(data.name, data.email, data.password, data.phone, data.tradingview_username);

      // Send welcome email
      await sendWelcomeEmail(data.email, data.name);

      toast({
        title: "Registration successful!",
        description: "Please check your email to verify your account. We've also sent you a welcome email!",
      });

      setSuccess(true);
      setTimeout(() => {
        onSuccess();
      }, 2000);
    } catch (err: any) {
      // Check for specific Supabase error messages
      if (err.message?.includes('already registered') || err.message?.includes('User already registered')) {
        toast({
          title: "Account already exists",
          description: "Please sign in instead or reset your password.",
          variant: "destructive",
        });
        setError("Account already exists. Please login instead.");
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
    <div className="space-y-6">
      {/* Google Sign-Up Button */}
      <Button
        type="button"
        onClick={handleGoogleSignUp}
        disabled={isLoading}
        className="w-full h-12 bg-white hover:bg-gray-50 text-gray-900 border border-gray-300 font-semibold relative overflow-hidden group"
      >
        {isLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : (
          <>
            <Chrome className="w-5 h-5 mr-3 text-blue-600" />
            <span>Sign up with Google</span>
          </>
        )}
      </Button>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-card text-muted-foreground">Or register with email</span>
        </div>
      </div>

      {error && (
        <div className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {success && (
        <div className="bg-green-500/10 border border-green-500/30 text-green-500 px-4 py-3 rounded-lg text-sm">
          <div className="font-semibold mb-1">Account created successfully! 🎉</div>
          <div className="text-xs">Please check your email to confirm your account. You'll be redirected shortly...</div>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <Label htmlFor="name" className="text-foreground/90">Full Name</Label>
          <div className="relative mt-1.5">
            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="name"
              type="text"
              placeholder="Muhammad Haniff"
              className="pl-10 h-12 bg-background border-border focus:border-gold"
              {...register("name")}
            />
          </div>
          {errors.name && (
            <p className="text-destructive text-sm mt-1">{errors.name.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="email" className="text-foreground/90">Email Address</Label>
          <div className="relative mt-1.5">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="email"
              type="email"
              placeholder="you@example.com"
              className="pl-10 h-12 bg-background border-border focus:border-gold"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="text-destructive text-sm mt-1">{errors.email.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="phone" className="text-foreground/90">Phone Number</Label>
          <div className="relative mt-1.5">
            <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="phone"
              type="tel"
              placeholder="+60123456789"
              className="pl-10 h-12 bg-background border-border focus:border-gold"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="text-destructive text-sm mt-1">{errors.phone.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="tradingview_username" className="text-foreground/90">
            TradingView Username <span className="text-muted-foreground text-xs">(Optional)</span>
          </Label>
          <div className="relative mt-1.5">
            <TrendingUp className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="tradingview_username"
              type="text"
              placeholder="your_tradingview_username"
              className="pl-10 h-12 bg-background border-border focus:border-gold"
              {...register("tradingview_username")}
            />
          </div>
          {errors.tradingview_username && (
            <p className="text-destructive text-sm mt-1">{errors.tradingview_username.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="password" className="text-foreground/90">Password</Label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-12 bg-background border-border focus:border-gold"
              {...register("password")}
            />
          </div>
          {errors.password && (
            <p className="text-destructive text-sm mt-1">{errors.password.message}</p>
          )}
        </div>

        <div>
          <Label htmlFor="confirmPassword" className="text-foreground/90">Confirm Password</Label>
          <div className="relative mt-1.5">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              id="confirmPassword"
              type="password"
              placeholder="••••••••"
              className="pl-10 h-12 bg-background border-border focus:border-gold"
              {...register("confirmPassword")}
            />
          </div>
          {errors.confirmPassword && (
            <p className="text-destructive text-sm mt-1">{errors.confirmPassword.message}</p>
          )}
        </div>

        <div className="flex items-start">
          <input
            type="checkbox"
            id="terms"
            className="w-4 h-4 mt-1 rounded border-border text-gold focus:ring-gold"
            {...register("terms")}
          />
          <label htmlFor="terms" className="ml-2 text-sm text-muted-foreground">
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
          <p className="text-destructive text-sm">{errors.terms.message}</p>
        )}

        <Button
          type="submit"
          disabled={isLoading || success}
          className="w-full h-12 bg-gold hover:bg-gold/90 text-black font-semibold"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : success ? (
            "Redirecting..."
          ) : (
            "Create Free Account"
          )}
        </Button>

        <div className="text-center text-sm text-muted-foreground">
          By creating a free account, you'll get access to exclusive FCPO training videos, eBooks, and community features.
        </div>
      </form>
    </div>
  );
}