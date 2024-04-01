import React from "react";
import { View, Text, Button, Image, TouchableHighlight } from "react-native";
import { useState } from "react";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import Card from "../component/card";
import s from "../public/styles";
const Header = () => {
  const navigation = useNavigation();
  const [user, setUser] = useState({ name: "Đạt Nguyễn", role: "Chủ nhà" });

  return (
    <View style={[s.bg_gray, s.f20]}>
      <View style={[s.bg_darkBlue, s.f100, s.fRow, s.alCenter, s.roundedbl50]}>
        <View style={[s.f40, s.p1, s.ml1]}>
          <View style={[s.f10]}>
            <Image
              source={require("../public/assets/wolf.png")}
              style={[s.h100, s.w100, s.rounded10]}
            />
          </View>
        </View>
        <View style={[s.f80]}>
          <View style={[s.fCol]}>
            <Text style={[s.textLeft, s.h3, s.bold, s.c_white]}>
              {user.name}
            </Text>
            <Text style={[s.textLeft, s.c_white, s.h5, s.mt1]}>
              {user.role}
            </Text>
          </View>
        </View>
        <TouchableHighlight>
          <View style={[s.f20, s.mr2]}>
            <View
              style={[
                s.card,
                s.rounded50,
                s.p1,
                s.w50,
                s.h50,
                s.alCenter,
                s.juCenter,
              ]}>
              <Ionicons name="settings-sharp" size={24} color="black" />
            </View>
          </View>
        </TouchableHighlight>
      </View>
    </View>
  );
};

export default Header;
