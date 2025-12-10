import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import { Navigation } from "@/components/Navigation";
import { Footer } from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  User,
  Crown,
  Mail,
  Calendar,
  Settings,
  CreditCard,
  BookOpen,
  Video,
  Download,
  TrendingUp,
  Shield,
  LogOut,
  Edit2,
  Check,
  X,
  Upload,
  Camera,
  Lock,
  Eye,
  EyeOff
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, profile, isLoading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  // Profile editing states
  const [isEditingName, setIsEditingName] = useState(false);
  const [fullName, setFullName] = useState("");
  const [savingName, setSavingName] = useState(false);

  // Password change states
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    newPassword: "",
    confirmPassword: ""
  });
  const [showPasswords, setShowPasswords] = useState({
    new: false,
    confirm: false
  });
  const [savingPassword, setSavingPassword] = useState(false);

  // Avatar upload state
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/");
    }
  }, [user, isLoading, router]);

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
    if (profile?.avatar_url) {
      setAvatarUrl(profile.avatar_url);
    }
  }, [profile]);

  const handleSaveName = async () => {
    if (!user || !fullName.trim()) return;

    try {
      setSavingName(true);
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName.trim() })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "✅ Profile Updated",
        description: "Your name has been updated successfully.",
      });
      setIsEditingName(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "❌ Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingName(false);
    }
  };

  const handlePasswordChange = async () => {
    if (!user) return;

    // Validation
    if (passwordData.newPassword.length < 6) {
      toast({
        title: "❌ Password Too Short",
        description: "Password must be at least 6 characters long.",
        variant: "destructive",
      });
      return;
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "❌ Passwords Don't Match",
        description: "Please make sure both passwords match.",
        variant: "destructive",
      });
      return;
    }

    try {
      setSavingPassword(true);
      const { error } = await supabase.auth.updateUser({
        password: passwordData.newPassword
      });

      if (error) throw error;

      toast({
        title: "✅ Password Updated",
        description: "Your password has been changed successfully.",
      });

      // Reset form
      setPasswordData({ newPassword: "", confirmPassword: "" });
      setIsChangingPassword(false);
    } catch (error: any) {
      console.error("Error updating password:", error);
      toast({
        title: "❌ Error",
        description: error.message || "Failed to update password. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSavingPassword(false);
    }
  };

  const handleAvatarUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!user || !event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];
    
    // Validate file type
    if (!file.type.startsWith("image/")) {
      toast({
        title: "❌ Invalid File Type",
        description: "Please upload an image file (JPG, PNG, GIF).",
        variant: "destructive",
      });
      return;
    }

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: "❌ File Too Large",
        description: "Please upload an image smaller than 2MB.",
        variant: "destructive",
      });
      return;
    }

    try {
      setUploadingAvatar(true);

      // Generate unique file name
      const fileExt = file.name.split(".").pop();
      const fileName = `${user.id}-${Date.now()}.${fileExt}`;
      const filePath = `avatars/${fileName}`;

      // Upload to Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file, { upsert: true });

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(filePath);

      // Update profile with new avatar URL
      const { error: updateError } = await supabase
        .from("profiles")
        .update({ avatar_url: urlData.publicUrl })
        .eq("id", user.id);

      if (updateError) throw updateError;

      // Update local state immediately
      setAvatarUrl(urlData.publicUrl);

      toast({
        title: "✅ Avatar Updated",
        description: "Your profile picture has been updated successfully.",
      });
    } catch (error: any) {
      console.error("Error uploading avatar:", error);
      toast({
        title: "❌ Upload Failed",
        description: "Failed to upload avatar. Please try again.",
        variant: "destructive",
      });
    } finally {
      setUploadingAvatar(false);
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  const getInitials = (name: string) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map(n => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric"
    });
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        {/* Profile Header */}
        <div className="max-w-5xl mx-auto">
          <Card className="bg-card border-border/50 backdrop-blur mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar with Upload */}
                <div className="relative group">
                  <Avatar className="w-24 h-24 border-4 border-gold/20">
                    <AvatarImage src={avatarUrl || ""} alt={profile.full_name || ""} />
                    <AvatarFallback className="bg-gradient-to-br from-gold to-yellow-600 text-black text-2xl font-bold">
                      {getInitials(profile.full_name || profile.email || "")}
                    </AvatarFallback>
                  </Avatar>
                  <label 
                    htmlFor="avatar-upload" 
                    className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                  >
                    <Camera className="w-6 h-6 text-white" />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarUpload}
                      disabled={uploadingAvatar}
                    />
                  </label>
                  {uploadingAvatar && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full">
                      <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    </div>
                  )}
                </div>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold">
                      {profile.full_name || "User"}
                    </h1>
                    <Badge 
                      className={
                        profile.is_premium
                          ? "bg-gradient-to-r from-gold to-yellow-600 text-black hover:from-gold/90 hover:to-yellow-600/90"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {profile.is_premium ? (
                        <>
                          <Crown className="w-3 h-3 mr-1" />
                          Premium Member
                        </>
                      ) : (
                        "Free Member"
                      )}
                    </Badge>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-muted-foreground text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Member since {formatDate(profile.created_at)}
                    </div>
                    {profile.is_premium && profile.subscription_end_date && (
                      <div className="flex items-center gap-2 text-gold">
                        <Calendar className="w-4 h-4" />
                        Renews {formatDate(profile.subscription_end_date)}
                      </div>
                    )}
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-border hover:bg-muted"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-card border border-border/50 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                <User className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="membership" className="data-[state=active]:bg-gold data-[state=active]:text-black">
                <Crown className="w-4 h-4 mr-2" />
                Membership
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Quick Stats</CardTitle>
                    <CardDescription>Your activity summary</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-gold" />
                        <span>Videos Watched</span>
                      </div>
                      <span className="font-bold">0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-gold" />
                        <span>Downloads</span>
                      </div>
                      <span className="font-bold">0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-gold" />
                        <span>Courses Started</span>
                      </div>
                      <span className="font-bold">0</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-card border-border/50">
                  <CardHeader>
                    <CardTitle>Quick Actions</CardTitle>
                    <CardDescription>Access your resources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {profile.is_premium ? (
                      <>
                        <Button 
                          className="w-full justify-start bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-600/90 text-black"
                          onClick={() => router.push("/members/videos")}
                        >
                          <Video className="w-4 h-4 mr-2" />
                          Watch Training Videos
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full justify-start border-border hover:bg-muted"
                          onClick={() => router.push("/members/downloads")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Download eBooks
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full justify-start border-border hover:bg-muted"
                          onClick={() => router.push("/members")}
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          Premium Dashboard
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          className="w-full justify-start bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-600/90 text-black"
                          onClick={() => router.push("/#membership")}
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade to Premium
                        </Button>
                        <Button 
                          variant="outline"
                          className="w-full justify-start border-border hover:bg-muted"
                          onClick={() => window.open("https://t.me/maxsaham", "_blank")}
                        >
                          <TrendingUp className="w-4 h-4 mr-2" />
                          Join Free Telegram Channel
                        </Button>
                      </>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Membership Status */}
              {!profile.is_premium && (
                <Card className="bg-gradient-to-br from-gold/10 to-yellow-600/10 border-gold/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <Crown className="w-12 h-12 text-gold" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-1">
                          Upgrade to Premium
                        </h3>
                        <p className="text-muted-foreground">
                          Unlock all training videos, eBooks, premium Telegram group, and exclusive content.
                        </p>
                      </div>
                      <Button 
                        className="bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-600/90 text-black whitespace-nowrap"
                        onClick={() => router.push("/#membership")}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Upgrade Now
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            {/* Settings Tab */}
            <TabsContent value="settings" className="space-y-6">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle>Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={!isEditingName}
                        className="bg-background border-border disabled:opacity-50"
                      />
                      {!isEditingName ? (
                        <Button
                          onClick={() => setIsEditingName(true)}
                          variant="outline"
                          className="border-border hover:bg-muted"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={handleSaveName}
                            disabled={savingName || !fullName.trim()}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {savingName ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                              <Check className="w-4 h-4" />
                            )}
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditingName(false);
                              setFullName(profile.full_name || "");
                            }}
                            variant="outline"
                            className="border-border hover:bg-muted"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator className="bg-border" />

                  {/* Email (Read-only) */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={profile.email || ""}
                      disabled
                      className="bg-muted border-border opacity-50 cursor-not-allowed"
                    />
                    <p className="text-sm text-muted-foreground">
                      Email cannot be changed. Contact support if you need to update your email.
                    </p>
                  </div>

                  <Separator className="bg-border" />

                  {/* Password Change Section */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label>Password</Label>
                        <p className="text-sm text-muted-foreground">Update your password</p>
                      </div>
                      {!isChangingPassword && (
                        <Button
                          onClick={() => setIsChangingPassword(true)}
                          variant="outline"
                          className="border-border hover:bg-muted"
                        >
                          <Lock className="w-4 h-4 mr-2" />
                          Change Password
                        </Button>
                      )}
                    </div>

                    {isChangingPassword && (
                      <div className="space-y-4 p-4 bg-muted/50 rounded-lg border border-border">
                        <div className="space-y-2">
                          <Label htmlFor="newPassword">New Password</Label>
                          <div className="relative">
                            <Input
                              id="newPassword"
                              type={showPasswords.new ? "text" : "password"}
                              value={passwordData.newPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, newPassword: e.target.value }))}
                              placeholder="Enter new password (min 6 characters)"
                              className="bg-background border-border pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, new: !prev.new }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPasswords.new ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="confirmPassword">Confirm New Password</Label>
                          <div className="relative">
                            <Input
                              id="confirmPassword"
                              type={showPasswords.confirm ? "text" : "password"}
                              value={passwordData.confirmPassword}
                              onChange={(e) => setPasswordData(prev => ({ ...prev, confirmPassword: e.target.value }))}
                              placeholder="Confirm new password"
                              className="bg-background border-border pr-10"
                            />
                            <button
                              type="button"
                              onClick={() => setShowPasswords(prev => ({ ...prev, confirm: !prev.confirm }))}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                            >
                              {showPasswords.confirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>

                        <div className="flex gap-2">
                          <Button
                            onClick={handlePasswordChange}
                            disabled={savingPassword || !passwordData.newPassword || !passwordData.confirmPassword}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            {savingPassword ? (
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                            ) : (
                              <Check className="w-4 h-4 mr-2" />
                            )}
                            Save Password
                          </Button>
                          <Button
                            onClick={() => {
                              setIsChangingPassword(false);
                              setPasswordData({ newPassword: "", confirmPassword: "" });
                              setShowPasswords({ new: false, confirm: false });
                            }}
                            variant="outline"
                            className="border-border hover:bg-muted"
                          >
                            <X className="w-4 h-4 mr-2" />
                            Cancel
                          </Button>
                        </div>
                      </div>
                    )}
                  </div>

                  <Separator className="bg-border" />

                  {/* Account Status */}
                  <div className="space-y-2">
                    <Label>Account Status</Label>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span>Active & Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership" className="space-y-6">
              <Card className="bg-card border-border/50">
                <CardHeader>
                  <CardTitle>Membership Status</CardTitle>
                  <CardDescription>
                    {profile.is_premium ? "You are a Premium Member" : "Upgrade to unlock all features"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.is_premium ? (
                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-to-br from-gold/20 to-yellow-600/20 rounded-lg border border-gold/30">
                        <div className="flex items-center gap-3 mb-4">
                          <Crown className="w-8 h-8 text-gold" />
                          <div>
                            <h3 className="text-xl font-bold">Premium Member</h3>
                            <p className="text-muted-foreground">Full access to all resources</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            All training videos
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Downloadable eBooks
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Premium Telegram group
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Live Zoom classes
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-green-500" />
                            Priority support
                          </div>
                        </div>
                      </div>

                      <Button
                        variant="outline"
                        className="w-full border-border hover:bg-muted"
                        onClick={() => router.push("/members")}
                      >
                        <Crown className="w-4 h-4 mr-2" />
                        Go to Premium Dashboard
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-6 bg-muted/50 rounded-lg">
                        <h3 className="text-lg font-bold mb-2">Free Member</h3>
                        <p className="text-muted-foreground mb-4">
                          You currently have access to basic features.
                        </p>
                        <div className="space-y-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-muted-foreground" />
                            Limited video access
                          </div>
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-muted-foreground" />
                            No downloadable eBooks
                          </div>
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-muted-foreground" />
                            No premium Telegram group
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-gold/10 to-yellow-600/10 rounded-lg border border-gold/20">
                        <div className="flex items-center gap-3 mb-4">
                          <Crown className="w-8 h-8 text-gold" />
                          <div>
                            <h3 className="text-xl font-bold">Upgrade to Premium</h3>
                            <p className="text-muted-foreground">Unlock all features and content</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm mb-6">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gold" />
                            Complete video library (20+ hours)
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gold" />
                            All eBooks and guides
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gold" />
                            Exclusive Telegram community
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gold" />
                            Monthly live Zoom sessions
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gold" />
                            Technical analysis notes
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gold" />
                            Priority support
                          </div>
                        </div>
                        <Button 
                          className="w-full bg-gradient-to-r from-gold to-yellow-600 hover:from-gold/90 hover:to-yellow-600/90 text-black"
                          onClick={() => router.push("/#membership")}
                        >
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade for RM1,350
                        </Button>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
}