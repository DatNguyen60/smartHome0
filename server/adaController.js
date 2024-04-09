const mqtt = require("mqtt");
class AdaController {
  constructor(socket) {
    this.socket = socket;
    this.config = {
      MQTT_BROKER: "mqtt://io.adafruit.com",
      MQTT_USERNAME: "soiCoDoc666",
      MQTT_PASSWORD: "aio_gvEh37xRajk5K5k9rZHZYsgkLFdp",
    };
    this.adafruit = mqtt.connect(this.config.MQTT_BROKER, {
      username: this.config.MQTT_USERNAME,
      password: this.config.MQTT_PASSWORD,
    });
    this.feeds = [];
  }
  addFeed(feedName) {
    this.feeds.push(feedName);
    this.adafruit.on("connect", () => {
      console.log("Connected to Adafruit IO");

      this.adafruit.subscribe(`${this.config.MQTT_USERNAME}/feeds/${feedName}`);

      this.adafruit.on("message", (topic, message) => {
        console.log("Received message:", message.toString());
        this.socket.emit("data", message.toString());
      });
    });

    this.adafruit.on("error", (err) => {
      console.error("Error connecting to Adafruit IO:", err);
    });
  }
  getFeed(feedName) {
    return this.feeds.find((item) => item === feedName);
  }
  sendValue(newValue, socket) {
    console.log("Đang gửi giá trị");
    this.adafruit.publish(
      `${this.config.MQTT_USERNAME}/feeds/${"testSlide"}`,
      newValue.toString(),
      (err) => {
        if (err) {
          console.error("Lỗi khi xuất bản tin nhắn:", err);
          socket.emit("data", "Không thể thay đổi giá trị feed");
        } else {
          console.log("Tin nhắn được xuất bản thành công");
          socket.emit("data", "Giá trị feed được thay đổi thành công");
        }
      }
    );
  }
}
module.exports = AdaController;
