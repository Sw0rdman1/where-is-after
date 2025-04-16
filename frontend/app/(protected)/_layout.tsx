import { ProtectedRoute } from '@/components/Middleware/middleware';
import { Stack } from 'expo-router';

export default function AppLayout() {

  return (
    <ProtectedRoute>
      <Stack initialRouteName='(user)'>
        <Stack.Screen name="(user)" options={{ headerShown: false }} />
        <Stack.Screen name="(venue)" options={{ headerShown: false }} />
      </Stack>
    </ProtectedRoute>
  );
}
