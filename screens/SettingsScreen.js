import React, { useState } from 'react'
import { View, Text, StyleSheet, Switch } from 'react-native'

const SettingsScreen = () => {
  // Example settings data: label + boolean value
  const [settings, setSettings] = useState([
    { id: '1', label: 'Enable Notifications', value: true },
    { id: '2', label: 'Dark Mode', value: false },
    { id: '3', label: 'Location Access', value: true },
    { id: '4', label: 'Sounds', value: true },
    { id: '5', label: 'Auto-Update', value: false },
    { id: '6', label: 'Disable Animations', value: false },
    { id: '7', label: 'Allow Friend Requests', value: true },
  ])

  const toggleSwitch = (id) => {
    setSettings((prevSettings) =>
      prevSettings.map((setting) =>
        setting.id === id ? { ...setting, value: !setting.value } : setting
      )
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      {settings.map((setting) => (
        <View key={setting.id} style={styles.settingRow}>
          <Text style={styles.settingLabel}>{setting.label}</Text>
          <Switch
            trackColor={{ false: '#999', true: '#666' }}
            thumbColor={setting.value ? '#ccc' : '#f4f3f4'}
            ios_backgroundColor="#999"
            value={setting.value}
            onValueChange={() => toggleSwitch(setting.id)}
          />
        </View>
      ))}
    </View>
  )
}

export default SettingsScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    marginVertical: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  settingLabel: {
    fontSize: 16,
  },
})
