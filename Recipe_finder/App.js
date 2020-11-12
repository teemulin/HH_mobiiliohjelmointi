import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Alert, Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function App() {

  const [desc, setDesc] = useState('');
  const [recipes, setRecipes] = useState([]);

  const getRecipes = () => {
    const url = `http://www.recipepuppy.com/api/?i=${desc}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setRecipes(data);
    })
    .catch((error) => {
      Alert.alert('Error', error.message);
    });
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}> 
        <TextInput 
          placeholder="Incredient"
          onChangeText={desc => setDesc(desc)}
          value={desc}
        />
      </View>
      <View style={styles.button}>
        <Button title='Search' onPress={getRecipes} />
      </View>
      <View style={styles.results}>
        <FlatList
          keyExtractor={item => item.href} 
          renderItem={({ item }) => <Text>{item.title}</Text>}
          data={recipes}
        />
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
  input: {
    fontSize: 16,
    width: 200,
    padding: 10,
  },
  button: {

  },
  results: {
    width: 200,
    marginLeft: '5%',
  },
});
