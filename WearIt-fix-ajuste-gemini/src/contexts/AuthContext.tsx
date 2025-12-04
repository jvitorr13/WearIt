import React, { createContext, useState, useEffect, ReactNode, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { login } from "@/src/services/auth";

interface User {
  id: string;
  name: string;
  email: string;
  token: string;
}

interface AuthContextProps {
  user: User | null;
  isLoading: boolean;      
  isLoadingAuth: boolean; 
  signIn: (data: { email: string; password: string }) => Promise<void>;
  signOut: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);        
  const [isLoadingAuth, setIsLoadingAuth] = useState(false); 

  useEffect(() => {
    const resetUser = async () => {
      try {
        await AsyncStorage.removeItem("wearit.user");
        setUser(null);
      } catch (error) {
        console.error("Erro ao limpar usuário:", error);
      } finally {
        setIsLoading(false);
      }
    };
    resetUser();
  }, []);

const signIn = async ({ email, password }: { email: string; password: string }) => {
  setIsLoadingAuth(true);
  try {
    const data = await login(email, password);

    const loggedUser: User = {
      id: data.user.id,
      name: data.user.name,
      email: data.user.email,
      token: data.token,
    };

    setUser(loggedUser);
    await AsyncStorage.setItem("wearit.user", JSON.stringify(loggedUser));
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "Erro desconhecido";
    console.error("Erro ao fazer login:", message);
    Alert.alert("Erro no login", message);
    throw error;
  } finally {
    setIsLoadingAuth(false);
  }
};


  // Logout
  const signOut = async () => {
    try {
      setUser(null);
      await AsyncStorage.removeItem("wearit.user");
    } catch (error) {
      console.error("Erro ao deslogar:", error);
      Alert.alert("Erro", "Não foi possível deslogar");
    }192
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isLoadingAuth, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar o AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth deve ser usado dentro do AuthProvide");
  return context;
};
