import React from "react";
import { View, Text, Button, Image, TouchableOpacity } from "react-native";
import { useState } from "react";
import s from "../public/styles";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const NavBar = ({ state, descriptors, navigation }) => {
  const iconListFocus = [
    <MaterialIcons name="home" size={24} color="black" />,
    <MaterialIcons name="settings" size={24} color="black" />,
    <MaterialIcons name="notifications" size={24} color="black" />,
  ];
  const iconListNotFocus = [
    <MaterialIcons name="home" size={24} color="white" />,
    <MaterialIcons name="settings" size={24} color="white" />,
    <MaterialIcons name="notifications" size={24} color="white" />,
  ];
  return (
    <View
      style={{
        flexDirection: "row",
        backgroundColor: "white",
      }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={index}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{ flex: 1 }}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: isFocused ? "#FFF" : "#000",
                paddingTop: 10,
                paddingBottom: 10,
              }}>
              {options.tabBarIcon !== undefined ? (
                options.tabBarIcon({
                  focused: isFocused,
                })
              ) : (
                <View
                  style={{
                    flex: 1,
                    alignItems: "center",
                    justifyContent: "center",
                  }}>
                  {isFocused ? iconListFocus[index] : iconListNotFocus[index]}
                  <Text style={{ color: isFocused ? "#000" : "#FFF" }}>
                    {label}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavBar;
