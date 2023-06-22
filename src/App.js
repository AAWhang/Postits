/*global chrome*/
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [text, setText] = useState("");

  document.addEventListener("DOMContentLoaded", function () {
  const textarea = document.querySelector(".notepad-textarea");

  function adjustTextAreaHeight() {
    textarea.style.height = "auto"; // Reset height to auto
    textarea.style.height = textarea.scrollHeight + "px"; // Set height to scrollHeight
  }

  textarea.addEventListener("input", adjustTextAreaHeight);
});

  useEffect(() => {
    // Retrieve the saved text from storage
    chrome.storage.sync.get("text", (result) => {
      if (result.text) {
        setText(result.text);
      }
    });

    // Retrieve the saved window size from storage
    chrome.storage.local.get(["windowSize"], function (result) {
      const { windowSize } = result;

      // If window size exists, set the window dimensions
      if (windowSize) {
        const { width, height } = windowSize;
        chrome.windows.getCurrent(function (window) {
            chrome.windows.update(window.id, { width, height });
        });
      }
    });
  }, []);

  useEffect(() => {
    // Update the saved text in storage
    chrome.storage.sync.set({ text });

    // Save the window size before closing the extension window
    chrome.windows.onRemoved.addListener(function (windowId) {
      chrome.windows.get(windowId, function (window) {
        if (window.type === "normal") {
          const { width, height } = window;

          // Save the window size to storage
          chrome.storage.local.set({ windowSize: { width, height } });
        }
      });
    });
  }, [text]);

  const handleTextChange = (e) => {
    setText(e.target.value);

    // Get the current webpage's content and log it to the console
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        { type: "getPageContent" },
        function (response) {
          console.log(response.content);
        }
      );
    });
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