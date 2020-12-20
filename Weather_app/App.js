import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert } from 'react-native';
import * as Location from 'expo-location';
import WeatherCard from './components/WeatherCard';
import SmallCard from './components/SmallCard';
import { API } from './utils/ApiInfo';

export default function App() {

  const [location, setLocation] = useState({lat:0, lon:0});
  const [forecast, setForecast] = useState([]);
 
  useEffect(() => {
    getLocation();
  }, []);

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
    getWeather();
  }

  const getWeather = () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setForecast(data);
    })
  }

  return (
    <View style={styles.container}>
      <WeatherCard detail={forecast.list[0]} location={forecast.city.name} />
      <FlatList 
        data={forecast.list} 
        style={{marginTop:20}}
        horizontal={true} 
        keyExtractor={item => item.dt_txt} 
        renderItem={({item}) => 
          <SmallCard detail={item} location={forecast.city.name} />
        }
      />
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
});