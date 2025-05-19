import React, { createContext, useState, useContext, useEffect } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/components/ui/use-toast';

// Define profile type
interface Profile {
  id: string;
  full_name?: string;
  email: string;
  phone?: string;
  address?: string;
  district?: string;
  postal_code?: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: Profile | null;  // Add this line
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
  const [profile, setProfile] = useState<Profile | null>(null); // Add this line
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Function to fetch user profile
  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching profile:', error);
        return;
      }
      
      if (data) {
        setProfile(data as Profile);
      }
    } catch (error) {
      console.error('Error in fetchProfile:', error);
    }
  };

  useEffect(() => {
    async function getInitialSession() {
      try {
        setIsLoading(true);
        // Get session data
        const { data: { session: initialSession } } = await supabase.auth.getSession();
        setSession(initialSession);
        setUser(initialSession?.user ?? null);

        // Fetch profile if user exists
        if (initialSession?.user) {
          await fetchProfile(initialSession.user.id);
          
          // Check if user is admin
          const { data, error } = await supabase.rpc('is_admin', { 
            uid: initialSession.user.id 
          });
          console.log(data, 'data');
          if(data === true) {
            setIsAdmin(true);
          } else {
            setIsAdmin(false);
          }
        }

        // Set up auth subscription
        const { data: authListener } = supabase.auth.onAuthStateChange(async (event, newSession) => {
          setSession(newSession);
          setUser(newSession?.user ?? null);

          // Handle profile fetch on auth state change
          if (newSession?.user) {
            await fetchProfile(newSession.user.id);
            
            // Check admin status when auth state changes
            const { data, error } = await supabase.rpc('is_admin', { 
              uid: newSession.user.id 
            });
            
            if (error) {
              console.error('Error checking admin status:', error);
            } else {
              setIsAdmin(data || false);
            }
          } else {
            setProfile(null);
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
      const { data, error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;

      // Fetch and set admin status right after login
      if (data?.user) {
        const { data: isAdminData, error: adminError } = await supabase.rpc('is_admin', { uid: data.user.id });
        if (adminError) {
          setIsAdmin(false);
        } else {
          setIsAdmin(isAdminData || false);
        }
      }

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
      
      // Update local profile state after successful update
      if (profile) {
        setProfile({
          ...profile,
          ...data
        });
      }
      
      toast({ title: "Profile updated successfully!" });
    } catch (error: any) {
      toast({ 
        title: "Error updating profile", 
        description: error.message || "An unexpected error occurred", 
        variant: "destructive" 
      });
      throw error;
    }
  }

  const value = {
    user,
    session,
    profile, // Add this line
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
