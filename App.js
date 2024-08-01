

import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { View, Text,StyleSheet} from 'react-native';
import { Icon,Button,Input } from 'react-native-elements';
import HomeScreen from './Screens/HomeScreen';
import LoginScreen from './Screens/LoginScreen';
import NotificationsScreen from './Screens/NotificationsScreen';
import EvenementForm from './Ajouts/EvenementForm';
import RegisterScreen from './Screens/RegisterScreen';

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Login">

          <Drawer.Screen  name="Menu" component={HomeScreen} />
          <Drawer.Screen name="Ajout" component={EvenementForm} />
          <Drawer.Screen name="Notifications" component={NotificationsScreen} />
          <Drawer.Screen name="Login" component={LoginScreen}></Drawer.Screen>
          <Drawer.Screen name="Register" component={RegisterScreen}></Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}





//CSS
const styles= StyleSheet.create({
  btnadd:{
   marginTop:200,
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
