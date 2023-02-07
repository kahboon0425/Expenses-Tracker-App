import { View, Text, TextInput, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/color";

function Input({ label, invalid, textInputConfig, style }) {
  const inputStyles = [styles.input];

  if (textInputConfig && textInputConfig.multiline) {
    inputStyles.push(styles.inputMultiline);
  }
  if (invalid) {
    inputStyles.push(styles.invalidInput);
  }

  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.textLabel, invalid && styles.invalidLabel]}>
        {label}:{" "}
      </Text>
      <TextInput style={inputStyles} {...textInputConfig} />
    </View>
  );
}

export default Input;

const styles = StyleSheet.create({
  textLabel: {
    color: GlobalStyles.colors.blue400,
    fontSize: 15,
    margin: 5,
    fontWeight: "bold",
  },

  input: {
    backgroundColor: GlobalStyles.colors.grey,
    // marginBottom: 10,
    // marginRight:10,
    margin: 5,
    padding: 8,
    borderRadius: 5,
    opacity: 0.4,
    fontSize: 18,
  },
  inputMultiline: {
    minHeight: 100,
    textAlignVertical: "top",
  },
  invalidLabel: {
    color: "red",
  },
  invalidInput: {
    backgroundColor: GlobalStyles.colors.yellow,
  },
});
