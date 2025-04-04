import { AuthProvider, useAuth } from '@/context/AuthProvider';
import { GlobalProvider } from '@/context/GlobalProvider';
import { ToastProvider } from '@/context/ToastProvider';
import { cacheImages } from '@/utils/cache';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { router, Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(auth)',
};

SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();


export default function RootLayout() {
  const [appIsReady, setAppIsReady] = useState(false);
  const [fontsLoaded] = useFonts({
    'PermanentMarker': require('../assets/fonts/PermanentMarker-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHideAsync();

        const imageAssets = cacheImages([
          require('../assets/images/auth/background.jpg'),
          require('../assets/images/auth/banner.jpg'),
        ]);


        await Promise.all([...imageAssets]);
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
        SplashScreen.hideAsync();
      }
    }

    loadResourcesAndDataAsync();
  }, []);



  if (!appIsReady || !fontsLoaded) {
    return null;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <GlobalProvider>
        <AuthProvider>
          <RootLayoutNav />
        </AuthProvider>
      </GlobalProvider>
    </QueryClientProvider>
  );
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();
  const { isLoading, user } = useAuth();

  useEffect(() => {
    if (isLoading) return;

    if (user && user.isVerified) {
      const role = user.role === 'admin' ? 'admin' : 'user';
      router.replace(`/(protected)/(${role})`);
    } else if (user && !user.isVerified) {
      router.replace('/(auth)/verify');
    } else {
      router.replace('/(auth)');
    }

  }, [isLoading, user]);


  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <ToastProvider>
        <Stack screenOptions={{ headerShown: false, animation: 'fade', gestureEnabled: false }}>
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(protected)" />
        </Stack>
      </ToastProvider>
    </ThemeProvider>
  );
}
