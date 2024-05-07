const io = require("socket.io-client");
const mqtt = require("mqtt");
class AdaController {
  static getUsersIdByFeedName(feedName, db) {
    let users = [];
    db.collection("users")
      .find({ "room.devices.feedName": feedName })
      .forEach((user) => users.push(user._id.toString()));
    console.log(users);
    return users;
  }
  constructor() {
    this.socket = io("http://localhost:3000");
    this.db = null;
    this.config = {
      MQTT_BROKER: "mqtt://io.adafruit.com",
      MQTT_USERNAME: "soiCoDoc666",
      MQTT_PASSWORD: "aio_gvEh37xRajk5K5k9rZHZYsgkLFdp",
    };
    this.adafruit = mqtt.connect(this.config.MQTT_BROKER, {
      username: this.config.MQTT_USERNAME,
      password: this.config.MQTT_PASSWORD,
    });
    this.adafruit.on("message", (topic, message) => {
      let feedName = topic.split("/")[2];
      let strMssg = message.toString();
      let users = [];

      this.socket.emit("adaData", {
        feedName: feedName,
        message: strMssg,
        // userIds: AdaController.getUsersIdByFeedName(feedName, this.db),
      });
    });
    this.feeds = [];
    this.socket.on("clientData", (receiveData) => {
      console.log(receiveData);
      sendValue(receiveData.data, this.socket);
    });
  }
  setDb(db) {
    this.db = db;
  }
  addFeed(feedName) {
    if (feedName in this.feeds) return;
    this.feeds.push(feedName);
    this.adafruit.on("connect", () => {
      console.log("Connected to Adafruit IO");
      this.adafruit.subscribe(`${this.config.MQTT_USERNAME}/feeds/${feedName}`);
    });

    this.adafruit.on("error", (err) => {
      console.error("Error connecting to Adafruit IO:", err);
    });
  }
  getFeed(feedName) {
    return this.feeds.find((item) => item === feedName);
  }
  removeFeed(feedName) {
    if (feedName in this.feeds) {
      this.feeds.splice(this.feeds.indexOf(feedName), 1);
      this.adafruit.unsubscribe(
        `${this.config.MQTT_USERNAME}/feeds/${feedName}`
      );
      console.log("Đã xóa feed thành công");
      this.socket.emit("data", "Đã xóa feed thành công");
    }
  }

  sendValue(feedName, value) {
    console.log("Đang gửi giá trị");
    if (feedName in this.feeds) {
      this.adafruit.publish(
        `${this.config.MQTT_USERNAME}/feeds/${feedName}`,
        value.toString(),
        (err) => {
          let users = this.getUsersIdByFeedName(feedName);
          forEach(users, (user) => {
            if (err) {
              console.error("adaCtrl -> adaServer : ", err);

              this.socket.emit(user, "Không thể thay đổi giá trị feed");
            } else {
              console.log("adaCtrl -> adaServer : success");
              this.socket.emit(user, "Giá trị feed được thay đổi thành công");
            }
          });
        }
      );
    }
  }
  static create() {}
}
module.exports = AdaController;
