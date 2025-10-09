const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.static("public"));

mongoose.connect("mongodb://127.0.0.1:27017/groupchat", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const messageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  timestamp: { type: Date, default: Date.now },
});

const Message = mongoose.model("Message", messageSchema);

const names = ["Alice", "Bob", "Charlie", "David", "Eva", "Frank"];
let onlineUsers = {}; // { socket.id: {name, online} }

io.on("connection", async (socket) => {
  console.log("A user connected");

  const randomName = names[Math.floor(Math.random() * names.length)];
  onlineUsers[socket.id] = { name: randomName, online: true };

  io.emit("user list", Object.values(onlineUsers));

  const oldMessages = await Message.find().sort({ timestamp: 1 }).limit(20);
  socket.emit("load messages", oldMessages);

  const welcomeMsg = new Message({ text: `👋 ${randomName} joined the chat`, sender: "System" });
  await welcomeMsg.save();
  io.emit("chat message", welcomeMsg);

  socket.on("chat message", async (msg) => {
    const message = new Message({ text: msg, sender: randomName });
    await message.save();
    io.emit("chat message", message);
  });

  socket.on("disconnect", async () => {
    console.log("A user disconnected");
    onlineUsers[socket.id].online = false;

    io.emit("user list", Object.values(onlineUsers));

    const byeMsg = new Message({ text: `❌ ${randomName} left the chat`, sender: "System" });
    await byeMsg.save();
    io.emit("chat message", byeMsg);
  });
});

server.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
