import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import io from "socket.io-client";
const socket = io("https://chat-app-jscd.onrender.com");

function Chatpage() {
  const { state } = useLocation();
  const { username, roomId } = state;
  const [message, setmessage] = useState("");
  const [messages, setmessages] = useState([]);

  useEffect(() => {
    socket.emit("join-room", { username, roomId });

    const handleReceive = (data) => {
      setmessages((prev) => [...prev, data]);
    };

    socket.on("receive_message", handleReceive);

    return () => {
      socket.off("receive_message", handleReceive);
    };
  }, [username, roomId]);

  const handlesend = () => {
    if (message) {
      socket.emit("sendmessage", {
        roomId,
        sender: username,
        text: message,
      });
      setmessage("");
    }
  };

  return (
    <div
      className="w-100 vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(120deg, #FFFAE3, #FADADD)",
        padding: "20px",
      }}
    >
      <div
        className="bg-white rounded shadow p-4"
        style={{ width: "100%", maxWidth: "500px", height: "85vh" }}
      >
        <h4 className="text-center mb-3">Room: {roomId}</h4>

        <div
          className="border rounded p-3 mb-3"
          style={{
            height: "65vh",
            overflowY: "auto",
            backgroundColor: "#f9f9f9",
          }}
        >
          {messages.length === 0 ? (
            <p className="text-muted text-center">No messages yet</p>
          ) : (
            messages.map((msg, i) => (
              <div
                key={i}
                className={`d-flex mb-2 ${
                  msg.sender === username
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded shadow-sm ${
                    msg.sender === username
                      ? "bg-primary text-white"
                      : "bg-light"
                  }`}
                  style={{
                    maxWidth: "80%",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  <div style={{ fontSize: "0.8rem", fontWeight: "bold" }}>
                    {msg.sender}
                  </div>
                  <div>{msg.text}</div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="d-flex">
          <input
            type="text"
            value={message}
            onChange={(e) => setmessage(e.target.value)}
            placeholder="Type your message..."
            className="form-control me-2"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handlesend();
              }
            }}
          />
          <button className="btn btn-primary" onClick={handlesend}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chatpage;
