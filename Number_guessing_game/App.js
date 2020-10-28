import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [random, setRandom] = useState(Math.floor(Math.random() * 100) + 1);
  const [count, setCount] = useState(0);
  const [guess, setGuess] = useState(0);
  const [text, setText] = useState('Guess a number between 1-100')

  const makeGuess = () => {
    if (guess<1 || guess>100) {
      setText('Number needs to be between 1-100')
      setCount(count + 1)
    }
    else if(guess==random) {
      setCount(count + 1)
      Alert.alert(`You got it right and it took you ${count + 1} guesses`)
      setText('Guess a number between 1-100')
      setRandom(Math.floor(Math.random() * 100) + 1)
      setCount(0)
      setGuess(0)
    }
    else if(guess>random) {
      setText(`Your guess ${guess} was too high`)
      setCount(count + 1)
    }
    else if(guess<random) {
      setText(`Your guess ${guess} was too low`)
      setCount(count + 1)
    }
  }

  return (
    <View style={styles.container}>
      <Text>{text}</Text>
      <TextInput style={styles.textinput}
        keyboardType="numeric"
        maxLength='3'
        onChangeText={text => setGuess(text)}
        value={guess}
      />
      <Button onPress={makeGuess} title="Guess me" />
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
  textinput: {
    width: 50,
    borderColor: 'grey',
    borderWidth: 1,
  }
});
