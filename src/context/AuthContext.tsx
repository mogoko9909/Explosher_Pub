import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const STORAGE_KEY = 'explosher.auth.session';

type AuthState = {
  isLoading: boolean;
  isAuthenticated: boolean;
  email: string | null;
};

type AuthContextValue = AuthState & {
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

// Mock, on-device-only auth: accepts any non-empty email/password and
// persists a session flag locally. There is no server verifying identity
// or paying-user status yet — swap this for a real backend (e.g. Firebase
// Auth) before relying on it to gate paid content.
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({ isLoading: true, isAuthenticated: false, email: null });

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEY).then((stored) => {
      if (stored) {
        setState({ isLoading: false, isAuthenticated: true, email: stored });
      } else {
        setState({ isLoading: false, isAuthenticated: false, email: null });
      }
    });
  }, []);

  const value = useMemo<AuthContextValue>(
    () => ({
      ...state,
      signIn: async (email: string, _password: string) => {
        await AsyncStorage.setItem(STORAGE_KEY, email);
        setState({ isLoading: false, isAuthenticated: true, email });
      },
      signOut: async () => {
        await AsyncStorage.removeItem(STORAGE_KEY);
        setState({ isLoading: false, isAuthenticated: false, email: null });
      },
    }),
    [state]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within an AuthProvider');
  return ctx;
}
