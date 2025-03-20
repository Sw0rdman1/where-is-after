import { Text } from 'react-native';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import { useEffect } from 'react';
import { ProtectedRoute } from '@/components/Middleware/middleware';

export default function AppLayout() {

  return (
    <ProtectedRoute>
      <Stack initialRouteName='(user)'>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(admin)" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
