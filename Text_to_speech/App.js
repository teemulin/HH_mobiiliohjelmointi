import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import * as Speech from 'expo-speech';

export default function App() {

  const [text, setText] = useState('');

  const speak = () => {
    if(!text=='') {
      Speech.speak(text);
    }
    else {
      Speech.speak('You forgot to type something')
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input} 
        placeholder='What do you want me to say?'
        onChangeText={text => setText(text)}
        value={text}
      />
      <Button onPress={speak} title='Press to hear text' />
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
  input: {
    borderColor: 'grey',
    borderWidth: 1,
    width: 200,
    textAlign: 'center',
  },
});
