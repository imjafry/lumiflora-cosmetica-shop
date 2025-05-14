
import React, { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LoginForm from "./LoginForm";
import RegisterForm from "./RegisterForm";

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialTab?: "login" | "register";
}

export default function AuthDialog({ open, onOpenChange, initialTab = "login" }: AuthDialogProps) {
  const [activeTab, setActiveTab] = useState<"login" | "register">(initialTab);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center text-2xl font-bold bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            BeautyCrossAsia
          </DialogTitle>
          <DialogDescription className="text-center">
            Your gateway to premium beauty products
          </DialogDescription>
        </DialogHeader>

        <div className="mt-4">
          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as "login" | "register")}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Login</TabsTrigger>
              <TabsTrigger value="register">Register</TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-4">
              <LoginForm onSuccess={() => onOpenChange(false)} />
            </TabsContent>
            <TabsContent value="register" className="mt-4">
              <RegisterForm onSuccess={() => setActiveTab("login")} />
            </TabsContent>
          </Tabs>
        </div>
      </DialogContent>
    </Dialog>
  );
}
