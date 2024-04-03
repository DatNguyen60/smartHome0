import React from "react";
import { View, Text, Button, Image } from "react-native";
import { useState } from "react";
import s from "../public/styles";
import { Entypo } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";
import { FontAwesome5 } from "@expo/vector-icons";
import { TouchableWithoutFeedback } from "react-native-web";
import { useNavigation } from "@react-navigation/native";

const NavBar = ({ state, descriptors, navigation }) => {
  const navigation = useNavigation();
  const [page, setPage] = useState("Home");

  const pressHandler = (p_page) => {
    console.log(p_page);
    setPage(p_page);
    // navigation.navigate("Root", { screen: p_page });
  };

  return (
    <View style={[s.bg_darkBlue, s.f10]}>
      <View
        style={[
          s.fRow,
          s.f100,
          s.alCenter,
          s.juCenter,
          s.hFull,
          {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 0 },
            shadowRadius: 4,
            shadowOpacity: 0.3,
          },
        ]}>
        <View
          style={
            page == "Home"
              ? [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter, s.bg_white]
              : [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter]
          }>
          <TouchableWithoutFeedback onPress={() => pressHandler("Home")}>
            <View style={[s.alCenter]}>
              <Entypo name="home" size={24} color="black" />
              <Text style={[s.textCenter]}>Trang chủ</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={
            page == "Statistic"
              ? [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter, s.bg_white]
              : [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter]
          }>
          <TouchableWithoutFeedback onPress={() => pressHandler("Statistic")}>
            <View style={[s.alCenter]}>
              <Ionicons name="stats-chart-sharp" size={24} color="black" />
              <Text style={[s.textCenter]}>Hiệu suất</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={
            page == "Notification"
              ? [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter, s.bg_white]
              : [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter]
          }>
          <TouchableWithoutFeedback
            onPress={() => pressHandler("Notification")}>
            <View style={[s.alCenter]}>
              <Ionicons name="notifications" size={24} color="black" />
              <Text style={[s.textCenter]}>Thông báo</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
        <View
          style={
            page == "Setting"
              ? [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter, s.bg_white]
              : [s.f100, s.fCol, s.hFull, s.alCenter, s.juCenter]
          }>
          <TouchableWithoutFeedback onPress={() => pressHandler("Setting")}>
            <View style={[s.alCenter]}>
              <FontAwesome5 name="sliders-h" size={24} color="black" />
              <Text style={[s.textCenter]}>Thiết lập</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    </View>
  );
};

export default NavBar;
