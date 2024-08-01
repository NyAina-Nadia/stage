import * as React from 'react';
import {useState} from 'react';
import { View, Text, StyleSheet, Image,TextInput,Dimensions, Alert} from 'react-native';
import {  Button, Icon } from 'react-native-elements';
import { TouchableOpacity } from 'react-native-gesture-handler';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';


const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async () => {
      try {
          const response = await api.post('/login/', { username, password });
          await AsyncStorage.setItem('access', response.data.access);
          await AsyncStorage.setItem('refresh', response.data.refresh);
          navigation.navigate('Home');
      } catch (e) {
          setError('Invalid credentials');
      }
  };


  return (
    <View style={styles.container}>

      <Text style={styles.header}>Login</Text>

      <TextInput
        placeholder="Username"
        containerStyle={styles.inputContainer}
        style={styles.input}
        value={username}
        onChangeText={setUsername}
      />
      
      <TextInput
        placeholder="Password"
        secureTextEntry
        containerStyle={styles.inputContainer}
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        
      />

      <View>
        <TouchableOpacity style={styles.btnEnter}>
          <Icon name='login' size={20} color='white'/>
          <Text style={styles.btnEnterTxt} onPress={handleLogin}>Entrer</Text>
        </TouchableOpacity>
      </View>
    </View>

   
  )
 }

//CSS
 const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
   // justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },

  logo: {
    width: 100,
    height: 100,
    marginBottom: 24,
  },

  header: {
    fontSize: 24,
    marginBottom: 24,
    textAlign: 'center',
  },

  inputContainer: {
    width: '100%',
    marginBottom: 16,
  },

  input: {
    
    width: '90%',
    padding: 10,
    marginVertical: 28,
   // marginLeft:18,
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
    width: '100%',
    justifyContent: 'center',
    marginLeft:10,
  },

  btnEnterTxt:{
    color: 'white',
    marginLeft: 8,
  },

  error: {
    color: 'red',
    marginTop: 16,
    textAlign: 'center',
  },

  txtMdpOubli:{
    marginTop:10,
  },

});

export default LoginScreen;
