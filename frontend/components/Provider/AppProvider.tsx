import { AxiosProvider } from '@/context/ApiProvider';
import { AuthProvider } from '@/context/AuthProvider';
import { GlobalProvider } from '@/context/GlobalProvider';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyleSheet, Text, View } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler';

interface AppProviderProps {
    children: React.ReactNode;
}

const queryClient = new QueryClient();

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
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
        </GestureHandlerRootView>
    )
}

export default AppProvider

const styles = StyleSheet.create({})