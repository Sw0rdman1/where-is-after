import { Text } from 'react-native';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import { useEffect } from 'react';

export default function AppLayout() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user?.role === 'user') {
      router.navigate('/(protected)/(user)');
    }

    if (user?.role === 'admin') {
      router.navigate('/(protected)/(admin)');
    }
  }, [user]);


  if (!user) {
    return <Redirect href="/log-in" />;
  }


  return (
    <Stack initialRouteName='index'>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
  );
}
