import { View, Text, StyleSheet, Pressable } from "react-native";
import { GlobalStyles } from "../../constants/color";
import { getFormattedDate } from "../../util/date";
import { useNavigation } from "@react-navigation/native";

function ExpensesItem({ id, description, date, amount }) {
  const navigation = useNavigation();
  function onSelectItem() {
    navigation.navigate("ManageExpenses", {
      expenseId: id,
    });
  }

  return (
    <Pressable
      onPress={onSelectItem}
      style={({ pressed }) => {
        pressed && styles.pressed;
      }}
    >
      <View style={styles.itemContainer}>
        <View style={styles.leftContainer}>
          <Text style={styles.description}>{description}</Text>
          <Text style={styles.date}>{getFormattedDate(date)}</Text>
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.amount}>RM {amount.toFixed(2)}</Text>
        </View>
      </View>
    </Pressable>
  );
}

export default ExpensesItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    // backgroundColor: GlobalStyles.colors.blue100,
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginVertical: 10,
    marginHorizontal: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: GlobalStyles.colors.blue500,
    alignItems: "center",
    // shadowColor: GlobalStyles.colors.grey,
    // shadowOpacity: 0.6,
    // elevation: 8,
    // shadowOffset: {
    //   width: 0,
    //   height: 3
    // }
  },
  leftContainer: {
    flexDirection: "column",
    marginRight: 20,
  },
  description: {
    color: GlobalStyles.colors.blue500,
    fontSize: 19,
    fontWeight: "bold",
  },
  date: {
    color: GlobalStyles.colors.blue400,
    paddingTop: 5,
    fontSize: 15,
  },
  priceContainer: {
    backgroundColor: GlobalStyles.colors.blue400,
    // opacity:.40,
    padding: 10,
    borderRadius: 10,
    shadowColor: GlobalStyles.colors.grey,
    shadowOpacity: 0.6,
    elevation: 10,
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  amount: {
    color: GlobalStyles.colors.white,
  },
});
