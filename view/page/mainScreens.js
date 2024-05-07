import React from "react";
import { View, Text } from "react-native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import HomeScreen from "./HomeScreen";
import SettingScreen from "./SettingScreen";
import NotificationsScreen from "./NotificationsScreen.js";
import NavBar from "../component/navBar";

const Tab = createBottomTabNavigator();
const Tabs = () => {
  return (
    <Tab.Navigator tabBar={(props) => <NavBar {...props} />}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
        initialParams={{ userId: "663967313c2de9ba34675f9b" }}
      />
      <Tab.Screen
        name="Setting"
        component={SettingScreen}
        options={{ headerShown: false }}
      />
      <Tab.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
};

export default Tabs;
