import axios, { AxiosError } from 'axios';

export const handleApiError = (error: unknown): Error => {
    if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message;

        if (Array.isArray(errorMessage)) {
            return new Error(errorMessage[0]);
        } else if (typeof errorMessage === 'string') {
            return new Error(errorMessage);
        }
        return new Error('Something went wrong. Please try again.');
    }

    return new Error('Network error. Please check your connection.');
};
