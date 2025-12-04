import { StyleSheet } from 'react-native';

export const LoginStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center', 
    backgroundColor: '#FFFFFF',
  },
  form: {
    marginTop: 200,
  },
  
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 12,
    fontSize: 14,
  },
  forgotPassword: {
    alignSelf: 'flex-end',
    marginBottom: 16,
  },
  button: {
    height: 48,
    borderRadius: 8,
    justifyContent: 'center',
    marginTop: 8,
    alignItems: 'center',
    marginBottom: 50,
  },
  loginButton: {
    backgroundColor: '#000000',
    marginBottom: 8,
  },
  createAccountButton: {
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  buttonTextBlack: {
    color: '#000000',
    fontWeight: '600',
  },
  logo: {
    width: 200,
    height: 180,
    alignSelf: 'center',
    marginTop: 100,
  },
});
