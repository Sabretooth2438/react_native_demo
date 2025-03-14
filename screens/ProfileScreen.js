import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'

const ProfileScreen = () => {
  // Dummy user info
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    bio: 'Software engineer with a passion for learning new technologies.',
    avatarUrl:
      'https://media.istockphoto.com/id/610003972/vector/vector-businessman-black-silhouette-isolated.jpg?s=612x612&w=0&k=20&c=Iu6j0zFZBkswfq8VLVW8XmTLLxTLM63bfvI6uXdkacM=',
  }

  return (
    <View style={styles.container}>
      <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.email}>{user.email}</Text>
      <Text style={styles.bio}>{user.bio}</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  avatar: {
    width: 250,
    height: 250,
    borderRadius: 200,
    marginBottom: 16,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  email: {
    fontSize: 18,
    color: '#888',
    marginBottom: 12,
  },
  bio: {
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    marginHorizontal: 16,
  },
})
