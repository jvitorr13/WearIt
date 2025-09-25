import React, { useState } from "react";
import { View, Text, TextInput, Button, StyleSheet, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function UserInfoScreen() {
  const router = useRouter();
  const [form, setForm] = useState({
    sobrenome: "",
    cep: "",
    email: "",
    senha: "",
  });

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSave = async () => {
    if (!form.sobrenome || !form.cep || !form.email || !form.senha) {
      Alert.alert("Preencha todos os campos!");
      return;
    }

    try {
      const userInfo = { ...form };
      await AsyncStorage.setItem("userInfo", JSON.stringify(userInfo));
      Alert.alert("Sucesso", "Informações salvas!");
    } catch (error) {
      console.error(error);
      Alert.alert("Erro", "Não foi possível salvar os dados.");
    }
  };

  const handleShow = async () => {
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
      console.error(error);
      Alert.alert("Erro", "Não foi possível ler os dados.");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro de Usuário</Text>

      <TextInput
        style={styles.input}
        placeholder="Sobrenome"
        value={form.sobrenome}
        onChangeText={(v) => handleChange("sobrenome", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="CEP"
        value={form.cep}
        onChangeText={(v) => handleChange("cep", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="E-mail"
        keyboardType="email-address"
        value={form.email}
        onChangeText={(v) => handleChange("email", v)}
      />
      <TextInput
        style={styles.input}
        placeholder="Senha"
        secureTextEntry
        value={form.senha}
        onChangeText={(v) => handleChange("senha", v)}
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
  title: { fontSize: 24, fontWeight: "bold", marginBottom: 20, textAlign: "center" },
  input: { borderWidth: 1, borderColor: "#ccc", padding: 10, marginBottom: 15, borderRadius: 5 },
});

