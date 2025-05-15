import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Settings = () => {
    const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Settings Screen</Text>
      <Text>Configure your preferences and app settings here.</Text>
      <View style={styles.btn}>
              <Button
                title="Go to TodoList"
                onPress={() => router.push("/todolist/TodoList")}
              />
            </View>
    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
   btn: {
    padding: 10
  }
});
