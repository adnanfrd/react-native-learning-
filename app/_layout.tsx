import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  Image,
  Pressable,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/Feather';

type Task = {
  text: string;
  done: boolean;
};

export default function App(): JSX.Element {
  const [task, setTask] = useState<string>('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [editIndex, setEditIndex] = useState<number | null>(null);

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

  const handleAddOrUpdate = () => {
    if (!task.trim()) return;

    if (editIndex !== null) {
      const updated = [...tasks];
      updated[editIndex] = { ...updated[editIndex], text: task };
      setTasks(updated);
      setEditIndex(null);
    } else {
      const newTask: Task = { text: task.trim(), done: false };
      setTasks(prev => [...prev, newTask]);
    }

    setTask('');
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
    if (editIndex === index) {
      setEditIndex(null);
      setTask('');
    }
  };

  const editTask = (index: number) => {
    setTask(tasks[index].text);
    setEditIndex(index);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/images/splash-icon.png')}
        style={styles.banner}
        resizeMode="contain"
      />

      <Text style={styles.title}>📋 To-Do List</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter a task"
          value={task}
          onChangeText={setTask}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddOrUpdate}>
          <Icon
            name={editIndex !== null ? 'check' : 'plus'}
            size={22}
            color="#fff"
          />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scroll}>
        {tasks.map((item, index) => (
          <View
            key={index}
            style={[
              styles.taskItem,
              item.done && { backgroundColor: '#D1FAE5' },
            ]}
          >
            <Pressable style={{ flex: 1 }} onPress={() => toggleTask(index)}>
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
            </Pressable>

            <View style={styles.iconContainer}>
              <Pressable onPress={() => editTask(index)} style={styles.icon}>
                <Icon name="edit-2" size={20} color="#2563EB" />
              </Pressable>
              <Pressable onPress={() => deleteTask(index)} style={styles.icon}>
                <Icon name="trash-2" size={20} color="#DC2626" />
              </Pressable>
            </View>
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
  addButton: {
    backgroundColor: '#2563EB',
    padding: 10,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scroll: {
    marginTop: 10,
  },
  taskItem: {
    backgroundColor: '#E5E7EB',
    padding: 15,
    marginBottom: 10,
    borderRadius: 6,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#111827',
  },
  iconContainer: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  icon: {
    marginLeft: 8,
    padding: 4,
  },
});
