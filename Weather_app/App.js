import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, Alert, Text, Keyboard } from 'react-native';
import { Input, Button } from 'react-native-elements';

/* Importing location services so we can use current location */
import * as Location from 'expo-location';

/* Importing our custom component WeatherCard */
import WeatherCard from './components/WeatherCard';

/* Importing API keys from folder that is not synced to git */
import { API, geoAPI } from './utils/ApiInfo';

export default function App() {

  /*  Setting up needed consts
      Location for weather api to get weather info based on lat lon
      Forecast is used to store fetched weather info
      City is used to show what city's forecast we are showing
      Place is for search function to set new place for map api so we can fecth lat lon
      based on city for weather api to use

      We are using Helsinki as our inital location just for convenience */

  const [location, setLocation] = useState({lat:60.17, lon:24.94});
  const [forecast, setForecast] = useState([]);
  const [city, setCity] = useState('');
  const [place, setPlace] = useState('');
 
  /* When app loads first time it uses getLocation to get user's location. Happens only once due [] @ end */
  useEffect(() => {
    getLocation();
  }, []);

  /* Every time const location is changed app will run getWeather to update weather data */
  useEffect(() => {
    getWeather();
  }, [location]);

  /*  This is our function to get user's location on startup
      It is async function so we can have it wait for user permission
      and to wait for it to get location before trying to set location data */
  const getLocation = async () => {
    /* Checks if user has given permission for location */
    let { status } = await Location.requestPermissionsAsync();

    /* If location services permission is not granted we show aler to user */
    if (status !== 'granted') {
      Alert.alert('You need to give permisson for location services');
    }

    /* If permission is granted we get currentposition and set it to const location as lat & lon for weather api to use */
    else {
      let position = await Location.getCurrentPositionAsync({});
      setLocation({
        lat: position.coords.latitude,
        lon: position.coords.longitude
      });
    }
  }

  /* we use those lat lon from const location in search string and API-key that is imported to get data from openweathermap api */
  const getWeather = () => {
    let url = `https://api.openweathermap.org/data/2.5/forecast?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${API}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      /* We set data.list that contains weather data to const forecast to be used in our main element WeatherCard */
      setForecast(data.list);
      /* We put city name directly to const city as that is show only once */
      setCity(data.city.name);
    })
  }

  /*  This is our search box function that utilizes mapquest to get lat lon info based on city name
      City name is got from input using const place that is put into search string */
  const searchButton = () => {
    let url = `http://www.mapquestapi.com/geocoding/v1/address?key=${geoAPI}&location=${place}`
    fetch(url)
    .then(response => response.json())
    .then(data => {
      setLocation({
        lat: data.results[0].locations[0].latLng.lat,
        lon: data.results[0].locations[0].latLng.lng,
      })
      /* Clearing typed text once it is used in function */
      setPlace('');
      /* Hiding keyboard once search button is pressed */
      Keyboard.dismiss();
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.toppart}>

        {/* We take text that user types and put it to const place to be used in searchButton */}
        <Input 
          style={styles.search}
          placeholder='Search for a city'
          onChangeText={place => setPlace(place)}
          value={place}
        />
        {/* Pressing button runs function searchButton from above */}
        <Button raised icon={{name: 'search', color: '#fff'}} title='Show weather' onPress={searchButton} />
      </View>
      <View style={styles.bottompart}>
        {/* Here we show city directly */}
        <Text style={styles.listheader}>{city}</Text>

        {/* This is to draw our main component Card as flatlist so we can show multiple counts of weather info*/}
        {/* to show flatlist horizontally we use horizontally={true} */}
        {/* In rederitem we only render our WeatherCard component and pass on flatlist data as "detail" that contains "item" that is flatlist's data */}
        <FlatList 
          data={forecast}
          style={{marginTop:10}}
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
    alignItems: 'center',
  },

  bottompart: {
    
  },

  listheader: {
    fontSize: 30,
    marginTop: 40,
    textAlign: 'center',
  },
});