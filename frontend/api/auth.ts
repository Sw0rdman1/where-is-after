import AsyncStorage from '@react-native-async-storage/async-storage';
import api from './axios';
import { handleApiError } from '@/utils/errorHandler';
import User from '@/models/User';

export const checkEmail = async (email: string) => {
    try {
        const response = await api.get('/auth/check-email', { params: { email } });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const register = async (email: string, displayName: string, password: string) => {
    try {
        const response = await api.post('/auth/register', { email, displayName, password });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const login = async (email: string, password: string) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const getToken = async () => {
    try {
        return await AsyncStorage.getItem('token');
    } catch (error) {
        throw handleApiError(error);
    }
};

export const sendVerificationCode = async (email: string) => {
    try {
        const response = await api.post('/auth/resend-verification-code', { email });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
};

export const verifyUser = async (userId: string, verificationCode: string) => {
    try {
        const response = await api.post('/auth/verify-email', { userId, verificationCode });
        return response.data;
    } catch (error) {
        throw handleApiError(error);
    }
}


export const getProfile = async (id: string) => {
    try {
        const response = await api.get('/auth/profile', { params: { id } });
        return response.data as User;
    } catch (error) {
        throw handleApiError(error);
    }
}

export const logout = async () => {
    await AsyncStorage.multiRemove(['token', 'refreshToken']); // Ensure refreshToken is removed
};
