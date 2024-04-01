import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { View } from "react-native";

import Root from "../page/root";
import NavBar from "../component/navBar";
import HomeScreen from "../page/home";
import NotificationScreen from "../page/notification";
import SettingScreen from "../page/setting";
import StatisticScreen from "../page/statistic";
import LoadScreen from "../page/load";
import Skeleton from "../page/skeleton";

const Stack = createStackNavigator();

const Router = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Skeleton"
          component={Skeleton}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Root"
          component={Root}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="NavBar" component={NavBar} />
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
    </NavigationContainer>
  );
};

export default Router;
