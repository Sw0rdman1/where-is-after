import {
  AntDesign,
  Entypo,
} from "@expo/vector-icons";
import { Text } from "../Themed";
import { ICON_SIZE, InputProps, styles } from "./common";
import { useColors } from "@/hooks/useColors";
import { BlurView } from "expo-blur";
import { TextInput, View } from "react-native";
import { useMemo, useState } from "react";

const EmailInput: React.FC<InputProps> = ({
  registration,
  status,
  error,
  ...props
}) => {
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
        <Entypo name={"email"} size={ICON_SIZE} color={color} />
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
          autoComplete="email"
          textContentType="emailAddress"
          importantForAutofill="yes"
          placeholder="Email"
          keyboardType="email-address"
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

export default EmailInput;
