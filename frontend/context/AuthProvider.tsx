import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuthAPI } from '@/api/auth';
import * as Location from 'expo-location';
import { Region } from 'react-native-maps';
import { getCurrentLocation } from '@/utils/map';
import User from '@/models/User';

interface AuthContextType {
    user: User | null;
    accessToken: string | null;
    isLoading: boolean;
    registrationHandler: (email: string, displayName: string, password: string) => Promise<string>;
    loginHandler: (email: string, password: string) => Promise<void>;
    verifyHandler: (userId: string, verificationCode: string) => Promise<string>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [accessToken, setAccessToken] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { getProfile, login, register, verifyUser } = useAuthAPI();

    useEffect(() => {
        const loadAuthData = async () => {
            let userData: User | null = null;

            try {
                const storedUser = await AsyncStorage.getItem('user');
                const storedToken = await AsyncStorage.getItem('token');

                if (storedUser && storedToken) {
                    userData = await getProfile(JSON.parse(storedUser)._id);
                    setAccessToken(storedToken);

                    userData.currentLocation = await getCurrentLocation()
                }
            } catch (error) {
                console.error('Error loading auth data:', error);
            } finally {
                setUser(userData);
                setIsLoading(false);
            }
        };

        loadAuthData();
    }, []);


    const loginHandler = async (email: string, password: string) => {
        const data = await login(email, password);

        if (data.user && data.accessToken && data.refreshToken) {
            data.user.currentLocation = await getCurrentLocation()
            setUser(data.user);
            setAccessToken(accessToken);
            await AsyncStorage.setItem('user', JSON.stringify(data.user));
            await AsyncStorage.setItem('token', data.accessToken);
            await AsyncStorage.setItem('refreshToken', data.refreshToken);
        }
    };

    const registrationHandler = async (email: string, displayName: string, password: string) => {
        const data = await register(email, displayName, password);

        if (data.user) {
            const { user } = data;
            setUser(user);
            await AsyncStorage.setItem('user', JSON.stringify(user));
        }

        return data.message
    }

    const verifyHandler = async (userId: string, verificationCode: string) => {
        const data = await verifyUser(userId, verificationCode);

        if (data.user && data.accessToken && data.refreshToken) {
            const { user, accessToken, refreshToken } = data;
            user.currentLocation = await getCurrentLocation()
            setUser(user);
            setAccessToken(accessToken);
            await AsyncStorage.setItem('user', JSON.stringify(user));
            await AsyncStorage.setItem('token', accessToken);
            await AsyncStorage.setItem('refreshToken', refreshToken);
        }

        return data.message
    }

    const logout = async () => {
        setUser(null);
        setAccessToken(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
    };

    return (
        <AuthContext.Provider value={{ user, accessToken, isLoading, loginHandler, registrationHandler, verifyHandler, logout }}>
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
