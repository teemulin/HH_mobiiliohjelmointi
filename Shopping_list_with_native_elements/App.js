import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Input, Button, ListItem } from 'react-native-elements';

export default function App() {

  const db = SQLite.openDatabase('shoppinglistdb.db');

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoplist (id integer primary key not null, text text, amount text);');
    });
    updateList();
  }, []);

  const addButton = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoplist (text, amount) values (?, ?);',
      [text, amount]);
    }, null, updateList)
    setText('');
    setAmount('');
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoplist;', [], (_, { rows }) => 
      setData(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql(`delete from shoplist where id = ?;`, [id]);
    }, null, updateList)
  }

  const clearButton = () => {
    db.transaction(tx => {
      tx.executeSql(`delete from shoplist;`);
    }, null, updateList)
  }

  renderItem = ({ item }) => (
    <ListItem bottomDivider >
      <ListItem.Content>
        <ListItem.Title>{item.text}</ListItem.Title>
        <ListItem.Subtitle>{item.amount}</ListItem.Subtitle>
      </ListItem.Content>
      <ListItem.Chevron iconProps={{type: 'material', name: 'trash', color: 'red', size: 25}}  onPress={() => deleteItem(item.id)} />
    </ListItem>
  )

  return (
    <View style={styles.container}>
      <Header 
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff', fontWeight: '700' } }}
        rightComponent={<Button icon={{name: 'clear', color: 'red'}} onPress={clearButton} title='Clear' />}
      />
      <Input 
        placeholder='Product'
        label='Product'
        onChangeText={(text) => setText(text)}
        value={text}
      />
      <Input
        placeholder='Amount'
        label='Amount'
        onChangeText={(amount) => setAmount(amount)}
        value={amount}
      />
      <View style={styles.buttons}>
        <Button raised icon={{name: 'save', color: '#fff'}} onPress={addButton} title='Save' />
      </View>
      <FlatList 
      keyExtractor={item => item.id.toString()}
      data={data}
      renderItem={renderItem}
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  
  container: {
    flex: 1,
  },

  buttons: {
    width: 130,
    alignSelf: 'center',
  },
});