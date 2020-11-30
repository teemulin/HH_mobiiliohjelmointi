import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function App() {

  const [place, setPlace] = useState('');

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude:24.934302,
    latitudeDelta: 0.03,
    longitudeDelta:0.02,
  });

  const [title, setTitle] = useState('Haaga-Helia')

  const [coordinates, setCoordinates] = useState({
    latitude:60.201373,
    longitude: 24.934041
  });

  const findRegion = () => {
      const url = `http://www.mapquestapi.com/geocoding/v1/address?key=mrEcjQGFmzWpbsyPz7Kgpw47X4xed2qA&location=${place}`
      console.log(url)
      fetch(url)
      .then(response => response.json())
      .then(data => {
        console.log(data.results[0].locations[0].street)
      

        setRegion({
        latitude: data.results[0].locations[0].latLng.lat,
        longitude: data.results[0].locations[0].latLng.lng,
        latitudeDelta: 0.03,
        longitudeDelta: 0.02
        })
        setCoordinates({
          latitude: data.results[0].locations[0].latLng.lat,
          longitude: data.results[0].locations[0].latLng.lng
        })
        setTitle(data.results[0].locations[0].street)
      })
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <View style={styles.inputarea}>
        <TextInput 
          placeholder="Address?"
          onChangeText={place => setPlace(place)}
          value={place}
        />
        <Button title="Show" onPress={findRegion} />
      </View>
      <MapView
        style={styles.map}
        initialRegion={region}
        region={region}
        >
          <Marker 
            coordinate={coordinates}
            title={title}
          />

      </MapView>
      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    flex: 16,
    width: "100%",
    height: "100%",
  },
  inputarea: {
    flex: 1,
    marginTop: 10,
  },
});
