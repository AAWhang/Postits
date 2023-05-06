/*global chrome*/
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [text, setText] = useState("");

  useEffect(() => {
    chrome.storage.sync.get(["position", "text"], (result) => {
      if (result.position) {
        setPosition(result.position);
      }
      if (result.text) {
        setText(result.text);
      }
    });
  }, []);

  useEffect(() => {
    chrome.storage.sync.set({ position, text });
  }, [position, text]);

  const handleMouseDown = (e) => {
    const startX = e.pageX - position.x;
    const startY = e.pageY - position.y;

    const handleMouseMove = (e) => {
      setPosition({ x: e.pageX - startX, y: e.pageY - startY });
    };

    const handleMouseUp = () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleTextChange = (e) => {
    setText(e.target.value);
  };

  return (
    <div className="notepad" style={{ top: position.y, left: position.x }}>
      <div className="notepad-header" onMouseDown={handleMouseDown}>
        <span>Notepad</span>
      </div>
      <textarea className="notepad-textarea" value={text} onChange={handleTextChange} />
    </div>
  );
}

export default App;
