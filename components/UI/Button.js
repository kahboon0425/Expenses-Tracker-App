import { View, Pressable, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/color";

function Button({ children, onPress, mode, style }) {
  return (
    <View style={style}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => pressed && styles.pressed}
      >
        <View style={[styles.button, mode === "flat" && styles.flat]}>
          <Text style={[styles.buttonText, mode === "flat" && styles.flatText]}>
            {children}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    padding: 8,
    backgroundColor: GlobalStyles.colors.primary600,
  },
  flat: {
    backgroundColor: "transparent",
  },

  buttonText: {
    color: "white",
    textAlign: "center",
  },
  flatText: {
    color: GlobalStyles.colors.primary600,
  },
  pressed: {
    opacity: 0.75,
    backgroundColor: GlobalStyles.colors.primary50,
    borderRadius: 4,
  },
});
