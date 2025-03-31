import ToastContainer from '@/components/Toast/ToastContainer';
import React, { createContext, useContext, useState, useCallback } from 'react';

export const TOAST_DURATION = 3000;

interface ToastMessage {
    id: string;
    message: string;
    severity: 'success' | 'error' | 'info';
}

interface ToastContextType { showToast: ({ message, severity }: { message: string; severity: 'success' | 'error' | 'info'; }) => void }

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error('useToast must be used within a ToastProvider');
    }
    return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [toasts, setToasts] = useState<ToastMessage[]>([]);

    const showToast = useCallback(({ message, severity }: { message: string; severity: 'success' | 'error' | 'info'; }) => {
        const id = Math.random().toString(36).substring(7);
        setToasts((prev) => [...prev, { id, message, severity }]);

        setTimeout(() => {
            setToasts((prev) => prev.filter((toast) => toast.id !== id));
        }, TOAST_DURATION);
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <ToastContainer toasts={toasts} />
        </ToastContext.Provider>
    );
};
