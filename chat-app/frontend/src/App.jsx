import { useState } from "react";
import ChatBox from "./components/ChatBox";
import MessageInput from "./components/MessageInput";
import ThreeBackground from "./components/ThreeBackground";

function App() {
  const [user] = useState(() => "User" + Math.floor(Math.random() * 1000));

  return (
    <div className="h-screen flex items-center justify-center relative">
      <ThreeBackground />
      <div className="bg-white/80 p-6 rounded-2xl shadow-xl w-96 z-10">
        <h1 className="text-xl font-bold mb-4">💬 Chat as {user}</h1>
        <ChatBox user={user} />
        <MessageInput user={user} />
      </div>
    </div>
  );
}

export default App;
