import React from "react";
import { View, Text, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Router from "./view/router/router";

// Component chính của ứng dụng
const App = () => {
  return <Router />;
};

export default App;
