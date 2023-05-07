/*global chrome*/                                   //I had an ESLint error that would throw up an error over chrome not being 
import React, { useState, useEffect } from "react"; //defined while trying to make a build. The line of code on top bypasses that check.
import "./App.css";

function App() {
  const [text, setText] = useState("");             

  useEffect(() => {
    chrome.storage.sync.get("text", (result) => {   //grabs the text saved into the chrome storage api
      if (result.text) {                            //and displays it when in use, sending it into the 
        setText(result.text);                       //hook
      }
    });
  }, []);

  useEffect(() => {                                 //when text is entered it will update the text in
    chrome.storage.sync.set({ text });              //the chrome storage api with the text hook
  }, [text]);

  const handleTextChange = (e) => {                 //on evernt it will update the text hook with what is
    setText(e.target.value);                        //typed trigged by textarea onchange command
  };

  return (
    <div className="notepad">
      <div className="notepad-header">
        <span>Notepad</span>
      </div>
      <textarea className="notepad-textarea" value={text} onChange={handleTextChange} />
    </div>
  );
}

export default App;