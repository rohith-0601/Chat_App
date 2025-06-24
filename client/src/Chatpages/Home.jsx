import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

// Color Palette:
// - Eggshell: #FCFCFC
// - Cornsilk: #FFFAE3
// - Bright Pink: #F7567C

function Homepage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");

  const handleClick = () => {
    if (!username || !roomId) {
      alert("Please enter both Username and Room ID");
      return;
    }


    navigate("/chat",{state:{username,roomId}});
  };

  return (
    <div
      className="w-100 vh-100 d-flex justify-content-center align-items-center"
      style={{
        background: "linear-gradient(120deg,  #FFFAE3 , #F7567C)",
      }}
    >
      <div className="bg-white rounded-4 shadow p-5" style={{ minWidth: "320px", maxWidth: "400px", width: "90%" }}>
        <h2 className="text-center mb-4">Join a Room</h2>

        <div className="form-floating mb-3">
          <input
            type="text"
            className="form-control"
            id="floatingUsername"
            placeholder="Enter Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor="floatingUsername">Username</label>
        </div>

        <div className="form-floating mb-4">
          <input
            type="text"
            className="form-control"
            id="floatingRoomId"
            placeholder="Enter Room ID"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
          />
          <label htmlFor="floatingRoomId">Room ID</label>
        </div>

        <button
          className="btn w-100 text-dark fw-semibold border"
          style={{ background: "#FCFCFC" }}
          onClick={handleClick}
        >
          Go to Chat Page
        </button>
      </div>
    </div>
  );
}

export default Homepage;
