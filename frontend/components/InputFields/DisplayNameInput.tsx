import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { ICON_SIZE, InputProps, styles } from "./common";
import { useColors } from "@/hooks/useColors";
import { BlurView } from "expo-blur";
import { TextInput, View } from "react-native";
import { useMemo, useState } from "react";
import FontAwesome from '@expo/vector-icons/FontAwesome';

const DisplayNameInput: React.FC<InputProps> = ({ status, error, ...props }) => {
    const { tint, placeholderText, error: errorColor, success } = useColors();
    const [isFocused, setIsFocused] = useState(false);

    const color = useMemo(() => {
        if (isFocused) {
            return "white";
        }

        switch (status) {
            case "empty":
                return placeholderText;

            case "success":
                return success;

            case "error":
                return errorColor;
        }
    }, [status, isFocused]);

    return (
        <BlurView
            style={[styles.container, { borderColor: tint }]}
            intensity={isFocused || status === "success" ? 80 : 50}
            tint="light"
        >
            <View style={styles.iconContainer}>
                <FontAwesome name="user" size={ICON_SIZE} color={color} />
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    onSubmitEditing={(e) => {
                        setIsFocused(false);
                    }}
                    onFocus={(e) => {
                        props.onFocus && props.onFocus(e);
                        setIsFocused(true);
                    }}
                    style={[styles.input, { color }]}
                    autoCapitalize="none"
                    maxLength={50}
                    autoComplete="name"
                    importantForAutofill="yes"
                    placeholder="Display name"
                    returnKeyType="done"
                    placeholderTextColor={placeholderText}
                    {...props}
                />
                {status === "success" ? (
                    <AntDesign
                        style={styles.successIcon}
                        name="checkcircle"
                        size={ICON_SIZE}
                    />
                ) : (
                    <View style={{ width: 25 }} />
                )}
            </View>
        </BlurView>
    );
};

export default DisplayNameInput;
