const AdaController = require("./adaController");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { addAbortSignal } = require("stream");

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
  },
});

let sendDataInterval = null;

function sendSimulatedData() {
  io.emit("data", Math.floor(Math.random() * 100));
}

io.on("connection", (socket) => {
  console.log("A client connected");
  var ada = new AdaController(socket);
  ada.addFeed("testSlide");
  // sendDataInterval = setInterval(sendSimulatedData, 1000);

  socket.on("clientData", (receiveData) => {
    console.log(
      receiveData,
      receiveData.data === 0
        ? "Người dùng muốn bật đèn"
        : "Người dùng muốn tắt đèn"
    );
    ada.sendValue(receiveData.data, socket);
  });

  socket.on("disconnect", () => {
    console.log("A client disconnected");
    clearInterval(sendDataInterval);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
