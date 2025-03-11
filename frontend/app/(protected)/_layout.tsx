import { Text } from 'react-native';
import { Redirect, Stack } from 'expo-router';
import { useAuth } from '@/context/AuthProvider';


export default function AppLayout() {
  const { user, isLoading } = useAuth();

  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  // Only require authentication within the (app) group's layout as users
  // need to be able to access the (auth) group and sign in again.
  if (!user) {
    return <Redirect href="/log-in" />;
  }

  return <Stack />;
}
