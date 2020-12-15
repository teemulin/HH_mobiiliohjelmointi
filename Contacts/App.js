import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import * as Contacts from 'expo-contacts';

export default function App() {

  const [data, setData] = useState([]);
  const [contacts, setContacts] = useState([]);

  useEffect(() => {
    (async () => {
      const { status } = await Contacts.requestPermissionsAsync();
      if (status === 'granted') {
        const { data } = await Contacts.getContactsAsync({
          
        });

        if (data.length > 0) {
          setData(data);
        }
      }
    })();
  }, []);

  const showContacts = () => {
    setContacts(data);
  }

  return (
    <View style={styles.container}>
      <FlatList 
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <View>
              <Text>{item.name} {item.phoneNumbers[0].digits} </Text>
            </View>
          )
        }}
      />
      <Button onPress={showContacts} title='Show contacts' />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 100,
  },
});
