import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/color";

function ExpensesSummary({ expenses, periodName }) {
  // get individual item out of the expenses
  // seceond argument is the starting value
  //sum =0, then the
  const expensesSum = expenses.reduce((sum, expense) => {
    return sum + expense.amount;
  }, 0);

  return (
    <View style={styles.titleContainer}>
      <Text style={styles.titleColor}>{periodName}</Text>
      <Text style={styles.textColor}>RM {expensesSum.toFixed(2)}</Text>
    </View>
  );
}

export default ExpensesSummary;

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: "white",
    borderColor: GlobalStyles.colors.primary400,
    borderWidth: 2,
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
  },
  titleColor: {
    fontSize: 18,
    color: GlobalStyles.colors.primary400,
  },

  textColor: {
    fontSize: 20,
    color: GlobalStyles.colors.primary500,
    fontWeight: "bold",
  },
});
