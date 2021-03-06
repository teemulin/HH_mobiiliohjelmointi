import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

const WeathcerCard = ({detail}) => {

  let text;
  let time;

  let date = new Date(detail.dt*1000);
  let day = date.getDate();
  let month = 1 + date.getMonth();
  let hours = "0" + date.getHours();
  let minutes = "0" + date.getMinutes();

  text = day + "." + month + ".";
  time = hours.substr(-2) + ":" + minutes.substr(-2);

  /*  Above is used to convert UNIX timeformat into local time.
      Added 0s and used substr(-2) so can always have 08:02 instaed of 8:2 in time format */

  return (
    /*  Card element was chosen 'cause it looks good and fits neatly for showing weather info
        We wrap all elements inside single Card */
    <Card containerStyle={styles.card}>
      <View style={styles.imageContainer}>
        {/* fetching weather icon */}
        <Image style={styles.image} source={{uri:`https://openweathermap.org/img/w/${detail.weather[0].icon}.png`}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.date}>{text}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>
      {/* Using divider to style out card info into two parts */}
      <Divider style={styles.divider} />
      <View style={styles.weatherContainer}>
        
        {/* fetching weather description from passed data "detail" that contains our weather data*/}
        <Text style={styles.notes}>{detail.weather[0].description}</Text>
        
        {/* fetching weather temp and showing it rounded nicely */}
        <Text style={styles.notes}>{Math.round( detail.main.temp * 10) / 10 }&#8451;</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#4682B4',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignSelf: 'center',
    width: 130,
    height: 300,
    margin: 4,
  },

  divider: {
    backgroundColor: '#fff',
    marginVertical: 0,
  },

  imageContainer: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
  },

  image: {
    width: 100,
    height: 100,
  },

  date: {
    fontSize: 20,
    color: '#fff',
    textAlign: 'center',
  },

	time:{
		fontSize: 26,
		color: '#fff',
  },

  weatherContainer: {
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginTop: 20,
  },

	notes: {
		fontSize: 18,
		color: '#fff',
		textTransform: 'capitalize',
  },

  location: {
    fontSize: 28,
		color: '#fff',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

/* This is so we can acutally export this to our main App.js */
export default WeathcerCard;