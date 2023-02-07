import { useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/color";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";

function ManageExpenses({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  // if params is undefined ".expenseId" is not executed and return undefined. If params is defined, we do drill into "expenseId"
  // so, if editedExpenseId is not undefined, we are editing because we have an id
  // if it is undefined, we fail to retrive an ID, which means we are adding
  const editedExpenseId = route.params?.expenseId;
  // !! lets you convert a non-Boolean value to Boolean
  // so here we have true if we are editing and false if we are adding
  const isEditing = !!editedExpenseId;

  //  take a function that should be executed, and an array of dependencies to control when this function should be re-exexuted
  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? "Edit Expense" : "Add Expense",
    });
  }, [navigation, isEditing]);

  function deleteExpenseHandler() {
    expensesCtx.deleteExpense(editedExpenseId);
    navigation.goBack();
  }

  function cancelHandler() {
    navigation.goBack();
  }

  function confirmHandler() {
    if (isEditing){
      expensesCtx.updateExpense(editedExpenseId,{description:"Test!!!", amount:29.99, date:new Date("2023-02-05")});
    }else{
      expensesCtx.addExpense({description:"Test", amount:19.99, date:new Date("2023-02-06")});
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" onPress={cancelHandler}>
          Cancel
        </Button>
        {/* Check if "isEditing" is true. if it is true display Update otherwise display Add button*/}
        <Button style={styles.button} onPress={confirmHandler}>
          {isEditing ? "Update" : "Add"}
        </Button>
      </View>
      {/*  check if isEditing == True, and if it is true, display icon button  */}
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.primary600}
            size={36}
            onPress={deleteExpenseHandler}
          />
        </View>
      )}
    </View>
  );
}

export default ManageExpenses;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary300,
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
  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.primary600,
    alignItems: "center",
  },
});
