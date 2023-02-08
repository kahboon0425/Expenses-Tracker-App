import axios from "axios";

const firebase =
  "https://expensestracker-8913b-default-rtdb.asia-southeast1.firebasedatabase.app";

export async function storeExpense(expenseData) {
  const response = await axios.post(firebase + "/expenses.json", expenseData);
  // id in firebase called "name"
  const id = response.data.name;
  return id;
}

export async function fetchExpenses() {
  // return a promise - fetch the data using async and await
  const response = await axios.get(firebase + "/expenses.json");

  const expenses = [];
  console.log(response.data);
  // convert data send back from firebase into an array of object
  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      description: response.data[key].description,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

export function updateExpense(id, expenseData) {
  // target the specific item by id
  return axios.put(firebase + `/expenses/${id}.json`, expenseData);
}

export function deleteExpense(id) {
  return axios.delete(firebase + `/expenses/${id}.json`);
}
