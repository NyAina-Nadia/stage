import * as React from 'react';
import { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Dimensions, Alert } from 'react-native';
import { Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
    try {
      const response =  axios.post('/login/', { username, password });
      await AsyncStorage.setItem('access', response.data.access);
      await AsyncStorage.setItem('refresh', response.data.refresh);
      navigation.navigate('Home');
    } catch (e) {
      setError('Invalid credentials');
    }
  };

  const Test = () => {
    Alert.alert('Hello world');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>
      <TextInput
        placeholder="Username"
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
      <View>
        <TouchableOpacity style={styles.btnEnter} onPress={handleLogin}>
          <Icon name='login' size={20} color='white' />
          <Text style={styles.btnEnterTxt}>Entrer</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

// CSS
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },
  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '90%',
    padding: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    fontSize: 16,
    color: '#333',
  },
  btnEnter: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#000',
    borderRadius: 5,
    width: '90%',
    justifyContent: 'center',
    marginTop: 16,
  },
  btnEnterTxt: {
    color: 'white',
    marginLeft: 8,
  },
  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default LoginScreen;
