import React from "react";
import { View, Button, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";
import s from "../public/styles";
import { MaterialIconsw } from "@expo/vector-icons";

import Header from "../component/header";
import Card from "../component/card";
import NarBar from "../component/navBar";
import Router from "../page/root";

const Skeleton = () => {
  const navigation = useNavigation();
  const pressHandler = () => {
    navigation.navigate("Load");
  };

  return (
    <View style={[s.f100]}>
      <View style={[s.f100]}>
        <Router />
      </View>
      <NarBar />
    </View>
  );
};
export default Skeleton;
