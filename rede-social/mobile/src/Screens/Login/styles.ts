import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        marginTop: 48,
    },
    logo:{
      width: 120,
      height: 120,
    },
    text:{
        color: THEME.COLORS.TEXT,
    }
});