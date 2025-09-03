import React, { createContext, useState } from 'react';

interface User {
  email: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function signIn({ email, password }: { email: string; password: string }) {
    setIsLoading(true);
    const mockEmail = email && email.trim() !== "" ? email : "teste@mock.com";
    // Adicionar a logica
    await new Promise(resolve => setTimeout(resolve, 1000));
    setUser({ email: mockEmail });
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