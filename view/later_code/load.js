import { Link } from "@react-navigation/native";
import React from "react";
import { View, Text, Button } from "react-native";
import s from "../public/styles";
function LoadScreen({ navigation }) {
  const pressHandler = () => {
    navigation.goBack();
  };

  return (
    <View style={[s.f100, s.juCenter, s.alCenter, s.bg_darkBlue]}>
      <View style={[s.fRow]}>
        <Text style={[s.bold, s.h1, s.c_white]}>SMART</Text>
        <Text style={[s.bold, s.h1, s.c_black]}>HOME</Text>
      </View>
      <Button title="Go to home screen" onPress={pressHandler} />
    </View>
  );
}

export default LoadScreen;
