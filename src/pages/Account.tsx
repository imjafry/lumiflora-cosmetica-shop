
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  User, Package, ShoppingBag, Heart, 
  LogOut, ChevronRight, Settings, UserCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";
import ProfileForm from "@/components/profile/ProfileForm";
import OrderHistoryList from "@/components/orders/OrderHistoryList";
import AuthDialog from "@/components/auth/AuthDialog";

const Account = () => {
  const { user, profile, signOut } = useAuth();
  const navigate = useNavigate();
  const [authDialogOpen, setAuthDialogOpen] = useState(!user);
  const [activeTab, setActiveTab] = useState("orders");

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  if (!user) {
    return (
      <motion.div
        className="container mx-auto px-4 py-8 md:py-16"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Account</h1>
          <p className="mb-6">Please sign in or create an account to continue</p>
          <Button onClick={() => setAuthDialogOpen(true)}>Sign In / Register</Button>
          <AuthDialog 
            open={authDialogOpen}
            onOpenChange={setAuthDialogOpen}
          />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 py-8 md:py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold mb-8">My Account</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Account Sidebar */}
        <div className="md:col-span-1">
          <Card className="border p-6">
            <div className="flex items-center space-x-4 mb-6">
              <UserCircle className="h-10 w-10" />
              <div>
                <h2 className="text-lg font-medium">{profile?.full_name || user.email}</h2>
                <p className="text-sm text-muted-foreground">
                  Member since {new Date(user.created_at).toLocaleDateString()}
                </p>
              </div>
            </div>

            <nav className="grid gap-2">
              <Button 
                variant={activeTab === "orders" ? "default" : "ghost"} 
                className="justify-start"
                onClick={() => handleTabClick("orders")}
              >
                <Package className="mr-2 h-4 w-4" />
                My Orders
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button 
                variant={activeTab === "profile" ? "default" : "ghost"} 
                className="justify-start"
                onClick={() => handleTabClick("profile")}
              >
                <User className="mr-2 h-4 w-4" />
                My Profile
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button 
                variant={activeTab === "wishlist" ? "default" : "ghost"} 
                className="justify-start"
                onClick={() => handleTabClick("wishlist")}
              >
                <Heart className="mr-2 h-4 w-4" />
                Wishlist
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
              <Button 
                variant={activeTab === "settings" ? "default" : "ghost"} 
                className="justify-start"
                onClick={() => handleTabClick("settings")}
              >
                <Settings className="mr-2 h-4 w-4" />
                Account Settings
                <ChevronRight className="ml-auto h-4 w-4" />
              </Button>
            </nav>

            <div className="border-t mt-6 pt-6">
              <Button 
                variant="ghost" 
                className="justify-start w-full text-destructive hover:text-destructive"
                onClick={handleSignOut}
              >
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </Card>
        </div>

        {/* Account Content */}
        <div className="md:col-span-2">
          <Card className="border">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="w-full grid grid-cols-4">
                <TabsTrigger value="orders">Order History</TabsTrigger>
                <TabsTrigger value="profile">My Profile</TabsTrigger>
                <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                <TabsTrigger value="settings">Settings</TabsTrigger>
              </TabsList>

              <TabsContent value="orders" className="p-6">
                <h2 className="text-lg font-medium mb-4">Order History</h2>
                <OrderHistoryList />
              </TabsContent>

              <TabsContent value="profile" className="p-6">
                <h2 className="text-lg font-medium mb-4">Update Profile</h2>
                <ProfileForm />
              </TabsContent>

              <TabsContent value="wishlist" className="p-6">
                <h2 className="text-lg font-medium mb-4">My Wishlist</h2>
                <p className="text-muted-foreground">Your wishlist is currently empty.</p>
              </TabsContent>

              <TabsContent value="settings" className="p-6">
                <h2 className="text-lg font-medium mb-4">Account Settings</h2>
                <div className="space-y-4">
                  <div className="grid gap-2">
                    <h3 className="text-md font-medium">Email Preferences</h3>
                    <p className="text-sm text-muted-foreground">Manage your email notification settings</p>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="text-md font-medium">Password</h3>
                    <p className="text-sm text-muted-foreground">Change your password</p>
                    <Button variant="outline" className="w-full sm:w-auto">Change Password</Button>
                  </div>
                  <div className="grid gap-2">
                    <h3 className="text-md font-medium">Delete Account</h3>
                    <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
                    <Button variant="destructive" className="w-full sm:w-auto">Delete Account</Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </motion.div>
  );
};

export default Account;
