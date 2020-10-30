import React, { useState } from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';

export default function App() {

  const [result, setResult] = useState('');
  const [numb1, setNumb1] = useState('');
  const [numb2, setNumb2] = useState('');
  const [history, setHistory] = useState([]);
  
  const calculate = (func) => {
    const [n1, n2] = [Number(numb1), Number(numb2)];
 
    switch (func) {
      case '+':
        setResult(n1 + n2);
        setHistory([...history, {key: (`${numb1} ${func} ${numb2} = ${n1+n2}`)}]);        break;
      case '-':
        setResult(n1 - n2);
        setHistory([...history, {key: (`${numb1} ${func} ${numb2} = ${n1-n2}`)}]); 
        break;
    }
    setNumb1('');
    setNumb2('');
  }

  return (
    <View style={styles.container}>
      <View style={styles.result}>
        <Text>Result: {result} </Text>
      </View>
      <View style={styles.inputarea}>
        <TextInput style={styles.textinput}
          keyboardType='numeric'
          onChangeText={text => setNumb1(text)}
          value={numb1}
        />
        <TextInput style={styles.textinput}
          keyboardType='numeric'
          onChangeText={text => setNumb2(text)}
          value={numb2}
        />
        <View style={styles.buttons}>
          <View style={styles.func}>
            <Button onPress={() => calculate('+')} title="+" />
          </View>
          <View style={styles.func}>
            <Button onPress={() => calculate('-')} title="-" />
          </View>
        </View>
      </View>
      <View style={styles.history}>
        <Text>History:</Text>
        <FlatList 
        data={history}
        renderItem={({item}) => <Text>{item.key}</Text>}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  result: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  inputarea: {
    flex: 1,
    alignItems: 'center',
  },
  textinput: {
    width: '40%',
    borderColor: 'grey',
    borderWidth: 1,
    padding: 5,
    margin: 5,
  },
  buttons: {
    width: '25%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  func: {
    width: '50%',
    padding: 5,
  },
  history: {
    flex: 4,
    alignItems: 'center'
  },
});
