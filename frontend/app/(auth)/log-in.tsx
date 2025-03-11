import { login } from "@/api/auth";
import { useAuth } from "@/context/AuthProvider";
import { router } from "expo-router";
import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet, Text, TouchableOpacity } from "react-native";

const LoginScreen = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { afterLogInHandler } = useAuth();

    const handleLogin = async () => {
        try {
            console.log(email, password);

            const data = await login(email, password);

            if (data.user && data.accessToken && data.refreshToken) {
                console.log(data);
                await afterLogInHandler(data.user, data.accessToken, data.refreshToken);
                router.replace('/');
            }

        } catch (error) {
            console.error('Login failed', error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Log In</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: "bold",
        marginBottom: 20,
    },
    input: {
        width: "100%",
        padding: 15,
        marginBottom: 15,
        backgroundColor: "#fff",
        borderRadius: 8,
        borderWidth: 1,
        borderColor: "#ccc",
    },
    button: {
        width: "100%",
        backgroundColor: "#007BFF",
        padding: 15,
        alignItems: "center",
        borderRadius: 8,
    },
    buttonText: {
        color: "white",
        fontSize: 16,
        fontWeight: "bold",
    },
});

export default LoginScreen;
