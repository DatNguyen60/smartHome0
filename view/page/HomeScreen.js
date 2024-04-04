import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

const HomeScreen = () => {
  const [lightSwitch, setLightSwitch] = useState({ power: 0 });
  const [data, setData] = useState(null);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on("data", (newData) => {
      console.log("new data", newData);
      setData(newData);
    });

    return () => {
      socket.disconnect(); // Ngắt kết nối khi component unmount
    };
  }, []);

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
      <View
        style={{
          border: 1,
          margin: 10,
          padding: 10,
          shadowColor: "#fff",
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 0 },
          backgroundColor: "white",
          flexDirection: "row",
        }}>
        <Text style={{ color: "black" }}>Value form server with socket : </Text>
        <Text style={{ fontWeight: "bold", color: "black" }}>{data}</Text>
      </View>
    </View>
  );
};

export default HomeScreen;
