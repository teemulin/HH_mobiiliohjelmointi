import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import * as SQLite from 'expo-sqlite';

export default function App() {

  const db = SQLite.openDatabase('shoppinglistdb.db');

  const [text, setText] = useState('');
  const [amount, setAmount] = useState('');
  const [data, setData] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('create table if not exists shoplist2 (id integer primary key not null, text text, amount text);');
    });
    updateList();
  }, []);

  const addButton = () => {
    db.transaction(tx => {
      tx.executeSql('insert into shoplist2 (text, amount) values (?, ?);',
      [text, amount]);
    }, null, updateList)
    setText('');
    setAmount('');
  }

  const updateList = () => {
    db.transaction(tx => {
      tx.executeSql('select * from shoplist2;', [], (_, { rows }) => 
      setData(rows._array)
      );
    });
  }

  const deleteItem = (id) => {
    db.transaction(tx => {
      tx.executeSql(`delete from shoplist2 where id = ?;`, [id]);
    }, null, updateList)
  }

  const clearButton = () => {
    db.transaction(tx => {
      tx.executeSql(`delete from shoplist2;`);
    }, null, updateList)
  }

  return (
    <View style={styles.container}>
      <View style={styles.inputcontainer}>
        <TextInput style={styles.textinput}
          placeholder='Item?'
          onChangeText={(text) => setText(text)}
          value={text}
        />
        <TextInput style={styles.textinput}
          placeholder='Amount?'
          onChangeText={(amount) => setAmount(amount)}
          value={amount}
        />
        <View style={styles.buttons}>
          <Button onPress={addButton} title='Add' />
          <Button onPress={clearButton} title='Clear' />
        </View>
      </View>
      <Text style={styles.listheader}>Shopping list</Text>
      <FlatList 
        keyExtractor={item => item.id.toString()}
        data={data}
        renderItem={({item}) => 
          <View style={styles.flatlist}>
            <Text style={styles.listitems}>{item.text}, {item.amount}</Text>
            <Text style={[styles.listitems, styles.deleteitem]} onPress={() => deleteItem(item.id)}>bought</Text>
          </View>}
      />
      <StatusBar style="dark" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  inputcontainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },

  textinput: {
    width: 200,
    borderColor: 'grey',
    borderWidth: 2,
    textAlign: 'center',
  },

  buttons: {
    flexDirection: 'row',
  },
  
  listheader: {
    fontSize: 18,
    color: 'black',
    fontWeight: 'bold',
    paddingTop: 5,
    paddingBottom: 5,
  },

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