import React from 'react';
import { StyleSheet, View, Image } from 'react-native';
import { Text, Card, Divider } from 'react-native-elements';

const SmallCard = ({detail, location}) => {

  let text;  
  let time;
    
  let date = new Date(detail.dt*1000);
  let day = date.getDate();
  let month = 1 + date.getMonth();
  let hours = "0" + date.getHours();
  let minutes = "0" + date.getMinutes();

  text = day + "." + month + ".";
  time = hours.substr(-2) + ":" + minutes.substr(-2);

  return (
    <Card containerStyle={styles.card}>
      <Text style={styles.location}>{location}</Text>

      <Divider style={styles.divider} />

      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{uri:`https://openweathermap.org/img/w/${detail.weather[0].icon}.png`}} />
        <View style={{flexDirection: 'column'}}>
          <Text style={styles.date}>{text}</Text>
          <Text style={styles.time}>{time}</Text>
        </View>
      </View>

      <Divider style={styles.divider} />

      <View style={styles.weatherContainer}>
        <Text style={styles.notes}>{detail.weather[0].description}</Text>
        <Text style={styles.notes}>{Math.round( detail.main.temp * 10) / 10 }&#8451;</Text>
      </View>
    </Card>
  )
}

const styles = StyleSheet.create({

  card: {
    backgroundColor: 'black',
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 20,
    alignSelf: 'center',
    width: 120,
    height: 150,
  },

  divider: {
    backgroundColor: '#fff',
    marginVertical: 4,
  },

  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  image: {
    width: 40,
    height: 40,
  },

  date: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'right',
  },
  
	time:{
		fontSize: 16,
		color: '#fff',
  },

  weatherContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  
	notes: {
		fontSize: 12,
		color: '#fff',
		textTransform: 'capitalize',
  },
  
  location: {
    fontSize: 24,
		color: '#fff',
    textTransform: 'capitalize',
    textAlign: 'center',
  },
});

export default SmallCard;