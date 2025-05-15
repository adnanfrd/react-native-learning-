import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🏠 Welcome to Home</Text>
            <Text>Welcome to your App!</Text>
      
      <View style={styles.btn}>
        <Button
          title="Go to Profile"
          onPress={() => router.push("/profile/Profile")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
    container :{
       flex: 1,
       justifyContent: 'center',
       alignItems:'center',
       backgroundColor: '#F3F4F6',

    },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btn: {
    padding: 10,
  },
});
