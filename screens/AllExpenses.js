import { View, Text } from "react-native";
import ExpensesOutput from "../components/expenses/ExpensesOutput";
import ExpensesSummary from "../components/expenses/ExpensesSummary";
import { ExpensesContext } from "../store/expenses-context";
import { useContext } from "react";

function AllExpenses() {
  const expensesCtx = useContext(ExpensesContext);

  return (
    <ExpensesOutput expensesPeriod="Total" expenses={expensesCtx.expenses} fallbackText="No registered expenses found!" />
  );
}

export default AllExpenses;
