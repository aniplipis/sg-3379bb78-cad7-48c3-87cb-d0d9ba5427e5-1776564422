import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/router";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Search, Crown, User, AlertCircle, CheckCircle, Shield } from "lucide-react";

interface Profile {
  id: string;
  email: string | null;
  full_name: string | null;
  is_premium: boolean;
  is_admin: boolean;
  stripe_customer_id: string | null;
  stripe_subscription_id: string | null;
  created_at: string;
}

export default function MembershipsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [filteredProfiles, setFilteredProfiles] = useState<Profile[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingAdmin, setCheckingAdmin] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [processingUserId, setProcessingUserId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      router.push("/admin/login");
      return;
    }
    checkAdminStatus();
  }, [user, router]);

  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredProfiles(profiles);
    } else {
      const query = searchQuery.toLowerCase();
      const filtered = profiles.filter(
        (profile) =>
          profile.email?.toLowerCase().includes(query) ||
          profile.full_name?.toLowerCase().includes(query) ||
          profile.id.toLowerCase().includes(query)
      );
      setFilteredProfiles(filtered);
    }
  }, [searchQuery, profiles]);

  const checkAdminStatus = async () => {
    try {
      setCheckingAdmin(true);
      
      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("is_admin")
        .eq("id", user?.id)
        .single();

      if (fetchError) throw fetchError;

      if (!data?.is_admin) {
        router.push("/");
        return;
      }

      setIsAdmin(true);
      loadProfiles();
    } catch (err) {
      console.error("Error checking admin status:", err);
      router.push("/");
    } finally {
      setCheckingAdmin(false);
    }
  };

  const loadProfiles = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (fetchError) throw fetchError;

      setProfiles(data || []);
      setFilteredProfiles(data || []);
    } catch (err) {
      console.error("Error loading profiles:", err);
      setError(err instanceof Error ? err.message : "Failed to load profiles");
    } finally {
      setLoading(false);
    }
  };

  const togglePremiumStatus = async (profileId: string, currentStatus: boolean) => {
    try {
      setProcessingUserId(profileId);
      setError(null);
      setSuccess(null);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_premium: !currentStatus })
        .eq("id", profileId);

      if (updateError) throw updateError;

      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId ? { ...p, is_premium: !currentStatus } : p
        )
      );

      setSuccess(
        `Successfully ${!currentStatus ? "upgraded" : "downgraded"} user ${
          !currentStatus ? "to" : "from"
        } premium`
      );

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error updating premium status:", err);
      setError(err instanceof Error ? err.message : "Failed to update premium status");
    } finally {
      setProcessingUserId(null);
    }
  };

  const toggleAdminStatus = async (profileId: string, currentStatus: boolean) => {
    try {
      setProcessingUserId(profileId);
      setError(null);
      setSuccess(null);

      const { error: updateError } = await supabase
        .from("profiles")
        .update({ is_admin: !currentStatus })
        .eq("id", profileId);

      if (updateError) throw updateError;

      setProfiles((prev) =>
        prev.map((p) =>
          p.id === profileId ? { ...p, is_admin: !currentStatus } : p
        )
      );

      setSuccess(
        `Successfully ${!currentStatus ? "granted" : "revoked"} admin access ${
          !currentStatus ? "to" : "from"
        } user`
      );

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      console.error("Error updating admin status:", err);
      setError(err instanceof Error ? err.message : "Failed to update admin status");
    } finally {
      setProcessingUserId(null);
    }
  };

  const stats = {
    total: profiles.length,
    premium: profiles.filter((p) => p.is_premium).length,
    free: profiles.filter((p) => !p.is_premium).length,
    admins: profiles.filter((p) => p.is_admin).length,
    withStripe: profiles.filter((p) => p.stripe_customer_id).length,
  };

  if (!user || checkingAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-slate-900 dark:border-white mb-4"></div>
          <p className="text-slate-600 dark:text-slate-400">Verifying admin access...</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-950 dark:to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-8 h-8 text-red-600" />
            <h1 className="text-4xl font-bold text-slate-900 dark:text-white">
              Admin Dashboard
            </h1>
          </div>
          <p className="text-slate-600 dark:text-slate-400">
            Manage user premium memberships, subscriptions, and admin access
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Total Users</CardDescription>
              <CardTitle className="text-3xl">{stats.total}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <User className="w-4 h-4 mr-2" />
                All registered
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Premium</CardDescription>
              <CardTitle className="text-3xl text-amber-600">{stats.premium}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Crown className="w-4 h-4 mr-2" />
                Active premium
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Free</CardDescription>
              <CardTitle className="text-3xl text-slate-600">{stats.free}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <User className="w-4 h-4 mr-2" />
                Non-premium
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Admins</CardDescription>
              <CardTitle className="text-3xl text-red-600">{stats.admins}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <Shield className="w-4 h-4 mr-2" />
                Admin access
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardDescription>Stripe</CardDescription>
              <CardTitle className="text-3xl text-blue-600">{stats.withStripe}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center text-sm text-slate-600 dark:text-slate-400">
                <CheckCircle className="w-4 h-4 mr-2" />
                Connected
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Alerts */}
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="mb-6 border-green-500 bg-green-50 dark:bg-green-950">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-600 dark:text-green-400">
              {success}
            </AlertDescription>
          </Alert>
        )}

        {/* Search */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Search by email, name, or user ID..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </CardContent>
        </Card>

        {/* Users Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Users</CardTitle>
            <CardDescription>
              {filteredProfiles.length} {filteredProfiles.length === 1 ? "user" : "users"} found
            </CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="text-center py-8">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-slate-900 dark:border-white"></div>
                <p className="mt-2 text-slate-600 dark:text-slate-400">Loading users...</p>
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="text-center py-8 text-slate-600 dark:text-slate-400">
                {searchQuery ? "No users found matching your search." : "No users found."}
              </div>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Email</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Stripe</TableHead>
                      <TableHead>Joined</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProfiles.map((profile) => (
                      <TableRow key={profile.id}>
                        <TableCell className="font-medium">
                          {profile.email || <span className="text-slate-400">No email</span>}
                        </TableCell>
                        <TableCell>
                          {profile.full_name || <span className="text-slate-400">No name</span>}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            {profile.is_admin && (
                              <Badge className="bg-red-500 hover:bg-red-600">
                                <Shield className="w-3 h-3 mr-1" />
                                Admin
                              </Badge>
                            )}
                            {profile.is_premium ? (
                              <Badge className="bg-amber-500 hover:bg-amber-600">
                                <Crown className="w-3 h-3 mr-1" />
                                Premium
                              </Badge>
                            ) : (
                              <Badge variant="outline">Free</Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          {profile.stripe_customer_id ? (
                            <span className="text-xs text-blue-600 dark:text-blue-400 font-mono">
                              {profile.stripe_customer_id.substring(0, 15)}...
                            </span>
                          ) : (
                            <span className="text-slate-400 text-xs">None</span>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-slate-600 dark:text-slate-400">
                          {new Date(profile.created_at).toLocaleDateString()}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex gap-2 justify-end">
                            <Button
                              size="sm"
                              variant={profile.is_premium ? "outline" : "default"}
                              onClick={() => togglePremiumStatus(profile.id, profile.is_premium)}
                              disabled={processingUserId === profile.id}
                              className={
                                profile.is_premium
                                  ? ""
                                  : "bg-amber-500 hover:bg-amber-600 text-white"
                              }
                            >
                              {processingUserId === profile.id ? (
                                <div className="flex items-center">
                                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current mr-2"></div>
                                  ...
                                </div>
                              ) : profile.is_premium ? (
                                "Remove Premium"
                              ) : (
                                "Make Premium"
                              )}
                            </Button>
                            <Button
                              size="sm"
                              variant={profile.is_admin ? "destructive" : "secondary"}
                              onClick={() => toggleAdminStatus(profile.id, profile.is_admin)}
                              disabled={processingUserId === profile.id || profile.id === user?.id}
                            >
                              {profile.is_admin ? "Revoke Admin" : "Make Admin"}
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}