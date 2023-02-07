import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

function IconButton({ icon, color, size, onPress }) {
  return (
    <Pressable style={styles.buttonContainer}>
      {/* check if button is pressed AND if it is pressed return pressed styles */}
      <Ionicons
        name={icon}
        color={color}
        size={size}
        onPress={onPress}
        styles={({ pressed }) => pressed && styles.pressed}
      />
    </Pressable>
  );
}

export default IconButton;

const styles = StyleSheet.create({
  buttonContainer: {
    padding: 6,
    marginVertical: 2,
    marginHorizontal: 8,
    borderRadius: 24,
  },
  pressed: {
    opacity: 0.75,
  },
});
