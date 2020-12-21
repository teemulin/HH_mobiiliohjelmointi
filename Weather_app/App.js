import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert, Text } from 'react-native';
import { Input, Button } from 'react-native-elements';
import * as Location from 'expo-location';
import WeatherCard from './components/WeatherCard';
import { API, geoAPI } from './utils/ApiInfo';
import { Keyboard } from 'react-native';

export default function App() {

  const [location, setLocation] = useState({lat:60.17, lon:24.94});
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');

  const [place, setPlace] = useState('');
 
  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    getWeather();
  }, [location]);

  const getLocation = async () => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('You need to give permisson for location services');
    }
    else {
      let position = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    }
    
  }

  const getWeather = () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setForecast(data.list);
      setCity(data.city.name);
    })
  }

  const searchButton = () => {
    let url = `http://www.mapquestapi.com/geocoding/v1/address?key=${geoAPI}&location=${place}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setLocation({
        lat: data.results[0].locations[0].latLng.lat,
        lon: data.results[0].locations[0].latLng.lng,
      })
      setPlace('');
      Keyboard.dismiss();
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.toppart}>
        <Input 
          style={styles.search}
          placeholder='Search for a city'
          onChangeText={place => setPlace(place)}
          value={place}
        />
        <Button raised icon={{name: 'search', color: '#fff'}} title='Show weather' onPress={searchButton} />

      </View>
      <View style={styles.bottompart}>
        <Text style={styles.listheader}>{city}</Text>
        <FlatList
          data={forecast} 
          style={{marginTop:20}}
          horizontal={true}
          keyExtractor={item => item.dt_txt} 
          renderItem={({item}) => 
            <WeatherCard detail={item} />
          }
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
  },

  search: {
    textAlign: 'center',
  },

  toppart: {
    paddingTop: 80,
    alignItems: 'center'
  },

  bottompart: {
    
  },

  listheader: {
    fontSize: 30,
    marginTop: 10,
    marginBottom: -15,
    textAlign: 'center',
  },
});