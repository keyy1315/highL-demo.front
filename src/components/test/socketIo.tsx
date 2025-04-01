"use client";

import { io } from "socket.io-client";

import { useState, useEffect } from "react";
import { Socket } from "socket.io-client";
import type { FormEvent } from "react";

interface Message {
  message: string;
  sender: string;
  type: "CHAT" | "JOIN" | "LEAVE";
}

export default function SocketIo() {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [username, setUsername] = useState("");
  const [messageInput, setMessageInput] = useState("");

  useEffect(() => {
    const newSocket = io("http://localhost:8081", {
      transports: ["websocket"],
    });

    newSocket.on("connect", () => {
      console.log("connected to server");
    });

    newSocket.on("message", (msg: Message) => {
      setMessages((prevMessages) => [...(prevMessages || []), msg]);
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  useEffect(() => {
    if (socket && username.trim().length > 3) {
      console.log("send join : ", username);
      socket.emit("join", username);
    }
  }, [socket, username]);

  const handleSendMessage = (e: FormEvent) => {
    e.preventDefault();

    if (socket && messageInput.trim() && username) {
      const messageData: Message = {
        message: messageInput,
        sender: username,
        type: "CHAT",
      };

      socket.emit("message", messageData);
      setMessageInput("");
    }
  };

  if (username.trim().length < 4) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded shadow-md w-96">
          <h2 className="text-2xl mb-4">Enter Username</h2>
          <input
            type="text"
            value={username || ""}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your username"
            className="w-full p-2 border rounded mb-4"
          />
          <button
            onClick={() => username?.trim()}
            className="w-full bg-blue-500 text-white p-2 rounded"
          >
            Join Chat
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      <div className="flex-grow overflow-y-auto p-4">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              msg.sender === username
                ? "bg-blue-500 text-white self-end"
                : "bg-gray-200 text-black self-start"
            }`}
          >
            <strong>{msg.sender}: </strong>
            {msg.message}
          </div>
        ))}
      </div>

      <form onSubmit={handleSendMessage} className="p-4 bg-white border-t">
        <div className="flex">
          <input
            type="text"
            value={messageInput}
            onChange={(e) => setMessageInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border rounded-l"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white p-2 rounded-r"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}
