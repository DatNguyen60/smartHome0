import React from "react";
import { View, Text, Button } from "react-native";

const NotificationsScreen = ({ changeScreen }) => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
      }}>
      <Text style={{ fontWeight: "bold" }}>Notifications</Text>
      <Text>Testing for tab navigation</Text>
    </View>
  );
};

export default NotificationsScreen;
