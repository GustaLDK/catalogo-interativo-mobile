import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#2563eb',
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Masculino',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="male" size={24} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="explore"
        options={{
          title: 'Feminino',
          tabBarIcon: ({ color }) => (
            <FontAwesome name="female" size={24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}