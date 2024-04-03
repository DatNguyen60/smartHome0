import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import MainScreens from "../page/mainScreens";
const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="MainScreens" component={MainScreens} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Router;
