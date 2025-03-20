import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import { getProfile, login, register } from '@/api/auth';

export interface User {
    _id: string;
    email: string;
    isVerified: boolean;
    role: string;
}

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    loginHandler: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const loadAuthData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');
            if (storedUser && storedToken) {
                const user = await getProfile(JSON.parse(storedUser)._id);
                setUser(user);
                setAccessToken(storedToken);
            }
            setIsLoading(false);
        };
        loadAuthData();
    }, []);


    const loginHandler = async (email: string, password: string) => {
        const data = await login(email, password);

        if (data.user && data.accessToken && data.refreshToken) {
            const { user, accessToken, refreshToken } = data;
            setUser(user);
            setAccessToken(accessToken);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await AsyncStorage.setItem('token', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
        }
    };

    const logout = async () => {
        setUser(null);
        setAccessToken(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
        router.replace('/(auth)');
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, isLoading, loginHandler, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
