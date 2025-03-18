import { StyleSheet } from "react-native";
import { TextInputProps } from "../Themed";

export const ICON_SIZE = 24;

export interface InputProps extends TextInputProps {
  registration?: boolean;
  status: "empty" | "error" | "success";
  error?: string;
}

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 5,
    borderRadius: 10,
    overflow: "hidden",
    height: 55,
  },
  iconContainer: {
    height: "100%",
    width: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: "80%",
    fontSize: 20,
    fontWeight: "500",
    marginRight: 10,
    flexGrow: 1,
    color: "white",
  },
  successIcon: {
    height: 25,
    width: 25,
  },
  errorText: {
    position: "absolute",
    left: 5,
    bottom: -25,
    height: 20,
    fontSize: 13,
    fontWeight: "500",
  },
});
