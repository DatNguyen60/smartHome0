import React from "react";
import { View, Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import s from "../public/styles";
import { MaterialIconsw } from "@expo/vector-icons";

import Header from "../component/header";
import Card from "../component/card";
import NarBar from "../component/navBar";
import { TouchableHighlight } from "react-native-web";

const HomeScreen = () => {
  const navigation = useNavigation();
  const turnOnLight = () => {
    console.log("Light switch");
    setLight(!light);
  };
  const [light, setLight] = useState(false);
  return (
    <View style={[s.f100]}>
      <View style={[s.f100]}>
        <Header />
        <View style={[s.f90, s.bg_darkBlue]}>
          <View style={[s.f100, s.bg_gray, s.roundedtr50, s.pt2, s.pr1, s.pl1]}>
            <View style={[s.mt3]}>
              <Button
                title={light ? "Bật đèn" : "Tắt đèn"}
                color={light ? "#997165" : "#73A37B"}
                onPress={() => turnOnLight()}
              />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default HomeScreen;
