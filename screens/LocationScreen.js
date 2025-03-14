import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Button } from 'react-native'
import * as Location from 'expo-location'

const LocationScreen = () => {
  const [location, setLocation] = useState(null)
  const [address, setAddress] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const [isTracking, setIsTracking] = useState(false)

  const watchSubscription = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied.')
      } else {
        await fetchLocation()
      }
    })()
    return () => {
      if (watchSubscription.current) {
        watchSubscription.current.remove()
      }
    }
  }, [])

  const fetchLocation = async () => {
    try {
      setIsLoading(true)
      setErrorMsg(null)

      const currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation)

      await reverseGeocode(currentLocation)
    } catch (err) {
      setErrorMsg('Could not fetch location.')
    } finally {
      setIsLoading(false)
    }
  }

  // Convert lat/long into a human-readable address
  const reverseGeocode = async (loc) => {
    if (!loc?.coords) return
    try {
      const { latitude, longitude } = loc.coords
      const geocoded = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      })
      if (geocoded.length > 0) {
        const { street, city, region, postalCode, country } = geocoded[0]
        setAddress(`${street}, ${city}, ${region} ${postalCode}, ${country}`)
      } else {
        setAddress('No address found')
      }
    } catch (err) {
      setAddress('Address lookup failed')
    }
  }

  const startTracking = async () => {
    if (isTracking) return
    setIsTracking(true)
    setErrorMsg(null)

    watchSubscription.current = await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.High,
        timeInterval: 2000, 
        distanceInterval: 1, 
      },
      (updatedLocation) => {
        setLocation(updatedLocation)
        reverseGeocode(updatedLocation)
      }
    )
  }

  const stopTracking = () => {
    if (!isTracking || !watchSubscription.current) return
    watchSubscription.current.remove()
    watchSubscription.current = null
    setIsTracking(false)
  }

  let content

  if (errorMsg) {
    content = <Text style={styles.errorText}>{errorMsg}</Text>
  } else if (isLoading && !location) {
    content = <Text>Loading location...</Text>
  } else if (location?.coords) {
    const { latitude, longitude, altitude, accuracy, heading, speed } =
      location.coords
    content = (
      <View style={styles.infoContainer}>
        <Text>Latitude: {latitude}</Text>
        <Text>Longitude: {longitude}</Text>
        <Text>Altitude: {altitude ?? 'N/A'}</Text>
        <Text>Accuracy: {accuracy ?? 'N/A'}</Text>
        <Text>Heading: {heading ?? 'N/A'}</Text>
        <Text>Speed: {speed ?? 'N/A'}</Text>
        {address && (
          <>
            <Text style={{ marginTop: 8, fontWeight: 'bold' }}>Address:</Text>
            <Text style={styles.addressText}>{address}</Text>
          </>
        )}
      </View>
    )
  } else {
    content = <Text>No location data yet.</Text>
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Location Screen</Text>
      {content}

      <View style={styles.buttonsContainer}>
        <Button title="Refresh Location" onPress={fetchLocation} />
        {!isTracking ? (
          <Button title="Start Tracking" onPress={startTracking} />
        ) : (
          <Button title="Stop Tracking" onPress={stopTracking} />
        )}
      </View>
    </View>
  )
}

export default LocationScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  infoContainer: {
    alignItems: 'flex-start',
    marginVertical: 12,
  },
  errorText: {
    color: 'red',
    marginBottom: 12,
  },
  addressText: {
    marginTop: 4,
    fontSize: 14,
  },
  buttonsContainer: {
    marginTop: 20,
    width: '100%',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    gap: 10,
  },
})
