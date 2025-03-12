import { useColors } from '@/hooks/useColors';
import { forwardRef } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native'

interface ButtonProps {
    onPress?: () => void;
    title: string;
    color?: 'primary' | 'secondary';
    disabled?: boolean;

}

const Button: React.FC<ButtonProps> = forwardRef(({ title, onPress, disabled, color = 'primary' }, ref) => {
    const { tint, tintLowOpacity, background, text } = useColors()

    const backgroundColor = color === 'primary' ? tint : background
    const textColor = color === 'primary' ? 'white' : text


    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.buttonContainer,
            { backgroundColor: disabled ? tintLowOpacity : backgroundColor }
            ]}
        >
            <Text style={[styles.buttonText, { color: textColor }]}>{title}</Text>
        </TouchableOpacity>
    );
})

export default Button

const styles = StyleSheet.create({
    buttonContainer: {
        width: '100%',
        height: 54,
        borderRadius: 15,
        marginVertical: 10,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 22,
        fontWeight: 'bold',
    },
})