import { View, Text, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/color";
import ExpensesList from "./ExpensesList";
import ExpensesSummary from "./ExpensesSummary";
import { LinearGradient } from "expo-linear-gradient";

function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {
  let content = <Text style={styles.infoText}>{fallbackText}</Text>;

  if (expenses.length > 0) {
    content = <ExpensesList expenses={expenses} />;
  }
  return (
    // <LinearGradient
    //     colors={['#BA5370', '#F4E2D8']}
    //     style={styles.backgroundContainer}

    //   >

    <View style={styles.outerContainer}>
      <ExpensesSummary expenses={expenses} periodName={expensesPeriod} />
      {/* <ExpensesList expenses={expenses} /> */}
      {content}
    </View>
    // </LinearGradient>
  );
}

export default ExpensesOutput;

const styles = StyleSheet.create({
  backgroundContainer: {
    flex: 1,
  },
  outerContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: GlobalStyles.colors.white,
  },
  infoText: {
    color: GlobalStyles.colors.grey,
    fontSize: 16,
    textAlign: "center",
    marginTop: 32,
  },
});
