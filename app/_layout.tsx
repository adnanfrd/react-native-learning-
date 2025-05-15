import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Layout() {
  return (
    <Tabs
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarActiveTintColor: '#4b0082', // Active icon color
        tabBarInactiveTintColor: 'gray',  // Inactive icon color
        tabBarStyle: {
          backgroundColor: '#ffffff', // Change tab bar background color here
          borderTopWidth: 0,          // Optional: remove top border
          elevation: 10,              // Optional: Android shadow
          shadowColor: '#000',        // Optional: iOS shadow
        },
        headerStyle: {
          backgroundColor: '#4b0082', // Change header background color here
        },
        headerTintColor: '#ffffff',    // Title & icon color in header
        headerTitleStyle: {
          fontWeight: 'bold',
        },
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
      })}
    >
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile/Profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings/settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="todolist/TodoList" options={{ title: 'Todo List' }} />
    </Tabs>
  );
}
