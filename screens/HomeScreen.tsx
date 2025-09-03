import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useAuth } from '@/contexts/AuthContext';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

export default function HomeScreen() {
  const { signOut, user } = useAuth();

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Bem-vindo ao WearIt!</ThemedText>
      
      <ThemedText style={styles.subtitle}>
        Olá, {user?.email}! 👋
      </ThemedText>
      
      <ThemedText style={styles.description}>
        Explore nossa coleção de roupas e encontre o estilo perfeito para você.
      </ThemedText>

      <TouchableOpacity style={styles.logoutButton} onPress={signOut}>
        <ThemedText style={styles.logoutButtonText}>Sair</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  subtitle: {
    fontSize: 18,
    marginTop: 16,
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 40,
  },
  logoutButton: {
    backgroundColor: '#ff6b6b',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
