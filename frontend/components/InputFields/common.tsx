import { StyleSheet } from "react-native";
import { TextInputProps } from "../Themed";

export const ICON_SIZE = 22;

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
    paddingHorizontal: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  input: {
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
});
