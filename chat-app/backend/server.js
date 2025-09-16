import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();
const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Error:", err));

// Message schema
const Message = mongoose.model(
  "Message",
  new mongoose.Schema(
    {
      user: String,
      text: String,
    },
    { timestamps: true }
  )
);

// REST API
app.get("/api/messages", async (req, res) => {
  const messages = await Message.find().sort({ createdAt: 1 });
  res.json(messages);
});

// WebSocket
io.on("connection", (socket) => {
  console.log("🔌 User connected");

  socket.on("sendMessage", async (data) => {
    const newMsg = new Message(data);
    await newMsg.save();
    io.emit("receiveMessage", newMsg);
  });

  socket.on("disconnect", () => console.log("❌ User disconnected"));
});

const PORT = process.env.PORT || 5000;
httpServer.listen(PORT, () =>
  console.log(`🚀 Server on http://localhost:${PORT}`)
);
