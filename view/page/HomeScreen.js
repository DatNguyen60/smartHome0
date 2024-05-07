import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Image,
  ScrollView,
  FlatList,
} from "react-native";
import axios from "axios";
import io from "socket.io-client";
import s from "../public/styles";

const SERVER_URL = "http://localhost:3000";

const HomeScreen = (props) => {
  let userId = props.route.params.userId;
  // console.log(userId);
  var deviceList = {};
  const [data, setData] = useState(null);
  const [socket, setSocket] = useState(null);
  const [user, setUser] = useState(null);
  const [popup, setPopup] = useState(false);
  const [roomName, setRoomName] = useState("");
  const [selectedRoom, setSelectedRoom] = useState(null);

  useEffect(() => {
    const socket = io(SERVER_URL);

    refreshDevicesHandler();

    refreshHandler();
    console.log(userId);
    socket.on("data", (receiveData) => {
      console.log("new data", receiveData);
      deviceList[receiveData.feedName] = receiveData.value;
      console.log(deviceList);
      setData(receiveData);
    });

    socket.on("connect", () => {
      console.log("connected to server");
      socket.emit("clientId", { userId: userId });
      setSocket(socket);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  const refreshHandler = () => {
    axios
      .get(`${SERVER_URL}/users/${userId}`)
      .then((res) => {
        setUser(res.data);
      })
      .catch((error) => console.log(error));
  };

  const refreshDevicesHandler = () => {
    axios
      .get(`${SERVER_URL}/devices/${userId}`)
      .then((res) => {
        // console.log(res.data);
        if (res.data)
          res.data.map((item, index) => {
            deviceList[item.feedName] = item;
          });
      })
      .catch((error) => console.log(error));
    console.log(deviceList);
  };

  const togglePopup = () => {
    setPopup((prevState) => !prevState);
  };
  const roomNameHandler = (e) => {
    setRoomName(e.target.value);
  };
  const addRoomHandler = (roomName) => {
    if (!roomName) {
      console.log("Invalid room name");
      return;
    }
    const roomExists = user.room.some((room) => room.name === roomName);
    if (roomExists) {
      console.log("Phòng đã tồn tại");
      return;
    }
    console.log(roomName);
    axios
      .post(`${SERVER_URL}/users/addRoom`, {
        userId: userId,
        update: {
          room: {
            name: roomName,
            devices: [],
          },
        },
      })
      .then((res) => {
        console.log(data);

        // setUser(res.data);
      })
      .catch((error) => console.log(error));
    refreshHandler();
    togglePopup();
  };

  return (
    <View style={{ flex: 1 }}>
      {!socket ? (
        <View style={[s.card]}>
          <Text style={{ color: "black" }}>State : </Text>
          <Text style={{ fontWeight: "bold", color: socket ? "green" : "red" }}>
            {!socket && "Can not connect to socket server"}
          </Text>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <View style={[s.bg_darkBlue, s.pl1, s.pr2, s.pt1, s.pb1, s.fRow]}>
            <View
              style={[
                s.bg_white,
                s.h80,
                s.w80,
                s.alCenter,
                s.juCenter,
                s.rounded50,
              ]}>
              <Image
                source={require("../../assets/humanIcon.png")}
                style={[s.h70, s.w70, s.rounded50]}
              />
            </View>
            <View style={[s.alCenter, s.juCenter, s.ml1]}>
              <Text style={[s.bold, s.h1, s.c_white]}>{user && user.name}</Text>
            </View>
          </View>
          <View style={{ flex: 1 }}>
            <View style={[s.fRow, s.alFlexEnd, s.juFlexEnd, s.m1]}>
              <TouchableOpacity onPress={() => togglePopup()} style={[s.f35]}>
                <Text style={[s.card, s.bg_green, s.h5, s.bold]}>Add room</Text>
              </TouchableOpacity>
            </View>
            {popup && (
              <View>
                <View style={[s.card, s.m1, s.fCol, s.bg_blue]}>
                  <TextInput
                    style={[s.p1, s.bg_white, s.card, s.h4]}
                    onChange={(e) => roomNameHandler(e)}></TextInput>
                  <View style={[s.fRow, s.mt1, s.juFlexEnd]}>
                    <TouchableOpacity onPress={() => togglePopup()}>
                      <Text style={[s.card, s.mr1, s.bg_orange, s.bold]}>
                        Hủy
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => addRoomHandler(roomName)}>
                      <Text style={[s.card, s.mr1, s.bg_green, s.bold]}>
                        Xác nhận
                      </Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            )}
            <ScrollView style={{ flex: 1 }}>
              <View>
                {user.room
                  .sort((a, b) => {
                    const nameA = a.name.toUpperCase();
                    const nameB = b.name.toUpperCase();
                    if (nameA < nameB) {
                      return -1;
                    }
                    if (nameA > nameB) {
                      return 1;
                    }
                    return 0;
                  })
                  .map((item, index) => {
                    return (
                      <TouchableOpacity
                        key={index}
                        style={[
                          s.card,
                          s.mb1,
                          s.ml1,
                          s.mr1,
                          s.pt3,
                          s.pb3,
                          s.pl2,
                          s.pr2,
                          s.fCol,
                        ]}
                        onPress={() => setSelectedRoom(item)}>
                        <View style={[s.fCol, s.f100]}>
                          <Text style={[s.h2, s.bold]}>{item.name}</Text>
                          <Text>Num of device : {item.devices.length}</Text>
                          {selectedRoom == item && (
                            <View style={[s.fCol, s.f100, s.mt1]}>
                              <View style={[s.fRow, s.juFlexEnd]}>
                                <TouchableOpacity>
                                  <Text
                                    style={[s.card, s.bold, s.mr1, s.bg_green]}>
                                    Add device
                                  </Text>
                                </TouchableOpacity>
                                <TouchableOpacity>
                                  <Text style={[s.card, s.bold, s.bg_orange]}>
                                    Delete room
                                  </Text>
                                </TouchableOpacity>
                              </View>
                              <View style={[s.mt1]}>
                                {item.devices.map((device, index) => {
                                  return (
                                    <View
                                      key={index}
                                      style={[
                                        s.card,
                                        s.f100,
                                        s.bg_gray,
                                        s.fCol,
                                      ]}>
                                      <Text>{device.name}</Text>
                                      <Text>Power : {}</Text>
                                    </View>
                                  );
                                })}
                              </View>
                            </View>
                          )}
                        </View>
                      </TouchableOpacity>
                    );
                  })}
              </View>
            </ScrollView>
          </View>
        </View>
      )}
    </View>
  );
};

export default HomeScreen;
