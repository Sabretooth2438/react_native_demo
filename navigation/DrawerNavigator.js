import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import TabNavigator from './TabNavigator'
import CameraScreen from './CameraScreen'
import LocationScreen from './LocationScreen'

const Drawer = createDrawerNavigator()

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Tabs" component={TabNavigator} />
      <Drawer.Screen name="Camera" component={CameraScreen} />
      <Drawer.Screen name="Location" component={LocationScreen} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator
