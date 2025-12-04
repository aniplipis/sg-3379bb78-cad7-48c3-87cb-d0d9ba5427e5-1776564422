import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, User, Mail, Lock, Chrome } from "lucide-react";
import { motion } from "framer-motion";

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  confirmPassword: z.string(),
  terms: z.boolean().refine(val => val === true, "You must accept the terms"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegisterFormData = z.infer<typeof registerSchema>;

interface RegisterFormProps {
  onSuccess: () => void;
}

export function RegisterForm({ onSuccess }: RegisterFormProps) {
  const { register: registerUser, loginWithGoogle, isLoading } = useAuth();
  const [error, setError] = useState<string>("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      terms: false,
    },
  });

  const termsAccepted = watch("terms");

  const onSubmit = async (data: RegisterFormData) => {
    try {
      setError("");
      await registerUser(data.name, data.email, data.password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Registration failed. Please try again.");
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      setIsGoogleLoading(true);
      setError("");
      await loginWithGoogle();
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Google sign-up failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Button
        type="button"
        variant="outline"
        disabled={isLoading || isGoogleLoading}
        onClick={handleGoogleSignUp}
        className="w-full border-border hover:bg-background/50 h-12 mb-2"
      >
        {isGoogleLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Connecting to Google...
          </>
        ) : (
          <>
            <Chrome className="w-5 h-5 mr-2" />
            Sign up with Google
          </>
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or register with email</span>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name" className="text-foreground">Full Name</Label>
        <div className="relative">
          <User className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            placeholder="Muhammad Ali"
            className="pl-10 bg-background/50 border-border focus:border-neon-blue"
            {...register("name")}
          />
        </div>
        {errors.name && (
          <p className="text-sm text-destructive">{errors.name.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-email" className="text-foreground">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="register-email"
            type="email"
            placeholder="your@email.com"
            className="pl-10 bg-background/50 border-border focus:border-neon-blue"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="register-password" className="text-foreground">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="register-password"
            type="password"
            placeholder="••••••••"
            className="pl-10 bg-background/50 border-border focus:border-neon-blue"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="confirmPassword" className="text-foreground">Confirm Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="confirmPassword"
            type="password"
            placeholder="••••••••"
            className="pl-10 bg-background/50 border-border focus:border-neon-blue"
            {...register("confirmPassword")}
          />
        </div>
        {errors.confirmPassword && (
          <p className="text-sm text-destructive">{errors.confirmPassword.message}</p>
        )}
      </div>

      <div className="flex items-start space-x-3 pt-2">
        <Checkbox
          id="terms"
          checked={termsAccepted}
          onCheckedChange={(checked) => setValue("terms", checked as boolean)}
          className="mt-1"
        />
        <label
          htmlFor="terms"
          className="text-sm text-muted-foreground leading-relaxed cursor-pointer"
        >
          I agree to the{" "}
          <button type="button" className="text-gold hover:underline">
            Terms of Service
          </button>{" "}
          and{" "}
          <button type="button" className="text-gold hover:underline">
            Privacy Policy
          </button>
        </label>
      </div>
      {errors.terms && (
        <p className="text-sm text-destructive">{errors.terms.message}</p>
      )}

      {error && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-destructive/10 border border-destructive/30 text-destructive px-4 py-3 rounded-lg text-sm"
        >
          {error}
        </motion.div>
      )}

      <Button
        type="submit"
        disabled={isLoading || isGoogleLoading}
        className="w-full bg-neon-blue hover:bg-neon-blue/90 text-black font-semibold text-lg h-12"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Creating account...
          </>
        ) : (
          "Create Free Account"
        )}
      </Button>

      <p className="text-xs text-center text-muted-foreground">
        By registering, you'll get instant access to free FCPO trading resources
      </p>
    </motion.form>
  );
}
