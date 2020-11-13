import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import {Picker} from '@react-native-picker/picker';

export default function App() {

  const [text, setText] = useState('');
  const [result, setResult] = useState('0');

  const [rates, setRates] = useState([]);
  const url = `https://api.exchangeratesapi.io/latest`;

  useEffect(() => {
    loadRates();
  }, []);

  const loadRates = () => {
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setRates(data.rates);
    })
    .catch((error) => {
      Alert.alert('Error', error.message);
    });
  }

  const convert = () => {
    setResult((Number(text) / curr).toFixed(2))
  }

  const [curr, setCurr] = useState('');

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={require('./coins.png')} />
      <Text>{result} €</Text>
      <View style={styles.inputcontainer}>
        <TextInput
          style={styles.input} 
          placeholder='Ammount'
          keyboardType='decimal-pad'
          onChangeText={text => setText(text)}
          value={text}
        />
        <Picker
          selectedValue={curr}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
            if (itemIndex !=0) {
            setCurr(itemValue)
            }
          }}>
          <Picker.Item label="Currency?" value="5" />
          {(Object.keys(rates)).map(rate => (<Picker.Item label={rate} value={rates[rate]} key={rate} />))}
        </Picker>
      </View>
      <Button title='Convert' onPress={convert} />
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
    paddingTop: 20,
    flexDirection: 'row',
  },
  image: {
    width: 200,
    height: 120,
  },
  picker: {
    height: 30,
    width: 90,
  },
  input: {
    width:100,
    height: 30,
    borderColor: 'grey',
    borderWidth: 1,
  },
});
