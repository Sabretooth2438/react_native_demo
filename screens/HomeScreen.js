import React from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'

// Expanded dummy data
const DUMMY_POSTS = [
  { id: '1', title: 'First Post', content: 'This is my first post!' },
  { id: '2', title: 'Second Post', content: 'Just another example post.' },
  { id: '3', title: 'Third Post', content: 'Lorem ipsum dolor sit amet.' },
  {
    id: '4',
    title: 'React Native Tips',
    content: 'Learn about FlatList, ScrollView, and more.',
  },
  {
    id: '5',
    title: 'Expo is Great',
    content: 'Expo simplifies the RN development process!',
  },
  {
    id: '6',
    title: 'Styling in RN',
    content: 'Use StyleSheet for consistent and reusable styles.',
  },
  {
    id: '7',
    title: 'Deployment Advice',
    content: 'Test thoroughly before releasing to app stores.',
  },
]

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Home Screen</Text>
      <FlatList
        data={DUMMY_POSTS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text style={styles.postTitle}>{item.title}</Text>
            <Text style={styles.postContent}>{item.content}</Text>
          </View>
        )}
      />
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    textAlign: 'center',
  },
  postContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: '#f2f2f2',
    borderRadius: 6,
  },
  postTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  postContent: {
    fontSize: 14,
  },
})
