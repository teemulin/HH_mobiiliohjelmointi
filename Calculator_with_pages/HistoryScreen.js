import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

export default function HistoryScreen ({ route, navigation }) {
    const { history } = route.params;
    return (
        <View style={styles.container}>
            <Text style={styles.header}>History</Text>
            <FlatList 
                data={history}
                renderItem={({ item }) => <Text>{item.key}</Text>}
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
    header: {
        fontSize: 16,
        color: 'blue',
        fontWeight: 'bold',
    },
  });