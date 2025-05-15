import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
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
      <Tabs.Screen name="index" options={{ title: '' }} />
      <Tabs.Screen name="profile/Profile" options={{ title: '' }} />
      <Tabs.Screen name="settings/settings" options={{ title: '' }} />
      <Tabs.Screen name="todolist/TodoList" options={{ title: '' }} />
    </Tabs>
  );
}
