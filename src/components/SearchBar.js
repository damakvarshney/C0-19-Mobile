import React from "react";
import { TextInput, View, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
const SearchBar = ({ term, onTermChange, onTermSubmit }) => {
  return (
    <View style={styles.backgroundStyle}>
      <Icon name="magnify" style={styles.iconStyle} />
      <TextInput
        style={styles.inputText}
        placeholder="Search your Country"
        autoCapitalize="none"
        autoCorrect={false}
        value={term}
        placeholderTextColor="#383838"
        onChangeText={(newTerm) => onTermChange(newTerm)}
        placeholderTextColor="#A9A9A9"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: `#D3D3D3`,
    height: 50,
    flexDirection: "row",
    borderRadius: 30,
    marginHorizontal: 15,
  },
  inputText: {
    flex: 1,
    fontSize: 18,
  },
  iconStyle: {
    fontSize: 35,
    alignSelf: "center",
    marginHorizontal: 15,
  },
});
export default SearchBar;
