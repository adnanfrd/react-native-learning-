import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel : false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap = 'home';

          if (route.name === 'index') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'profile/Profile') {
            iconName = focused ? 'person' : 'person-outline';
          } else if (route.name === 'settings/settings') {
            iconName = focused ? 'settings' : 'settings-outline';
          } else if (route.name === 'todolist/TodoList') {
            iconName = focused ? 'list' : 'list-outline';
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#4b0082',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile/Profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings/settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="todolist/TodoList" options={{ title: 'Todo List' }} />
    </Tabs>
  );
}
