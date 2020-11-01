import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [text, setText] = useState('');
  const [data, setData] = useState([]);

  const addButton = () => {
    setData([...data, {key: text}]);
    setText('');
  }

  const clearButton = () => {
    setData([]);
  }

  return (
    <View style={styles.container}>
      <View style={{flex: 1, justifyContent: 'flex-end', alignItems: 'center'}}>
        <TextInput style={styles.textinput}
          onChangeText={text => setText(text)}
          value={text}
        />
        <View style={styles.buttons}>
          <Button onPress={addButton} title='Add' />
          <Button onPress={clearButton} title='Clear' />
        </View>
      </View>
      <Text style={{fontSize: 18, color: 'blue'}}>Shopping list</Text>
      <FlatList 
        data={data}
        renderItem={({item}) => <Text>{item.key}</Text>}
      />
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

  buttons: {
    flexDirection: 'row',
  },

  textinput: {
    width: 200,
    borderColor: 'grey',
    borderWidth: 1,
  },
});
