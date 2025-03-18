import { AntDesign, Entypo, Ionicons } from "@expo/vector-icons";
import { Text } from "../Themed";
import { ICON_SIZE, InputProps, styles } from "./common";
import { useColors } from "@/hooks/useColors";
import { BlurView } from "expo-blur";
import { TextInput, View } from "react-native";
import { useMemo, useState } from "react";
import Fontisto from "@expo/vector-icons/Fontisto";

const PasswordInput: React.FC<InputProps> = ({ status, error, ...props }) => {
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
    <BlurView style={styles.container} intensity={80} tint="dark">
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
        {secureTextEntry ? (
          <Ionicons
            name="eye-off"
            size={ICON_SIZE}
            color={placeholderText}
            onPress={() => setSecureTextEntry(false)}
          />
        ) : (
          <Ionicons
            name="eye"
            size={ICON_SIZE}
            color={placeholderText}
            onPress={() => setSecureTextEntry(true)}
          />
        )}
        {status === "error" && error && (
          <Text style={[styles.errorText, { color: errorColor }]}>{error}</Text>
        )}
      </View>
      <View style={{ width: 25 }} />
    </BlurView>
  );
};

export default PasswordInput;
