"use client";

import { useEffect, useState } from "react";
import { Client } from "@stomp/stompjs";

interface Message {
  message: string;
  sender: string;
  timestamp: string;
  type: "CHAT" | "JOIN" | "LEAVE";
}

export default function Stomp() {
    const [client, setClient] = useState<Client | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const [username, setUsername] = useState("");
    const [message, setMessage] = useState("");
    const [connected, setConnected] = useState(false);
    const [isUsernameSubmitted, setIsUsernameSubmitted] = useState(false);

    useEffect(() => {
        const stompClient = new Client({
            brokerURL: "ws://172.25.96.1:8080/ws/websocket",
            onConnect: () => {
                setConnected(true);
                console.log("connected to server");
                stompClient.subscribe("/topic/public", (payload) => {
                    const receivedMessage = JSON.parse(payload.body) as Message;
                    setMessages((prevMessages) => [...prevMessages, receivedMessage]);
                });
            },
            onDisconnect: () => {
                setConnected(false);
                console.log("disconnected from server");
            },
            onStompError: (frame) => {
                console.error("stomp error", frame);
            },
        });

        stompClient.activate();
        setClient(stompClient);

        return () => {
            stompClient.deactivate();
        };
    }, []);

    const handleUsernameSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(client && username.trim().length > 3) {
            console.log("send join : ", username);
            client.publish({
                destination: '/app/chat.addUser',
                body: JSON.stringify({
                    message: null,
                    sender: username,
                    type: "JOIN",
                    timestamp: new Date().toISOString(),
                })
            });
            setIsUsernameSubmitted(true);
        }
    };

    const handleMessageSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(client && message && username) {
            client.publish({
                destination: '/app/chat.sendMsg',
                body: JSON.stringify({
                    message: message,
                    sender: username,
                    type: "CHAT",
                    timestamp: new Date().toISOString(),
                })
            });
            setMessage("");
        }
    };
    if (!isUsernameSubmitted) {
        return (
          <form onSubmit={handleUsernameSubmit} className="max-w-md mx-auto mt-10">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              className="w-full p-2 border rounded"
              required
            />
            <button 
              type="submit" 
              className="w-full mt-2 p-2 bg-blue-500 text-white rounded"
            >
              Join Chat
            </button>
          </form>
        );
      }
    
      return (
        <div className="max-w-md mx-auto mt-10">
          <div className="h-96 border overflow-y-auto mb-4 p-2">
            {messages.map((msg, index) => (
              <div 
                key={index} 
                className={`mb-2 p-2 rounded ${
                  msg.type === 'JOIN' 
                    ? 'bg-green-100' 
                    : msg.sender === username 
                      ? 'bg-blue-100 self-end' 
                      : 'bg-gray-100'
                }`}
              >
                <strong>{msg.sender}: </strong>
                {msg.message}
              </div>
            ))}
          </div>
          <form onSubmit={handleMessageSubmit} className="flex">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Type a message"
              className="flex-grow p-2 border rounded-l"
              required
            />
            <button 
              type="submit" 
              className="bg-blue-500 text-white p-2 rounded-r"
              disabled={!connected}
            >
              Send
            </button>
          </form>
        </div>
      );
    }   
