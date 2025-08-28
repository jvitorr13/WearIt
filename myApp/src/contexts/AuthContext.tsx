import React, { createContext, useState } from 'react';

interface AuthContextProps {
  user: any;
  isLoading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn({ email, password }: { email: string; password: string }) {
    setIsLoading(true);
    // Sua lógica de autenticação aqui
//    setUser({ email });
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