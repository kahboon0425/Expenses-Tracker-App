import { useLayoutEffect } from "react";
import { View, Text, StyleSheet, TextInput } from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import Button from "../components/UI/Button";
import IconButton from "../components/UI/IconButton";
import { GlobalStyles } from "../constants/color";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";
import ExpenseForm from "../components/ManageExpense/ExpenseForm";

function ManageExpenses({ route, navigation }) {
  const expensesCtx = useContext(ExpensesContext);

  // if params is undefined ".expenseId" is not executed and return undefined. If params is defined, we do drill into "expenseId"
  // so, if editedExpenseId is not undefined, we are editing because we have an id
  // if it is undefined, we fail to retrive an ID, which means we are adding
  const editedExpenseId = route.params?.expenseId;
  // !! lets you convert a non-Boolean value to Boolean
  // so here we have true if we are editing and false if we are adding
  const isEditing = !!editedExpenseId;

  const selectedExpense = expensesCtx.expenses.find(
    (expense) => expense.id === editedExpenseId
  );

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

  function confirmHandler(expenseData) {
    if (isEditing) {
      expensesCtx.updateExpense(editedExpenseId, expenseData);
    } else {
      expensesCtx.addExpense(expenseData);
    }

    navigation.goBack();
  }

  return (
    <View style={styles.container}>
      <ExpenseForm
        onCancel={cancelHandler}
        onSubmit={confirmHandler}
        submitButtonLabel={isEditing ? "Update" : "Add"}
        defaultValues={selectedExpense}
      />

      {/*  check if isEditing == True, and if it is true, display icon button  */}
      {isEditing && (
        <View style={styles.deleteContainer}>
          <IconButton
            icon="trash"
            color={GlobalStyles.colors.blue500}
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
    backgroundColor: GlobalStyles.colors.white,
  },

  deleteContainer: {
    marginTop: 16,
    paddingTop: 8,
    borderTopWidth: 2,
    borderTopColor: GlobalStyles.colors.blue500,
    alignItems: "center",
  },
});
