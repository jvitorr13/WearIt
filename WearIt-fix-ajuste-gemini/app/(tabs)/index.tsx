import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as NavigationBar from "expo-navigation-bar";
import { useEffect } from 'react';

export default function UserInfoScreen() {
useEffect(() => {
      NavigationBar.setVisibilityAsync("hidden");
      NavigationBar.setBehaviorAsync("overlay-swipe");
    }, []);

  const [form, setForm] = useState({
    sobrenome: "",
    cep: "",
    email: "",
    senha: "",
    nascimento: "",
    telefone: "",
    endereco: "",
  });

  function handleChange(field: string, value: string) {
    if (field === "nascimento") {
      value = value.replace(/\D/g, ""); 
      if (value.length > 2) value = value.slice(0, 2) + "/" + value.slice(2);
      if (value.length > 5) value = value.slice(0, 5) + "/" + value.slice(5, 9);
      if (value.length > 10) value = value.slice(0, 10);
    }
    setForm({ ...form, [field]: value });
  }

  async function handleSave() {
    if (
      !form.sobrenome ||
      !form.cep ||
      !form.email ||
      !form.senha ||
      !form.nascimento
    ) 
    try {
      await AsyncStorage.setItem("userInfo", JSON.stringify(form));
      Alert.alert("Sucesso", "Informações salvas!");
    } catch (error) {
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  }

  async function handleShow() {
    try {
      const data = await AsyncStorage.getItem("userInfo");
      if (data) {
        const parsed = JSON.parse(data);
        const message = Object.entries(parsed)
          .map(([key, value]) => `${key}: ${value}`)
          .join("\n");
        Alert.alert("Dados Salvos", message);
      } else {
        Alert.alert("Dados Salvos", "Nenhum dado encontrado.");
      }
    } catch (error) {
      Alert.alert("Erro", "Não foi possível ler os dados.");
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome"
        value={form.sobrenome}
        onChangeText={(v) => handleChange("sobrenome", v)}
        placeholderTextColor={"#635858ff"}
      />

      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={form.sobrenome}
        onChangeText={(v) => handleChange("sobrenome", v)}
        placeholderTextColor={"#635858ff"}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={form.cep}
        onChangeText={(v) => handleChange("cep", v)}
        placeholderTextColor={"#635858ff"}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
        placeholderTextColor={"#635858ff"} 
      />

      <TextInput
        style={styles.input}
        placeholder="Data de nascimento (DD/MM/AAAA)"
        keyboardType="numeric"
        value={form.nascimento}
        onChangeText={(v) => handleChange("nascimento", v)}
        placeholderTextColor={"#635858ff"}

      />
      <TextInput
        style={styles.input}
        placeholder="Telefone"
        keyboardType="phone-pad"
        value={form.telefone}
        onChangeText={(v) => handleChange("telefone", v)}
        placeholderTextColor={"#635858ff"}
      />
      <TextInput
        style={styles.input}
        placeholder="Endereço"
        value={form.endereco}
        onChangeText={(v) => handleChange("endereco", v)}
        placeholderTextColor={"#635858ff"}
      />

      <Button title="Salvar" onPress={handleSave} />
      <View style={{ marginTop: 10 }}>
        <Button title="Ver dados salvos" onPress={handleShow} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 20 },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    borderWidth: 1,
    borderColor: "#635858ff",
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
});
