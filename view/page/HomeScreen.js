import React, { useState, useEffect } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import io from "socket.io-client";

const SERVER_URL = "http://localhost:3000";

const HomeScreen = () => {
  const [lightSwitch, setLightSwitch] = useState({ power: 0 });
  const [data, setData] = useState(null);
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socket = io(SERVER_URL);

    socket.on("data", (receiveData) => {
      console.log("new data", receiveData);
      setData(receiveData);
    });

    socket.on("connect", () => {
      console.log("connected to server");
      setSocket(socket);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const pressHandler = () => {
    if (socket) {
      setLightSwitch((prevState) => ({
        ...prevState,
        power: prevState.power === 0 ? 100 : 0,
      }));
      console.log(lightSwitch);
      socket.emit("clientData", { data: lightSwitch.power });
    }
  };

  return (
    <View
      style={{
        margin: 20,
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
      }}>
      <View
        style={{
          margin: 10,
          padding: 10,
          shadowColor: "#000",
          shadowRadius: 2,
          shadowOpacity: 0.3,
          shadowOffset: { width: 1, height: 2 },
          backgroundColor: "white",
          flexDirection: "row",
        }}>
        <Text style={{ color: "black" }}>State : </Text>
        <Text style={{ fontWeight: "bold", color: socket ? "green" : "red" }}>
          {socket ? "Conneted" : "Can not connect to server"}
        </Text>
      </View>
      {socket && (
        <View
          style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
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
              margin: 10,
              padding: 10,
              shadowColor: "#000",
              shadowRadius: 2,
              shadowOpacity: 0.3,
              shadowOffset: { width: 1, height: 2 },
              backgroundColor: "white",
              flexDirection: "row",
            }}>
            <Text style={{ color: "black" }}>
              Value form server with socket :{" "}
            </Text>
            <Text style={{ fontWeight: "bold", color: "black" }}>{data}</Text>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
