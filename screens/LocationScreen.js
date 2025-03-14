import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import * as Location from 'expo-location'

const LocationScreen = () => {
  const [location, setLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.')
        return
      }
      const currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)
    })()
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Screen</Text>
      {errorMsg ? (
        <Text>{errorMsg}</Text>
      ) : (
        <Text>{JSON.stringify(location, null, 2)}</Text>
      )}
    </View>
  )
}

export default LocationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    marginBottom: 8,
    fontWeight: 'bold',
  },
})
