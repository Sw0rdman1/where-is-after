import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axios';
import { User } from '@/context/AuthProvider';

export const register = async (email: string, password: string) => {
    try {
        const response = await api.post('/register', { email, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response?.data?.message) {
                const errorMessage = error.response.data.message;
                if (Array.isArray(errorMessage)) {
                    throw new Error(errorMessage[0]);
                } else if (typeof errorMessage === 'string') {
                    throw new Error(errorMessage);
                }
            }
            throw 'Something went wrong. Please try again.';
        }
        throw 'Network error. Please check your connection.';
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/login', { email, password });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'Login failed. Please try again.';
        }
        throw 'Network error. Please check your connection.';
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        console.error("Error getting token:", error);
        return null;
    }
};

export const verifyUser = async (user: User, verificationCode: string) => {
    try {
        const response = await api.post('/verify', { userId: user._id, verificationCode });
        return response.data;
    } catch (error) {

        if (axios.isAxiosError(error)) {
            console.log('Error verifying user:', error.response?.data?.message);
            throw error.response?.data?.message || 'Verification failed. Please try again.';
        }
        throw 'Network error. Please check your connection.';
    }
}

export const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'refreshToken']); // Ensure refreshToken is removed
};
