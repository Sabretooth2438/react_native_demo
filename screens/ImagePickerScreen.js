import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, StyleSheet, Alert } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const ImagePickerScreen = () => {
  const [imageUri, setImageUri] = useState(null)
  const [cameraPermission, setCameraPermission] = useState(null)
  const [libraryPermission, setLibraryPermission] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    ;(async () => {
      try {
        const { status: camStatus } =
          await ImagePicker.requestCameraPermissionsAsync()
        setCameraPermission(camStatus)
        const { status: libStatus } =
          await ImagePicker.requestMediaLibraryPermissionsAsync()
        setLibraryPermission(libStatus)
      } catch {
        setErrorMsg('Could not request permissions.')
      }
    })()
  }, [])

  const handlePickImage = async () => {
    if (libraryPermission !== 'granted') {
      Alert.alert('Permission Required', 'Please allow media library access.')
      return
    }
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        quality: 1,
      })
      if (!result.canceled) {
        const uri = result.assets?.[0].uri
        setImageUri(uri)
      }
    } catch {
      setErrorMsg('Something went wrong picking an image.')
    }
  }

  const handleTakePhoto = async () => {
    if (cameraPermission !== 'granted') {
      Alert.alert('Permission Required', 'Please allow camera access.')
      return
    }
    try {
      const result = await ImagePicker.launchCameraAsync({
        allowsEditing: true,
        quality: 1,
      })
      if (!result.canceled) {
        const uri = result.assets?.[0].uri
        setImageUri(uri)
      }
    } catch {
      setErrorMsg('Something went wrong taking a photo.')
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick or Take a Photo</Text>
      {errorMsg && <Text style={styles.error}>{errorMsg}</Text>}
      {imageUri ? (
        <>
          <Image source={{ uri: imageUri }} style={styles.image} />
          <Button title="Clear" onPress={() => setImageUri(null)} />
        </>
      ) : (
        <>
          <Button title="Pick from Gallery" onPress={handlePickImage} />
          <Button title="Take a Photo" onPress={handleTakePhoto} />
        </>
      )}
    </View>
  )
}

export default ImagePickerScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    marginBottom: 12,
    fontSize: 18,
    fontWeight: 'bold',
  },
  error: {
    color: 'red',
    marginVertical: 8,
  },
  image: {
    width: 300,
    height: 300,
    marginVertical: 16,
  },
})
