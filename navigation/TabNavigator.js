import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../screens/HomeScreen'
import LocationScreen from '../screens/LocationScreen'
import ImagePickerScreen from '../screens/ImagePickerScreen'

const Tab = createBottomTabNavigator()

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Location" component={LocationScreen} />
      <Tab.Screen name="Camera" component={ImagePickerScreen} />
    </Tab.Navigator>
  )
}

export default TabNavigator
