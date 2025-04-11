import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Network from "expo-network";
import Constants from "expo-constants";
import { ActivityIndicator, Button, StyleSheet } from "react-native";
import { refreshAuthToken } from "@/api/axios";
import { Text, View } from "@/components/Themed";
import { useColors } from "@/hooks/useColors";

const CELLULAR_IP_ADRESS = '172.20.10.11'


const API_PORT = Constants.expoConfig?.extra?.API_PORT || "3000";
const IS_PRODUCTION = Constants.expoConfig?.extra?.IS_PRODUCTION === "true";
const PRODUCTION_API_URL = Constants.expoConfig?.extra?.PRODUCTION_API_URL;

interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig { _retry?: boolean }

interface AxiosAPI {
    get: AxiosInstance["get"];
    post: AxiosInstance["post"];
    put: AxiosInstance["put"];
    delete: AxiosInstance["delete"];
}

const AxiosContext = createContext<AxiosAPI | null>(null);

export const AxiosProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [axiosInstance, setAxiosInstance] = useState<AxiosAPI | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const { tint } = useColors();

    const initializeAxios = async () => {
        try {
            let apiUrl = PRODUCTION_API_URL;

            if (!IS_PRODUCTION) {
                const networkState = await Network.getNetworkStateAsync();

                if (networkState.type === Network.NetworkStateType.CELLULAR) {
                    const cellularIp = CELLULAR_IP_ADRESS;
                    apiUrl = `http://${cellularIp}:${API_PORT}`;
                } else {
                    const ip = await Network.getIpAddressAsync();
                    if (!ip) throw new Error("No internet connection or local IP unavailable");

                    apiUrl = `http://192.168.0.24:${API_PORT}`;
                }

            }

            const instance = axios.create({
                baseURL: apiUrl,
                timeout: 5000,
                headers: { "Content-Type": "application/json" },
                withCredentials: true,
            });

            instance.interceptors.request.use(
                async (config) => {
                    const token = await AsyncStorage.getItem("token");
                    if (token) config.headers.Authorization = `Bearer ${token}`;
                    return config;
                },
                (error) => Promise.reject(error)
            );

            instance.interceptors.response.use(
                (response) => response,
                async (error: AxiosError) => {
                    const originalRequest = error.config as CustomAxiosRequestConfig;
                    if (error.response?.status === 401 && !originalRequest._retry) {
                        originalRequest._retry = true;
                        const newToken = await refreshAuthToken(apiUrl);
                        if (newToken) {
                            originalRequest.headers.Authorization = `Bearer ${newToken}`;
                            return instance(originalRequest);
                        }
                    }
                    return Promise.reject(error);
                }
            );

            const api: AxiosAPI = {
                get: instance.get.bind(instance),
                post: instance.post.bind(instance),
                put: instance.put.bind(instance),
                delete: instance.delete.bind(instance),
            };

            setAxiosInstance(api);
        } catch (err: any) {
            console.error("Axios init error:", err);
            setError(err.message || "Failed to set up Axios");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        initializeAxios();
    }, []);

    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color={tint} />
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.center}>
                <Text style={{ marginBottom: 10 }}>{error}</Text>
                <Button title="Retry" onPress={() => {
                    setError(null);
                    setLoading(true);
                    initializeAxios();
                }} />
            </View>
        );
    }

    return (
        <AxiosContext.Provider value={axiosInstance}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = (): AxiosAPI => {
    const context = useContext(AxiosContext);
    if (!context) throw new Error("useAxios must be used within AxiosProvider");
    return context;
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    }
})