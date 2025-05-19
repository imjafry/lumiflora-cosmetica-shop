
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { motion } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";
import { ArrowRight, Lock, Mail, User } from "lucide-react";

const Login = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<"login" | "register">("login");

  React.useEffect(() => {
    if (user) {
      if (isAdmin) {
        navigate("/admin", { replace: true });
      } else {
        navigate("/account", { replace: true });
      }
    }
  }, [user, isAdmin, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      {/* Decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-24 w-64 h-64 bg-pink-200 dark:bg-pink-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
        <div className="absolute top-40 -right-24 w-72 h-72 bg-purple-200 dark:bg-purple-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-indigo-200 dark:bg-indigo-900/20 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="w-full max-w-md relative z-10"
      >
        {/* Card container with glass effect */}
        <div className="bg-white/90 dark:bg-gray-900/80 backdrop-blur-lg rounded-2xl shadow-xl overflow-hidden border border-white/20 dark:border-gray-800/50">
          {/* Header with gradient */}
          <div className="p-8 pb-0 text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="relative h-20 mb-4 flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 rounded-full opacity-30 blur-2xl"></div>
              <motion.div
                className="relative z-10 flex flex-col items-center justify-center"
                initial={{ y: 10 }}
                animate={{ y: 0 }}
                transition={{ delay: 0.4, duration: 0.5, type: "spring" }}
              >
                <div className="w-16 h-16 bg-white dark:bg-gray-800 rounded-full flex items-center justify-center shadow-lg mb-3">
                  <div className="text-2xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">BCA</div>
                </div>
              </motion.div>
            </motion.div>
            
            <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2 tracking-tight">BeautyCrossAsia</h1>
            <p className="text-muted-foreground text-sm mb-6">Your gateway to premium beauty products</p>
          </div>

          <div className="p-8 pt-4">
            <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as "login" | "register")} className="w-full">
              <TabsList className="grid grid-cols-2 w-full mb-6">
                <TabsTrigger value="login" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/10 data-[state=active]:via-purple-500/10 data-[state=active]:to-indigo-500/10">
                  <span className="flex items-center">
                    <Lock className="w-4 h-4 mr-2" />
                    Sign In
                  </span>
                </TabsTrigger>
                <TabsTrigger value="register" className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-pink-500/10 data-[state=active]:via-purple-500/10 data-[state=active]:to-indigo-500/10">
                  <span className="flex items-center">
                    <User className="w-4 h-4 mr-2" />
                    Register
                  </span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="login" className="mt-0 space-y-4">
                <div className="space-y-2 text-center mb-6">
                  <h2 className="text-xl font-semibold">Welcome Back!</h2>
                  <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
                </div>
                
                <LoginForm onSuccess={() => {
                  // After login, redirect handled by useEffect
                }} />
              </TabsContent>

              <TabsContent value="register" className="mt-0 space-y-4">
                <div className="space-y-2 text-center mb-6">
                  <h2 className="text-xl font-semibold">Create Account</h2>
                  <p className="text-muted-foreground text-sm">Join BeautyCrossAsia today</p>
                </div>
                
                <RegisterForm onSuccess={() => {
                  setActiveTab("login");
                }} />
              </TabsContent>
            </Tabs>

            <div className="mt-6 text-center text-xs text-muted-foreground">
              By signing in, you agree to our <a href="/terms" className="underline hover:text-pink-500 transition-colors">Terms</a> and <a href="/privacy" className="underline hover:text-pink-500 transition-colors">Privacy Policy</a>.
            </div>
          </div>
        </div>

        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.8 }}
          className="mt-4 text-center"
        >
          <a 
            href="/" 
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            Back to homepage <ArrowRight className="ml-1 h-3 w-3" />
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Login;
