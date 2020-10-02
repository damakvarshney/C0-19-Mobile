import React from "react";
import { View, StyleSheet, Text } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const CountryDetail = ({ valueAsked, valueAnswered, answeredTexStyle }) => {
  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  return (
    <View style={styles.container}>
      <Text style={styles.askedText}>{valueAsked}</Text>
      <Text style={[styles.answeredText, answeredTexStyle]}>
        {numberWithCommas(valueAnswered)}
      </Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 5,
    justifyContent: "center",
  },
  askedTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  answeredTextContainer: {
    flex: 1,
    justifyContent: "flex-end",
    flexDirection: "row",
  },
  askedText: {
    fontSize: 14,
    color: "#ffffff",
  },
  answeredText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CountryDetail;
