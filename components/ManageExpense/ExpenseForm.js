import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { GlobalStyles } from "../../constants/color";
import Input from "./Input";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

function ExpenseForm({ onCancel, onSubmit, submitButtonLabel, defaultValues }) {
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValues ? defaultValues.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValues ? getFormattedDate(defaultValues.date) : "",
      isValid: true,
    },
    description: {
      value: defaultValues ? defaultValues.description : "",
      isValid: true,
    },
  });

  function inputChangedHandler(inputIdentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIdentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      // "+" will converts the string to a number
      amount: +inputValues.amount.value,
      date: new Date(inputValues.date.value),
      description: inputValues.description.value,
    };

    // check if input is valid
    // if expenseData.amount is not not a number(is a number) or it is an amount bigger or equal to zero, return true
    const amountIsvalid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.description.trim().length > 0;

    if (!amountIsvalid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid input", "please check your input values")
      setInputValues((curInputValues) => {
        return {
          amount: {
            value: curInputValues.amount.value,
            isValid: amountIsvalid,
          },
          date: { value: curInputValues.date.value, isValid: dateIsValid },
          description: {
            value: curInputValues.description.value,
            isValid: descriptionIsValid,
          },
        };
      });

      // return here will stop the execution of onSubmit
      return;
    }

    onSubmit(expenseData);
  }

  const formIsValid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.description.isValid;

  return (
    <View style={styles.mainContainer}>
      <View style={styles.mainTitleContainer}>
        <Text style={styles.mainTitle}> Your Expenses </Text>
      </View>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          <Input
            style={styles.rowInput}
            label="Amount"
            // invalid is true if the value is not valid
            invalid={!inputValues.amount.isValid}
            textInputConfig={{
              keyboardType: "decimal-pad",
              onChangeText: inputChangedHandler.bind(this, "amount"),
              value: inputValues.amount.value,
            }}
          />

          <Input
            style={styles.rowInput}
            label="Date"
            invalid={!inputValues.date.isValid}
            textInputConfig={{
              placeholder: "YYYY-MM-DD",
              maxLength: 10,
              onChangeText: inputChangedHandler.bind(this, "date"),
              value: inputValues.date.value,
            }}
          />
        </View>

        <Input
          label="Description"
          invalid={!inputValues.description.isValid}
          textInputConfig={{
            multiline: true,
            onChangeText: inputChangedHandler.bind(this, "description"),
            value: inputValues.description.value,
            // autoCorrect:false //default is true
            // autoCapitalize: "none"
          }}
        />
        {formIsValid && (
          <Text style={styles.errorMessage}>
            Invalid input values - please check your entered data!
          </Text>
        )}
      </View>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={onCancel}>
          Cancel
        </Button>
        {/* Check if "isEditing" is true. if it is true display Update otherwise display Add button*/}
        <Button style={styles.button} onPress={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: "5%",
  },
  mainTitleContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  mainTitle: {
    fontSize: 25,
    fontWeight: "bold",
    color: GlobalStyles.colors.blue500,
    // backgroundColor:GlobalStyles.colors.blue400,
    borderColor: GlobalStyles.colors.blue500,
    borderWidth: 2,
    paddingHorizontal: 70,
    paddingVertical: 9,
    borderRadius: 10,
  },
  outerContainer: {
    // backgroundColor: GlobalStyles.colors.yellow,
    padding: 20,
    marginBottom: 20,
    // borderRadius: 8,
    // borderWidth:1,
    // borderColor:GlobalStyles.colors.blue300,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  errorMessage: {
    textAlign: "center",
    color: "red",
    margin: 8,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
});
