import { Text } from 'react-native';
import { Redirect, Stack, useRouter } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';
import { useEffect } from 'react';

export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (!user) {
    return <Redirect href="/(auth)" />;
  }

  return (
    <Stack initialRouteName='(user)'>
      <Stack.Screen name="(user)" options={{ headerShown: false }} />
      <Stack.Screen name="(admin)" options={{ headerShown: false }} />
    </Stack>
  );
}
