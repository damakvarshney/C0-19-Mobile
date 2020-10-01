import React from "react";
import { View, StyleSheet, Text } from "react-native";

const CountryDetail = ({ valueAsked, valueAnswered }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.askedText}>{valueAsked}</Text>
      <Text style={styles.answeredText}>{valueAnswered}</Text>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: "100%",
    padding: 10,
    justifyContent: "flex-start",
    flexDirection: "row",
  },
  askedText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000000",
    marginEnd: 10,
  },
  answeredText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#707070",
    marginStart: 10,
  },
});

export default CountryDetail;
