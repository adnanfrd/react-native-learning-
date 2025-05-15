import { View, Text, Button, StyleSheet } from "react-native";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text style={styles.title}>🏠 Welcome to Home</Text>
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
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  btn: {
    padding: 10,
  },
});
