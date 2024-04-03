import React from "react";
import { View, Button } from "react-native";

const NavBar = ({ changeScreen }) => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-around",
        paddingVertical: 20,
      }}>
      <Button title="Home" onPress={() => changeScreen("Home")} />
      <Button title="Notification" onPress={() => changeScreen("Noti")} />
      <Button title="Setting" onPress={() => changeScreen("Setting")} />
    </View>
  );
};

export default NavBar;
