import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TextInput,
  Button,
  ScrollView,
} from "react-native";

export default function RootLayout() {
  const [task, setTask] = useState("");
const [tasks, setTasks] = useState<string[]>([]);

  const handleAddTask = () => {
    if(task.trim()){
      setTasks([...tasks, task]);
      setTask('');
    }
    console.log("Button pressed !!!");
  };
  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/images/splash-icon.png")}
        style={styles.banner}
        resizeMode="contain"
      />
      <Text style={styles.title}>To-Do List</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <Button title="Add" onPress={handleAddTask} />
      </View>
      <ScrollView style={styles.scroll}>
        {tasks.map((item, index) => (
            <View key={index} style={styles.taskItem} >
            <Text style={styles.taskText}>• {item}</Text>
            </View>
          
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F3F4F6",
  },
  banner: {
    width: "100%",
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 10,
    textAlign: "center",
    color: "#111827",
  },
  inputContainer: {
    flexDirection: "row",
    marginBottom: 20,
    alignItems: "center",
  },
  input: {
    flex: 1,
    borderColor: "#D1D5DB",
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: "#FFF",
  },
  scroll: {
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: "#E5E7EB",
    padding: 15,
    marginBottom: 10,
    borderRadius: 6,
  },
  taskText: {
    fontSize: 16,
    color: "#111827",
  },
});
