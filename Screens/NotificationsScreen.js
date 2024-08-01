
//import { Text, Button, Icon } from 'react-native-elements';
import 'react-native-gesture-handler';
import * as React from 'react';

import { View, Text,StyleSheet} from 'react-native';
import { Icon,Button,Input } from 'react-native-elements';

function NotificationsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Notifications Screen</Text>
        <Button
          title="Open Drawer"
          onPress={() => navigation.openDrawer()}
        />
      </View>
    );
  }

export default NotificationsScreen;