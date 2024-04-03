import React, { useState } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import NavBar from "./navBarTest";

const Stack = createStackNavigator();

const HomeScreen = () => <Text>Home Screen Content</Text>;
const NotiScreen = () => <Text>Notification Screen Content</Text>;
const SettingScreen = () => <Text>Setting Screen Content</Text>;

const ScreenWithNavBar = () => {
  const [selectedScreen, setSelectedScreen] = useState("Home");

  const changeScreen = (screenName) => {
    console.log(screenName);
    setSelectedScreen(screenName);
  };

  return (
    <View style={{ flex: 1 }}>
      <NavBar changeScreen={changeScreen} />
      <View style={{ flex: 1 }}>
        <Stack.Navigator initialRouteName={selectedScreen}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Noti" component={NotiScreen} />
          <Stack.Screen name="Setting" component={SettingScreen} />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default ScreenWithNavBar;
