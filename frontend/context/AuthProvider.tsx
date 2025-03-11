import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface User {
    id: string;
    email: string;
    name: string;
}

interface AuthContextType {
    user: User | null;
    token: string | null;
    afterLogInHandler: (user: User, token: string) => Promise<void>;
    logout: () => Promise<void>;
    refreshToken: (newToken: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const loadAuthData = async () => {
            const storedUser = await AsyncStorage.getItem('user');
            const storedToken = await AsyncStorage.getItem('token');
            if (storedUser && storedToken) {
                setUser(JSON.parse(storedUser));
                setToken(storedToken);
            }
        };
        loadAuthData();
    }, []);

    const afterLogInHandler = async (user: User, token: string) => {
        setUser(user);
        setToken(token);
        await AsyncStorage.setItem('user', JSON.stringify(user));
        await AsyncStorage.setItem('token', token);
    };

    const logout = async () => {
        setUser(null);
        setToken(null);
        await AsyncStorage.removeItem('user');
        await AsyncStorage.removeItem('token');
    };

    const refreshToken = async (newToken: string) => {
        setToken(newToken);
        await AsyncStorage.setItem('token', newToken);
    };

    return (
        <AuthContext.Provider value={{ user, token, afterLogInHandler, logout, refreshToken }}>
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
