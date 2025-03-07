import React, { useState } from "react";
import axios from "axios";
import "./Greet.css";
function Greet() {
  const [greetInput, setGreetInput] = useState("");
  const [greeting, setGreeting] = useState("");
  const [track, setTrack] = useState(false);

  const handleChange = (e) => {
    setGreetInput(e.target.value);
  };

  const handleSubmit = async () => {
    if (!greetInput.trim()) return; // Prevent empty requests


    try {
      const response = await axios.get(
        `https://api-app-sage.vercel.app/api/greet?name=${greetInput}`
      );
      setGreeting(response.data.message);
      setTrack(true);
      setGreetInput("");
    } catch (error) {
      console.error("Error fetching greeting:", error);
      setGreeting("Failed to fetch greeting.");
    }
  };

  return (
    <div className="container">
      {!track ? 
        <div className="input">
          <input
            type="text"
            placeholder="Enter your name for greeting"
            id="inp"
            value={greetInput}
            onChange={handleChange}
          />
          <button onClick={handleSubmit} id="sendBtn">
            Submit
          </button>
        </div>
       : 
        <div className="mess">{greeting && <p>{greeting}</p>}</div>
      }
    </div>
  );
}

export default Greet;
