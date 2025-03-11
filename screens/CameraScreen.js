import React, { useState, useEffect, useRef } from 'react'
import { View, Button, StyleSheet, Text } from 'react-native'
import { Camera } from 'expo-camera'

const CameraScreen = () => {
  const [hasPermission, setHasPermission] = useState(null)
  const cameraRef = useRef(null)

  useEffect(() => {
    ;(async () => {
      const { status } = await Camera.requestCameraPermissionsAsync()
      setHasPermission(status === 'granted')
    })()
  }, [])

  if (hasPermission === null) {
    return <View />
  }
  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>No access to camera</Text>
        <Button
          title="Grant Permission"
          onPress={() => Camera.requestCameraPermissionsAsync()}
        />
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} ref={cameraRef} />
      <Button
        title="Take Picture"
        onPress={() => console.log('Picture Taken!')}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
})

export default CameraScreen
