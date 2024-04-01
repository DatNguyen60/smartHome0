import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import HomeScreen from "./home";
import NotificationScreen from "./notification";
import SettingScreen from "./setting";
import StatisticScreen from "./statistic";
import LoadScreen from "./load";
import { View } from "react-native";

const Stack = createStackNavigator();

const Root = ({ navigation }) => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Notification"
        component={NotificationScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Statistic"
        component={StatisticScreen}
        options={{
          headerShown: true,
        }}
      />
      <Stack.Screen
        name="Load"
        component={LoadScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};

export default Root;
