import React from "react";
import { View } from "react-native";
import { Slot } from "expo-router";
import { AuthProvider, useAuth } from "@/src/contexts/AuthContext";
import { ThemedText } from "@/src/components/ThemedText";
import LoginScreen from "@/src/screens/LoginScreen";

function RootLayoutNav() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ThemedText>Carregando...</ThemedText>
      </View>
    );
  }

  if (!user) {
    return <LoginScreen />;
  }

  return <Slot />;
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <RootLayoutNav />
    </AuthProvider>
  );
}
