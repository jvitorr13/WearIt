import { StyleSheet } from 'react-native';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-between',
  },
  form: {
    gap: 16,
    marginTop: 40,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  forgotPassword: {
    alignSelf: 'flex-end',
  },
  loginButton: {
    marginTop: 8,
  },
  createAccountButton: {
    marginTop: 8,
  },
  logo: {
    width: 120,
    height: 40,
    alignSelf: 'center',
    marginBottom: 40,
  },
});