import React, { useState, useEffect } from 'react'
import { View, Text, Button, Image, StyleSheet } from 'react-native'
import * as ImagePicker from 'expo-image-picker'

const ImagePickerScreen = () => {
  const [imageUri, setImageUri] = useState(null)

  useEffect(() => {
    // Request permissions on mount (both camera and media library)
    ;(async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync()
      // For iOS 10+, also request media library permissions:
      const { status: mediaStatus } =
        await ImagePicker.requestMediaLibraryPermissionsAsync()
      // In a real app, you’d handle the case where they’re not granted.
    })()
  }, [])

  const handlePickImage = async () => {
    // Launch the OS’s image library.
    const result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      // In older versions of expo-image-picker, the key might be `uri` instead of `assets[0].uri`
      const uri = result.assets?.[0].uri
      setImageUri(uri)
    }
  }

  const handleTakePhoto = async () => {
    // Launch the OS’s camera.
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      quality: 1,
    })
    if (!result.canceled) {
      const uri = result.assets?.[0].uri
      setImageUri(uri)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Pick or Take a Photo</Text>
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
  image: {
    width: 300,
    height: 300,
    marginVertical: 16,
  },
})
