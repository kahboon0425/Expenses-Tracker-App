import { View, Text, FlatList, StyleSheet } from "react-native";
import { GlobalStyles } from "../../constants/color";
import ExpensesItem from "./ExpensesItem";

function ExpensesList({ expenses }) {
  function expensesRenderHandler(itemData) {
    return (
      // <View style={styles.itemContainer}>
      //     <View style={styles.leftContainer}>
      //         <Text style={styles.description}>{itemData.item.description}</Text>
      //         <Text style={styles.date}>{itemData.item.date.toLocaleString()}</Text>
      //     </View>
      //     <View style={styles.priceContainer}>
      //         <Text style={styles.amount}>RM {itemData.item.amount.toFixed(2)}</Text>
      //     </View>
      // </View>

      <ExpensesItem {...itemData.item} />
    );
  }

  return (
    <FlatList
      data={expenses}
      renderItem={expensesRenderHandler}
      keyExtractor={(item) => item.id}
    />
  );
}

export default ExpensesList;
