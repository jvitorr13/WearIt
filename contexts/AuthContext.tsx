import React, { createContext, useContext, useState } from 'react';

interface User {
  email: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn({ email, password }: { email: string; password: string }) {
    setIsLoading(true);
    // Simula autenticação - aqui você adicionaria sua lógica real
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simula delay da API
    setUser({ email });
    setIsLoading(false);
  }

  function signOut() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
