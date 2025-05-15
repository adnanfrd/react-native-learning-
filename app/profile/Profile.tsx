import { View, Text, StyleSheet, Button } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const Profile = () => {

  const router = useRouter();
  return (
    <View style={styles.container}>
      <Text style={styles.title}>👤 Profile Screen</Text>
      <Text>Welcome to your profile! Here you can manage your account details.</Text>
      <View style={styles.btn}>
       <Button  title="Go to Settings" onPress={() => router.push('/settings/settings')} />
      </View>
    </View>
  );
};

export default Profile;

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
