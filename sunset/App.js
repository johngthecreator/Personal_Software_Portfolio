import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Alert} from 'react-native';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import * as Location from 'expo-location';

export default function App() {
  const [time, setTime] = useState("");
  const [location, setLocation] = useState();
  useEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  const getSunsetTime = async () => {
    if (location){
      await axios.get(`https://api.sunrise-sunset.org/json?lat=${location.coords.latitude}&lng=${location.coords.longitude}&formatted=0`)
      .then((res)=>{
        let dateData = res.data.results;
        let sunsetTime = new Date(dateData.sunset);
        let sunsetHours;
        if (sunsetTime.getHours() > 12){
          sunsetHours = sunsetTime.getHours() - 12;
        }
        setTime(`${sunsetHours}:${sunsetTime.getMinutes()}`);
      })
      .catch((e)=>{
        console.log(e);
      })
    }
    else{
      Alert.alert("Location not authorized. Please allow location.")
    }
  }

  return (
    <View style={styles.container}>
      <Text>The current time is </Text>
      <Text>Today's Sunset is at {time} PM</Text>
      <Button title="Click Me" 
      onPress={()=>getSunsetTime()} 
      />
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
});
