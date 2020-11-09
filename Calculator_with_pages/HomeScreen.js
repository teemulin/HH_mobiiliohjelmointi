import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';

export default function HomeScreen ({ navigation }) {

    const [result, setResult] = useState('');
    const [numb1, setNumb1] = useState('');
    const [numb2, setNumb2] = useState('');
    const [history, setHistory] = useState([]);

    const calculate = operator => {
        const [number1, number2] = [Number(numb1), Number(numb2)];

        let result = 0;
        switch (operator) {
            case '+':
                result = number1 + number2;
                break;
            case '-':
                result = number1 - number2;
                break;
        }
        setResult(result);

        const text = `${number1} ${operator} ${number2} = ${result}`;
        setHistory([...history, { key: text }]);
        setNumb1('');
        setNumb2('');
    }

    return (
        <View style={styles.container}>
            <Text>Result: {result} </Text>
            <TextInput style={styles.input}
                keyboardType='numeric'
                onChangeText={text => setNumb1(text)}
                value={numb1}>
            </TextInput>
            <TextInput style={styles.input}
                keyboardType='numeric'
                onChangeText={text => setNumb2(text)}
                value={numb2}>
            </TextInput>
            <View style={styles.operators}>
                <View style={styles.button}>
                    <Button title='+' onPress={() => calculate('+')} />
                </View>
                <View style={styles.button}>
                    <Button title='-' onPress={() => calculate('-')} />
                </View>
                <View style={styles.history}>
                    <Button 
                        title="History" onPress={() => navigation.navigate('History', {history})} />
                </View>
            </View>
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
        padding: 5,
        margin: 5,
        width: '50%',
    },
    operators: {
        width: '50%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    button: {
        width: '20%',
    },
    history: {
        width: '50%',
    },
  });