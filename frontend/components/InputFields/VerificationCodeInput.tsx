import { BlurView } from 'expo-blur';
import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet, Alert } from 'react-native';

interface Props {
    userId: string,
    code: string[];
    setCode: (code: string[]) => void;
    submitCode: (values: { userId: string, verificationCode: string[] }) => void;

}

const VerificationCodeInput: React.FC<Props> = ({ userId, code, setCode, submitCode }) => {
    const inputs = useRef<(TextInput | null)[]>([]);

    const handleChange = (text: string, index: number) => {
        if (!/^[0-9]?$/.test(text)) return;
        const newCode = [...code];
        newCode[index] = text;
        setCode(newCode);

        if (text && index < 5) {
            inputs.current[index + 1]?.focus();
        }

        if (newCode.every(num => num !== '')) {
            submitCode({ userId, verificationCode: newCode });
        }
    };

    const handleKeyPress = (event: any, index: number) => {
        if (event.nativeEvent.key === 'Backspace' && !code[index] && index > 0) {
            inputs.current[index - 1]?.focus();
        }
    };

    // const submitCode = async (verificationCode: string) => {
    //     try {
    //         // Replace with your API call
    //         const response = await fetch('https://your-api.com/verify', {
    //             method: 'POST',
    //             headers: { 'Content-Type': 'application/json' },
    //             body: JSON.stringify({ code: verificationCode })
    //         });
    //         const data = await response.json();
    //         Alert.alert('Verification', data.message);
    //     } catch (error) {
    //         Alert.alert('Error', 'Failed to verify code.');
    //     }
    // };

    return (
        <View style={styles.container}>
            {code.map((digit, index) => (
                <BlurView key={index} intensity={50} tint="light" style={styles.inputContainer}>
                    <TextInput
                        key={index}
                        ref={(ref) => (inputs.current[index] = ref)}
                        style={styles.input}
                        value={digit}
                        onChangeText={(text) => handleChange(text, index)}
                        onKeyPress={(event) => handleKeyPress(event, index)}
                        keyboardType="numeric"
                        maxLength={1}
                        returnKeyType="done"
                    />
                </BlurView>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 10,
    },
    inputContainer: {
        borderRadius: 5,
        width: 40,
        height: 50,
        overflow: 'hidden'
    },
    input: {
        height: 50,
        width: 40,
        textAlign: 'center',
        fontSize: 24,
        borderRadius: 5,
        color: 'white',
        fontWeight: 'bold',
    },
});

export default VerificationCodeInput;