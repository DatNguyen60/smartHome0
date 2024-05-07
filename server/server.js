const ObjectId = require("mongodb").ObjectId;
const AdaController = require("./adaController");
const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const { addAbortSignal } = require("stream");
const { connectToDb, getDb } = require("./mongoDB");
const { connect } = require("http2");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

const server = http.createServer(app);
const io = socketIo(server, {
  cors: {
    origin: "http://localhost:8081",
    methods: ["GET", "POST"],
  },
  transports: ["websocket", "polling"],
});
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:8081"); // Thay đổi domain thành domain của ứng dụng React Native của bạn
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});
let sendDataInterval = null;
let db;
let clientSockets = [];
let ada;

io.on("connection", (socket) => {
  console.log("A client connected");

  socket.on("connection", (data) => {
    console.log("Client connected");
  });
  socket.on("clientId", (data) =>
    clientSockets.push({
      userId: data.userId,
      socket: socket,
    })
  );

  socket.on("disconnect", () => {
    console.log("A client disconnected");
    clearInterval(sendDataInterval);
  });
  socket.on("adaData", (data) => {
    console.log(data);
    db.collection("devices").updateOne(
      { feedName: data.feedName },
      { $set: { power: data.message } }
    );
    db.collection("users")
      .find({ "devices.feedName": data.feedName })
      .forEach((user) => {
        let userIdStr = user._id.toString();
        // console.log(user._id.toString());

        clientSockets.map((client) => {
          if (client.userId === userIdStr) {
            client.socket.emit("data", {
              feedName: data.feedName,
              value: data.message,
            });
          }
        });
      });
  });
});

const PORT = process.env.PORT || 3000;

connectToDb((err) => {
  if (!err) {
    server.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    db = getDb();
    ada = new AdaController();
    ada.setDb(db);
    db.collection("devices")
      .find()
      .sort({ name: 1 })
      .forEach((device) => ada.addFeed(device.feedName));
  }
});

app.get("/devices", (req, res) => {
  let devices = [];
  db.collection("devices")
    .find()
    .sort({ name: 1 })
    .forEach((device) => devices.push(device))
    .then(() => {
      res.status(200).json(devices);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});
// get devices by userId
app.get("/devices/:userId", (req, res) => {
  let deviceList = [];
  let feedNames = [];
  db.collection("users")
    .findOne({ _id: new ObjectId(req.params.userId) })
    .then((user) => {
      let devices = user.devices;
      devices.map((device) => {
        feedNames.push(device.feedName);
      });
      db.collection("devices")
        .find({ feedName: { $in: feedNames } })
        .forEach((device) => {
          deviceList.push(device);
          // console.log(deviceList);
        })
        .then(() => {
          res.status(200).json(deviceList);
        })
        .catch((err) => {
          res.status(500).json({ error: err });
        });
      // console.log(feedNames);
    })
    .catch((err) => {
      res.status(500).json({ error: err });
    });
});
app.get("/users", (req, res) => {
  let users = [];
  db.collection("users")
    .find({ "room.devices.feedName": "yolo-led" })
    .forEach((user) => users.push(user))
    .then(() => {
      res.status(200).json(users);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});
app.get("/users/:userId", (req, res) => {
  db.collection("users")
    .findOne({ _id: new ObjectId(req.params.userId) })
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});
app.get("/devices/:feedName", (req, res) => {
  db.collection("devices")
    .findOne({ feedName: req.params.feedName })
    .then((device) => {
      if (device != null) res.status(200).json(device);
      else {
        res.status(500).json({ error: "Device does not exist" });
      }
    })
    .catch(() => {
      res.status(500).json({ error: "Could not fetch the documents" });
    });
});
// Add device to user account
app.post("/devices", (req, res) => {
  db.collection("devices")
    .insertOne(req.body.feedName)
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not insert the document" });
    });
});
// Add room to user account
app.post("/users/addRoom", (req, res) => {
  db.collection("users")
    .updateOne(
      { _id: new ObjectId(req.body.userId) },
      { $push: req.body.update }
    )
    .then(() => {
      res.status(201).json(req.body);
    })
    .catch(() => {
      res.status(500).json({ error: "Could not insert the document" });
    });
});
