import { AxiosProvider } from '@/context/ApiProvider';
import { AuthProvider } from '@/context/AuthProvider';
import { GlobalProvider } from '@/context/GlobalProvider';
import { ToastProvider } from '@/context/ToastProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, Text, useColorScheme, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface AppProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    const colorScheme = useColorScheme();

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
                <ToastProvider>
                    <QueryClientProvider client={queryClient}>
                        <AxiosProvider>
                            <AuthProvider>
                                <BottomSheetModalProvider>
                                    <GlobalProvider>
                                        {children}
                                    </GlobalProvider>
                                </BottomSheetModalProvider>
                            </AuthProvider>
                        </AxiosProvider >
                    </QueryClientProvider>
                </ToastProvider>
            </ThemeProvider>
        </GestureHandlerRootView>
    )
}

export default AppProvider

const styles = StyleSheet.create({})