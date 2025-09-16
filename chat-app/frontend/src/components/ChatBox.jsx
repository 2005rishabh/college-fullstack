import { useEffect, useState } from "react";
import socket from "../utils/socket";

function ChatBox({ user }) {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/messages")
      .then((res) => res.json())
      .then((data) => setMessages(data));

    socket.on("receiveMessage", (msg) => {
      setMessages((prev) => [...prev, msg]);
    });

    return () => socket.off("receiveMessage");
  }, []);

  return (
    <div className="p-4 h-80 overflow-y-auto bg-gray-100 rounded-lg shadow-inner">
      {messages.map((msg, idx) => (
        <p
          key={idx}
          className={`${msg.user === user ? "text-blue-600" : "text-gray-800"}`}
        >
          <strong>{msg.user}:</strong> {msg.text}
        </p>
      ))}
    </div>
  );
}

export default ChatBox;
