import 'react-native-gesture-handler';
import * as React from 'react';
import { View, Text, StyleSheet, FlatList, Alert,Dimensions } from 'react-native';
import { Button, Icon } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';

function HomeScreen({ navigation }) {
  const ajoutEvnmt = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Ajout' }],
    });
  };

  const [data, setData] = React.useState([
   
    { id: '5', name: 'Evenement 1', lieu: 'abdn' },
    { id: '6', name: 'Evenement 2', lieu: 'acbdn' },
    { id: '7', name: 'Evenement 3', lieu: 'acbdn' },
    { id: '8', name: 'Evenement 4', lieu: 'acbdn' },
  ]);

  const handleEdit = (id) => {
    Alert.alert('Edit', `Modifier l'évènement: ${id}`);
  };

  const handleDelete = (id) => {
    Alert.alert(
      'Delete',
      `Êtes-vous sûr de vouloir supprimmer l'idenditifant: ${id}?`,
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            setData(data.filter((item) => item.id !== id));
          },
        },
      ],
      { cancelable: false }
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <ScrollView>
      <View style={styles.itemContent}>
        <View>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text>{item.lieu}</Text>
        </View>
        <View style={styles.itemActions}>
          <Icon
            name='edit'
            type='font-awesome'
            color='#39AFEA'
            iconStyle={styles.actionIcon}
            onPress={() => handleEdit(item.id)}
          />
          <Icon
            name='trash'
            type='font-awesome'
            color='red'
            iconStyle={styles.actionIcon}
            onPress={() => handleDelete(item.id)}
          />
        </View>
      </View>
      </ScrollView>
    </View>
  );

  return (
    <View style={styles.container}>
      <Button
        buttonStyle={styles.btnajout}
        title='Ajouter un évènement'
        onPress={ajoutEvnmt}
        icon={<Icon name='plus' type='font-awesome' color='white' iconStyle={styles.iconplus} />}
      />
      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        style={styles.list}
      />
    </View>
  );
}

// CSS
const { width } = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
  },

  btnajout: {
    backgroundColor: '#39AFEA',
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: 250,
  },

  iconplus: {
    marginRight: 15,
    fontSize: 30,
  },

  list: {
    width: '100%',
    paddingHorizontal: 16,
  },

  item: {
    backgroundColor: '#f8f8f8',
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 10,
    borderRadius: 5,
  },

  itemContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  itemName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },

  itemActions: {
    flexDirection: 'row',
  },

  actionIcon: {
    marginHorizontal: 10,
    fontSize: 20,
  },
});

export default HomeScreen;
