import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axios';
import { User } from '@/context/AuthProvider';
import { handleApiError } from '@/utils/errorHandler';

export const checkEmail = async (email: string) => {
    try {
        const response = await api.get('/check-email', { params: { email } });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const register = async (email: string, displayName: string, password: string) => {
    try {
        const response = await api.post('/register', { email, displayName, password });
        return response;
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

export const sendVerificationCode = async (email: string) => {
    try {
        const response = await api.post('/resend-verification-code', { email });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw error.response?.data?.message || 'Failed to send verification code. Please try again.';
        }
        throw 'Network error. Please check your connection.';
    }
};

export const verifyUser = async (userId: string, verificationCode: string) => {
    try {
        const response = await api.post('/verify-email', { userId, verificationCode });
        return response.data;
    } catch (error) {

        if (axios.isAxiosError(error)) {
            console.log('Error verifying user:', error.response?.data?.message);
            throw error.response?.data?.message || 'Verification failed. Please try again.';
        }
        throw 'Network error. Please check your connection.';
    }
}


export const getProfile = async (id: string) => {
    try {
        const response = await api.get('/profile', { params: { id } });
        return response.data as User;
    } catch (error) {
        throw handleApiError(error);
    }
}

export const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'refreshToken']); // Ensure refreshToken is removed
};
