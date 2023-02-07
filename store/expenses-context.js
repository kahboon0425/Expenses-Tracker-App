import { createContext, useReducer } from "react";

const dummyExpenses = [
  {
    id: "A1",
    description: "A book",
    amount: 14.5,
    date: new Date("2022-02-09"),
  },
  {
    id: "A2",
    description: "Another book",
    amount: 18.0,
    date: new Date("2022-07-09"),
  },
  {
    id: "A3",
    description: "third book",
    amount: 10.0,
    date: new Date("2022-08-17"),
  },
  {
    id: "A4",
    description: "Fourth book",
    amount: 20.0,
    date: new Date("2022-05-17"),
  },
  {
    id: "A5",
    description: "Sixth book",
    amount: 20.0,
    date: new Date("2022-08-01"),
  },
  {
    id: "A6",
    description: "Sixth book",
    amount: 20.0,
    date: new Date("2022-08-01"),
  },
  {
    id: "A7",
    description: "Sixth book",
    amount: 20.0,
    date: new Date("2022-08-01"),
  },
];

export const ExpensesContext = createContext({
  expenses: [],
  addExpense: ({ description, amount, date }) => {},
  deleteExpense: (id) => {},
  updateExpense: (id, { description, amount, date }) => {},
});

// receive state and action automatically by react
// then we can check the type of action that we receive
// and we will be ask to dispatch the action later
function expensesReducer(state, action) {
  switch (action.type) {
    case "ADD":
      const id = new Date().toString() + Math.random().toString();
      return [{ ...action.payload, id: id }, ...state];
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
  const [expensesState, dispatch] = useReducer(expensesReducer, dummyExpenses);

  function addExpense(expenseData) {
    dispatch({ type: "ADD", payload: expenseData });
  }

  function deleteExpense(id) {
    dispatch({ type: "DELETE", payload: id });
  }

  function updateExpense(id, expenseData) {
    dispatch({ type: "UPDATE", payload: { id: id, data: expenseData } });
  }

  const value = {
    expenses: expensesState,
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
