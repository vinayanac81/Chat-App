import React, { useEffect, useState } from "react";
import io from "socket.io-client";
const socket = io("https://chat-app-jhj9.onrender.com");
const ChatApp = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    socket.on("message", (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    return () => {
      socket.off("message");
    };
  }, []);
  const sendMessage = (e) => {
    e.preventDefault();

    if (message !== "") {
      socket.emit("message", message);
      setMessage("");
    }
  };
  return (
    <div className="flex justify-center min-h-screen bg-gray-900">
      <div className="w-full max-w-2xl p-6 text-white rounded-lg shadow-lg">
        <h1 className="text-2xl font-semibold text-center text-white mb-4">
          Chat App
        </h1>
        <div className="mb-4 h-128 overflow-y-auto bg-gray-50 p-4 rounded-lg border border-gray-200">
          {messages.length === 0 ? (
            <p className="text-center text-black font-semibold">No Messages</p>
          ) : (
            messages.map((message, index) => (
              <div key={index} className="p-2 my-1 text-black">
                {message}
              </div>
            ))
          )}
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="text"
            placeholder="Type Message Here"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900"
          />
          <button
            onClick={sendMessage}
            className="bg-slate-400 px-4 py-2 bg-gray-900 text-gray-900 rounded-lg hover:text-white hover:bg-gray-900 focus:outline-gray-900"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatApp;
