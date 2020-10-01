import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, Image, FlatList } from "react-native";
import CountryDetail from "./../components/CountryDetail";
import SearchBar from "./../components/SearchBar";
import Screen from "./../components/Screen";
import { create } from "apisauce";
import _ from "lodash";

const SearchScreen = () => {
  const [term, setTerm] = useState("");
  const [data, setData] = useState(null);
  const [availability, setAvailability] = useState(true);
  const [newArray, setNewArray] = useState([]);
  const [listSingle, setListSingle] = useState(false);

  const clientApi = create({
    baseURL: "https://corona.lmao.ninja/v2/countries?yesterday=&sort=",
  });
  const get = async (url, setValue) => {
    await clientApi.get(url).then((response) => {
      const retrievedData = response.data;
      // console.log(response.data);
      setValue(retrievedData);
    });
  };

  useEffect(() => {
    get("/", setData);
  }, []);

  function search(searchedValue, dataArray) {
    for (var i = 0; i < dataArray.length; i++) {
      if (dataArray[i].country === searchedValue) {
        console.log("Index", i);
        setListSingle(true);
        setAvailability(false);
        return i;
      } else {
        setAvailability(true);
        setListSingle(false);
      }
    }
  }

  const setSearchedValue = (value, dataArray) => {
    const searchIndex = search(value, dataArray);
    const anyArray = _.toArray(data);
    const values = _.slice(anyArray, searchIndex, searchIndex + 1);
    setNewArray(values);
  };

  return (
    <Screen style={styles.container}>
      <SearchBar
        term={term}
        onTermChange={(newTerm) => setTerm(newTerm)}
        onTermSubmit={() => setSearchedValue(term, data)}
      />
      {availability && (
        <FlatList
          data={data}
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
                valueAsked="Total Population :"
                valueAnswered={item.population}
              />
              <CountryDetail
                valueAsked="Total Case :"
                valueAnswered={item.cases}
              />
              <CountryDetail
                valueAsked="Total Deaths :"
                valueAnswered={item.deaths}
              />
              <CountryDetail
                valueAsked="Total Recovered :"
                valueAnswered={item.recovered}
              />
              <CountryDetail
                valueAsked="Total Active :"
                valueAnswered={item.active}
              />
            </View>
          )}
        />
      )}
      {listSingle && (
        <FlatList
          data={newArray}
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
                valueAsked="Total Population :"
                valueAnswered={item.population}
              />
              <CountryDetail
                valueAsked="Total Case :"
                valueAnswered={item.cases}
              />
              <CountryDetail
                valueAsked="Total Deaths :"
                valueAnswered={item.deaths}
              />
              <CountryDetail
                valueAsked="Total Recovered :"
                valueAnswered={item.recovered}
              />
              <CountryDetail
                valueAsked="Total Active :"
                valueAnswered={item.active}
              />
            </View>
          )}
        />
      )}
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: `100%`,
    height: `100%`,
    padding: 5,
  },
  flatList: {
    alignSelf: "flex-end",
    width: "100%",
    height: "90%",
  },
  country_container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "baseline",
  },

  country_name: {
    fontWeight: "bold",
    fontSize: 30,
    marginRight: 5,
  },
  country_code: {
    fontWeight: "bold",
    fontSize: 14,
    paddingBottom: 5,
  },
  flag_image: {
    width: 300,
    height: 200,
    backgroundColor: "#1e90ff",
    marginVertical: 10,
  },
});

export default SearchScreen;
