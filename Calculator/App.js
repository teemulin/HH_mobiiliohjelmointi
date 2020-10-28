import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);
  const [sum, setSum] = useState('');

  const sumButton = () => {
    setSum('Result: ' + (parseFloat(num1) + parseFloat(num2)));
  }

  const minusButton = () => {
    setSum('Result: ' + (parseFloat(num1) - parseFloat(num2)));
  }

  return (
    <View style={styles.container}>
        <Text>{sum}</Text>
        <TextInput
          style={styles.textinput}
          keyboardType="numeric"
          onChangeText={num1 => setNum1(num1)}
          value={num1}
        />
        <TextInput 
          style={styles.textinput}
          keyboardType="numeric"
          onChangeText={num2 => setNum2(num2)}
          value={num2}
        />
      <View style={styles.buttons}>
        <Button onPress={sumButton} title="+" />
        <Button onPress={minusButton} title="-" />
      </View>
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
  },
  buttons: {
    flexDirection: 'row',
  },
  textinput: {
    width: 150,
    borderColor: 'grey',
    borderWidth: 1,
  },
});
