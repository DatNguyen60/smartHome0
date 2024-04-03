import React from "react";
import { View, Text, Button, TouchableOpacity } from "react-native";
import { useState, useEffect } from "react";

const HomeScreen = ({ changeScreen }) => {
  const [lightSwitch, setLightSwitch] = useState({ power: 0 });
  const pressHandler = () => {
    setLightSwitch((prevState) => ({
      ...prevState,
      power: prevState.power === 0 ? 100 : 0,
    }));
    console.log(lightSwitch);
  };
  return (
    <View
      style={{
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}>
      <TouchableOpacity
        style={{
          width: 150,
          paddingVertical: 10,
          backgroundColor: lightSwitch.power === 0 ? "#997165" : "#73A37B",
          alignItems: "center",
        }}
        onPress={() => pressHandler()}>
        <Text style={{ color: "white", fontWeight: "bold", fontSize: 20 }}>
          {lightSwitch.power === 0 ? "Bật" : "Tắt"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
