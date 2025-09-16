import { useState } from "react";
import socket from "../utils/socket";

function MessageInput({ user }) {
  const [text, setText] = useState("");

  const sendMessage = () => {
    if (text.trim()) {
      socket.emit("sendMessage", { user, text });
      setText("");
    }
  };

  return (
    <div className="flex gap-2 mt-4">
      <input
        className="flex-1 p-2 border rounded-lg"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type a message..."
      />
      <button
        onClick={sendMessage}
        className="px-4 py-2 bg-blue-600 text-white rounded-lg"
      >
        Send
      </button>
    </div>
  );
}

export default MessageInput;
