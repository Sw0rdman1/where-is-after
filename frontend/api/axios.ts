import AsyncStorage from "@react-native-async-storage/async-storage";
import axios, { AxiosError, InternalAxiosRequestConfig } from "axios";


export const refreshAuthToken = async (apiURL: string) => {
    try {
        const refreshToken = await AsyncStorage.getItem("refreshToken");
        if (!refreshToken) throw new Error("No refresh token available");

        const { data } = await axios.post(`${apiURL}/auth/refresh`, { refreshToken }, { withCredentials: true });

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

