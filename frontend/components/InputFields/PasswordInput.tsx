import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Text } from "../Themed";
import { ICON_SIZE, InputProps, styles } from "./common";
import { useColors } from "@/hooks/useColors";
import { BlurView } from "expo-blur";
import { TextInput, TouchableOpacity, View } from "react-native";
import { useMemo, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

const PasswordInput: React.FC<InputProps> = ({ registration, status, error, ...props }) => {
  const [secureTextEntry, setSecureTextEntry] = useState(true);
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
        return "white";

      case "error":
        return errorColor;
    }
  }, [status, isFocused]);

  return (
    <BlurView style={styles.container} intensity={isFocused || status === "success" ? 80 : 50} tint="light">
      <View style={styles.iconContainer}>
        <Fontisto name="locked" size={ICON_SIZE} color={color} />
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
          autoCorrect={false}
          autoComplete="password"
          textContentType="password"
          importantForAutofill="yes"
          placeholder="Password"
          secureTextEntry={secureTextEntry}
          placeholderTextColor={placeholderText}
          keyboardType={secureTextEntry ? "default" : "visible-password"}
          returnKeyType="done"
          {...props}
        />
      </View>

      <TouchableOpacity style={styles.iconContainer} onPress={() => setSecureTextEntry((prev) => !prev)}>
        <Ionicons
          name={secureTextEntry ? "eye-off" : "eye"}
          size={ICON_SIZE}
          color={color}
        />
      </TouchableOpacity>
    </BlurView>
  );
};

export default PasswordInput;
