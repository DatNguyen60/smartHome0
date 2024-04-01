import React from "react";
import { View, Text } from "react-native";
import s from "../public/styles";

const Card = (props) => {
  return (
    <View style={[s.card, s.m1]}>
      <View style={[s.p1]}>{props.children}</View>
    </View>
  );
};

export default Card;
