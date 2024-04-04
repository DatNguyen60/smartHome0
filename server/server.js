const express = require("express");
const http = require("http");
const socketIo = require("socket.io");

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

  sendDataInterval = setInterval(sendSimulatedData, 1000);

  socket.on("disconnect", () => {
    console.log("A client disconnected");
    clearInterval(sendDataInterval);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
