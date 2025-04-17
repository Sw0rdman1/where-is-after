import { useColors } from '@/hooks/useColors';
import { forwardRef } from 'react';
import { StyleSheet, Text, Touchable, TouchableOpacity } from 'react-native'

interface ButtonProps {
    onPress?: any;
    title: string;
    color?: 'primary' | 'secondary';
    disabled?: boolean;

}

const Button: React.FC<ButtonProps> = forwardRef(({ title, onPress, disabled, color = 'primary' }, ref) => {
    const { tint, tintLowOpacity } = useColors()

    const backgroundColor = color === 'primary' ? tint : 'transparent'
    const textColor = color === 'primary' ? 'white' : tint


    return (
        <TouchableOpacity
            disabled={disabled}
            onPress={onPress}
            style={[styles.buttonContainer,
            { backgroundColor: disabled ? tintLowOpacity : backgroundColor },
            { borderWidth: color === 'secondary' ? 1 : 0 },
            { borderColor: color === 'secondary' ? tint : 'transparent' }
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
        height: 48,
        borderRadius: 15,
        marginVertical: 5,
        justifyContent: 'center',
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
    },
})