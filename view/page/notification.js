import React from "react";
import { View, Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import s from "../public/styles";
import { MaterialIconsw } from "@expo/vector-icons";

import Header from "../component/header";
import Card from "../component/card";
import NarBar from "../component/navBar";

const SettingScreen = () => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("Load");
  };

  return (
    <View style={[s.f100]}>
      <View style={[s.f100]}>
        {/* <Header /> */}
        <View style={[s.f90, s.bg_darkBlue]}>
          <View style={[s.f100, s.bg_gray, s.pt2, s.pr1, s.pl1]}>
            <Card>
              <Text>Home Screen</Text>
            </Card>

            <Button title="Go to Home Sub Screen" onPress={pressHandler} />
          </View>
        </View>
      </View>
    </View>
  );
};
export default SettingScreen;
