import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
  Dimensions,
} from "react-native";
import Screen from "./../components/Screen";
import SearchBar from "./../components/SearchBar";
import CountryDetail from "./../components/CountryDetail";

class DetailScreen extends React.Component {
  constructor(props) {
    super();

    this.state = {
      isLoading: true,
      text: "",
      data: [],
    };

    this.arrayHolder = [];
  }

  componentDidMount() {
    return fetch("https://corona.lmao.ninja/v2/countries?yesterday=&sort=")
      .then((response) => response.json())
      .then((responseJson) => {
        // console.log(responseJson);
        this.setState(
          {
            isLoading: false,
            data: responseJson,
          },
          () => {
            this.arrayHolder = responseJson;
          }
        );
      })
      .catch((error) => {
        console.error(error);
      });
  }

  searchData(text) {
    const newData = this.arrayHolder.filter((item) => {
      const itemData = item.country.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });

    this.setState({
      data: newData,
      text: text,
    });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{ flex: 1, paddingTop: 40, backgroundColor: "#1a1a1a" }}>
          <ActivityIndicator color="#ffffff" />
        </View>
      );
    }

    return (
      <Screen style={styles.container}>
        <SearchBar
          onTermChange={(text) => this.searchData(text)}
          term={this.state.text}
        />
        <FlatList
          data={this.state.data}
          style={styles.flatList}
          pagingEnabled
          horizontal
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={{ flex: 1, padding: 20 }}>
              <View style={styles.country_container}>
                <Text style={styles.country_name}>{item.country}</Text>
                <Text style={styles.country_code}>
                  ({item.countryInfo.iso3})
                </Text>
              </View>
              <Image
                style={styles.flag_image}
                source={{ uri: `${item.countryInfo.flag}` }}
              />
              <CountryDetail
                valueAsked={`${item.country}` + `'s` + ` Population :`}
                valueAnswered={item.population}
              />
              <CountryDetail
                valueAsked="Total Cases :"
                valueAnswered={item.cases}
              />
              <CountryDetail
                valueAsked="Deaths :"
                valueAnswered={item.deaths}
                answeredTexStyle={{ color: "#e05252" }}
              />
              <CountryDetail
                valueAsked="Recovered :"
                valueAnswered={item.recovered}
                answeredTexStyle={{ color: "#23c744" }}
              />
              <CountryDetail
                valueAsked="Active Cases:"
                valueAnswered={item.active}
              />
            </View>
          )}
        />
      </Screen>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: `100%`,
    height: `100%`,
    padding: 5,
    backgroundColor: "#1a1a1a",
  },
  flatList: {
    alignSelf: "flex-end",
  },
  country_container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },

  country_name: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#ffffff",
  },
  country_code: {
    fontWeight: "bold",
    fontSize: 14,
    paddingBottom: 5,
    marginLeft: 5,
    color: "#ffffff",
  },
  flag_image: {
    width: 300,
    height: 200,
    backgroundColor: "#1e90ff",
    marginVertical: 10,
    borderRadius: 10,
    borderColor: "#ffffff",
    borderWidth: 2,
  },
  textInput: {
    textAlign: "center",
    height: 42,
    borderWidth: 1,
    borderColor: "#009688",
    borderRadius: 8,
    backgroundColor: "#FFFF",
  },
});
export default DetailScreen;
