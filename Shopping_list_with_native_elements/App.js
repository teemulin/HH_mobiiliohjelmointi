import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';
import { Header, Icon, Input, Button, ListItem } from 'react-native-elements';

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
      <ListItem.Chevron onPress={() => deleteItem(item.id)} />
    </ListItem>
  )

  return (
    <View>
      <Header 
        centerComponent={{ text: 'SHOPPING LIST', style: { color: '#fff' } }}
      />
      <View>
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
        <View>
          <Button raised icon={{name: 'save', color: '#fff'}} onPress={addButton} title='Save' />
          <Button raised icon={{name: 'clear', color: '#fff'}} onPress={clearButton} title='Clear' />
        </View>
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
    
  flatlist: {
    flexDirection: 'row',
  },

  listitems: {
    textAlign: 'center',
    paddingRight: 5,
  },

  deleteitem: {
    color: 'red',
  },
});