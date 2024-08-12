import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io("http://localhost:5000");

const Messaging = () => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });

    return () => {
      socket.off("message");
    };
  }, []);

  const handleSend = () => {
    if (newMessage.trim()) {
      socket.emit("sendMessage", newMessage);
      setNewMessage("");
    }
  };

  return (
    <div className="p-4 bg-white shadow-md rounded-md h-[500px] flex flex-col">
      <h2 className="text-2xl font-bold mb-4">Messages</h2>
      <div className="flex-1 overflow-y-auto">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className="p-2 bg-gray-100 rounded-md">
              {msg}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-4 flex items-center">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 p-2 border border-gray-300 rounded-md"
          placeholder="Type a message..."
        />
        <button
          onClick={handleSend}
          className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Messaging;
