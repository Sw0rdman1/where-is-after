import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";

const RUZVELTOVA_IP_ADRESS = "0.24";
const SCRIPTTIC_IP_ADRESS = `20.227`;

const DA_LI_SI_KUCI = true;
const MOBILNI_PODACI = true

let API_URL = `http://192.168.${DA_LI_SI_KUCI ? RUZVELTOVA_IP_ADRESS : SCRIPTTIC_IP_ADRESS}:3000`; // Ensure this is correct

if (MOBILNI_PODACI) {
    API_URL = `http://172.20.10.11:3000`; // Ensure this is correct 
}


const axiosInstance = axios.create({
    baseURL: API_URL,
    timeout: 5000,
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // Ensures cookies (if used) are included
});

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
    _retry?: boolean;
}

const refreshAuthToken = async () => {
    try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(`${API_URL}/auth/refresh`, { refreshToken }, { withCredentials: true });

        if (!data?.accessToken) {
            await AsyncStorage.removeItem("token");
            await AsyncStorage.removeItem("refreshToken");
            return null;
        }

        await AsyncStorage.setItem("token", data.accessToken);
        return data.accessToken;
    } catch (error) {
        await AsyncStorage.removeItem("token");
        await AsyncStorage.removeItem("refreshToken");
        return null;
    }
};

axiosInstance.interceptors.request.use(
    async (config) => {
        try {
            const token = await AsyncStorage.getItem("token");

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (error) {
            console.error("Error getting token from AsyncStorage:", error);
        }
        return config;
    },
    (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
        const originalRequest = error.config as CustomAxiosRequestConfig;

        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            const newToken = await refreshAuthToken();
            if (newToken) {
                originalRequest.headers.Authorization = `Bearer ${newToken}`;
                return axiosInstance(originalRequest);
            }
        }

        return Promise.reject(error);
    }
);

const api = {
    get: axiosInstance.get.bind(axiosInstance),
    post: axiosInstance.post.bind(axiosInstance),
    put: axiosInstance.put.bind(axiosInstance),
    delete: axiosInstance.delete.bind(axiosInstance),
};

export default api;
