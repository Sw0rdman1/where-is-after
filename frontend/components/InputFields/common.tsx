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
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: 'space-between',
    marginHorizontal: 5,
    paddingHorizontal: 15,
    borderRadius: 10,
    overflow: "hidden",
    height: 55,
    gap: 10,
  },
  leftContainer: {
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    gap: 10,
  },
  inputContainer: {
    height: "100%",
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    fontWeight: "500",
    color: "white",
    flex: 1,
    height: "100%",
  },

});
