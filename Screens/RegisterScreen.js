import React, { useState } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Button, Input } from 'react-native-elements';
import { register } from './auth';

const RegisterScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      const response = await register(username, '', password);
      navigation.navigate('Login');
    } catch (e) {
      setError(e.message || 'Error registering user');
      console.error('Registration error:', e);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>REGISTER</Text>
      <Input
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        containerStyle={styles.inputContainer}
        inputStyle={styles.input}
      />
      <Button title="Register" onPress={handleRegister} buttonStyle={styles.button} />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
};

const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#f8f9fa',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    paddingHorizontal: 8,
  },
  button: {
    backgroundColor: '#007bff',
  },
  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default RegisterScreen;
