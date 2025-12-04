import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { Loader2, Mail, Lock, Chrome } from "lucide-react";
import { motion } from "framer-motion";

const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface LoginFormProps {
  onSuccess: () => void;
}

export function LoginForm({ onSuccess }: LoginFormProps) {
  const { login, loginWithGoogle, isLoading } = useAuth();
  const [error, setError] = useState<string>("");
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginFormData) => {
    try {
      setError("");
      await login(data.email, data.password);
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      setIsGoogleLoading(true);
      setError("");
      await loginWithGoogle();
      onSuccess();
    } catch (err: any) {
      setError(err.message || "Google sign-in failed. Please try again.");
    } finally {
      setIsGoogleLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Premium Test Account Info */}
      <motion.div
        className="bg-gradient-to-r from-gold/10 to-neon-blue/10 border border-gold/30 rounded-lg p-4"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <div className="w-6 h-6 bg-gold/20 rounded-full flex items-center justify-center">
            <Lock className="w-3 h-3 text-gold" />
          </div>
          <span className="text-sm font-semibold text-gold">Test Premium Access</span>
        </div>
        <div className="text-xs text-muted-foreground space-y-1">
          <p><span className="text-gold">Email:</span> premium@maxsaham.com</p>
          <p><span className="text-gold">Password:</span> premium123</p>
        </div>
      </motion.div>

      <div className="space-y-2">
        <Label htmlFor="email" className="text-foreground">Email Address</Label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            placeholder="your@email.com"
            className="pl-10 bg-background/50 border-border focus:border-gold"
            {...register("email")}
          />
        </div>
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password" className="text-foreground">Password</Label>
        <div className="relative">
          <Lock className="absolute left-3 top-3 w-5 h-5 text-muted-foreground" />
          <Input
            id="password"
            type="password"
            placeholder="••••••••"
            className="pl-10 bg-background/50 border-border focus:border-gold"
            {...register("password")}
          />
        </div>
        {errors.password && (
          <p className="text-sm text-destructive">{errors.password.message}</p>
        )}
      </div>

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
        className="w-full bg-gold hover:bg-gold/90 text-black font-semibold text-lg h-12"
      >
        {isLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Logging in...
          </>
        ) : (
          "Login to Account"
        )}
      </Button>

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>

      <Button
        type="button"
        variant="outline"
        disabled={isLoading || isGoogleLoading}
        onClick={handleGoogleLogin}
        className="w-full border-border hover:bg-background/50 h-12"
      >
        {isGoogleLoading ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Connecting to Google...
          </>
        ) : (
          <>
            <Chrome className="w-5 h-5 mr-2" />
            Sign in with Google
          </>
        )}
      </Button>

      <div className="text-center text-sm text-muted-foreground">
        <button type="button" className="text-gold hover:underline">
          Forgot password?
        </button>
      </div>
    </motion.form>
  );
}
