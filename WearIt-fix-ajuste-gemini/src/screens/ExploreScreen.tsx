import { ThemedText } from '@/src/components/ThemedText';
import { ThemedView } from '@/src/components/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

export default function ExploreScreen() {
  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Explorar</ThemedText>
      <ThemedText style={styles.description}>
        Descubra novos produtos e tendências de moda.
      </ThemedText>
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
  description: {
    marginTop: 16,
    textAlign: 'center',
    fontSize: 16,
    lineHeight: 24,
  },
});
