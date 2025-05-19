import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import LoginForm from "@/components/auth/LoginForm";
import { motion } from "framer-motion";

const Login = () => {
  const { user, isAdmin } = useAuth();
  const navigate = useNavigate();

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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md bg-white/90 dark:bg-gray-900/90 rounded-2xl shadow-xl p-8 flex flex-col items-center border border-pink-200 dark:border-gray-800"
      >
        <div className="mb-6 text-center">
          <h1 className="text-3xl font-extrabold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent mb-2 tracking-tight">BeautyCrossAsia</h1>
          <p className="text-muted-foreground text-sm">Sign in to your account to continue</p>
        </div>
        <LoginForm onSuccess={() => {
          // After login, redirect handled by useEffect
        }} />
        <div className="mt-6 text-center text-xs text-muted-foreground">
          By signing in, you agree to our <a href="/terms" className="underline hover:text-pink-500">Terms</a> and <a href="/privacy" className="underline hover:text-pink-500">Privacy Policy</a>.
        </div>
      </motion.div>
    </div>
  );
};

export default Login; 