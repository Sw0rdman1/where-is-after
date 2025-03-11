import { Text } from 'react-native';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import { useEffect } from 'react';

export default function AppLayout() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      if (user.role === 'admin') {
        router.replace('/(protected)/(admin)');
      } else if (user.role === 'user') {
        router.replace('/(protected)/(user)');
      }
    }
  }, [user, router]);

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/log-in" />;
  }

  return (
    <Stack>
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
  );
}
