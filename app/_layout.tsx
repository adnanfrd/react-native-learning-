import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

type Task = {
  text: string;
  done: boolean;
};

export default function App(): JSX.Element {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const storedTasks = await AsyncStorage.getItem('tasks');
        if (storedTasks) {
          const parsedTasks: Task[] = JSON.parse(storedTasks);
          setTasks(parsedTasks);
        }
      } catch (e) {
        console.error('Failed to load tasks', e);
      }
    };
    loadTasks();
  }, []);

  useEffect(() => {
    AsyncStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (task.trim()) {
      const newTask: Task = { text: task.trim(), done: false };
      setTasks(prev => [...prev, newTask]);
      setTask('');
    }
  };

  const toggleTask = (index: number) => {
    const updated = tasks.map((item, i) =>
      i === index ? { ...item, done: !item.done } : item
    );
    setTasks(updated);
  };

  const deleteTask = (index: number) => {
    const filtered = tasks.filter((_, i) => i !== index);
    setTasks(filtered);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('./assets/banner.png')}
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
          <Pressable
            key={index}
            onPress={() => toggleTask(index)}
            onLongPress={() => deleteTask(index)}
          >
            <View
              style={[
                styles.taskItem,
                item.done && { backgroundColor: '#D1FAE5' },
              ]}
            >
              <Text
                style={[
                  styles.taskText,
                  item.done && {
                    textDecorationLine: 'line-through',
                    color: 'green',
                  },
                ]}
              >
                • {item.text}
              </Text>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F3F4F6',
  },
  banner: {
    width: '100%',
    height: 100,
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#111827',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    alignItems: 'center',
  },
  input: {
    flex: 1,
    borderColor: '#D1D5DB',
    borderWidth: 1,
    padding: 10,
    marginRight: 10,
    borderRadius: 6,
    backgroundColor: '#FFF',
  },
  scroll: {
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    marginBottom: 10,
    borderRadius: 6,
  },
  taskText: {
    fontSize: 16,
    color: '#111827',
  },
});
