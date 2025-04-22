import AppProvider from '@/components/Provider/AppProvider';
import { cacheImages } from '@/utils/cache';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect, useState } from 'react';
import 'react-native-reanimated';

export { ErrorBoundary } from 'expo-router';

SplashScreen.preventAutoHideAsync();

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

  useEffect(() => {
    if (appIsReady && fontsLoaded) {
    }
  }, [appIsReady, fontsLoaded]);


  return (
    <AppProvider>
      <Stack initialRouteName='(protected)' screenOptions={{ headerShown: false, animation: 'fade', gestureEnabled: false }}>
        <Stack.Screen name="(protected)" />
        <Stack.Screen name="auth" />
        <Stack.Screen name="verify" />
      </Stack>
    </AppProvider>
  );
}

