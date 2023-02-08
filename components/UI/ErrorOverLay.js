import { View, ActivityIndicator, StyleSheet, Text } from "react-native";
import { GlobalStyles } from "../../constants/color";
import Button from "./Button";

function ErrorOverlay({ message }) {
  return (
    <View style={styles.container}>
      <Text style={[styles.text, styles.title]}>An error occurred!</Text>
      <Text style={styles.text}>{message}</Text>
    </View>
  );
}

export default ErrorOverlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
    backgroundColor: GlobalStyles.colors.blue300,
  },
  text: {
    color: "white",
    textAlign: "center",
    marginBottom: 8,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 8,
  },
  message: {
    fontSize: 18,
  },
});
