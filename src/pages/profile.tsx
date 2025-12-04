
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/contexts/AuthContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
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
  X
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export default function ProfilePage() {
  const { user, profile, loading, logout } = useAuth();
  const router = useRouter();
  const { toast } = useToast();
  
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (profile?.full_name) {
      setFullName(profile.full_name);
    }
  }, [profile]);

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setSaving(true);
      const { error } = await supabase
        .from("profiles")
        .update({ full_name: fullName })
        .eq("id", user.id);

      if (error) throw error;

      toast({
        title: "Profile Updated",
        description: "Your profile has been updated successfully.",
      });
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setSaving(false);
    }
  };

  const handleLogout = async () => {
    await logout();
    router.push("/");
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

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user || !profile) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-950 via-gray-900 to-black">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        {/* Profile Header */}
        <div className="max-w-5xl mx-auto">
          <Card className="bg-gray-900/50 border-gray-800 backdrop-blur-sm mb-8">
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                {/* Avatar */}
                <Avatar className="w-24 h-24 border-4 border-yellow-500/20">
                  <AvatarImage src={profile.avatar_url || ""} alt={profile.full_name || ""} />
                  <AvatarFallback className="bg-gradient-to-br from-yellow-500 to-yellow-600 text-black text-2xl font-bold">
                    {getInitials(profile.full_name || profile.email || "")}
                  </AvatarFallback>
                </Avatar>

                {/* User Info */}
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 mb-2">
                    <h1 className="text-3xl font-bold text-white">
                      {profile.full_name || "User"}
                    </h1>
                    <Badge 
                      className={
                        profile.is_premium
                          ? "bg-gradient-to-r from-yellow-500 to-yellow-600 text-black hover:from-yellow-600 hover:to-yellow-700"
                          : "bg-gray-700 text-gray-300"
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
                  
                  <div className="flex flex-col sm:flex-row gap-4 text-gray-400 text-sm">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4" />
                      {profile.email}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      Member since {formatDate(profile.created_at)}
                    </div>
                  </div>
                </div>

                {/* Logout Button */}
                <Button
                  variant="outline"
                  onClick={handleLogout}
                  className="border-gray-700 hover:bg-gray-800 hover:text-white"
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tabs Section */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-900/50 border border-gray-800 p-1">
              <TabsTrigger value="overview" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <User className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="settings" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <Settings className="w-4 h-4 mr-2" />
                Settings
              </TabsTrigger>
              <TabsTrigger value="membership" className="data-[state=active]:bg-yellow-500 data-[state=active]:text-black">
                <Crown className="w-4 h-4 mr-2" />
                Membership
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Quick Stats */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Stats</CardTitle>
                    <CardDescription>Your activity summary</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Video className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-300">Videos Watched</span>
                      </div>
                      <span className="text-white font-bold">0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <Download className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-300">Downloads</span>
                      </div>
                      <span className="text-white font-bold">0</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <BookOpen className="w-5 h-5 text-yellow-500" />
                        <span className="text-gray-300">Courses Started</span>
                      </div>
                      <span className="text-white font-bold">0</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card className="bg-gray-900/50 border-gray-800">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                    <CardDescription>Access your resources</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button 
                      className="w-full justify-start bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black"
                      onClick={() => router.push("/videos")}
                    >
                      <Video className="w-4 h-4 mr-2" />
                      Watch Training Videos
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start border-gray-700 hover:bg-gray-800 hover:text-white"
                      onClick={() => router.push("/downloads")}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download eBooks
                    </Button>
                    <Button 
                      variant="outline"
                      className="w-full justify-start border-gray-700 hover:bg-gray-800 hover:text-white"
                      onClick={() => window.open("https://t.me/maxsaham", "_blank")}
                    >
                      <TrendingUp className="w-4 h-4 mr-2" />
                      Join Telegram Community
                    </Button>
                  </CardContent>
                </Card>
              </div>

              {/* Membership Status */}
              {!profile.is_premium && (
                <Card className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 border-yellow-500/20">
                  <CardContent className="p-6">
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                      <Crown className="w-12 h-12 text-yellow-500" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-1">
                          Upgrade to Premium
                        </h3>
                        <p className="text-gray-400">
                          Unlock all training videos, eBooks, premium Telegram group, and exclusive content.
                        </p>
                      </div>
                      <Button className="bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black whitespace-nowrap">
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
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Profile Settings</CardTitle>
                  <CardDescription>Manage your personal information</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-gray-300">Full Name</Label>
                    <div className="flex gap-2">
                      <Input
                        id="fullName"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        disabled={!isEditing}
                        className="bg-gray-800 border-gray-700 text-white disabled:opacity-50"
                      />
                      {!isEditing ? (
                        <Button
                          onClick={() => setIsEditing(true)}
                          variant="outline"
                          className="border-gray-700 hover:bg-gray-800"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                      ) : (
                        <>
                          <Button
                            onClick={handleSaveProfile}
                            disabled={saving}
                            className="bg-green-600 hover:bg-green-700"
                          >
                            <Check className="w-4 h-4" />
                          </Button>
                          <Button
                            onClick={() => {
                              setIsEditing(false);
                              setFullName(profile.full_name || "");
                            }}
                            variant="outline"
                            className="border-gray-700 hover:bg-gray-800"
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                    </div>
                  </div>

                  <Separator className="bg-gray-800" />

                  {/* Email (Read-only) */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-gray-300">Email</Label>
                    <Input
                      id="email"
                      value={profile.email || ""}
                      disabled
                      className="bg-gray-800 border-gray-700 text-white opacity-50 cursor-not-allowed"
                    />
                    <p className="text-sm text-gray-500">
                      Email cannot be changed. Contact support if you need to update your email.
                    </p>
                  </div>

                  <Separator className="bg-gray-800" />

                  {/* Account Status */}
                  <div className="space-y-2">
                    <Label className="text-gray-300">Account Status</Label>
                    <div className="flex items-center gap-2">
                      <Shield className="w-5 h-5 text-green-500" />
                      <span className="text-white">Active & Verified</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Membership Tab */}
            <TabsContent value="membership" className="space-y-6">
              <Card className="bg-gray-900/50 border-gray-800">
                <CardHeader>
                  <CardTitle className="text-white">Membership Status</CardTitle>
                  <CardDescription>
                    {profile.is_premium ? "You are a Premium Member" : "Upgrade to unlock all features"}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {profile.is_premium ? (
                    <div className="space-y-4">
                      <div className="p-6 bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 rounded-lg border border-yellow-500/30">
                        <div className="flex items-center gap-3 mb-4">
                          <Crown className="w-8 h-8 text-yellow-500" />
                          <div>
                            <h3 className="text-xl font-bold text-white">Premium Member</h3>
                            <p className="text-gray-400">Full access to all resources</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-300">
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
                        className="w-full border-gray-700 hover:bg-gray-800"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Manage Subscription
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="p-6 bg-gray-800/50 rounded-lg">
                        <h3 className="text-lg font-bold text-white mb-2">Free Member</h3>
                        <p className="text-gray-400 mb-4">
                          You currently have access to basic features.
                        </p>
                        <div className="space-y-2 text-sm text-gray-400">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-gray-500" />
                            Limited video access
                          </div>
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-gray-500" />
                            No downloadable eBooks
                          </div>
                          <div className="flex items-center gap-2">
                            <X className="w-4 h-4 text-gray-500" />
                            No premium Telegram group
                          </div>
                        </div>
                      </div>

                      <div className="p-6 bg-gradient-to-br from-yellow-500/10 to-yellow-600/10 rounded-lg border border-yellow-500/20">
                        <div className="flex items-center gap-3 mb-4">
                          <Crown className="w-8 h-8 text-yellow-500" />
                          <div>
                            <h3 className="text-xl font-bold text-white">Upgrade to Premium</h3>
                            <p className="text-gray-400">Unlock all features and content</p>
                          </div>
                        </div>
                        <div className="space-y-2 text-sm text-gray-300 mb-6">
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-yellow-500" />
                            Complete video library (20+ hours)
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-yellow-500" />
                            All eBooks and guides
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-yellow-500" />
                            Exclusive Telegram community
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-yellow-500" />
                            Monthly live Zoom sessions
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-yellow-500" />
                            Technical analysis notes
                          </div>
                          <div className="flex items-center gap-2">
                            <Check className="w-4 h-4 text-yellow-500" />
                            Priority support
                          </div>
                        </div>
                        <Button className="w-full bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-600 hover:to-yellow-700 text-black">
                          <Crown className="w-4 h-4 mr-2" />
                          Upgrade for RM999/year
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
