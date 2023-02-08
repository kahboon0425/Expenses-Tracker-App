import { createContext, useReducer } from "react";

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  setExpense: (expenses) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// receive state and action automatically by react
// then we can check the type of action that we receive
// and we will be ask to dispatch the action later
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      // already contain unique id by firebase
      return [action.payload, ...state];

    case "SET":
      const inverted = action.payload.reverse();
      return inverted;
    case "UPDATE":
      // find the item to be updated by index
      const updatableExpenseIndex = state.findIndex(
        (expense) => expense.id === action.payload.id
      );

      // extract the item to be updated
      const updatableExpense = state[updatableExpenseIndex];

      //  the item to be updated
      const updatedItem = { ...updatableExpense, ...action.payload.data };

      // current item
      const updatedExpenses = [...state];

      // overwrite the item with the updated item
      updatedExpenses[updatableExpenseIndex] = updatedItem;
      return updatedExpenses;

    case "DELETE":
      return state.filter((expense) => expense.id !== action.payload);
    default:
      return state;
  }
}

function ExpensesContextProvider({ children }) {
  // use dummyExpenses as initial value
  const [expensesState, dispatch] = useReducer(expensesReducer, []);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function setExpense(expenses) {
    dispatch({ type: "SET", payload: expenses });
  }
  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
    setExpense: setExpense,
    addExpense: addExpense,
    deleteExpense: deleteExpense,
    updateExpense: updateExpense,
  };

  return (
    <ExpensesContext.Provider value={value}>
      {children}
    </ExpensesContext.Provider>
  );
}

export default ExpensesContextProvider;
