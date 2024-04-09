const mqtt = require("mqtt");

const MQTT_BROKER = "mqtt://io.adafruit.com";
const MQTT_USERNAME = "soiCoDoc666";
const MQTT_PASSWORD = "aio_gvEh37xRajk5K5k9rZHZYsgkLFdp";

const adafruit = mqtt.connect(MQTT_BROKER, {
  username: MQTT_USERNAME,
  password: MQTT_PASSWORD,
});

const feedName = "testSlide";

adafruit.on("connect", () => {
  console.log("Connected to Adafruit IO");

  adafruit.subscribe(`${MQTT_USERNAME}/feeds/${feedName}`);

  adafruit.on("message", (topic, message) => {
    console.log("Received message:", message.toString());
  });
});

adafruit.on("error", (err) => {
  console.error("Error connecting to Adafruit IO:", err);
});

// adafruit.publish(
//   `${MQTT_USERNAME}/feeds/${feedName}`,
//   newValue.toString(),
//   (err) => {
//     if (err) {
//       console.error("Error publishing message:", err);
//       res.status(500).send("Failed to change feed value");
//     } else {
//       console.log("Message published successfully");
//       res.status(200).send("Feed value changed successfully");
//     }
//   }
// );

const AdaController = () => {
  console.log("call function");
};

module.exports = adafruit;
