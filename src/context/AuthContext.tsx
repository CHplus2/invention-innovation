import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { User, Session } from '@supabase/supabase-js';

interface AuthContextType {
  user: User | { email: string; id: string; role: string } | null;
  session: Session | null;
  isAdmin: boolean;
  isLoading: boolean;
  isSupabaseConfigured: boolean;
  signInWithPassword: (email: string, pass: string) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  loginAsDevAdmin: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | { email: string; id: string; role: string } | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    // Check local fallback admin session first
    const localAdmin = localStorage.getItem('icats_admin_session');
    if (localAdmin === 'active') {
      setUser({ email: 'admin@icats.edu.my', id: 'dev-admin-id', role: 'club_admin' });
      setIsAdmin(true);
      setIsLoading(false);
    }

    if (isSupabaseConfigured && supabase) {
      supabase.auth.getSession().then(({ data: { session: initialSession } }) => {
        setSession(initialSession);
        if (initialSession?.user) {
          setUser(initialSession.user);
          setIsAdmin(true);
        }
        setIsLoading(false);
      });

      const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, currentSession) => {
        setSession(currentSession);
        if (currentSession?.user) {
          setUser(currentSession.user);
          setIsAdmin(true);
        } else if (localStorage.getItem('icats_admin_session') !== 'active') {
          setUser(null);
          setIsAdmin(false);
        }
      });

      return () => {
        subscription.unsubscribe();
      };
    } else {
      setIsLoading(false);
    }
  }, []);

  const signInWithPassword = async (email: string, pass: string) => {
    if (isSupabaseConfigured && supabase) {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password: pass
      });
      if (error) return { error };
      if (data.user) {
        setUser(data.user);
        setIsAdmin(true);
      }
      return { error: null };
    } else {
      // Dev mode admin authentication
      if (email.trim() && pass.trim()) {
        localStorage.setItem('icats_admin_session', 'active');
        setUser({ email, id: 'dev-admin-id', role: 'club_admin' });
        setIsAdmin(true);
        return { error: null };
      }
      return { error: new Error('Please provide valid credentials') };
    }
  };

  const signOut = async () => {
    if (isSupabaseConfigured && supabase) {
      await supabase.auth.signOut();
    }
    localStorage.removeItem('icats_admin_session');
    setUser(null);
    setSession(null);
    setIsAdmin(false);
  };

  const loginAsDevAdmin = () => {
    localStorage.setItem('icats_admin_session', 'active');
    setUser({ email: 'admin@icats.edu.my', id: 'dev-admin-id', role: 'club_admin' });
    setIsAdmin(true);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isAdmin,
        isLoading,
        isSupabaseConfigured,
        signInWithPassword,
        signOut,
        loginAsDevAdmin
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
