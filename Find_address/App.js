import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Alert, Button, StyleSheet, TextInput, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function App() {

  const key = "insertYourKeyHere"

  const [location, setLocation] = useState(null);

  useEffect(() => {
    getLocation();
  }, []);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('No permission to access location!');
    }
    else {
      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
      setRegion({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.03,
      longitudeDelta:0.02
      })
      setCoordinates({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      })
      setTitle("You are here")
    }
  }

  const [place, setPlace] = useState('');

  const [region, setRegion] = useState({
    latitude: 60.200692,
    longitude:24.934302,
    latitudeDelta: 15,
    longitudeDelta:15,
  });

  const [title, setTitle] = useState('')

  const [coordinates, setCoordinates] = useState({
    latitude:60.201373,
    longitude: 24.934041
  });

  const findRegion = () => {
      const url = `http://www.mapquestapi.com/geocoding/v1/address?key=${key}&location=${place}`
      console.log(url)
      fetch(url)
      .then(response => response.json())
      .then(data => {              
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
    flex: 17,
    width: "100%",
    height: "100%",
  },
  inputarea: {
    flex: 1,
    marginTop: 10,
  },
});
