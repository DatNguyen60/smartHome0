import React from "react";
import { View, Text, Button } from "react-native";

const SettingScreen = ({ changeScreen }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text style={{ fontWeight: "bold" }}>Setting</Text>
      <Text>Testing for tab navigation</Text>
    </View>
  );
};

export default SettingScreen;
