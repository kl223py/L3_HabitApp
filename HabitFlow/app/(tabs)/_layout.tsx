import { Tabs } from 'expo-router';
import React from 'react';

import { HapticTab } from '@/components/haptic-tab';
import { IconSymbol } from '@/components/ui/icon-symbol';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarStyle: { backgroundColor: '#7B61FF', borderTopColor: '#7B61FF' },
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
      }}>
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Habits',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="checkmark.seal.fill" color={color} />,
          headerShown: true,
          headerTitle: 'Habits',
          headerTitleAlign: 'center',
          headerTitleStyle: { fontSize: 30, color: '#fff' },
          headerStyle: { backgroundColor: '#7B61FF' },
          headerTintColor: '#fff',
        }}
      />
    </Tabs>
  );
}
