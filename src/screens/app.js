import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import DetailScreen from "./DetailScreen";
import { StatusBar } from "react-native";

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <StatusBar backgroundColor="#1a1a1a" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="search"
            component={DetailScreen}
            options={{
              headerShown: false,
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
};
export default App;
