
import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  updateProfile: (data: { full_name?: string; phone?: string; address?: string; district?: string; postal_code?: string; }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getInitialSession() {
      try {
        setIsLoading(true);
        // Get session data
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Check if user is admin
        if (initialSession?.user) {
          const { data, error } = await supabase.rpc('is_admin', { 
            uid: initialSession.user.id 
          });
          
          if (error) {
            console.error('Error checking admin status:', error);
          } else {
            setIsAdmin(data || false);
          }
        }

        // Set up auth subscription
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);

          // Check admin status when auth state changes
          if (newSession?.user) {
            const { data, error } = await supabase.rpc('is_admin', { 
              uid: newSession.user.id 
            });
            
            if (error) {
              console.error('Error checking admin status:', error);
            } else {
              setIsAdmin(data || false);
            }
          } else {
            setIsAdmin(false);
          }
        });

        return () => {
          authListener.subscription.unsubscribe();
        };
      } catch (error) {
        console.error('Error setting up auth:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getInitialSession();
  }, []);

  async function signUp(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) throw error;
      toast({ 
        title: "Account created successfully!", 
        description: "Please check your email for verification." 
      });
    } catch (error: any) {
      toast({ 
        title: "Error creating account", 
        description: error.message || "An unexpected error occurred", 
        variant: "destructive" 
      });
      throw error;
    }
  }

  async function signIn(email: string, password: string) {
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast({ title: "Welcome back!" });
    } catch (error: any) {
      toast({ 
        title: "Login failed", 
        description: error.message || "Invalid email or password", 
        variant: "destructive" 
      });
      throw error;
    }
  }

  async function signOut() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast({ title: "You have been signed out" });
    } catch (error: any) {
      toast({ 
        title: "Error signing out", 
        description: error.message || "An unexpected error occurred", 
        variant: "destructive" 
      });
    }
  }

  async function updateProfile(data: { full_name?: string; phone?: string; address?: string; district?: string; postal_code?: string; }) {
    try {
      if (!user) throw new Error('User not authenticated');
      
      const { error } = await supabase
        .from('profiles')
        .update(data)
        .eq('id', user.id);
      
      if (error) throw error;
      
      toast({ title: "Profile updated successfully!" });
    } catch (error: any) {
      toast({ 
        title: "Error updating profile", 
        description: error.message || "An unexpected error occurred", 
        variant: "destructive" 
      });
    }
  }

  const value = {
    user,
    session,
    isAdmin,
    isLoading,
    signIn,
    signUp,
    signOut,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
