// app/_layout.tsx
import { Tabs } from 'expo-router';

export default function Layout() {
  return (
    <Tabs>
      <Tabs.Screen name="index" options={{ title: 'Home' }} />
      <Tabs.Screen name="profile/Profile" options={{ title: 'Profile' }} />
      <Tabs.Screen name="settings/settings" options={{ title: 'Settings' }} />
      <Tabs.Screen name="todolist/TodoList" options={{ title: 'Todo List' }} />
    </Tabs>
  );
}
